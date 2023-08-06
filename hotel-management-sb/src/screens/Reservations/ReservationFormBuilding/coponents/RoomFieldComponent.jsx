import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { getAvailableRoom } from "../../../../api/roomResourceAPi";
import FormikSingleSelect from "../../../../components/formik/FormikSingleSelect";

const RoomFieldComponent = () => {
  const {
    values: { startDate, endDate },
  } = useFormikContext();

  const [{ data, loading, error }, setCard] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const handleAvailableRooms = async (params) => {
    setCard((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
    try {
      const data = await getAvailableRoom(params);
      setCard((prev) => ({
        ...prev,
        data,
      }));
    } catch (error) {
      setCard((prev) => ({
        ...prev,
        error,
      }));
    } finally {
      setCard((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };
  useEffect(() => {
    if (startDate && endDate) {
      handleAvailableRooms({ startDate, endDate });
    }
  }, [endDate, startDate]);

  return (
    startDate &&
    endDate && (
      <div>
        {loading ? (
          <>Please wait...</>
        ) : (
          <FormikSingleSelect
            {...{
              label: "Rooms",
              name: "roomId",
              options: data?.map((item) => ({
                label: `Name: ${item.title}, Price: $${item.pricePerNight}, Type: ${item.roomType.name}`,
                value: `${item.id}__${item.pricePerNight}`,
              })),
              component: FormikSingleSelect,
            }}
          />
        )}
      </div>
    )
  );
};

export default RoomFieldComponent;
