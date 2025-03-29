# Diabetes Prediction Web Application

## Project Overview

This project is a full-stack web application that predicts diabetes outcomes for women using machine learning. It consists of a Python backend with a machine learning model and a Next.js frontend for user interaction. The application uses a dataset from the Taipei Municipal Medical Center to make predictions.

## Features

- Machine learning model for diabetes prediction
- RESTful API backend built with Flask
- Modern web interface built with Next.js
- Real-time prediction capabilities
- User-friendly form for input data

## Dataset

The model uses a dataset with the following features:

- Pregnancies: Number of times pregnant
- PlasmaGlucose: Plasma glucose concentration after 2 hours in an oral glucose tolerance test
- DiastolicBloodPressure: Diastolic blood pressure (mm Hg)
- TricepsThickness: Triceps skin fold thickness (mm)
- SerumInsulin: 2-Hour serum insulin (mu U/ml)
- BMI: Body mass index (kg/m²)
- DiabetesPedigree: A function that scores the probability of diabetes based on family history
- Age: Age in years
- Diabetic (Target Variable): 1 = Diabetes diagnosed, 0 = No diabetes diagnosed

## Project Structure

```
ML-Project/
├── ProjectMain/
│   ├── BackEnd/
│   │   ├── app.py              # Flask web application
│   │   ├── model.py            # Machine learning model
│   │   ├── requirements.txt    # Python dependencies
│   │   └── venv/               # Python virtual environment
│   └── ml-webpage/
│       ├── components/         # React components
│       ├── pages/             # Next.js pages
│       ├── public/            # Static assets
│       ├── styles/            # CSS styles
│       └── package.json       # Node.js dependencies
├── data/
│   └── TAIPEI_diabetes.csv    # Training dataset
├── notebooks/
│   ├── project_analysis.ipynb # Data analysis notebook
│   └── model_training.ipynb   # Model training notebook
└── README.md                  # This file
```

## Prerequisites

- Python 3.8 or higher
- Node.js 14.0 or higher
- npm (Node Package Manager)

## Setup and Installation

### Quick Start

The easiest way to run the application is using the provided batch script:

```bash
cd ProjectMain
./run_app.bat
```

This script will:

1. Set up the Python virtual environment
2. Install backend dependencies
3. Start the FastAPI backend server
4. Install frontend dependencies
5. Start the Next.js development server

### Manual Setup

#### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd ProjectMain/BackEnd
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # On Windows
   source venv/bin/activate # On Unix or MacOS
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```bash
   uvicorn app:app --reload
   ```

The backend server will run on `http://localhost:8000`

#### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ProjectMain/ml-webpage
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## Development

- Backend API endpoints are defined in `ProjectMain/BackEnd/app.py`
- Frontend pages are in `ProjectMain/ml-webpage/src/pages`
- Frontend components are in `ProjectMain/ml-webpage/src/components`

## Usage

1. Start both the backend and frontend servers
2. Open your browser and navigate to `http://localhost:3000`
3. Fill in the form with the required medical information
4. Submit the form to get the prediction

## API Endpoints

- `POST /predict`: Accepts medical data and returns diabetes prediction
- `GET /`: Health check endpoint

## Technologies Used

- Backend:

  - Python
  - Flask
  - scikit-learn
  - pandas
  - numpy

- Frontend:
  - Next.js
  - React
  - Tailwind CSS
  - Axios

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
