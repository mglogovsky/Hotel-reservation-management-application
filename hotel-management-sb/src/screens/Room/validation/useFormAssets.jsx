import FormikFileByte from "../../../components/formik/FormikFileByte";
import FormikSelect from "../../../components/formik/FormikSelect";
import FormikText from "../../../components/formik/FormikText";
import YUP from "../../../constants/yup";
import { isRequireField } from "../../../helper/functions";
import { serializeFormikSelect } from "../../../helper/serializeSelect";
import useRoomStatus from "../../../hooks/controllers/useRoomStatus";
import useRoomType from "../../../hooks/controllers/useRoomType";

const useFormAssets = () => {
  const validationSchema = YUP.object({
    title: YUP.string().required(isRequireField()),
    roomStatus: YUP.string().required(isRequireField()),
    roomType: YUP.string().required(isRequireField()),
    floor: YUP.string().required(isRequireField()),
    roomNumber: YUP.number()
      .typeError("Enter a number")
      .positive("Enter a positive integer")
      .integer("Enter a positive integer")
      .required(isRequireField()),
    pricePerNight: YUP.number()
      .typeError("Enter a number")
      .positive("Enter a positive integer")
      .integer("Enter a positive integer")
      .required(isRequireField()),
    maxGuests: YUP.number()
      .typeError("Enter a number")
      .positive("Enter a positive integer")
      .integer("Enter a positive integer")
      .required(isRequireField()),
    description: YUP.string().required(isRequireField()),
  });

  const initialValues = (data) => {
    const value = {
      title: data?.title ?? "",
      roomStatus: data?.roomStatus?.id ?? "",
      roomType: data?.roomType?.id ?? "",
      floor: data?.floor ?? "",
      roomNumber: data?.roomNumber ?? "",
      pricePerNight: data?.pricePerNight ?? "",
      maxGuests: data?.maxGuests ?? "",
      description: data?.description ?? "",
    };
    return value;
  };

  const {
    data: roomStatusData,
    isLoading: roomStatusLoading,
    error: roomStatusError,
  } = useRoomStatus();

  const {
    data: roomTypeData,
    isLoading: roomTypeLoading,
    error: roomTypeError,
  } = useRoomType();

  const formFields = [
    {
      label: "Name",
      component: FormikText,
      name: "title",
    },
    {
      label: "Status",
      name: "roomStatus",
      options: serializeFormikSelect(roomStatusData),
      component: FormikSelect,
    },
    {
      label: "type",
      name: "roomType",
      options: serializeFormikSelect(roomTypeData),
      component: FormikSelect,
    },
    {
      label: "Floor",
      component: FormikText,
      name: "floor",
    },
    {
      label: "room Number",
      component: FormikText,
      name: "roomNumber",
    },
    {
      label: "Price/Night",
      component: FormikText,
      name: "pricePerNight",
      type: "number",
    },
    {
      label: "Max Guest",
      component: FormikText,
      name: "maxGuests",
      type: "number",
    },
    {
      label: "Description",
      component: FormikText,
      name: "description",
      as: "textarea",
    },
    {
      label: "Image",
      name: "image",
      component: FormikFileByte,
      accept: "image/*",
    },
  ];

  return {
    validationSchema,
    formFields,
    initialValues,
    loading: roomStatusLoading || roomTypeLoading,
    error: roomStatusError || roomTypeError,
  };
};

export default useFormAssets;
