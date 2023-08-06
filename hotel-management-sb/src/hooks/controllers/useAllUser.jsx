import { useQuery } from "@tanstack/react-query";
import { allUsersNoPaginated } from "../../api/userAPIs";

export default function useAllUser() {
  return useQuery(["allUsersNoPaginated-key"], allUsersNoPaginated);
}
