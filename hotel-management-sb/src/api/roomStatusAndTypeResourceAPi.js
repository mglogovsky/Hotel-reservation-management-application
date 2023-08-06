import axiosApiInstance from "../helper/axiosInstance";

const RoomStatusAndTypeResourceAPI = {
  async getRoomStatus() {
    const response = await axiosApiInstance.get(`/api/room-statuses`);
    return response.data;
  },
  async getRoomType() {
    const response = await axiosApiInstance.get(`/api/room-types`);
    return response.data;
  },
  async getRoomAvailabilityStatus() {
    const response = await axiosApiInstance.get(
      `/api/room-availability-statuses`
    );
    return response.data;
  },
};

export const { getRoomStatus, getRoomType, getRoomAvailabilityStatus } =
  RoomStatusAndTypeResourceAPI;

export default RoomStatusAndTypeResourceAPI;
