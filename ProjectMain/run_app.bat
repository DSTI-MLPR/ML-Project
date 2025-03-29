@echo off
echo Starting application setup and deployment...

REM Create and activate Python virtual environment for backend
echo Setting up Python virtual environment...
cd BackEnd
if not exist "venv" (
    python -m venv venv
)
call venv\Scripts\activate

REM Install backend dependencies
echo Installing backend dependencies...
if not exist "requirements.txt" (
    pip install fastapi uvicorn joblib scikit-learn==1.6.1 numpy pandas
    pip freeze > requirements.txt
) else (
    pip install -r requirements.txt
    pip install joblib --no-deps
)

REM Start backend server in a new window
echo Starting backend server...
start cmd /k "call venv\Scripts\activate && uvicorn app:app --reload"

REM Return to root directory
cd ..

REM Setup and start frontend
echo Setting up frontend...
cd ml-webpage

REM Install frontend dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing frontend dependencies...
    npm install --legacy-peer-deps
)

REM Start the frontend development server
echo Starting frontend development server...
npm run dev

echo Setup complete! Both servers should now be running.
pause 
