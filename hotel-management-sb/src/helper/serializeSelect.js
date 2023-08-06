import { USER_ROLE } from "../constants/APP_INFO";
import ROLES, { ORDER_STATUS } from "../constants/Roles";

const serializeSelect = (data = []) =>
  data.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.id,
  }));

export const serializeFormikSelect = (data = []) => {
  try {
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const getOrderStatus = () => {
  if (USER_ROLE === ROLES.ADMIN) {
    return [
      ORDER_STATUS.APPROVED,
      ORDER_STATUS.CANCELLED,
      ORDER_STATUS.DELIVERED,
      ORDER_STATUS.DENIED,
    ];
  }
  if (USER_ROLE === ROLES.EMPLOYEE) {
    return [ORDER_STATUS.CANCELLED];
  }
  if (USER_ROLE === ROLES.MEDICAL_STUFF) {
    return [ORDER_STATUS.APPROVED, ORDER_STATUS.DENIED];
  }
  if (USER_ROLE === ROLES.TECHNICAL_STAFF) {
    return [ORDER_STATUS.DELIVERED];
  }
};

export const getOrderStatusDisabled = (status) => {
  // if (USER_ROLE === ROLES.ADMIN) {
  //   return [
  //     ORDER_STATUS.APPROVED,
  //     ORDER_STATUS.CANCELLED,
  //     ORDER_STATUS.DELIVERED,
  //     ORDER_STATUS.DENIED,
  //   ];
  // }
  if (USER_ROLE === ROLES.EMPLOYEE && status !== ORDER_STATUS.PENDING) {
    return true;
  }
  if (
    USER_ROLE === ROLES.MEDICAL_STUFF &&
    ![
      ORDER_STATUS.CANCELLED,
      ORDER_STATUS.DELIVERED,
      ORDER_STATUS.PENDING,
    ].includes(status)
  ) {
    return true;
  }
  if (
    USER_ROLE === ROLES.TECHNICAL_STAFF &&
    ![
      ORDER_STATUS.CANCELLED,
      ORDER_STATUS.PENDING,
      ORDER_STATUS.APPROVED,
    ].includes(status)
  ) {
    return [ORDER_STATUS.DELIVERED];
  }
};

export default serializeSelect;
