import asif12 from "../assets/Asif12.jpg";
import rafi2 from "../assets/rafi2.jpg";
import rafi1 from "../assets/rafi1.jpg";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Asiful Islam',
      image: asif12,
      feedback:
        'This platform has made it incredibly easy for me to donate food and help those in need. Highly recommended!',
      location: 'Chittagong, Bangladesh',
    },
    {
      id: 2,
      name: 'Ashadul Islam',
      image: rafi1,
      feedback:
        'I’ve been able to receive fresh food whenever I needed it. This initiative is a blessing!',
      location: 'Halishahar, Chittagong',
    },
    {
      id: 3,
      name: 'Rafi',
      image: rafi2,
      feedback:
        'The process is seamless and efficient. Kudos to the team for creating this amazing platform.',
      location: 'Port, Chittagong',
    },
  ];

  return (
    <div className="w-10/12 mx-auto my-20 py-20">
      <h2 className="text-5xl font-bold text-center mb-10">
        What People Are Saying
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="shadow-lg rounded-lg p-6 bg-white text-center"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-bold">{testimonial.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{testimonial.location}</p>
            <p className="text-gray-700 italic">
              &quot;{testimonial.feedback}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
