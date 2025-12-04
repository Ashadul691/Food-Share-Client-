import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const AddFood = () => {
  const navigate = useNavigate();
  
  const { user } = useContext(AuthContext);

  const handleAddFood = (e) => {
    e.preventDefault();

    const form = e.target;
    
    const foodObj = {
      foodName: form.foodName.value,
      foodImage: form.foodImage.value,
      foodQuantity: Number(form.foodQuantity.value),
      pickupLocation: form.pickupLocation.value,
      expiredDateTime: form.expiredDateTime.value,
      additionalNotes: form.additionalNotes.value,
      foodStatus: "Available",
      donator: {
        image: user?.photoURL || "https://i.pravatar.cc/150",
        name: user?.displayName || "Anonymous",
        email: user?.email, 
      },
    };

    
    fetch("https://food-share-server-two.vercel.app//foods", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(foodObj),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to add food');
        }
        return res.json();
      })
      .then((data) => {
        
        Swal.fire({
          title: "Success!",
          text: "Your food item has been added.",
          icon: "success",
        });
        form.reset();
        
        // Navigate to ManageFoods after 1.5 seconds
        setTimeout(() => {
          navigate('/ManageFoods/:email');
        }, 1500);
      })
      .catch((error) => {
        
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add food item!",
        });
      });
  };

  return (
    <div className="my-20 max-w-3xl mx-auto px-5">
      <h1 className="text-4xl font-bold text-center mb-10">
        Add New <span className="text-[#89b758]">Food Item</span>
      </h1>

      
      

      {/* Form Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <form onSubmit={handleAddFood} className="space-y-6">

          {/* Food Name */}
          <div className="form-control">
            <label className="label font-semibold">Food Name</label>
            <input
              type="text"
              name="foodName"
              required
              placeholder="Enter Food Name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label font-semibold">Food Image URL</label>
            <input
              type="url"
              name="foodImage"
              required
              placeholder="https://example.com/food.jpg"
              className="input input-bordered w-full"
            />
          </div>

          {/* Food Quantity */}
          <div className="form-control">
            <label className="label font-semibold">Food Quantity</label>
            <input
              type="number"
              name="foodQuantity"
              required
              min="1"
              placeholder="Enter number of servings"
              className="input input-bordered w-full"
            />
          </div>

          {/* Pickup Location */}
          <div className="form-control">
            <label className="label font-semibold">Pickup Location</label>
            <input
              type="text"
              name="pickupLocation"
              required
              placeholder="Enter pickup address"
              className="input input-bordered w-full"
            />
          </div>

          {/* Expiration Date */}
          <div className="form-control">
            <label className="label font-semibold">Expiry Date</label>
            <input
              type="date"
              name="expiredDateTime"
              required
              min={new Date().toISOString().split('T')[0]}
              className="input input-bordered w-full"
            />
          </div>

          {/* Additional Notes */}
          <div className="form-control">
            <label className="label font-semibold">Additional Notes</label>
            <textarea
              name="additionalNotes"
              rows="3"
              placeholder="Write any extra details here…"
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="btn bg-[#89b758] text-white px-10 py-2 text-lg hover:bg-[#7ba84f]"
            >
              Add Food
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddFood;