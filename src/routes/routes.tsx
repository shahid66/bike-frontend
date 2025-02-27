import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import AboutPage from "../pages/AboutPgae";
import AllOrders from "../pages/admin/AllOrders";
import AllProducts from "../pages/admin/AllProducts";
import CreateProduct from "../pages/admin/CreateProduct";
import EditProduct from "../pages/admin/EditProduct";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckOutPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound";
import OverViewPage from "../pages/OverViewPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProductPage from "../pages/ProductPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import VerifyPage from "../pages/VerifyPage";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <PublicLayout />,
  // },
  // {
  //   path: "/admin",
  //   element: (
  //     <ProtectedRoute role="admin">
  //       <App />
  //     </ProtectedRoute>
  //   ),
  //   children: routeGenerator(adminPaths),
  // },
  // {
  //   path: "/customer",
  //   element: (
  //     <ProtectedRoute role="customer">
  //       <App />
  //     </ProtectedRoute>
  //   ),
  //   children: routeGenerator(customerPaths),
  // },

  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute rolePage={["admin", "customer"]}>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "product",
        element: <ProductPage />,
      },
      {
        path: "product-details/:productId",
        element: <ProductDetailsPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "verify",
        element: (
          <ProtectedRoute rolePage={["admin", "customer"]}>
            <VerifyPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute rolePage={["admin", "customer"]}>
            {" "}
            <OverViewPage />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "overview",
      //   element: <OverViewPage />,
      // },
      {
        path: "products",
        element: (
          <ProtectedRoute rolePage={["admin"]}>
            <AllProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-product",
        element: (
          <ProtectedRoute rolePage={["admin"]}>
            <CreateProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "product-edit/:productId",
        element: (
          <ProtectedRoute rolePage={["admin"]}>
            {" "}
            <EditProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute rolePage={["admin", "customer"]}>
            {" "}
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute rolePage={["admin", "customer"]}>
            {" "}
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
