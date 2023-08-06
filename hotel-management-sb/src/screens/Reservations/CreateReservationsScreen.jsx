import React, { useState } from "react";
import Calendar from "react-calendar";
import { FUTURE_DATE } from "../../constants/futureDate";
import ReservationFormContainer from "./ReservationFormBuilding/ReservationFormContainer";

const CreateReservationsScreen = () => {
  const [startDate, setStartDate] = useState(new Date(FUTURE_DATE));
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div>
      <div className="card p-5">
        <h1 className="mb-3">Select reservation date</h1>
        <Calendar
          onChange={(date) => {
            setStartDate(date);
            setIsSelected(true);
          }}
          value={startDate}
          minDate={new Date(FUTURE_DATE)}
          className={"w-100 h-100"}
        />
      </div>
      {isSelected && <ReservationFormContainer startDate={startDate} />}
    </div>
  );
};

export default CreateReservationsScreen;
