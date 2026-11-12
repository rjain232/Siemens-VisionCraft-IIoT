from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import os

app = FastAPI(title="JSW MLOps - Predictive Maintenance API")

# Load the model artifact created by the training pipeline
MODEL_PATH = "artifacts/mtbf_predictor.pkl"
model = None

if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)

class TelemetryData(BaseModel):
    robot_weld_count: int
    energy_consumption_kwh: float
    operating_temperature: float

@app.post("/predict-mtbf")
def predict_mtbf(data: TelemetryData):
    if not model:
        return {"error": "MLOps Error: Model artifact not found. Please run training pipeline first."}
    
    # Convert input to dataframe
    df = pd.DataFrame([data.dict()])
    
    # Predict
    prediction = model.predict(df)[0]
    
    return {
        "status": "success",
        "predicted_mtbf_hours": round(prediction, 2),
        "maintenance_required": bool(prediction < 150.0)  # Alert if MTBF drops below 150 hours
    }

if __name__ == "__main__":
    import uvicorn
    # MLOps: Serve the model on port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
