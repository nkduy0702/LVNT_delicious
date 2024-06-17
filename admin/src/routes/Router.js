import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/

const UsersManager = lazy(() => import("../views/usersManager/UserManager.js"));

const SalesManager = lazy(() =>
  import("../views/salesManager/salesManager.js")
);

const IngredientManager = lazy(() =>
  import("../views/ingredientsManager/ingredientsManager.js")
);
const RecipesManager = lazy(() =>
  import("../views/recipesManager/recipesManager.js")
);
const OrdersManager = lazy(() =>
  import("../views/orderManager/ordersManager.js")
);

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="users-manager" /> },
      { path: "/users-manager", exact: true, element: <UsersManager /> },
      { path: "/sales-manager", element: <SalesManager /> },
      { path: "/ingredients-manager", element: <IngredientManager /> },
      { path: "/recipes-manager", element: <RecipesManager /> },
      { path: "/orders-manager", element: <OrdersManager /> },
    ],
  },
];

export default ThemeRoutes;
