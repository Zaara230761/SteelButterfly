from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
from contextlib import asynccontextmanager
import math

def climate_adjusted_price(
    P_orig,
    SC_CO2,
    M_CO2,
    T_CO2,
    D_PM,
    E_SO2,
    Y,
    f_sulf,
    M_SO2,
    C0,
    beta,
    S,
    W):
    """
    Computes the climate-adjusted price using your full formula.
    """

    # --- Social cost of CO2 component ---
    co2_component = SC_CO2 * (M_CO2 + T_CO2)

    # --- SO2 damages component ---
    so2_cost_per_ton = (D_PM / E_SO2) * (Y / f_sulf)
    so2_component = so2_cost_per_ton * M_SO2

    # --- Water scarcity cost component ---
    water_component = C0 * (1 + beta * S) * W

    # --- Final adjusted price ---
    adjusted_price = (
        P_orig
        + co2_component
        + so2_component
        + water_component
    )

    return adjusted_price



def climate_adjuster_with_uncertainties(
    P_orig,
    SC_CO2, SC_CO2_unc,
    M_CO2, M_CO2_unc,
    T_CO2, T_CO2_unc, 
    D_PM,
    E_SO2,
    Y,
    f_sulf,
    M_SO2, SO2_unc,
    C0,
    beta,
    S,
    W, water_unc):
    """
    Computes climate-adjusted price AND its uncertainty.
    Uses Gaussian error propagation.
    """
    # 1. Compute the base price (no uncertainties)
    base_price = climate_adjusted_price(
        P_orig,
        SC_CO2,
        M_CO2,
        T_CO2,
        D_PM,
        E_SO2,
        Y,
        f_sulf,
        M_SO2,
        C0,
        beta,
        S,
        W
    )

    # 2. Error propagation for each component

    #  CO2 component: SC_CO2 * (M_CO2 + T_CO2) 
    dC_dSC = (M_CO2 + T_CO2)
    dC_dM  = SC_CO2
    dC_dT  = SC_CO2

    co2_var = (
        (dC_dSC**2) * (SC_CO2_unc**2) +
        (dC_dM**2)  * (M_CO2_unc**2)  +
        (dC_dT**2)  * (T_CO2_unc**2)
    )


    #  SO2 component: M_SO2 * (D_PM/E_SO2) * (Y/f_sulf) 
    constant_SO2 = (D_PM / E_SO2) * (Y / f_sulf)

    dSO2_dM = constant_SO2   # derivative wrt M_SO2
    so2_var = (dSO2_dM**2) * (SO2_unc**2)


    #  Water component: C0 * (1 + beta*S) * W 
    dW_dW = C0 * (1 + beta * S)

    water_var = (dW_dW**2) * (water_unc**2)

    # 3. Total variance & standard deviation

    total_variance = co2_var + so2_var + water_var
    total_uncertainty = math.sqrt(total_variance)

    return base_price, total_uncertainty



def us_tarrifs(price):
    return 1.25 * price

def us_tax_incentive(price): 
    return 0.90* price
