import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { MessageType } from "../store/controlState";

function ChatBox({ isMe, msg }: { isMe: boolean; msg: MessageType }) {
  if (msg.type !== "msg") {
    return (
      <ChatWrapper align="center">
        <ChatBoxStyled>{msg.message}</ChatBoxStyled>
      </ChatWrapper>
    );
  } else if (isMe) {
    return (
      <ChatWrapper align="right">
        <ChatBoxStyled>
          <MsgBox>{msg.message}</MsgBox>
          <IdBox>{msg.name}</IdBox>
        </ChatBoxStyled>
      </ChatWrapper>
    );
  } else {
    return (
      <ChatWrapper align="left">
        <ChatBoxStyled>
          <IdBox>{msg.name}</IdBox>
          <MsgBox>{msg.message}</MsgBox>
        </ChatBoxStyled>
      </ChatWrapper>
    );
  }
}

export function ChatMessageBox({
  userName,
  messages,
}: {
  userName: string;
  messages: MessageType[];
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <MessageBoxWrapper>
      {messages.map((msg, idx) => {
        const isMe = msg.name === userName;
        return <ChatBox key={idx} isMe={isMe} msg={msg} />;
      })}
      <div ref={scrollRef} />
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

const ChatBoxStyled = styled.div`
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
