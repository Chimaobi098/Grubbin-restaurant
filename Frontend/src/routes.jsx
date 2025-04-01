import FeatureSection from "../components/featureSection";
import OrderHistory from "./pages/orderHistory";
import ProtectedRoute from "../components/protectedRoute";
import Layout from "./layout";
import AboutUs from "./pages/aboutUs";
import CartPopup from "./pages/Cart";
import Checkout from "./pages/checkout";
import ContactUs from "./pages/contactUs";
import Home from "./pages/home";
import Login from "./pages/login";
import Menu from "./pages/menu";
import OrderConfirmation from "./pages/order-confirmation";
import ProductDetail from "./pages/productDetail";
import Profile from "./pages/profile";
import Signup from "./pages/signup";
import ErrorPage from "../components/errorPage";
import LoadingScreen from "../components/loadingScreen";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/menu/:menuid",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <CartPopup />,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order-confirmation",
        element: (
          <ProtectedRoute>
            <OrderConfirmation />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },

      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      {
        path: "/profile/order-history",
        element: (
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default routes;
