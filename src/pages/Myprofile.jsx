import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from "react-router-dom";
import userimg from '../assets/user.png'
const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row ml-10">
    <img
      src={user?.photoURL ||userimg}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold">Hey Food lover !</h1>
     
       <p className="font-bold py-6 text-5xl text-gray-800">{user?.displayName}</p>
                      <p className="text-5xl py-3 text-gray-500">{user?.email}</p>
      
      <button  onClick={() => {navigate('/AvailableFoods');}} className="btn  my-5 p-10 text-2xl btn-primary"> Available Foods </button>
    </div>
  </div>
</div>
    );
};

export default MyProfile;