import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Gigs from "./pages/Gigs"
import Gig from "./pages/Gig"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Add from "./pages/Add"
import Orders from "./pages/Orders"
import Messages from "./pages/Messages"
import Message from "./pages/Message"
import MyGigs from "./pages/MyGigs"
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Pay from "./pages/Pay";
import Success from "./pages/Success";


function App() {

  const queryClient = new QueryClient();

 const Layout = () => {
   return (
     <div>
       <QueryClientProvider client={queryClient}>
       <Navbar />
       <Outlet />
       <Footer />
       </QueryClientProvider>
     </div>
   )
 }
 
 const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/gigs",
        element: <Gigs />,
      },
      {
        path: "/myGigs",
        element: <MyGigs />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/message/:id",
        element: <Message />,
      },
      {
        path: "/add",
        element: <Add />,
      },
      {
        path: "/gig/:id",
        element: <Gig />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/pay/:id",
        element: <Pay />,
      },
      {
        path: "/success",
        element: <Success />,
      },
    ],
  },
]);

return <RouterProvider router={router} />;
}

export default App;
