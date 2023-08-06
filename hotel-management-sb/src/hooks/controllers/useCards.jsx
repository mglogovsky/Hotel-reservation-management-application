import { useQuery } from "@tanstack/react-query";
import { getAllCreditCards } from "../../api/creditCardResourceAPi";

const useCards = () => useQuery(["getAllCreditCards-key"], getAllCreditCards);

export default useCards;
