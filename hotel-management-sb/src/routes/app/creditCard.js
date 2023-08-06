import { createCreditCard } from "../../api/creditCardResourceAPi";
import ROLES from "../../constants/Roles";
import CreditCardListScreen from "../../screens/CreditCard/CreditCardListScreen";
import EditCreditCardScreen from "../../screens/CreditCard/EditCreditCardScreen";

export const CREDIT_CARD_ROUTES = [
  {
    path: "/credit-card-list",
    component: CreditCardListScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
  {
    path: "/add-credit-card",
    component: createCreditCard,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
  {
    path: "/edit-credit-card/:id",
    component: EditCreditCardScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
];
