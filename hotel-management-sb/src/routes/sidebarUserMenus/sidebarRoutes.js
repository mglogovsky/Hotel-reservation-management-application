import ROLES from "../../constants/Roles";

export const sidebarRoutes = [
  {
    title: "Dashboard",
    link: "/",
    roles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
  {
    title: "User List",
    link: "/user-list",
    roles: [ROLES.STAFF],
  },
  {
    title: "User",
    roles: [ROLES.ADMIN],
    child: [
      {
        title: "Add User",
        link: "/add-user",
        roles: [ROLES.ADMIN],
      },
      {
        title: "User List",
        link: "/user-list",
        roles: [ROLES.ADMIN],
      },
    ],
  },
  {
    title: "Rooms",
    roles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
    child: [
      {
        title: "Search Rooms",
        link: "/search-rooms",
        roles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
      },
      {
        title: "Room List",
        link: "/room-list",
        roles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
      },
    ],
  },
  {
    title: "Reservations",
    roles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
    child: [
      {
        title: "Place Reservation",
        link: "/add-reservations",
        roles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
      },
      {
        title: "Reservation List",
        link: "/reservations-list",
        roles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
      },
    ],
  },
  {
    title: "Special Offer List",
    link: "/special-offer-list",
    roles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
  {
    title: "Credit Card List",
    link: "/credit-card-list",
    roles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
  {
    title: "Payment List",
    link: "/payment-list",
    roles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
];
