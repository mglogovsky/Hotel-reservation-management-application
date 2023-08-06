import { useEffect, useRef } from "react";

function useScrollToBottom() {
  const ref = useRef(null);
  const prevScrollHeight = useRef(0);

  useEffect(() => {
    const element = ref.current;
    const { scrollHeight, clientHeight } = element;
    const scrollPos = scrollHeight - clientHeight;

    if (prevScrollHeight.current < scrollHeight) {
      element.scrollTop = scrollPos;
      prevScrollHeight.current = scrollHeight;
    }
  }, [ref]);

  return ref;
}

export default useScrollToBottom;
