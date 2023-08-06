import { useQuery } from "@tanstack/react-query";
import { fetchNotPaginatedRooms } from "../../api/roomResourceAPi";

const useRooms = () =>
  useQuery(["fetchNotPaginatedRooms-key"], fetchNotPaginatedRooms);

export default useRooms;
