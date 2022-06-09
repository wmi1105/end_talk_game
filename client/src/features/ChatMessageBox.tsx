import styled from "@emotion/styled";
import { useMemo } from "react";
import { ReceiveType } from "./Chat_types";

export function ChatMessageBox({
  userName,
  messages,
}: {
  userName: string;
  messages: ReceiveType[];
}) {
  const state: { [key: string]: string } = {
    init: "입장",
    out: "퇴장",
    msg: "",
  };

  return (
    <MessageBoxWrapper>
      {messages.map((msg, idx) => {
        const isMe = msg.name === userName;
        if (msg.type !== "msg") {
          return (
            <ChatWrapper align="center">
              <ChatBox>
                {msg.name} 님이 {state[msg.type]} 하였습니다.
              </ChatBox>
            </ChatWrapper>
          );
        } else if (isMe) {
          return (
            <ChatWrapper align="right">
              <ChatBox>
                <MsgBox>{msg.message}</MsgBox>
                <IdBox>{msg.name}</IdBox>
              </ChatBox>
            </ChatWrapper>
          );
        } else {
          return (
            <ChatWrapper align="left">
              <ChatBox>
                <IdBox>{msg.name}</IdBox>
                <MsgBox>{msg.message}</MsgBox>
              </ChatBox>
            </ChatWrapper>
          );
        }
      })}
    </MessageBoxWrapper>
  );
}

const MessageBoxWrapper = styled.div`
  position: absolute;
  top: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 10px - 50px);
  overflow-y: auto;
`;

const ChatWrapper = styled.div<{ align: "left" | "right" | "center" }>`
  width: 100%;
  display: flex;
  justify-content: ${({ align }) => align};
`;

const ChatBox = styled.div`
  max-width: 500px;
  display: flex;
  margin-bottom: 10px;
`;

const IdBox = styled.span`
  padding: 5px 10px;
`;
const MsgBox = styled.span`
  padding: 5px 10px;
  background-color: white;
  border-radius: 10px;
  word-break: break-all;
  text-overflow: ellipsis;
`;
