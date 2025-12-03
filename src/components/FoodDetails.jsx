import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../Css/FoodDetails.css';
import { AuthContext } from '../Provider/AuthProvider';

const FoodDetails = () => {
  const food = useLoaderData();
  const { currentUser } = useContext(AuthContext);
  const loggedInUserEmail = currentUser.email;

  const handleRequest = () => {
    const requestDate = new Date().toLocaleString();

    Swal.fire({
      title: 'Request Food',
      html: `
        <div class="request-modal-container">
          <div class="request-field">
            <label for="foodName">Food Name:</label>
            <input id="foodName" class="input-field" value="${
              food.foodName
            }" readonly />
          </div>

          <div class="request-field">
            <label for="foodImage">Food Image:</label>
            <input id="foodImage" class="input-field" value="${
              food.foodImage
            }" readonly />
          </div>

          <div class="request-field">
            <label for="foodId">Food ID:</label>
            <input id="foodId" class="input-field" value="${
              food._id
            }" readonly />
          </div>

          <div class="request-field">
            <label for="donatorEmail">Donator Email:</label>
            <input id="donatorEmail" class="input-field" value="${
              food.donator.email
            }" readonly />
          </div>

          <div class="request-field">
            <label for="donatorName">Donator Name:</label>
            <input id="donatorName" class="input-field" value="${
              food.donator.name
            }" readonly />
          </div>

          <div class="request-field">
            <label for="userEmail">User Email:</label>
            <input id="userEmail" class="input-field" value="${loggedInUserEmail}" readonly />
          </div>

          <div class="request-field">
            <label for="requestDate">Request Date:</label>
            <input id="requestDate" class="input-field" value="${requestDate}" readonly />
          </div>

          <div class="request-field">
            <label for="pickupLocation">Pickup Location:</label>
            <input id="pickupLocation" class="input-field" value="${
              food.pickupLocation
            }" readonly />
          </div>

          <div class="request-field">
            <label for="expireDate">Expire Date:</label>
            <input id="expireDate" class="input-field" value="${new Date(
              food.expiredDateTime
            ).toLocaleString()}" readonly />
          </div>

          <div class="request-field">
            <label for="additionalNotes">Additional Notes:</label>
            <textarea id="additionalNotes" class="textarea-field" placeholder="Enter additional notes..."></textarea>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Send Request',
      confirmButtonColor: '#89b758',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33',

      customClass: {
        popup: 'custom-modal-width',
      },
      preConfirm: async () => {
        const additionalNotes =
          Swal.getPopup().querySelector('#additionalNotes').value;

        if (!additionalNotes) {
          Swal.showValidationMessage(
            'Please add additional notes before submitting'
          );
          return;
        }

        // Update the food object locally
        food.additionalNotes = additionalNotes;
        food.requestedEmail = loggedInUserEmail;
        food.foodStatus = 'Requested';

        try {
          // Make the PUT request to update the food item on the server
          const response = await fetch(
            `http://localhost:5000/foods/${food._id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(food), // Send the updated food object
            }
          );

          if (!response.ok) {
            throw new Error('Failed to update food item');
          }

          Swal.fire('Success', 'Food item requested successfully!', 'success');
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
    <div className="w-10/12 mx-auto my-10">
      <h1 className="text-4xl font-bold text-center mb-8">{food.foodName}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex justify-center items-center">
          <img
            src={food.foodImage}
            alt={food.foodName}
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>

        {/* Text Details Section */}
        <div className="flex flex-col justify-center">
          <p className="text-lg">
            <span className="font-bold">Quantity:</span> {food.foodQuantity}
          </p>
          <p className="text-lg">
            <span className="font-bold">Pickup Location:</span>{' '}
            {food.pickupLocation}
          </p>
          <p className="text-lg">
            <span className="font-bold">Expiry Date:</span>{' '}
            {new Date(food.expiredDateTime).toLocaleString()}
          </p>
          <p className="text-lg">
            <span className="font-bold">Notes:</span> {food.additionalNotes}
          </p>
        </div>
      </div>

      {/* Donator Details Section */}
      <div className="mt-10 p-6 rounded-lg shadow-lg bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Donator Details</h2>
        <div className="flex items-center gap-6">
          <img
            src={food.donator.image || 'https://via.placeholder.com/150'}
            alt={food.donator.name}
            className="w-16 h-16 rounded-full shadow-md"
          />
          <div>
            <p className="text-lg">
              <span className="font-bold">Name:</span> {food.donator.name}
            </p>
            <p className="text-lg">
              <span className="font-bold">Email:</span> {food.donator.email}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-10 text-center">
        <button
          onClick={handleRequest}
          className="btn bg-[#89b758] text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-200"
        >
          Request
        </button>
      </div>
    </div>
  );
};

export default FoodDetails;