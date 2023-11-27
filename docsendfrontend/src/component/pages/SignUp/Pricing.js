
const PricingCard = ({ plan }) => {
    return (
      <div className="relative w-full min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
        <div className="p-6">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800">{plan.name}</h3>
          <p className="text-5xl font-bold text-gray-900 my-4">${plan.price}<span className="text-base text-gray-500">/mo</span></p>
          <ul className="text-sm text-gray-600">
            {plan.features.map((feature, index) => (
              <li key={index} className="mb-2">{feature}</li>
            ))}
          </ul>
          <button className="mt-5 bg-gray-700 text-white rounded-lg px-6 py-2 hover:bg-slate-900 transition-colors duration-300 w-full">
            Get Started
          </button>
        </div>
        <div className="border-t border-gray-200 text-center pt-6">
        <p className="text-sm text-gray-700 font-medium m-2 px-6">24/7 customer support included.</p>


        </div>
      </div>
    );
  };
  
const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '0',
      features: [
        'One user',
        'One customer',
        'Send and receive files',
        'File sending recieving',
        'Notifications',
      ],
    },
    {
      name: 'Standard',
      price: '30',
      features: [
        'Up to 25 users',
        'File sending and receiving',
        'File status tracking',
        'Notifications',
        'File storage',
      ],
    },
    {
      name: 'Premium',
      price: '50',
      features: [
        'Access to DocCenter App',
        'All Standard features',
        'Multiple users and agents',
        'User management',
        'Advance storage',
      ],
    },
  ];

 
  return (
    <div className="bg-gray-100 mt-20 max-w-4xl mb-40 mx-auto py-12 px-4">
      <div className="text-center max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Choose Your Plan</h2>
        <p className="text-gray-500 mb-8">Select the best plan that suits your needs.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            // Use the PricingCard component and pass the plan as a prop
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;