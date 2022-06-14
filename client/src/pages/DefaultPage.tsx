import styled from "@emotion/styled";

import { useSocket } from "../hooks/useSocket";
import { ChatPage } from "./ChatPage";
import { MainPage } from "./MainPage";

export function DefaultPage() {
  const { displayState, onStart } = useSocket();

  return (
    <Container>
      <Section>
        {displayState === "MAIN" && <MainPage />}
        {displayState === "CHAT" && <ChatPage onStart={onStart} />}
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
