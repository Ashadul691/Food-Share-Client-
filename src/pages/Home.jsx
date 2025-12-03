import { Link, useLoaderData } from 'react-router-dom';

import Banner from './Banner';
import TestimonialsSection from './TestimonialsSection';
import HowitWorks from './HowitWorks';

const Home = () => {
  const loadedFoods = useLoaderData();
  
  // Add null/undefined check
  if (!loadedFoods || !Array.isArray(loadedFoods)) {
    return <div className="text-center mt-20">Loading foods...</div>;
  }
  
  let foods = loadedFoods.filter(
    (food) => food.foodStatus === 'Available' || food.foodStatus === 'available'
  );

  const topFoods = foods
    .sort((a, b) => b.foodQuantity - a.foodQuantity)
    .slice(0, 6);

  return (
    <div>
      <Banner></Banner>
      <div className="w-10/12 mx-auto mb-40 mt-40">
        <h1 className="text-center text-4xl font-bold mt-20 ">
          Featured Foods
        </h1>
        <p className="text-gray-500 text-lg text-center pb-10 pt-4">
          Top available foods on our page
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {topFoods.map((food) => (
            <div key={food._id} className="">
              <div className="card card-compact bg-base-100 h-full border ">
                <figure>
                  <img className="h-[250px]" src={food.foodImage} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{food.foodName}</h2>
                  <p>{food.additionalNotes}</p>
                  <h3 className="text-base">
                    <span className="font-bold">Avaiblity:</span>{' '}
                    {food.foodStatus}
                  </h3>

                  <h3 className="text-base">
                    <span className="font-bold">Quantity:</span>{' '}
                    {food.foodQuantity}
                  </h3>

                  <h3 className="text-base">
                    <span className="font-bold">Expired Date:</span>{' '}
                    {new Date(food.expiredDateTime).toLocaleDateString()}
                  </h3>
                  <Link
                    to={`/FoodDetails/${food._id}`}
                    className="btn bg-[#89b758] text-white border-0 text-lg px-10 hover:text-black "
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-10">
          <Link
            to="/AvailableFoods"
            className="btn bg-transparent border-[#89b758] text-[#89b758] text-xl px-10 py-2 mr-4 hover:bg-[#89b758] hover:text-white"
          >
            Show More
          </Link>
        </div>
      </div>
      <TestimonialsSection></TestimonialsSection>
      <HowitWorks></HowitWorks>
    </div>
  );
};

export default Home;