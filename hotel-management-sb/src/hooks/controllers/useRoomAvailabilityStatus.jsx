import { useQuery } from "@tanstack/react-query";
import { getRoomAvailabilityStatus } from "../../api/roomStatusAndTypeResourceAPi";

const useRoomAvailabilityStatus = () =>
  useQuery(["getRoomAvailabilityStatus-key"], getRoomAvailabilityStatus);

export default useRoomAvailabilityStatus;
