import ROLES from "../../constants/Roles";
import CreateRoomScreen from "../../screens/Room/CreateRoomScreen";
import EditRoomScreen from "../../screens/Room/EditRoomScreen";
import RoomListScreen from "../../screens/Room/RoomListScreen";
import SearchRoomListScreen from "../../screens/Room/SearchRoomListScreen";

export const ROOM_ROUTES = [
  {
    path: "/room-list",
    component: RoomListScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
  {
    path: "/search-rooms",
    component: SearchRoomListScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
  {
    path: "/add-room",
    component: CreateRoomScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
  {
    path: "/edit-room/:id",
    component: EditRoomScreen,
    isPublic: false,
    isProtected: true,
    allowedRoles: [ROLES.ADMIN, ROLES.STAFF, ROLES.GUEST],
  },
];
