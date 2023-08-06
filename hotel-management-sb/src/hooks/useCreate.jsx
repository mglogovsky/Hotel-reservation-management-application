import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";

const useCreate = ({ fn, invalidateKey, handleClose }) => {
  const history = useHistory();

  const queryClient = useQueryClient();
  const { isLoading, error, mutateAsync } = useMutation((data) => fn(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(
        typeof invalidateKey === "string" ? [invalidateKey] : invalidateKey
      );
      if (typeof handleClose === "function") {
        handleClose();
      }
      history.push(`/${invalidateKey}`);
    },
  });
  return { isLoading, error, mutateAsync };
};

export default useCreate;
