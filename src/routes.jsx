import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Favorites from "./pages/Favorites";
import ErrorPage from "./pages/Error";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "coin/:name",
        element: <Coin />,
        loader: async ({ params }) => {
          const response = await fetch(
            `https://api.coincap.io/v2/assets/${params.name}`
          );
          if (!response.ok) {
            throw new Error("Coin not found");
          }
          const responseJSON = await response.json();
          return { data: responseJSON.data };
        },
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
    ],
  },
]);

export default router;
