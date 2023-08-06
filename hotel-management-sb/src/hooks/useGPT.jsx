import { useState } from "react";
import { GPT_KEY } from "../config/chatGPT";
export function formatMessage(message) {
  const lines = message.split("\n");
  let formattedMessage = "<p>";

  lines.forEach((line) => {
    if (line === "") {
      formattedMessage += "</p><p>";
    } else {
      formattedMessage += `${line}<br>`;
    }
  });

  formattedMessage += "</p>";

  return formattedMessage;
}

const useGPT = () => {
  const [result, setResult] = useState({
    loading: false,
    data: [
      {
        isGtp: true,
        text: "How Can i assist you?",
      },
    ],
    error: null,
  });
  const handleSubmit = async ({ message }, { resetForm }) => {
    const url = "https://api.openai.com/v1/chat/completions"; // replace with your API endpoint URL
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    };

    setResult((prev) => ({
      ...prev,
      loading: true,
      data: [
        ...prev.data,
        {
          isGtp: false,
          text: message,
        },
      ],
    }));
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GPT_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult((prev) => ({
          ...prev,
          data: [
            ...prev.data,
            {
              isGtp: true,
              text: formatMessage(data.choices[0].message.content),
            },
          ],
        }));
      })
      .catch((error) => setResult((prev) => ({ ...prev, error })))
      .finally(() => {
        setResult((prev) => ({ ...prev, loading: false }));
      });

    resetForm();
  };
  return { result, handleSubmit };
};

export default useGPT;
