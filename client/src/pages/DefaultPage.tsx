import styled from "@emotion/styled";
import { ChattingRoom } from "../features/ChattingRoom";
import { ControlRoom } from "../features/ControlRoom";
import { useSocket } from "../hooks/useSocket";

export function DefaultPage() {
  const { ioConnect, sendMessage, disconnect } = useSocket();

  return (
    <Container>
      <Section>
        <ControlRoom onConnect={ioConnect} onDisconnect={disconnect} />
        <ChattingRoom />
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
