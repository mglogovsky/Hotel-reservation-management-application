import { useQuery } from "@tanstack/react-query";
import { getRoomType } from "../../api/roomStatusAndTypeResourceAPi";

const useRoomType = () => useQuery(["getRoomType-key"], getRoomType);

export default useRoomType;
