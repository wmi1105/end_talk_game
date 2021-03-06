import { useEffect, useRef } from "react";
import { connect, Socket } from "socket.io-client";

export function SamplePage() {
  const socket = useRef<Socket>();

  const sendMessageHandler = () => {
    if (socket.current) {
      socket.current.emit("send message", { name: "json", message: "하이" });
    }
  };

  useEffect(() => {
    socket.current = connect("http://127.0.0.1:8080", {
      path: "/socket.io",
      transports: ["websocket"],
    });

    if (socket.current) {
      socket.current.emit("init", { name: "json" });

      socket.current.on("connect", () => {
        console.log("연결 성공");
      });

      socket.current.on("disconnect", (reason) => {
        console.log(reason, "연결 종료 ");
      });

      socket.current.on("receive message", (message) => {
        window.alert(message);
      });
    }

    return () => {
      if (socket.current) socket.current.close();
    };
  }, []);

  return (
    <div>
      <h1>socket.io 테스트</h1>

      <input type="text" id="input_msg" />
      <button id="btn_send" onClick={sendMessageHandler}>
        메세지 전송
      </button>

      <button id="btn_disconnect">연결 종료</button>
    </div>
  );
}
