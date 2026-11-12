import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import pyodbc
import joblib
import os

# 1. DATABASE & SQL (From Shradha's advice)
def fetch_training_data():
    print("Fetching historical MTBF/MTTR and Robot Health data from SQL Server...")
    # In a real environment, this connects to the JSW MSSQL Database
    # conn = pyodbc.connect('DRIVER={SQL Server};SERVER=RJAIN;DATABASE=JSW;UID=...;PWD=...')
    # df = pd.read_sql("SELECT * FROM Production_Logs", conn)
    
    # Mocking the data for demonstration based on JSW's Robot Spot Hit Rate & MTBF
    np.random.seed(42)
    data = {
        'robot_weld_count': np.random.randint(1000, 5000, 1000),
        'energy_consumption_kwh': np.random.uniform(50.0, 150.0, 1000),
        'operating_temperature': np.random.uniform(30.0, 80.0, 1000),
        'mtbf_hours': np.random.uniform(100.0, 500.0, 1000) # Target Variable
    }
    return pd.DataFrame(data)

# 2. MACHINE LEARNING ALGORITHMS & STRONG MATH
def train_predictive_model(df):
    print("Applying Machine Learning Algorithms (Random Forest) to predict failures...")
    
    X = df[['robot_weld_count', 'energy_consumption_kwh', 'operating_temperature']]
    y = df['mtbf_hours']
    
    # Mathematical split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Initialize and train algorithm
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Mathematical evaluation
    predictions = model.predict(X_test)
    mse = mean_squared_error(y_test, predictions)
    print(f"Model trained successfully. Mean Squared Error: {mse:.2f}")
    
    # 3. MLOps: Save the model artifact
    os.makedirs('artifacts', exist_ok=True)
    joblib.dump(model, 'artifacts/mtbf_predictor.pkl')
    print("MLOps: Model artifact saved to artifacts/mtbf_predictor.pkl")

if __name__ == "__main__":
    df = fetch_training_data()
    train_predictive_model(df)
