import ROLES from "../../constants/Roles";
import CreateReservationsScreen from "../../screens/Reservations/CreateReservationsScreen";
import EditReservationsScreen from "../../screens/Reservations/EditReservationsScreen";
import ReservationsListScreen from "../../screens/Reservations/ReservationsListScreen";

export const RESERVATIONS_ROUTES = [
  {
    path: "/reservations-list",
    component: ReservationsListScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
  {
    path: "/add-reservations",
    component: CreateReservationsScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
  {
    path: "/edit-reservations/:id",
    component: EditReservationsScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
];
