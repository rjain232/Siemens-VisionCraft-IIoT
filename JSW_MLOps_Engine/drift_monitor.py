import pandas as pd
import numpy as np
import joblib
from sklearn.metrics import mean_squared_error
import os

def check_model_drift():
    print("--- MLOps: Model Drift Monitor ---")
    model_path = 'artifacts/mtbf_predictor.pkl'
    
    if not os.path.exists(model_path):
        print("Error: Production model not found. Cannot check for drift.")
        return

    # 1. Load the current "production" model
    model = joblib.load(model_path)
    print(f"Loaded production model from {model_path}")

    # 2. Simulate "Drifted" real-world data (E.g., 6 months later, robots are older and running hotter)
    print("Ingesting new telemetry data from the last 30 days...")
    np.random.seed(99)
    drifted_data = pd.DataFrame({
        'robot_weld_count': np.random.randint(5000, 10000, 100), # Higher weld counts
        'energy_consumption_kwh': np.random.uniform(150.0, 250.0, 100), # Running hotter
        'operating_temperature': np.random.uniform(70.0, 110.0, 100),
    })
    
    # Actual observed MTBF in the real world (robots are breaking down faster now)
    actual_real_world_mtbf = np.random.uniform(50.0, 150.0, 100)

    # 3. Use the old model to predict on the new data
    predictions = model.predict(drifted_data)
    
    # 4. Calculate the error (MSE) to check accuracy degradation
    mse = mean_squared_error(actual_real_world_mtbf, predictions)
    print(f"Current Model Error Rate (MSE) on new data: {mse:.2f}")

    # 5. Automated MLOps Decision making
    THRESHOLD = 20000.0
    if mse > THRESHOLD:
        print("\n[ALERT] MODEL DRIFT DETECTED!")
        print("The physical robots have degraded, making the current AI model inaccurate.")
        print("[ACTION] Automatically triggering Apache Spark pipeline to retrain model with new data...")
        # In a real pipeline, this triggers GitHub Actions or Airflow
    else:
        print("\n[OK] Model is still performing accurately within business bounds.")

if __name__ == "__main__":
    check_model_drift()
