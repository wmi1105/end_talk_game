import { useEffect, useRef, useState } from "react";
import { connect, Socket } from "socket.io-client";

interface ReceiveType {
  type: string;
  name: string;
  message: string;
}

export function useSocket() {
  const socket = useRef<Socket>();
  const [name, setName] = useState("");
  const [chatMessages, setMessages] = useState<ReceiveType[]>([]);

  console.log(chatMessages);

  const ioConnect = (name: string) => {
    socket.current = connect("http://127.0.0.1:8080", {
      path: "/socket.io",
      transports: ["websocket"],
    });

    socket.current.emit("init", { name });

    socket.current.on("receive message", (receive: ReceiveType) => {
      console.log(`name : ${receive.name} , message :${receive.message}`);
      setMessages((prev) => [...prev, receive]);
      if (receive.type === "out") {
        if (socket.current) socket.current.close();
      }
    });
  };

  const sendMessage = (name: string, message: string) => {
    if (socket.current) {
      socket.current.emit("send message", { name, message });
    }
  };

  const disconnect = () => {
    if (socket.current) {
      //   socket.current.close();
      socket.current.emit("room out", { name });
      setName("");
    }
  };

  useEffect(() => {
    if (name !== "") ioConnect(name);
  }, [name]);

  return { chatMessages, ioConnect, sendMessage, disconnect };
}
