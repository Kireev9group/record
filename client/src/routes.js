import {
  LOGIN_ROUTE,
  RECORD_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "./utils/consts";
import MainPage from "./pages/MainPage";
import RecordPage from "./pages/RecordPage";
import Auth from "./pages/Auth";

export const routes = [
  {
    path: SHOP_ROUTE,
    Component: MainPage,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: RECORD_ROUTE + "/:id",
    Component: RecordPage,
  },
];
