import { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../Css/FoodDetails.css';
import { AuthContext } from '../Provider/AuthProvider';

const FoodDetails = () => {
  const food = useLoaderData();
  const { user, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  
  const loggedInUserEmail = user?.email || currentUser?.email;
  
 

  const handleRequest = async () => {
    console.log('=== Request Button Clicked ===');
    console.log('Current User:', currentUser);
    console.log('User:', user);
    console.log('Logged In Email:', loggedInUserEmail);
    
    // Check if user is logged in
    if (!loggedInUserEmail) {
      console.error('No email found - user not logged in');
      Swal.fire({
        icon: 'error',
        title: 'Not Logged In',
        text: 'Please login to request food',
        confirmButtonColor: '#89b758'
      });
      return;
    }

    console.log('User is logged in as:', loggedInUserEmail);

    // Check if the user is trying to request their own food
    if (food.donator?.email === loggedInUserEmail) {
      console.log('User trying to request own food');
      Swal.fire({
        icon: 'error',
        title: 'Cannot Request',
        text: 'You cannot request your own food donation',
        confirmButtonColor: '#89b758'
      });
      return;
    }

    // Check if food is already requested
    if (food.foodStatus === 'Requested' || food.foodStatus === 'requested') {
      console.log('Food already requested');
      Swal.fire({
        icon: 'warning',
        title: 'Already Requested',
        text: 'This food has already been requested by someone',
        confirmButtonColor: '#89b758'
      });
      return;
    }

    const requestDate = new Date().toLocaleString();

    const result = await Swal.fire({
      title: 'Request Food',
      html: `
        <div class="request-modal-container">
          <div class="request-field">
            <label for="foodName">Food Name:</label>
            <input id="foodName" class="input-field" value="${food.foodName}" readonly />
          </div>

          <div class="request-field">
            <label for="foodImage">Food Image:</label>
            <input id="foodImage" class="input-field" value="${food.foodImage}" readonly />
          </div>

          <div class="request-field">
            <label for="foodId">Food ID:</label>
            <input id="foodId" class="input-field" value="${food._id}" readonly />
          </div>

          <div class="request-field">
            <label for="donatorEmail">Donator Email:</label>
            <input id="donatorEmail" class="input-field" value="${food.donator?.email || 'N/A'}" readonly />
          </div>

          <div class="request-field">
            <label for="donatorName">Donator Name:</label>
            <input id="donatorName" class="input-field" value="${food.donator?.name || 'N/A'}" readonly />
          </div>

          <div class="request-field">
            <label for="userEmail">Your Email:</label>
            <input id="userEmail" class="input-field" value="${loggedInUserEmail}" readonly />
          </div>

          <div class="request-field">
            <label for="requestDate">Request Date:</label>
            <input id="requestDate" class="input-field" value="${requestDate}" readonly />
          </div>

          <div class="request-field">
            <label for="pickupLocation">Pickup Location:</label>
            <input id="pickupLocation" class="input-field" value="${food.pickupLocation}" readonly />
          </div>

          <div class="request-field">
            <label for="expireDate">Expire Date:</label>
            <input id="expireDate" class="input-field" value="${new Date(
              food.expiredDateTime
            ).toLocaleString()}" readonly />
          </div>

          <div class="request-field">
            <label for="additionalNotes">Additional Notes: <span style="color: red;">*</span></label>
            <textarea id="additionalNotes" class="textarea-field" placeholder="Why do you need this food? Please provide details..."></textarea>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Send Request',
      confirmButtonColor: '#89b758',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33',
      showLoaderOnConfirm: true,
      customClass: {
        popup: 'custom-modal-width',
      },
      preConfirm: async () => {
        const additionalNotes = Swal.getPopup().querySelector('#additionalNotes').value.trim();

        if (!additionalNotes) {
          Swal.showValidationMessage('Please provide additional notes explaining why you need this food');
          return false;
        }

        if (additionalNotes.length < 10) {
          Swal.showValidationMessage('Please provide more detailed notes (at least 10 characters)');
          return false;
        }

        try {
          console.log('=== Sending Request ===');
          console.log('Food ID:', food._id);
          console.log('Requester Email:', loggedInUserEmail);
          
          
          const updatedFood = {
            foodName: food.foodName,
            foodImage: food.foodImage,
            foodQuantity: food.foodQuantity,
            pickupLocation: food.pickupLocation,
            expiredDateTime: food.expiredDateTime,
            additionalNotes: food.additionalNotes,
            donator: food.donator,
            foodStatus: 'Requested',
            requestedEmail: loggedInUserEmail,
            requestAdditionalNotes: additionalNotes,
            requestDate: requestDate,
          };

          console.log('Sending update to server:', updatedFood);

          const response = await fetch(`https://food-share-server-two.vercel.app/foods/${food._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFood),
          });

          console.log('Server response status:', response.status);

          if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error response:', errorData);
            throw new Error(errorData.error || 'Failed to send request');
          }

          const responseData = await response.json();
          console.log('Server success response:', responseData);

          return true;
        } catch (error) {
          console.error('Error in preConfirm:', error);
          Swal.showValidationMessage(`Request failed: ${error.message}`);
          return false;
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });

    
    if (result.isConfirmed) {
      await Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your food request has been sent successfully!',
        confirmButtonColor: '#89b758'
      });
      
      
      navigate('/AvailableFoods');
    }
  };

  return (
    <div className="w-10/12 mx-auto my-10">
      <h1 className="text-4xl font-bold text-center mb-8">{food.foodName}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <img
            src={food.foodImage}
            alt={food.foodName}
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>

        {/* Text Details Section */}
        <div className="flex flex-col justify-center space-y-3">
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
            <span className="font-bold">Status:</span>{' '}
            <span
              className={`py-1 px-3 rounded-full text-sm ${
                food.foodStatus === 'Available' || food.foodStatus === 'available'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {food.foodStatus}
            </span>
          </p>
          <p className="text-lg">
            <span className="font-bold">Notes:</span> {food.additionalNotes || 'No additional notes'}
          </p>
        </div>
      </div>

      {/* Donator Details Section */}
      <div className="mt-10 p-6 rounded-lg shadow-lg bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Donator Details</h2>
        <div className="flex items-center gap-6">
          <img
            src={food.donator?.image || 'https://via.placeholder.com/150'}
            alt={food.donator?.name || 'Donator'}
            className="w-16 h-16 rounded-full shadow-md"
          />
          <div>
            <p className="text-lg">
              <span className="font-bold">Name:</span> {food.donator?.name || 'N/A'}
            </p>
            <p className="text-lg">
              <span className="font-bold">Email:</span> {food.donator?.email || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      

      {/* Request Button Section */}
      <div className="mt-10 text-center">
        <button
          onClick={handleRequest}
          disabled={
            !loggedInUserEmail ||
            food.foodStatus === 'Requested' ||
            food.foodStatus === 'requested' ||
            food.donator?.email === loggedInUserEmail
          }
          className={`btn px-8 py-3 rounded-md transition duration-200 text-lg ${
            !loggedInUserEmail ||
            food.foodStatus === 'Requested' ||
            food.foodStatus === 'requested' ||
            food.donator?.email === loggedInUserEmail
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-[#89b758] text-white hover:bg-green-600'
          }`}
        >
          {!loggedInUserEmail
            ? 'Please Login'
            : food.foodStatus === 'Requested' || food.foodStatus === 'requested'
            ? 'Already Requested'
            : food.donator?.email === loggedInUserEmail
            ? 'Your Own Food'
            : 'Request This Food'}
        </button>
        
        {food.donator?.email === loggedInUserEmail && loggedInUserEmail && (
          <p className="text-sm text-gray-600 mt-2">You cannot request your own donation</p>
        )}
      </div>
    </div>
  );
};

export default FoodDetails;