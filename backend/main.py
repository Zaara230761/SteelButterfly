from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
from contextlib import asynccontextmanager

from xlsx_parser import xlsx_parser, load_price_df, PRICE_FILES

@asynccontextmanager
async def lifespan(app: FastAPI):
    for region in PRICE_FILES.keys():
        load_price_df(region)
    yield

app = FastAPI(default_response_class=ORJSONResponse, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/prices")
def get_prices(month: int, region: str):
    try:
        return xlsx_parser(region, month)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
