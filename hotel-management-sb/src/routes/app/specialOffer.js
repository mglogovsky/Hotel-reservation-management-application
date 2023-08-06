import ROLES from "../../constants/Roles";
import CreateSpecialOfferScreen from "../../screens/Special Offers/CreateSpecialOfferScreen";
import EditSpecialOfferScreen from "../../screens/Special Offers/EditSpecialOfferScreen";
import SpecialOfferListScreen from "../../screens/Special Offers/SpecialOfferListScreen";

export const SPECIAL_OFFER_ROUTES = [
  {
    path: "/special-offer-list",
    component: SpecialOfferListScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
  {
    path: "/add-special-offer",
    component: CreateSpecialOfferScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
  {
    path: "/edit-special-offer/:id",
    component: EditSpecialOfferScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
];
