import React, { useState, useRef, useEffect } from "react";
import { FaComments } from "react-icons/fa";
import styles from "../public/chatbot.module.css";
import API from "../api";
import { ToastContainer, toast } from "react-toastify";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi there! I’m Grubbin Bot, how can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEnd = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    // Add user message

    const userText = input;
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setInput("");

    try {
      const response = await API.post(
        "/api/chat",
        { question: userText },
        {
          withCredentials: true,
        }
      );

      console.log("response data", response.data);

      // body.answer is either a string or an array of {name,description,price}
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: response.data.answer },
      ]);
    } catch (err) {
      console.error("Chatbot error:", err);

      const isRateLimit =
        err.response?.status === 429 ||
        err.response?.data?.error?.includes("Too many requests");

      if (isRateLimit) {
        toast.error(err.response.data.error, { position: "top-center" });
      } else {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "Sorry, something went wrong." },
        ]);
      }
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className={styles.chatbotToggle}
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat with us"
      >
        <FaComments size={64} color="var(--primary-red)" />
      </button>

      {/* Chat Window */}
      {open && (
        <div className={styles.chatbotWindow}>
          <div className={styles.chatbotHeader}>Chat with Grubbin</div>

          <div className={styles.chatbotMessages}>
            {messages.map((message, i) => (
              <div
                key={i}
                className={
                  message.from === "bot"
                    ? styles.botMessage
                    : styles.userMessage
                }
              >
                {Array.isArray(message.text) ? (
                  <ul className={styles.dishList}>
                    {message.text.map((dish, index) => (
                      <li key={index}>
                        <strong>{dish.name}</strong>: {dish.description}{" "}
                        <span style={{ color: "var(--primary-red) " }}>
                          &nbsp; ${dish.price.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span style={{ whiteSpace: "pre-wrap" }}>{message.text}</span>
                )}
              </div>
            ))}
            <div ref={messagesEnd} />
          </div>

          <ToastContainer />

          <div className={styles.chatbotinputarea}>
            <input
              type="text"
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
