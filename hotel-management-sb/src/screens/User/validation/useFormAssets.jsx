import FormikSelect from "../../../components/formik/FormikSelect";
import FormikText from "../../../components/formik/FormikText";
import ROLES from "../../../constants/Roles";
import YUP from "../../../constants/yup";
import { formatDateArrayToString } from "../../../helper/formatedDate";
import { isRequireField } from "../../../helper/functions";

const useFormAssets = () => {
  const validationSchema = YUP.object({
    firstName: YUP.string().required(isRequireField()),
    lastName: YUP.string().required(isRequireField()),
    address: YUP.string().required(isRequireField()),
    country: YUP.string().required(isRequireField()),
    email: YUP.string().required(isRequireField()),
    password: YUP.string().required(isRequireField()),
    phoneNumber: YUP.string().required(isRequireField()),
    zipCode: YUP.string().required(isRequireField()),
    birthOfDate: YUP.string().required(isRequireField()),
    roles: YUP.string().required(isRequireField()),
  });

  const initialValues = (data) => {
    const value = {
      firstName: data?.firstName ?? "",
      lastName: data?.lastName ?? "",
      address: data?.address ?? "",
      country: data?.country ?? "",
      email: data?.email ?? "",
      password: data?.password ?? "",
      phoneNumber: data?.phoneNumber ?? "",
      zipCode: data?.zipCode ?? "",
      birthOfDate: formatDateArrayToString(data?.birthDate) ?? "",
      roles: data?.roles?.[0]?.name ?? "",
    };

    return value;
  };

  const formFields = [
    {
      label: "First Name",
      component: FormikText,
      name: "firstName",
    },
    {
      label: "Last Name",
      component: FormikText,
      name: "lastName",
    },
    {
      label: "Email",
      component: FormikText,
      name: "email",
      type: "email",
    },
    {
      label: "Password",
      component: FormikText,
      name: "password",
      type: "password",
    },
    {
      label: "Select Role",
      name: "roles",
      component: FormikSelect,
      options: Object.values(ROLES).map((item) => ({
        value: item,
        label: item.split("_").join(" "),
      })),
    },

    {
      label: "DOB",
      component: FormikText,
      name: "birthOfDate",
      type: "date",
    },
    {
      label: "phoneNumber",
      component: FormikText,
      name: "phoneNumber",
    },
    {
      label: "country",
      component: FormikText,
      name: "country",
    },
    {
      label: "city",
      component: FormikText,
      name: "city",
    },

    {
      label: "zipCode",
      component: FormikText,
      name: "zipCode",
    },
    {
      label: "address",
      component: FormikText,
      name: "address",
      as: "textarea",
    },
  ];

  return {
    validationSchema,
    formFields,
    initialValues,
  };
};

export default useFormAssets;
