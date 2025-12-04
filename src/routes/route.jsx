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
import MyProfile from "../pages/Myprofile";
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
        loader: () => fetch('https://food-share-server-two.vercel.app/foods').then(res => res.json()),
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
        loader: () => fetch('https://food-share-server-two.vercel.app/foods').then(res => res.json()),
      },

      
      {
        path: '/FoodDetails/:id',
        element: <PrivateRoute><FoodDetails /></PrivateRoute>,
        errorElement: <ErrorPage />,
        loader: ({ params }) =>
          fetch(`https://food-share-server-two.vercel.app/foods/${params.id}`).then(res => res.json())
      },
      {path: '/ManageFoods/:email',
      element: <PrivateRoute><ManageFoods /></PrivateRoute>,
      errorElement: <ErrorPage />},

      {
        path: '/MyFoodRequest/:email',
        element: (
          <PrivateRoute>
            <MyFoodRequest></MyFoodRequest>
          </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
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
    path:"/profile",
    element:<MyProfile/>
  },
   { 
    path: "/*", 
    element: <ErrorPage/> 
  },
]);