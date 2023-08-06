import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getAllCreditCards } from "../../../../api/creditCardResourceAPi";
import Modal from "../../../../components/common/Modal";
import FormikSingleSelect from "../../../../components/formik/FormikSingleSelect";
import { USER_INFO } from "../../../../constants/APP_INFO";
import { decorateCreditCardNumber } from "../../../../helper/decorateCreditCardNumber";
import useModalToggle from "../../../../hooks/useModalToggle";
import CreateReservationCreditCardScreen from "./CreateReservationCreditCardScreen";

const ReservationUserAndCardHandle = ({ isApply }) => {
  const {
    values: { userId },
  } = useFormikContext();

  const [{ data, loading, error }, setCard] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const handleCards = async (userId) => {
    setCard((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
    try {
      const data = await getAllCreditCards({ userId });
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
    if (isApply && userId) {
      handleCards(userId);
    }
    if (!isApply && !userId) {
      handleCards(USER_INFO.userId);
    }
  }, [userId, isApply]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load cards!");
    }
  }, [error]);

  const { show, handleClose, handleShow } = useModalToggle();

  const renderCardsComponent = () => {
    if (loading) {
      return <p>Loading Cards...</p>;
    } else if (data.length === 0) {
      return (
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-10">
            <div className="alert-warning alert ms-3">
              <div className="d-flex justify-content-between align-items-center">
                <p className="p-0 m-0">No card found</p>
                <button
                  type="button"
                  onClick={handleShow}
                  className="btn btn-primary text-white"
                >
                  Click to add a card
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <FormikSingleSelect
          label="Card"
          name="cardId"
          options={data?.map((item) => ({
            label: `${decorateCreditCardNumber(item.cardNumber)} - ${
              item.cardHolderName
            }`,
            value: item.id,
          }))}
        />
      );
    }
  };

  return (
    <>
      {isApply && userId && renderCardsComponent()}

      {!isApply && !userId && renderCardsComponent()}
      {show && (
        <Modal title="Add New Card" show={show} handleClose={handleClose}>
          <CreateReservationCreditCardScreen
            handleClose={handleClose}
            userId={isApply && userId ? userId : USER_INFO.userId}
            handleCards={handleCards}
          />
        </Modal>
      )}
    </>
  );
};

export default ReservationUserAndCardHandle;
