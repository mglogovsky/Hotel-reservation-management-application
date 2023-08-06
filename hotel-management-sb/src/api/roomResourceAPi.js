import { toast } from "react-hot-toast";
import axiosApiInstance from "../helper/axiosInstance";
import { getFormattedDate } from "../helper/getFormattedDate";

const RoomResourceAPI = {
  async fetchAllRooms(params) {
    const { name, ...rest } = params;
    const response = await axiosApiInstance({
      url: "/api/rooms",
      params: { title: name, ...rest },
    });

    return response.data;
  },
  async fetchNotPaginatedRooms(params) {
    const response = await axiosApiInstance({
      url: "/api/rooms-without-pagination",
    });

    return response.data;
  },

  async getRoom(id) {
    const response = await axiosApiInstance.get(`/api/rooms/${id}`);

    return response.data;
  },
  async getAvailableRoom(params) {
    const response = await axiosApiInstance({
      url: `/api/all-available-room-with-date-range`,
      params,
    });

    return response.data;
  },
  async createRoom(data) {
    const response = await axiosApiInstance({
      method: "post",
      url: "/api/rooms",
      data,
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Room created successfully");
    }
    return response.data;
  },
  async updateRoom({ data, id }) {
    const response = await axiosApiInstance({
      method: "put",
      url: `/api/rooms/${id}`,
      data,
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Room updated successfully");
    }
    return response.data;
  },
  async searchRoom(params) {
    const { name, ...rest } = params;
    const response = await axiosApiInstance({
      method: "get",
      url: `/api/search-rooms`,
      params: { date: getFormattedDate(), ...name, ...rest },
    });
    return response.data;
  },
  async deleteRoom(id) {
    const response = await axiosApiInstance({
      method: "delete",
      url: `/api/rooms/${id}`,
    });

    if ([200, 201, 204].includes(response.status)) {
      toast.success("Room deleted successfully");
    }
    return response.data;
  },
};

export const {
  fetchAllRooms,
  fetchNotPaginatedRooms,
  getRoom,
  getAvailableRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  searchRoom,
} = RoomResourceAPI;

export default RoomResourceAPI;
