import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import FormikSingleSelect from "../../../components/formik/FormikSingleSelect";
import FormikText from "../../../components/formik/FormikText";
import { USER_INFO, USER_ROLE } from "../../../constants/APP_INFO";
import ROLES from "../../../constants/Roles";
import { FUTURE_DATE } from "../../../constants/futureDate";
import YUP from "../../../constants/yup";
import { formatDateArrayToString } from "../../../helper/formatedDate";
import { isRequireField } from "../../../helper/functions";
import generateUniqueRandomLongNumber from "../../../helper/generateUniqueRandomLongNumber";
import useAllUser from "../../../hooks/controllers/useAllUser";

const useFormAssets = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const isApply = [ROLES.ADMIN, ROLES.STAFF].includes(USER_ROLE);

  const isEdit = `/edit-credit-card/${id}` === pathname;

  const validationSchema = YUP.object({
    cardHolderName: YUP.string()
      .required("Cardholder name is required")
      .matches(/^[a-zA-Z ]+$/, "Invalid cardholder name"),

    cardNumber: YUP.string()
      .required("Card number is required")
      .matches(/^\d{16}$/, "Card number must be 16 digits"),

    users: isApply ? YUP.string().required("CVV is required") : YUP.string(),
    cvv: YUP.string()
      .required("CVV is required")
      .matches(/^\d{3}$/, "CVV must be 3 digits"),

    expirationDate: isEdit
      ? YUP.string()
      : YUP.date()
          .min(new Date(), "Expiration date must be in the future")
          .typeError("Invalid expiration date")
          .test("is-expired", "Card has expired", (value) => {
            if (!value) return false;
            const today = new Date();
            const expirationDate = new Date(value);
            return expirationDate > today;
          })
          .required("Expiration date is required"),
    customerId: YUP.number()
      .typeError("Enter a number")
      .positive("Enter a positive integer")
      .integer("Enter a positive integer")
      .required(isRequireField()),
  });

  const initialValues = (data) => {
    const value = {
      cardHolderName: data?.cardHolderName ?? "",
      cardNumber: data?.cardNumber ?? "",
      cvv: data?.cvv ?? "",
      users: (isApply ? data?.users?.id : USER_INFO.userId) ?? "",
      expirationDate: formatDateArrayToString(data?.expirationDate) ?? "",
      customerId: data?.customerId ?? generateUniqueRandomLongNumber(),
    };
    return value;
  };
  const { isLoading, data, error } = useAllUser();

  const formFields = [
    {
      label: "Card Holder Name",
      component: FormikText,
      name: "cardHolderName",
    },
    isApply && {
      label: "Users",
      name: "users",
      options: data?.map((item) => ({
        label: `${item.email}`,
        value: item.id,
      })),
      component: FormikSingleSelect,
    },
    {
      label: "Card Number",
      component: FormikText,
      name: "cardNumber",
      type: "number",
    },
    {
      label: "CVV",
      component: FormikText,
      name: "cvv",
      type: "number",
    },
    {
      label: "Expiration Date",
      component: FormikText,
      name: "expirationDate",
      type: "date",
      min: isEdit ? null : FUTURE_DATE,
      readOnly: isEdit,
    },
    {
      label: "Customer ID",
      component: FormikText,
      name: "customerId",
      type: "number",
      readOnly: true,
    },
  ].filter(Boolean);

  return {
    validationSchema,
    formFields,
    initialValues,
    loading: isLoading,
    error,
    isApply,
  };
};

export default useFormAssets;
