import FormikSelect from "../../../components/formik/FormikSelect";
import FormikText from "../../../components/formik/FormikText";
import YUP from "../../../constants/yup";
import { formatDateArrayToString } from "../../../helper/formatedDate";
import { isRequireField } from "../../../helper/functions";
import { serializeFormikSelect } from "../../../helper/serializeSelect";
import useRoomType from "../../../hooks/controllers/useRoomType";

const useFormAssets = () => {
  const validationSchema = YUP.object({
    offerName: YUP.string().required(isRequireField()),
    offerCode: YUP.string().required(isRequireField()),
    startDate: YUP.string().required(isRequireField()),
    endDate: YUP.string().required(isRequireField()),
    roomType: YUP.string().required(isRequireField()),
    discountPercent: YUP.number()
      .typeError("Enter a number")
      .positive("Enter a positive integer")
      .integer("Enter a positive integer")
      .required(isRequireField()),
  });

  const initialValues = (data) => {
    const value = {
      offerName: data?.offerName ?? "",
      offerCode: data?.offerCode ?? "",
      discountPercent: data?.discountPercent ?? "",
      startDate: formatDateArrayToString(data?.startDate) ?? "",
      endDate: formatDateArrayToString(data?.endDate) ?? "",
      roomType: data?.roomType?.id ?? "",
    };
    return value;
  };

  const {
    data: roomTypeData,
    isLoading: roomTypeLoading,
    error: roomTypeError,
  } = useRoomType();

  const formFields = [
    {
      label: "Name",
      component: FormikText,
      name: "offerName",
    },
    {
      label: "Offer Code",
      component: FormikText,
      name: "offerCode",
    },
    {
      label: "Discount",
      component: FormikText,
      name: "discountPercent",
      type: "number",
    },
    {
      label: "type",
      name: "roomType",
      options: serializeFormikSelect(roomTypeData),
      component: FormikSelect,
    },
    {
      label: "Start Date",
      component: FormikText,
      name: "startDate",
      type: "date",
    },
    {
      label: "End Date",
      component: FormikText,
      name: "endDate",
      type: "date",
    },
  ];

  return {
    validationSchema,
    formFields,
    initialValues,
    loading: roomTypeLoading,
    error: roomTypeError,
  };
};

export default useFormAssets;
