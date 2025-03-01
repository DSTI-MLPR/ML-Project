from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app
app = FastAPI()

# Add CORS middleware to allow requests from your Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the saved model and preprocessor
model = joblib.load('diabetes_model.joblib')
preprocessor = joblib.load('preprocessor.joblib')

# Define the input data model
class PatientData(BaseModel):
    pregnancies: int
    plasma_glucose: float
    blood_pressure: float
    triceps: float
    insulin: float
    bmi: float
    pedigree: float
    age: int

@app.post("/predict")
async def predict_diabetes(patient: PatientData):
    try:
        # Log the incoming data
        print("Received data:", patient.dict())
        
        # Convert input data to DataFrame with corrected column name
        input_data = pd.DataFrame([{
            'Pregnancies': patient.pregnancies,
            'PlasmaGlucose': patient.plasma_glucose,
            'DiastolicBloodPressure': patient.blood_pressure,
            'TricepsThickness': patient.triceps,
            'SerumInsulin': patient.insulin,
            'BMI': patient.bmi,
            'DiabetesPedigree': patient.pedigree,
            'Age': patient.age
        }])

        # Log the DataFrame
        print("Input DataFrame:", input_data)
        
        # Preprocess the input
        processed_data = preprocessor.transform(input_data)
        print("Processed data shape:", processed_data.shape)
        
        # Make prediction
        prediction = model.predict(processed_data)
        probability = model.predict_proba(processed_data)[0][1]

        return {
            "prediction": "Diabetic" if prediction[0] == 1 else "Not Diabetic",
            "probability": float(probability)
        }
    except Exception as e:
        # Log the full error
        import traceback
        print("Error occurred:", str(e))
        print("Traceback:", traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e)) 