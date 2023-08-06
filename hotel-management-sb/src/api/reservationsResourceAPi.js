import { toast } from "react-hot-toast";
import axiosApiInstance from "../helper/axiosInstance";

const ReservationsResourceAPI = {
  async fetchAllReservations(params) {
    const { name, ...rest } = params;
    const response = await axiosApiInstance({
      url: "/api/reservations",
      params: { title: name, ...rest },
    });

    return response.data;
  },

  async getReservation(id) {
    const response = await axiosApiInstance.get(`/api/reservations/${id}`);

    return response.data;
  },
  async createReservation(data) {
    const response = await axiosApiInstance({
      method: "post",
      url: "/api/reservations",
      data,
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Reservation done successfully");
    }
    return response.data;
  },
  async updateReservation({ data, id }) {
    const response = await axiosApiInstance({
      method: "put",
      url: `/api/reservations/${id}`,
      data,
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Reservation updated successfully");
    }
    return response.data;
  },
  async deleteReservation(id) {
    const response = await axiosApiInstance({
      method: "delete",
      url: `/api/reservations/${id}`,
    });

    if ([200, 201, 204].includes(response.status)) {
      toast.success("Reservation deleted successfully");
    }
    return response.data;
  },
};

export const {
  fetchAllReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} = ReservationsResourceAPI;

export default ReservationsResourceAPI;
