import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const MyFoodRequest = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      console.log('Fetching requested foods for:', user.email);
      fetch(`https://food-share-server-two.vercel.app/foods/requested/${user.email}`)
        .then(res => res.json())
        .then(data => {
          console.log('Fetched requested foods:', data);
          setFoods(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) {
    return <div className="text-center mt-20">Loading your food requests...</div>;
  }

  return (
    <div className="container mx-auto my-10 p-5">
      <h1 className="text-3xl font-bold text-center mb-8">Manage My Foods</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Donar Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Pickup Location
              </th>
              <th className="border border-gray-300 px-4 py-2">Expire Date</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {foods.length > 0 ? (
              foods.map((food) => (
                <tr key={food._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={food.foodImage}
                      alt={food.foodName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {food.foodName}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {food.donator.name}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {food.pickupLocation}
                  </td>

                  {/* Food Status */}
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(food.expiredDateTime).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No foods available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFoodRequest;