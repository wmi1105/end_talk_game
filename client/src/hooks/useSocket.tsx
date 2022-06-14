import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { connect, Socket } from "socket.io-client";

import {
  ChatState,
  ReceiveType,
  RoomState,
  SendChatState,
} from "../store/controlState";

export function useSocket() {
  const socket = useRef<Socket>();
  const name = useRef<String>("");

  const [displayState, setDisplayState] = useState("MAIN");

  const [roomState, setRoomState] = useRecoilState(RoomState);
  const [chatMessages, setMessages] = useRecoilState(ChatState);

  const [sendChatMessage, setSendChatMessage] = useRecoilState(SendChatState);

  const socketConnection = useCallback(() => {
    if (socket.current) {
      socket.current.emit("init", { name: roomState.name });

      socket.current.on("receive message", (receive: ReceiveType) => {
        console.log(`name : ${receive.name} , message :${receive.message}`);

        let message = receive.message;
        switch (receive.type) {
          case "init":
            setRoomState((prev) => ({
              ...prev,
              master: receive.master,
              roomId: receive.roomId,
            }));
            message = `${receive.name} 님이 입장 하였습니다.`;

            name.current = roomState.name;
            break;

          case "out":
            message = `${receive.name} 님이 퇴장 하였습니다.`;
            break;

          default:
            break;
        }

        setMessages((prev) => [
          ...prev,
          { type: receive.type, name: receive.name, message },
        ]);
      });

      socket.current.on(
        "receive game ctrl",
        (receive: {
          nowTern: string;
          nextTern: string;
          verify: boolean;
          suggestion: string;
          message: string;
        }) => {
          console.log(receive);

          if (receive.verify) {
            //성공, 다음 tern,
            if (receive.nowTern === "" && receive.message === "") {
              setMessages([{ name: "", type: "start", message: "시작! " }]);
            } else {
              setMessages((prev) => [
                ...prev,
                {
                  name: receive.nowTern,
                  type: "msg",
                  message: receive.message,
                },
              ]);
            }

            setSendChatMessage({
              tern: receive.nextTern,
              suggestion: receive.suggestion,
              send: "",
            });
          } else {
            //실패, 게임종료
            setMessages((prev) => [
              ...prev,
              {
                name: receive.nowTern,
                type: "msg",
                message: receive.message,
              },
              {
                name: receive.nowTern,
                type: "fail",
                message: `탈락!`,
              },
            ]);
          }
        }
      );
    } else {
      //서버 연결상태 불량
    }
  }, [roomState, setMessages, setRoomState, setSendChatMessage]);

  // const ioConnect = (name: string) => {
  //   setRoomState((prev) => ({ ...prev, name }));
  // };

  const sendMessage = useCallback(
    (message: string) => {
      if (socket.current) {
        socket.current.emit("send message", { ...roomState, message });
      }
    },
    [roomState]
  );

  const disconnect = useCallback(() => {
    if (socket.current) {
      //   socket.current.close();
      socket.current.emit("exit", { ...roomState, name: name.current });
      setRoomState({ roomId: "", master: "", name: "" });
      name.current = "";
      setDisplayState("MAIN");
    }
  }, [roomState, setRoomState]);

  useEffect(() => {
    const serverConnect = connect("http://127.0.0.1:8080", {
      path: "/socket.io",
      transports: ["websocket"],
    });

    socket.current = serverConnect;
  }, []);

  const onStart = () => {
    if (socket.current) {
      //   socket.current.close();
      socket.current.emit("game start", { roomId: roomState.roomId });
    }
  };

  useEffect(() => {
    if (roomState.roomId === "" && roomState.name !== "") socketConnection();
    if (roomState.roomId !== "" && roomState.name !== "")
      setDisplayState("CHAT");
    if (roomState.roomId !== "" && roomState.name === "") disconnect();
  }, [roomState, socketConnection, disconnect]);

  useEffect(() => {
    if (sendChatMessage.send !== "") sendMessage(sendChatMessage.send);
  }, [sendChatMessage, sendMessage]);

  useEffect(() => {
    return () => {
      disconnect();
      socket.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    displayState,
    // ioConnect,
    sendMessage,
    disconnect,
    onStart,
  };
}
