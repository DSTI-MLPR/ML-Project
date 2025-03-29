Predicting Diabetes Outcome for Women

Project Overview

This project aims to develop a machine learning model to predict diabetes outcomes in women using a dataset from the Taipei Municipal Medical Center. The project follows an end-to-end machine learning pipeline, including data preprocessing, model training, evaluation, and deployment as a web application.

Dataset

The dataset consists of 15,000 records with eight features related to diabetes risk factors:

Pregnancies: Number of times pregnant

PlasmaGlucose: Plasma glucose concentration after 2 hours in an oral glucose tolerance test

DiastolicBloodPressure: Diastolic blood pressure (mm Hg)

TricepsThickness: Triceps skin fold thickness (mm)

SerumInsulin: 2-Hour serum insulin (mu U/ml)

BMI: Body mass index (kg/m²)

DiabetesPedigree: A function that scores the probability of diabetes based on family history

Age: Age in years

Diabetic (Target Variable): 1 = Diabetes diagnosed, 0 = No diabetes diagnosed

Project Structure

ML-Project/
├── data/
│   └──TAIPEI_diabetes.csv   # Raw data for training the model
├── notebooks/
│   └── project_analysis.ipynb    # Jupyter notebook for data analysis
│   └── model_training.ipynb      # Jupyter notebook for training the machine learning model
├── src/
│   └── app.py                    # Flask web application for deployment
│   └── model.py                  # Model building and prediction code
├── requirements.txt              # Python dependencies
├── README.md                     # This file
└── report.pdf                    # Project report

License

This project is licensed under the ? License - see the LICENSE file for details.
