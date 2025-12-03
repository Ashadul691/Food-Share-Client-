import { createBrowserRouter } from "react-router-dom";
import Authentication from "../Authentication/Authentication";
import Signin from "../Authentication/Signin";
import SignUp from "../Authentication/SignUp";
import AddFood from '../components/AddFood';
import AvailableFoods from '../components/AvailableFoods';
import FoodDetails from '../components/FoodDetails';
import ManageFoods from '../components/ManageFoods';
import MyFoodRequest from '../components/MyFoodRequest';
import RootLayout from "../Layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import PrivateRoute from "../Provider/PrivateRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true, 
        element: <Home />,
        errorElement: <ErrorPage />,
        loader: () => fetch('http://localhost:5000/foods'),
      },

 {
        path: '/AddFood',
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },

      {
        path: '/AvailableFoods',
        element: <AvailableFoods></AvailableFoods>,
        errorElement: <ErrorPage />,
        loader: () => fetch('http://localhost:5000/foods'),
      },

      {
        path: '/ManageFoods/:email',
        element: (
          <PrivateRoute>
            <ManageFoods></ManageFoods>
          </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        loader: ({ params }) =>
          fetch(
            `http://localhost:5000/foods/email/${params.email}`
          ),
      },
      {
        path: '/MyFoodRequest/:email',
        element: (
          <PrivateRoute>
            <MyFoodRequest></MyFoodRequest>
          </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        loader: ({ params }) =>
          fetch(
            `http://localhost:5000/foods/requested/${params.email}`
          ),
      },
      {
        path: '/FoodDetails/:id',
        element: (
          <PrivateRoute>
            <FoodDetails></FoodDetails>
          </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/foods/${params.id}`),
      },


 
    ],
   },
  {
    path: "/auth",
    element: <Authentication />,
    children: [
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
  
   { 
    path: "/*", 
    element: <ErrorPage/> 
  },
]);