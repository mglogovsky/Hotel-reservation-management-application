import { toast } from "react-hot-toast";
import { USER_INFO, USER_ROLE } from "../constants/APP_INFO";
import ROLES from "../constants/Roles";
import axiosApiInstance from "../helper/axiosInstance";

const CreditResourceAPI = {
  async fetchAllCreditCards(params) {
    const { name, ...rest } = params;
    const response = await axiosApiInstance({
      url: "/api/credit-cards",
      params: {
        title: name,
        ...rest,
        userId: USER_ROLE === ROLES.GUEST ? USER_INFO.userId : rest.userId,
      },
    });

    return response.data;
  },
  async getAllCreditCards(params) {
    const response = await axiosApiInstance({
      url: "/api/credit-cards",
      params,
    });

    return response.data;
  },

  async getCreditCard(id) {
    const response = await axiosApiInstance.get(`/api/credit-cards/${id}`);

    return response.data;
  },
  async createCreditCard(data) {
    const response = await axiosApiInstance({
      method: "post",
      url: "/api/credit-cards",
      data,
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Card created successfully");
    }
    return response.data;
  },
  async updateCreditCard({ data, id }) {
    const response = await axiosApiInstance({
      method: "put",
      url: `/api/credit-cards/${id}`,
      data,
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Card updated successfully");
    }
    return response.data;
  },
  async deleteCreditCard(id) {
    const response = await axiosApiInstance({
      method: "delete",
      url: `/api/credit-cards/${id}`,
    });

    if ([200, 201, 204].includes(response.status)) {
      toast.success("Card deleted successfully");
    }
    return response.data;
  },
};

export const {
  fetchAllCreditCards,
  getAllCreditCards,
  getCreditCard,
  createCreditCard,
  updateCreditCard,
  deleteCreditCard,
} = CreditResourceAPI;

export default CreditResourceAPI;
