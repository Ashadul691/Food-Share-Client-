import { FaUserCheck, FaUtensils, FaHandshake, FaTruck } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Register or Log In",
      description:
        "Sign up for an account or log in to access the food donation platform.",
      icon: <FaUserCheck className="text-5xl text-[#89b758] mb-4" />,
    },
    {
      id: 2,
      title: "Add or Browse Foods",
      description:
        "If you’re donating, add your food details. If you’re looking for food, browse available items.",
      icon: <FaUtensils className="text-5xl text-[#89b758] mb-4" />,
    },
    {
      id: 3,
      title: "Make a Request",
      description:
        "Request food items from available listings or coordinate with donors for pickup.",
      icon: <FaHandshake className="text-5xl text-[#89b758] mb-4" />,
    },
    {
      id: 4,
      title: "Pickup or Deliver",
      description:
        "Coordinate with donors or recipients to pick up or deliver food items.",
      icon: <FaTruck className="text-5xl text-[#89b758] mb-4" />,
    },
  ];

  return (
    <div className="w-10/12 mx-auto my-40">
      <h2 className="text-5xl font-bold text-center mb-10">How It Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition"
          >
            {step.icon}
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
