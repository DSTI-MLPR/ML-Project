"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const inputs = [
  { 
    id: "pregnancies", 
    name: "Number of times pregnant", 
    type: "number",
    min: 0,
    max: 15,
    step: 1
  },
  { 
    id: "plasmaGlucose", 
    name: "Plasma glucose concentration (2-hour oral glucose tolerance test)", 
    type: "number",
    min: 40,
    max: 600,
    step: 1
  },
  { 
    id: "diastolicBP", 
    name: "Diastolic blood pressure (mm Hg)", 
    type: "number",
    min: 20,
    max: 120,
    step: 1
  },
  { 
    id: "tricepsThickness", 
    name: "Triceps skin fold thickness (mm)", 
    type: "number",
    min: 5,
    max: 100,
    step: 1
  },
  { 
    id: "serumInsulin", 
    name: "2-Hour serum insulin (mu U/ml)", 
    type: "number",
    min: 10,
    max: 700,
    step: 1
  },
  { 
    id: "bmi", 
    name: "Body mass index (kg/m²)", 
    type: "number",
    min: 15,
    max: 80,
    step: 0.1
  },
  { 
    id: "diabetesPedigree", 
    name: "Diabetes pedigree function", 
    type: "number",
    min: 0,
    max: 2,
    step: 0.001
  },
  { 
    id: "age", 
    name: "Age (years)", 
    type: "number",
    min: 20,
    max: 80,
    step: 1
  },
]

export default function Home() {
  const [inputValues, setInputValues] = useState({
    pregnancies: '',
    plasmaGlucose: '',
    diastolicBP: '',
    tricepsThickness: '',
    serumInsulin: '',
    bmi: '',
    diabetesPedigree: '',
    age: ''
  })
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (id, value) => {
    // Allow empty value for clearing the input
    if (value === '') {
      setInputValues(prev => ({
        ...prev,
        [id]: value
      }));
      return;
    }

    // Allow typing any number, validation will happen on form submission
    setInputValues(prev => ({
      ...prev,
      [id]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setPrediction(null)
    
    // Validate inputs
    const hasEmptyFields = Object.values(inputValues).some(value => value === '');
    if (hasEmptyFields) {
      setPrediction({
        prediction: 'Error: Please fill in all fields',
        probability: null
      });
      setLoading(false);
      return;
    }
      
    // Map the values to match the backend's PatientData model exactly
    const backendData = {
      pregnancies: parseInt(inputValues.pregnancies) || 0,
      plasma_glucose: parseFloat(inputValues.plasmaGlucose) || 0,
      blood_pressure: parseFloat(inputValues.diastolicBP) || 0,
      triceps: parseFloat(inputValues.tricepsThickness) || 0,
      insulin: parseFloat(inputValues.serumInsulin) || 0,
      bmi: parseFloat(inputValues.bmi) || 0,
      pedigree: parseFloat(inputValues.diabetesPedigree) || 0,
      age: parseInt(inputValues.age) || 0
    }

    try {
      console.log('Sending data to backend:', backendData)

      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setPrediction({
        prediction: data.prediction,
        probability: data.probability
      })
    } catch (error) {
      console.error('Error:', error)
      setPrediction({
        prediction: `Error: ${error.message || 'Failed to get prediction'}`,
        probability: null
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-8">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">
          Predicting Diabetes Outcome for Women
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {inputs.map((input) => (
                <div key={input.id} className="space-y-2">
                  <Label htmlFor={input.id}>{input.name}</Label>
                  <Input
                    id={input.id}
                    type={input.type}
                    value={inputValues[input.id] || ""}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                    required
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-500">
                    Range: {input.min} to {input.max} {input.step < 1 ? `(step: ${input.step})` : ''}
                  </p>
                </div>
              ))}
            </div>
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-6"
              disabled={loading}
            >
              {loading ? 'Predicting...' : 'Get Prediction'}
            </Button>
          </form>
        </div>
          {prediction && (
    <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-2 text-indigo-800">Prediction Result:</h2>
      <p className={`text-lg ${prediction.prediction.includes('Error') ? 'text-red-600' : 'text-gray-700'}`}>
        {prediction.prediction}
      </p>
      {prediction.probability !== null && (
        <p className="text-gray-700">
          Probability of being diabetic: {(prediction.probability * 100).toFixed(2)}%
        </p>
      )}
    </div>
  )}
      </div>
    </div>
  )
}

