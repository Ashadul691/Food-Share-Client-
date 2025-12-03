const HowItWorks= () => {
  const steps = [
    {
      id: 1,
      title: 'Register or Log In',
      description:
        'Sign up for an account or log in to access the food donation platform.',
      icon: 'httpss://cdn-icons-png.flaticon.com/512/481/481874.png',
    },
    {
      id: 2,
      title: 'Add or Browse Foods',
      description:
        'If you’re donating, add your food details. If you’re looking for food, browse available items.',
      icon: 'httpss://cdn-icons-png.flaticon.com/512/2702/2702061.png',
    },
    {
      id: 3,
      title: 'Make a Request',
      description:
        'Request food items from available listings or coordinate with donors for pickup.',
      icon: 'httpss://cdn-icons-png.flaticon.com/512/2099/2099064.png',
    },
    {
      id: 4,
      title: 'Pickup or Deliver',
      description:
        'Coordinate with donors or recipients to pick up or deliver food items.',
      icon: 'httpss://cdn-icons-png.flaticon.com/512/207/207646.png',
    },
  ];

  return (
    <div className="w-10/12 mx-auto my-40">
      <h2 className="text-5xl font-bold text-center mb-10">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center bg-white p-6 shadow-lg rounded-lg"
          >
            <img src={step.icon} alt={step.title} className="w-20 h-20 mb-4" />
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;