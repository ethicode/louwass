import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import PropertyDetail from "./pages/PropertyDetail";
import CategoryDetail from "./pages/CategoryDetail";
import MyAccount from "./pages/MyAccount";
import CreateListing from "./components/CreateListing";
import LoginForm from "./components/LoginForm";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { Search } from "@mui/icons-material";
// import Login from "./pages/Login";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  // { path: "/dashboard", element: <Home /> },
  { path: "/mes-publications", element: <Login /> },
  { path: "/listings/:id", element: <PropertyDetail /> },
  { path: "/listings/search/?search=:text", element: <Search /> },
  { path: "/categories/:id", element: <CategoryDetail /> },
  { path: "/categories/:id", element: <CategoryDetail /> },
  { path: "/categories/:id/listings", element: <CategoryDetail /> },
  // { path: "/listings/publier", element: <CreateListing /> },
  { path: "/login", element: <Login /> },
  {
    path: '/myaccount',
    element: (
      <PrivateRoute>
        <MyAccount />
      </PrivateRoute>
    )
  },
  {
    path: '/listings/publier',
    element: (
      <PrivateRoute>
        <CreateListing />
      </PrivateRoute>
    )
  },
  //   { path: "/login", element: <Login /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
