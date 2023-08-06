import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { checkIn, checkOut } from "../../api/checkInOutResourceAPi";
import classNames from "../../helper/classNames";

const CheckInOurScreen = ({ checkInOut = {} }) => {
  const { startDateTime, endDateTime, id } = checkInOut;
  const isCheckin = !!!startDateTime;
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync: patcher } = useMutation(
    () => (isCheckin ? checkIn(id) : checkOut(id)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["reservations-list"]);
      },
    }
  );
  return (
    <>
      {!!startDateTime && !!endDateTime ? (
        <button disabled className={classNames("btn", "btn-sm", "btn-dark")}>
          Already Checkout
        </button>
      ) : (
        <button
          onClick={patcher}
          disabled={isLoading}
          className={classNames(
            "btn",
            "btn-sm",
            isCheckin ? "btn-success" : "btn-danger"
          )}
        >
          {isCheckin ? "Check In" : "Check Out"}
        </button>
      )}
    </>
  );
};

export default CheckInOurScreen;
