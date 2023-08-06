import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { specialPriceOnRoom } from "../../../../api/specialOffersResourceAPi";
import Loader from "../../../../components/common/reusable/Loader";
import calculateTotalDays from "../../../../helper/calculateTotalDays";
import { isEmpty } from "../../../../helper/functions";
import useRooms from "../../../../hooks/controllers/useRooms";
function calculatePercentage(total, percentage) {
  if (
    typeof total !== "number" ||
    typeof percentage !== "number" ||
    percentage < 0 ||
    percentage > 100
  ) {
    throw new Error(
      "Invalid input. Please provide valid numbers for total and percentage (0-100)."
    );
  }
  const cal = (total * percentage) / 100;

  return total - cal;
}

const ReservationDetails = ({ setGrandPrice }) => {
  const [{ data, loading, error }, setDiscount] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const handleDiscount = async (roomTypeId, date, code) => {
    setDiscount((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
    try {
      const data = await specialPriceOnRoom({
        roomTypeId,
        date,
        code: code ?? 0,
      });

      setDiscount((prev) => ({
        ...prev,
        data: data ?? "ddd",
      }));
    } catch (error) {
      setDiscount((prev) => ({
        ...prev,
        error,
      }));
    } finally {
      setDiscount((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };
  const {
    values: { numberOfGuests, roomId, startDate, endDate, code },
    errors,
  } = useFormikContext();
  const { data: roomData = [] } = useRooms();

  const selectedRoom = roomData.find(
    (item) => item.id == roomId.split("__")[0]
  );
  const numberOfDays = calculateTotalDays(startDate, endDate);
  const totalPrice = selectedRoom?.pricePerNight * numberOfDays;

  useEffect(() => {
    if (selectedRoom?.roomType?.id && startDate) {
      handleDiscount(selectedRoom?.roomType?.id, startDate, code);
    }
  }, [code, selectedRoom?.roomType?.id, startDate]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load discount info");
    }
  }, [error]);

  useEffect(() => {
    if (numberOfGuests && roomId && endDate && isEmpty(errors)) {
      if (data) {
        setGrandPrice(
          calculatePercentage(totalPrice, Number(data?.discountPercent))
        );
      } else {
        setGrandPrice(totalPrice);
      }
    } else {
      setGrandPrice(0);
    }
  }, [
    data,
    endDate,
    errors,
    numberOfGuests,
    roomId,
    setGrandPrice,
    totalPrice,
  ]);

  return (
    <>
      {numberOfGuests && isEmpty(errors) && roomId && endDate && (
        <>
          <div className="ms-3 mb-3">
            <hr />
            <h1>Reservation details</h1>
            <hr />
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "200px" }}
              >
                <Loader />
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table text-center table-striped table-bordered">
                  <thead>
                    <tr>
                      <th style={{ whiteSpace: "nowrap" }} className="px-3">
                        Room Name
                      </th>
                      <th style={{ whiteSpace: "nowrap" }} className="px-3">
                        Room Number
                      </th>
                      <th style={{ whiteSpace: "nowrap" }} className="px-3">
                        Room Type
                      </th>
                      <th style={{ whiteSpace: "nowrap" }} className="px-3">
                        Room Status
                      </th>
                      <th style={{ whiteSpace: "nowrap" }} className="px-3">
                        Number of guest
                      </th>
                      <th style={{ whiteSpace: "nowrap" }} className="px-3">
                        Start Date
                      </th>
                      <th style={{ whiteSpace: "nowrap" }} className="px-3">
                        End Date
                      </th>

                      <th style={{ whiteSpace: "nowrap" }} className="px-3">
                        Number of days
                      </th>
                      <th style={{ whiteSpace: "nowrap" }} className="px-3">
                        Price Per Night
                      </th>
                      <th style={{ whiteSpace: "nowrap" }} className="px-3">
                        Discount
                      </th>
                      <th style={{ whiteSpace: "nowrap" }} className="px-3">
                        Total
                      </th>
                      <th style={{ whiteSpace: "nowrap" }} className="px-3">
                        Grand Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{selectedRoom?.title}</td>
                      <td>{selectedRoom?.roomNumber}</td>
                      <td>{selectedRoom?.roomType?.name}</td>
                      <td>{selectedRoom?.roomStatus?.name}</td>
                      <td>{numberOfGuests}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{startDate}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{endDate}</td>
                      <td>{numberOfDays} days</td>
                      <td>${selectedRoom?.pricePerNight}</td>
                      <td>
                        {data && Number(data?.discountPercent)
                          ? Number(data?.discountPercent)
                          : 0}
                        %
                      </td>
                      <td>${totalPrice}</td>
                      <td>
                        $
                        {data
                          ? calculatePercentage(
                              totalPrice,
                              Number(data?.discountPercent)
                            )?.toLocaleString()
                          : totalPrice?.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ReservationDetails;
