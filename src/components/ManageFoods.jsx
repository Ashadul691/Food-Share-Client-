import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManageFoods = () => {
  const loadedFoods = useLoaderData();
  
  // Handle undefined or null data
  if (!loadedFoods || !Array.isArray(loadedFoods)) {
    return <div className="text-center mt-20">Loading foods...</div>;
  }
  
  const [foods, setFoods] = useState(loadedFoods);

  //   delete
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action will permanently delete the food item.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        const response = await fetch(
          `http://localhost:5000/foods/${id}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete food item');
        }

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
        <div class="request-modal-container">
          <div class="request-field">
            <label for="foodName">Food Name:</label>
            <input id="foodName" class="input-field" value="${food.foodName}" />
          </div>

          <div class="request-field">
            <label for="foodImage">Food Image:</label>
            <input id="foodImage" class="input-field" value="${food.foodImage}" />
          </div>

          <div class="request-field">
            <label for="pickupLocation">Pickup Location:</label>
            <input id="pickupLocation" class="input-field" value="${food.pickupLocation}" />
          </div>

          <div class="request-field">
            <label for="additionalNotes">Additional Notes:</label>
            <input id="additionalNotes" class="input-field" value="${food.additionalNotes}" />
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#89b758',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33',

      preConfirm: async () => {
        const foodName = Swal.getPopup().querySelector('#foodName').value;
        const foodImage = Swal.getPopup().querySelector('#foodImage').value;
        const pickupLocation =
          Swal.getPopup().querySelector('#pickupLocation').value;
        const additionalNotes =
          Swal.getPopup().querySelector('#additionalNotes').value;

        // Update the food object locally
        food.foodName = foodName;
        food.foodImage = foodImage;
        food.pickupLocation = pickupLocation;
        food.additionalNotes = additionalNotes;

        try {
          const response = await fetch(
            `http://localhost:5000/foods/${food._id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(food),
            }
          );

          if (!response.ok) {
            throw new Error('Failed to update food item');
          }

          setFoods((prevFoods) =>
            prevFoods.map((f) => (f._id === food._id ? food : f))
          );

          Swal.fire('Success', 'Food item updated successfully!', 'success');
        } catch (error) {
          console.error('Error updating food item:', error);
          Swal.fire(
            'Error',
            'There was an issue updating the food item.',
            'error'
          );
        }
      },
    });
  };

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
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">
                Pickup Location
              </th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
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
                    {food.foodQuantity}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {food.pickupLocation}
                  </td>

                  {/* Food Status */}
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`py-1 px-3 rounded-full text-sm ${
                        food.foodStatus === 'Available'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {food.foodStatus}
                    </span>
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex gap-2">
                      {/* Update Button */}
                      <button
                        onClick={() => handleUpdate(food)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                      >
                        Update
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(food._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
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

export default ManageFoods;