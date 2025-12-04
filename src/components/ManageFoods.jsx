import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from "../Provider/AuthProvider";

const ManageFoods = () => {
 
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log('=== MANAGE FOODS DEBUG ===');
      console.log('User object:', user);
      console.log('User email:', user?.email);
      
      if (user?.email) {
        const url = `https://food-share-server-two.vercel.app/foods/email/${user.email}`;
        console.log('Fetching from:', url);
        
        try {
          const response = await fetch(url);
          console.log('Response status:', response.status);
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          const data = await response.json();
          console.log('Fetched foods:', data);
          console.log('Number of foods:', data.length);
          
          if (data.length > 0) {
            data.forEach((food, index) => {
              console.log(`Food ${index + 1}:`, food.foodName, '- Donator:', food.donator?.email);
            });
          }
          
          setFoods(data);
        } catch (error) {
          console.error('❌ Error fetching foods:', error);
          Swal.fire('Error', 'Failed to fetch foods', 'error');
        } finally {
          setLoading(false);
        }
      } else {
        console.log('❌ No user email found');
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.email]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action will permanently delete the food item.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });
      
      if (result.isConfirmed) {
        const response = await fetch(`https://food-share-server-two.vercel.app/foods/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) throw new Error('Failed to delete food item');
        
        setFoods((prevFoods) => prevFoods.filter((food) => food._id !== id));
        Swal.fire('Deleted!', 'The food item has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting food item:', error);
      Swal.fire('Error', 'There was an issue deleting the food item.', 'error');
    }
  };

  const handleUpdate = (food) => {
    Swal.fire({
      title: 'Update Food Item',
      html: `
        <div style="text-align: left; padding: 10px;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">Food Name:</label>
            <input id="foodName" class="swal2-input" style="width: 100%; margin: 0;" value="${food.foodName}" />
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">Food Image URL:</label>
            <input id="foodImage" class="swal2-input" style="width: 100%; margin: 0;" value="${food.foodImage}" />
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">Food Quantity:</label>
            <input id="foodQuantity" type="number" class="swal2-input" style="width: 100%; margin: 0;" value="${food.foodQuantity}" />
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">Pickup Location:</label>
            <input id="pickupLocation" class="swal2-input" style="width: 100%; margin: 0;" value="${food.pickupLocation}" />
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">Expiry Date:</label>
            <input id="expiredDateTime" type="date" class="swal2-input" style="width: 100%; margin: 0;" value="${food.expiredDateTime}" />
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: bold; margin-bottom: 5px;">Additional Notes:</label>
            <textarea id="additionalNotes" class="swal2-textarea" style="width: 100%; margin: 0;">${food.additionalNotes || ''}</textarea>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#89b758',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33',
      width: '600px',
      preConfirm: async () => {
        const updatedFood = { 
          ...food,
          foodName: Swal.getPopup().querySelector('#foodName').value,
          foodImage: Swal.getPopup().querySelector('#foodImage').value,
          foodQuantity: Number(Swal.getPopup().querySelector('#foodQuantity').value),
          pickupLocation: Swal.getPopup().querySelector('#pickupLocation').value,
          expiredDateTime: Swal.getPopup().querySelector('#expiredDateTime').value,
          additionalNotes: Swal.getPopup().querySelector('#additionalNotes').value,
        };

        try {
          const response = await fetch(`https://food-share-server-two.vercel.app/foods/${updatedFood._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFood),
          });
          
          if (!response.ok) throw new Error('Failed to update food item');
          
          setFoods((prevFoods) =>
            prevFoods.map((f) => (f._id === updatedFood._id ? updatedFood : f))
          );
          
          Swal.fire('Success', 'Food item updated successfully!', 'success');
        } catch (error) {
          console.error('Error updating food item:', error);
          Swal.fire('Error', 'There was an issue updating the food item.', 'error');
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-[#89b758]"></div>
          <p className="mt-4">Loading your foods...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 p-5">
      <h1 className="text-3xl font-bold text-center mb-8">Manage My Foods</h1>
      
    

      {foods.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-500 mb-4">You haven't added any foods yet</p>
          <a 
            href="/add-food" 
            className="btn bg-[#89b758] text-white px-6 py-2 hover:bg-[#7ba84f]"
          >
            Add Your First Food
          </a>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Pickup Location</th>
                <th className="border border-gray-300 px-4 py-2">Expiry Date</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={food.foodImage}
                      alt={food.foodName}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{food.foodName}</td>
                  <td className="border border-gray-300 px-4 py-2">{food.foodQuantity}</td>
                  <td className="border border-gray-300 px-4 py-2">{food.pickupLocation}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(food.expiredDateTime).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span className={`py-1 px-3 rounded-full text-sm font-medium ${
                      food.foodStatus === 'Available' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {food.foodStatus}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(food)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 text-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(food._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageFoods;