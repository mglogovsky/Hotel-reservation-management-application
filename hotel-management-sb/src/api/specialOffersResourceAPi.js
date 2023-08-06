import { toast } from "react-hot-toast";
import axiosApiInstance from "../helper/axiosInstance";

const SpecialOfferResourceAPI = {
  async fetchAllOffers() {
    const response = await axiosApiInstance({
      url: "/api/special-offers",
    });

    return response.data;
  },
  async specialPriceOnRoom(params) {
    const response = await axiosApiInstance({
      url: "/api/special-offers-by-date-and-room-type",
      params,
    });

    return response.data;
  },

  async getOffer(id) {
    const response = await axiosApiInstance.get(`/api/special-offers/${id}`);

    return response.data;
  },
  async createOffer(data) {
    const response = await axiosApiInstance({
      method: "post",
      url: "/api/special-offers",
      data,
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Offer created successfully");
    }
    return response.data;
  },
  async updateOffer({ data, id }) {
    const response = await axiosApiInstance({
      method: "put",
      url: `/api/special-offers/${id}`,
      data,
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Offer updated successfully");
    }
    return response.data;
  },
  async deleteOffer(id) {
    const response = await axiosApiInstance({
      method: "delete",
      url: `/api/special-offers/${id}`,
    });

    if ([200, 201, 204].includes(response.status)) {
      toast.success("Offer deleted successfully");
    }
    return response.data;
  },
};

export const {
  fetchAllOffers,
  getOffer,
  createOffer,
  updateOffer,
  deleteOffer,
  specialPriceOnRoom,
} = SpecialOfferResourceAPI;

export default SpecialOfferResourceAPI;
