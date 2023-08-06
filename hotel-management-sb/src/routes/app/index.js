import ROLES from "../../constants/Roles";
import DashboardScreen from "../../screens/Dashboard/dashboardScreen";
import LoginScreen from "../../screens/LoginScreen";
import NotFoundScreen from "../../screens/NotFoundScreen";
import PaymentListScreen from "../../screens/Payments/PaymentListScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import Testing from "../../Testing";
import { CREDIT_CARD_ROUTES } from "./creditCard";
import { RESERVATIONS_ROUTES } from "./reservations";
import { ROOM_ROUTES } from "./room";
import { SPECIAL_OFFER_ROUTES } from "./specialOffer";
import { USER_ROUTES } from "./user";

const ROUTES = [
  {
    path: "/login",
    component: LoginScreen,
    isPublic: true,
    isProtected: false,
  },
  {
    path: "/register",
    component: RegisterScreen,
    isPublic: true,
    isProtected: false,
  },
  {
    path: "/",
    component: DashboardScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: Object.values(ROLES),
  },
  {
    path: "/payment-list",
    component: PaymentListScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: Object.values(ROLES),
  },
  {
    path: "/testing",
    component: Testing,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN],
  },
  ...USER_ROUTES,
  ...ROOM_ROUTES,
  ...SPECIAL_OFFER_ROUTES,
  ...CREDIT_CARD_ROUTES,
  ...RESERVATIONS_ROUTES,
  { path: "*", component: NotFoundScreen, isPublic: true, isProtected: false },
];

export default ROUTES;
