import ROLES from "../../constants/Roles";
import BatchUploadUserScreen from "../../screens/User/BatchUploadUserScreen";
import CreateUserScreen from "../../screens/User/CreateUserScreen";
import EditUserScreen from "../../screens/User/EditUserScreen";
import UpdateProfileScreen from "../../screens/User/UpdateProfile/UpdateProfileScreen";
import UserListScreen from "../../screens/User/UserListScreen";

export const USER_ROUTES = [
  {
    path: "/user-list",
    component: UserListScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF],
  },
  {
    path: "/update-profile",
    component: UpdateProfileScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF],
  },
  {
    path: "/add-user",
    component: CreateUserScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF],
  },
  {
    path: "/batch-upload-user",
    component: BatchUploadUserScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF],
  },
  {
    path: "/edit-user/:id",
    component: EditUserScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF],
  },
];
