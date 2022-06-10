import { useCallback, useEffect, useRef, useState } from "react";
import { connect, Socket } from "socket.io-client";
import { ReceiveType } from "../features/Chat_types";

export function useSocket() {
  const socket = useRef<Socket>();
  const [userName, setUserName] = useState("");
  const [chatMessages, setMessages] = useState<ReceiveType[]>([]);

  const socketConnection = useCallback(() => {
    if (socket.current) {
      socket.current.emit("init", userName);

      socket.current.on("receive message", (receive: ReceiveType) => {
        console.log(`name : ${receive.name} , message :${receive.message}`);
        setMessages((prev) => [...prev, receive]);
        if (receive.type === "out") {
          if (socket.current) socket.current.close();
        }
      });
    } else {
      //서버 연결상태 불량
    }
  }, [userName]);

  const ioConnect = (name: string) => {
    setUserName(name);
  };

  const sendMessage = (message: string) => {
    if (socket.current) {
      socket.current.emit("send message", { name: userName, message });
    }
  };

  const disconnect = useCallback(() => {
    if (socket.current) {
      //   socket.current.close();
      socket.current.emit("room out", { name: userName });
      setUserName("");
    }
  }, [userName]);

  useEffect(() => {
    const serverConnect = connect("http://127.0.0.1:8080", {
      path: "/socket.io",
      transports: ["websocket"],
    });

    socket.current = serverConnect;
  }, []);

  useEffect(() => {
    if (userName !== "") socketConnection();
  }, [userName, socketConnection]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return { userName, chatMessages, ioConnect, sendMessage, disconnect };
}
