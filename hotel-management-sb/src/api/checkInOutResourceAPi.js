import { toast } from "react-hot-toast";
import axiosApiInstance from "../helper/axiosInstance";

const CheckInOutResourceAPI = {
  async checkIn(id) {
    const response = await axiosApiInstance({
      method: "post",
      url: `/api/checkin/${id}`,
    });

    if ([200, 201, 204].includes(response.status)) {
      toast.success("CheckIn successfully");
    }
    return response.data;
  },
  async checkOut(id) {
    const response = await axiosApiInstance({
      method: "post",
      url: `/api/checkout/${id}`,
    });

    if ([200, 201, 204].includes(response.status)) {
      toast.success("CheckOut successfully");
    }
    return response.data;
  },
};

export const { checkIn, checkOut } = CheckInOutResourceAPI;

export default CheckInOutResourceAPI;
