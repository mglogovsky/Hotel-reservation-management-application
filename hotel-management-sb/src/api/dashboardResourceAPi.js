import axiosApiInstance from "../helper/axiosInstance";

const DashboardResourceAPI = {
  async getCardInfo() {
    const response = await axiosApiInstance.get(`/api/card-info`);
    return response.data;
  },
  async getMonthlyReservationInfo() {
    const response = await axiosApiInstance.get(
      `/api/monthly-reservation-info`
    );
    return response.data;
  },
};

export const { getCardInfo, getMonthlyReservationInfo } = DashboardResourceAPI;

export default DashboardResourceAPI;
