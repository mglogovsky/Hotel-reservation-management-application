import { useQuery } from "@tanstack/react-query";
import { getCardInfo } from "../../api/dashboardResourceAPi";

export default function useCardInfo() {
  return useQuery(["getCardInfo-key"], getCardInfo);
}
