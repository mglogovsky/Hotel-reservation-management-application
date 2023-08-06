import axiosApiInstance from "../helper/axiosInstance";

const PaymentResourceAPI = {
  async fetchAllPayments(params) {
    const { name, ...rest } = params;
    const response = await axiosApiInstance({
      url: "/api/payments",
      params: {
        userName: name,
        ...rest,
      },
    });

    return response.data;
  },
};

export const { fetchAllPayments } = PaymentResourceAPI;

export default PaymentResourceAPI;
