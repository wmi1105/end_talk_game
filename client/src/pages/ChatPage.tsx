import styled from "@emotion/styled";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "../components/button";
import { ChatMessageBox } from "../features/ChatMessageBox";
import { ChatWrite } from "../features/ChatWrite";
import { ChatState, RoomState } from "../store/controlState";

export function ChatPage({ onStart }: { onStart: () => void }) {
  const [roomState, setRoomState] = useRecoilState(RoomState);
  const chatState = useRecoilValue(ChatState);

  const onClickExit = () => {
    setRoomState((prev) => ({ ...prev, name: "" }));
  };

  return (
    <ChatPageStyled>
      <ButtonWrapper>
        {roomState.master === roomState.name && (
          <Button label="시작" onClick={onStart} />
        )}
        <Button label="나가기" onClick={onClickExit} />
      </ButtonWrapper>
      <ChattingRoomWrapper>
        <ChatMessageBox userName={roomState.name} messages={chatState} />
        <ChatWrite />
      </ChattingRoomWrapper>
    </ChatPageStyled>
  );
}

const ChatPageStyled = styled.div`
  /* background-color: #ffe6d1;
  padding: 0 10px;
  height: calc(100vh - 100px);
  margin: 10px auto;
  border-radius: 5px;
  position: relative; */
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  gap: 10px;
`;

const ChattingRoomWrapper = styled.div`
  background-color: #ffe6d1;
  padding: 0 10px;
  height: calc(100vh - 100px);
  margin: 10px auto;
  border-radius: 5px;
  position: relative;
`;
