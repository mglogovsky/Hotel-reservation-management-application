import FormikSingleSelect from "../../../components/formik/FormikSingleSelect";
import FormikText from "../../../components/formik/FormikText";
import { USER_ROLE } from "../../../constants/APP_INFO";
import ROLES from "../../../constants/Roles";
import { FUTURE_DATE } from "../../../constants/futureDate";
import YUP from "../../../constants/yup";
import { formatDateArrayToString } from "../../../helper/formatedDate";
import { isRequireField } from "../../../helper/functions";
import useAllUser from "../../../hooks/controllers/useAllUser";

const useFormAssets = () => {
  const isApply = [ROLES.ADMIN, ROLES.STAFF].includes(USER_ROLE);

  const validationSchema = YUP.object({
    roomId: YUP.string().required(isRequireField()),
    cardId: YUP.string().required(isRequireField()),
    code: YUP.string(),
    userId: isApply ? YUP.string().required(isRequireField()) : YUP.string(),
    startDate: YUP.date().required("Start date is required"),
    endDate: YUP.date()
      .required("End date is required")
      .when("startDate", (startDate, schema) => {
        return schema.min(
          startDate,
          "End date must be greater than the start date"
        );
      }),
    numberOfGuests: YUP.number()
      .typeError("Enter a number")
      .positive("Enter a positive integer")
      .integer("Enter a positive integer")
      .required(isRequireField()),
  });

  const initialValues = (data) => {
    const value = {
      cardId: "",
      code: "",
      numberOfGuests: data?.numberOfGuests ?? "",
      startDate: data?.startDate ?? "",
      endDate: formatDateArrayToString(data?.endDate) ?? "",
      roomId: data?.room?.id ?? "",
    };
    return value;
  };

  const {
    data: userData = [],
    isLoading: usersLoading,
    error: usersError,
  } = useAllUser();

  const formFields = {
    allUserList: {
      label: "Users",
      name: "userId",
      options: userData?.map((item) => ({
        label: `${item.firstName ? item.firstName : ""} ${
          item.lastName ? item.lastName : ""
        } (${item.email})`,
        value: item.id,
      })),
      component: FormikSingleSelect,
    },
    startDate: {
      label: "Start Date",
      component: FormikText,
      name: "startDate",
      type: "date",
      min: FUTURE_DATE,
      readOnly: true,
    },
    endDate: {
      label: "End Date",
      component: FormikText,
      name: "endDate",
      type: "date",
      min: FUTURE_DATE,
    },
    numberOfGuests: {
      label: "Number of guest",
      component: FormikText,
      name: "numberOfGuests",
      type: "number",
      min: 1,
    },
  };

  return {
    validationSchema,
    formFields,
    initialValues,
    loading: usersLoading,
    error: usersError,
    isApply,
  };
};

export default useFormAssets;
