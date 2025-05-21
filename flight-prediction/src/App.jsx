import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './animate.css';

function FlightPricePredictor() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    airline: '',
    source_city: '',
    departure_time: '',
    stops: '',
    arrival_time: '',
    destination_city: '',
    class: '',
    departure_date: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [flightPosition, setFlightPosition] = useState(-100);

  useEffect(() => {
    if (!showForm) {
      const flightInterval = setInterval(() => {
        setFlightPosition((prev) => (prev >= 100 ? -100 : prev + 1));
      }, 20);
      return () => clearInterval(flightInterval);
    }
  }, [showForm]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setPrediction('Error: Could not get prediction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-10 px-4">
      {!showForm ? (
        // Landing Page with Flight Animation
        <div className="flex flex-col items-center justify-center h-screen -mt-20">
          <h1 className="text-5xl font-bold text-blue-800 mb-6 text-center">
            Predict Your Flight Ticket Price here
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-center max-w-lg">
            Know your airfare before you book!
          </p>

          {/* "Get Started" Button */}
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg shadow-lg transition transform hover:scale-105"
          >
            Get Started →
          </button>

          {/* Flight Animation at the bottom */}
          <div className="flight-animation-container w-full">
            <img 
              src="/airplane.png" 
              alt="Flying plane" 
              className="plane" 
            />
          </div>
        </div>
      ) : (
        // Prediction Form
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-800 mb-2">Flight Ticket Price Predictor</h1>
            <p className="text-gray-600">Enter your flight details to get a price estimate</p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Airline Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Airline</label>
                <select
                  name="airline"
                  value={formData.airline}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                >
                  <option value="">Select Airline</option>
                  <option value="SpiceJet">SpiceJet</option>
                  <option value="AirAsia">AirAsia</option>
                  <option value="Vistara">Vistara</option>
                  <option value="GO_FIRST">GO_FIRST</option>
                  <option value="Indigo">Indigo</option>
                  <option value="Air_India">Air India</option>
                </select>
              </div>

              {/* Source City Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Source City</label>
                <select
                  name="source_city"
                  value={formData.source_city}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                >
                  <option value="">Select Source City</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>

              {/* Departure Time Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Departure Time</label>
                <select
                  name="departure_time"
                  value={formData.departure_time}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                >
                  <option value="">Select Departure Time</option>
                  <option value="Evening">Evening</option>
                  <option value="Early_Morning">Early Morning</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Night">Night</option>
                  <option value="Late_Night">Late Night</option>
                </select>
              </div>

              {/* Stops Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Stops</label>
                <select
                  name="stops"
                  value={formData.stops}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                >
                  <option value="">Select Stops</option>
                  <option value="zero">Zero</option>
                  <option value="one">One</option>
                  <option value="two_or_more">Two or More</option>
                </select>
              </div>

              {/* Arrival Time Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Arrival Time</label>
                <select
                  name="arrival_time"
                  value={formData.arrival_time}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                >
                  <option value="">Select Arrival Time</option>
                  <option value="Night">Night</option>
                  <option value="Morning">Morning</option>
                  <option value="Early_Morning">Early Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Late_Night">Late Night</option>
                </select>
              </div>

              {/* Destination City Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Destination City</label>
                <select
                  name="destination_city"
                  value={formData.destination_city}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                >
                  <option value="">Select Destination City</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>

              {/* Class Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Class</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                >
                  <option value="">Select Class</option>
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              {/* Departure Date Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Departure Date</label>
                <input
                  type="date"
                  name="departure_date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.departure_date}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Predicting...
                </span>
              ) : 'Predict Price'}
            </button>
          </form>

          {prediction !== null && (
            <div className={`mt-6 p-6 rounded-2xl text-center ${typeof prediction === 'number' ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <h2 className="text-2xl font-bold mb-2">
                {typeof prediction === 'number' ? 'Estimated Flight Price' : 'Error'}
              </h2>
              <p className="text-3xl font-extrabold">
                {typeof prediction === 'number' ? `₹${Math.round(prediction).toLocaleString()}` : prediction}
              </p>
              {typeof prediction === 'number' && (
                <p className="mt-2 text-sm text-green-600">Prices are estimates and may vary</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FlightPricePredictor;
