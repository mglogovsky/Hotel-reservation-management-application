import { useCallback } from "react";
import classNames from "../helper/classNames";

const ChatGPT = ({ isGpt = false, text, isLast }) => {
  const scrollToViewRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ block: "end", inline: "start" });
    }
  }, []);
  return (
    <div
      className={classNames(
        isGpt ? "message sender" : "message receiver",
        "px-4"
      )}
      ref={isLast ? scrollToViewRef : null}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
    </div>
  );
};

export default ChatGPT;
