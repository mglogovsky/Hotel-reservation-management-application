import { useQuery } from "@tanstack/react-query";
import { getRoomStatus } from "../../api/roomStatusAndTypeResourceAPi";

const useRoomStatus = () => useQuery(["getRoomStatus-key"], getRoomStatus);

export default useRoomStatus;
