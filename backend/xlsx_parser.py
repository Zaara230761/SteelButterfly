import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
PRICES_DIR = BASE_DIR / "prices"

def xlsx_parser(region, month):
    price_files = {
        "china": "HC Closing Prices.xlsx",
        "india": "HC Closing Prices.xlsx",
        "usa": "HU Closing Prices.xlsx",
    }
    filename = price_files.get(region)
    filepath = PRICES_DIR / filename
    df = pd.read_excel(filepath)
    df['USD/mt'] = df['USD/mt'].dt.strftime('%Y-%m-%d')
    return dict(zip(df['USD/mt'], df[df.columns[month]]))