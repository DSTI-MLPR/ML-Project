# Full-Stack Web Application

This is a full-stack web application built with Next.js for the frontend and FastAPI for the backend.

## Project Structure

```
.
├── BackEnd/             # Python FastAPI backend
│   ├── venv/           # Python virtual environment
│   ├── app.py          # Main FastAPI application
│   └── requirements.txt # Python dependencies
│
├── ml-webpage/         # Next.js frontend
│   ├── node_modules/   # Node.js dependencies
│   ├── public/         # Static files
│   └── src/           # Source code
│
└── run_app.bat        # Script to run both frontend and backend
```

## Prerequisites

- Python 3.8 or higher
- Node.js 14.0 or higher
- npm (Node Package Manager)

## Quick Start

The easiest way to run the application is using the provided batch script:

```bash
./run_app.bat
```

This script will:

1. Set up the Python virtual environment
2. Install backend dependencies
3. Start the FastAPI backend server
4. Install frontend dependencies
5. Start the Next.js development server

## Manual Setup

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd BackEnd
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

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ml-webpage
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

- Backend API endpoints are defined in `BackEnd/app.py`
- Frontend pages are in `ml-webpage/src/pages`
- Frontend components are in `ml-webpage/src/components`

