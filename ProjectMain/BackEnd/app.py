from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = joblib.load('diabetes_model.joblib')
preprocessor = joblib.load('preprocessor.joblib')


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
        
        print("Received data:", patient.dict())
        
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

        # print("Input DataFrame:", input_data)
        
        processed_data = preprocessor.transform(input_data)
        # print("Processed data shape:", processed_data.shape)
        
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