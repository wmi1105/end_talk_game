import styled from "@emotion/styled";
import { ChatMessageBox } from "../features/ChatMessageBox";
import { ChatWrite } from "../features/ChatWrite";
import { ConnectionCtrl } from "../features/ConnectionCtrl";
import { useSocket } from "../hooks/useSocket";

export function DefaultPage() {
  const { userName, chatMessages, ioConnect, sendMessage, disconnect } =
    useSocket();

  return (
    <Container>
      <Section>
        <ConnectionCtrl onConnect={ioConnect} onDisconnect={disconnect} />
        <ChattingRoomWrapper>
          <ChatMessageBox userName={userName} messages={chatMessages} />
          <ChatWrite onSend={sendMessage} />
        </ChattingRoomWrapper>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  background-color: gray;
  height: 100vh;
`;

const Section = styled.div`
  width: 80%;
  margin: auto;
  padding: 10px;
  background-color: white;
  height: calc(100% - 20px);
`;
const ChattingRoomWrapper = styled.div`
  background-color: #ffe6d1;
  padding: 0 10px;
  height: calc(100vh - 100px);
  margin: 10px auto;
  border-radius: 5px;
  position: relative;
`;
