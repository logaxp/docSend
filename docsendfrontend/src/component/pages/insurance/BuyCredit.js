import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

const BuyCredit = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { id: 1, name: 'Basic Plan', price: '$10', credits: 100 },
    { id: 2, name: 'Standard Plan', price: '$20', credits: 220 },
    { id: 3, name: 'Premium Plan', price: '$50', credits: 600 },
    // ... other plans
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
  };

  const handleBuyNow = () => {
    console.log(`Purchased plan: ${selectedPlan}`);
    // Here you would integrate with a payment API to handle the purchase
  };

  return (
    <div className="container max-w-4xl mx-auto bg-white mt-20 rounded-xl p-20">
       <h2 className="text-3xl font-semibold mb-10 text-gray-800">Current Subscription</h2>
       <div className="flex justify-between items-center mb-8 w-96 bg-gray-300 p-4 rounded-lg shadow-md">
            <div className="flex-1 ">
               
                <p className="text-gray-600">Plan: <span className="font-bold text-gray-800">Pro Plan</span></p>
                <p className="text-gray-600">Duration: <span className="font-bold text-gray-800">10/16/23 to 11/16/23</span></p>
            </div>
            <div className="flex items-center justify-end">
                <button 
                className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => alert('Cancel Subscription')}
                >
                Cancel Subscription
                </button>
            </div>
            </div>
      <h1 className="text-2xl font-bold text-center mb-6">Subcription</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div key={plan.id} className={`p-4 rounded-lg shadow-lg text-center ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : 'bg-slate-200'}`}>
            <h2 className="text-lg font-bold mb-2">{plan.name}</h2>
            <p className="mb-4">{plan.price}</p>
            <p className="mb-6">Get {plan.credits} Credits</p>
            <button
              onClick={() => handleSelectPlan(plan.id)}
              className={`text-white font-bold py-2 px-4 rounded ${selectedPlan === plan.id ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700'}`}
              disabled={selectedPlan === plan.id}
            >
              Select
            </button>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button 
          onClick={handleBuyNow} 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          disabled={!selectedPlan}
        >
          <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default BuyCredit;
