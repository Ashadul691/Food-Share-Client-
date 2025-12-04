import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { Menu, X, Wallet, LogOut, User, Home, FileText, UserCircle, Users } from 'lucide-react';
import Swal from 'sweetalert2';
import userimg from '../assets/user.png';
import { MdRestaurantMenu } from "react-icons/md"
import { GiForkKnifeSpoon } from "react-icons/gi";

import { FaPlusCircle } from "react-icons/fa"; 
import { GiMeal } from "react-icons/gi";       
import { MdOutlineFoodBank } from "react-icons/md"; 
const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out from this device.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout!"
  }).then((result) => {
    if (result.isConfirmed) {
      logOut()
        .then(() => {
          setIsDropdownOpen(false);
          setIsMobileMenuOpen(false);
          Swal.fire({
            title: "Logged Out!",
            text: "You have been logged out successfully.",
            icon: "success"
          });
          navigate('/');
        })
        .catch((error) => {
          console.error('logout error:', error);
          Swal.fire({
            title: 'Logout failed',
            text: error?.message || 'Could not log out. Please try again.',
            icon: 'error'
          });
        });
    }
  });
};

 
 
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    {to:'/AvailableFoods', label: 'Available Foods', icon: MdRestaurantMenu  },
    { to: '/AddFood', label: 'Add Food', icon: FaPlusCircle },
  ];

  if (user) {
    navItems.push(
      { to: `/ManageFoods/${user.email}`, label: 'Manage Foods', icon: GiMeal },
      { to: `/MyFoodRequest/${user.email}`, label: 'Request Foods', icon: MdOutlineFoodBank }
    );
  }

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
         
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              
              <GiForkKnifeSpoon className="text-white text-2xl"/>
            </div>
            <h1 className="font-extrabold text-3xl sm:text-4xl bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Food Share
            </h1>
          </Link>

          
          <ul className="hidden lg:flex items-center space-x-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-500 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

         
          <div className="hidden lg:flex items-center gap-4">
            {!user ? (
              <>
                <button
                  onClick={() => navigate("/auth/signin")}
                  className="px-6 py-2 font-semibold text-gray-300 hover:text-white transition-colors"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate("/auth/signup")}
                  className="px-6 py-2 font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
                >
                  Sign up
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 focus:outline-none group"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-white">{user?.displayName}</p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                  <img
                    src={user?.photoURL || userimg}
                    alt="User"
                    className="w-12 h-12 rounded-full border-2 border-emerald-500 group-hover:border-emerald-400 transition-all cursor-pointer"
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="font-bold text-gray-800">{user.displayName}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="font-semibold text-gray-700">View Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-600">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-4 py-4 space-y-2">
            {/* User Info - Mobile Only */}
            {user && (
              <div className="flex items-center gap-3 pb-4 border-b border-gray-700">
                <img
                  src={user?.photoURL || userimg}
                  alt="User"
                  className="w-12 h-12 rounded-full border-2 border-emerald-500"
                />
                <div>
                  <p className="font-semibold text-white">{user.displayName}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </NavLink>
            ))}

            {/* Auth Buttons - Mobile */}
            {!user ? (
              <div className="pt-4 space-y-2 border-t border-gray-700">
                <button
                  onClick={() => {
                    navigate("/auth/signin");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 font-semibold text-gray-300 hover:bg-gray-700 rounded-lg transition-all"
                >
                  Sign in
                </button>
                <button
                  onClick={() => {
                    navigate("/auth/signup");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Sign up
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 mt-4 border-t border-gray-700 text-red-400 hover:bg-red-900/20 rounded-lg transition-all font-semibold"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;