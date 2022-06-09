import { useCallback, useEffect, useRef, useState } from "react";
import { connect, Socket } from "socket.io-client";
import { ReceiveType } from "../features/Chat_types";

export function useSocket() {
  const socket = useRef<Socket>();
  const [userName, setUserName] = useState("");
  const [chatMessages, setMessages] = useState<ReceiveType[]>([]);

  console.log(chatMessages);

  const socketConnection = useCallback(() => {
    socket.current = connect("http://127.0.0.1:8080", {
      path: "/socket.io",
      transports: ["websocket"],
    });

    socket.current.emit("init", userName);

    socket.current.on("receive message", (receive: ReceiveType) => {
      console.log(`name : ${receive.name} , message :${receive.message}`);
      setMessages((prev) => [...prev, receive]);
      if (receive.type === "out") {
        if (socket.current) socket.current.close();
      }
    });
  }, [userName]);

  const ioConnect = (name: string) => {
    setUserName(name);
  };

  const sendMessage = (message: string) => {
    if (socket.current) {
      socket.current.emit("send message", { name: userName, message });
    }
  };

  const disconnect = () => {
    if (socket.current) {
      //   socket.current.close();
      socket.current.emit("room out", { name: userName });
      setUserName("");
    }
  };

  useEffect(() => {
    if (userName !== "") socketConnection();
  }, [userName, socketConnection]);

  return { userName, chatMessages, ioConnect, sendMessage, disconnect };
}
