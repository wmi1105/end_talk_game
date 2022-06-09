import styled from "@emotion/styled";
import { useState } from "react";
import { Button } from "../components/button";
import {
  Input,
  INPUT_LINE_THEME,
  INPUT_STYLE_THEME,
} from "../components/input";

export function ControlRoom({
  onConnect,
  onDisconnect,
}: {
  onConnect: (name: string) => void;
  onDisconnect: () => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const onClickHandler = () => {
    if (inputValue !== "") onConnect(inputValue);
  };

  return (
    <WaitingRoomWrapper>
      <Input
        lineTheme={INPUT_LINE_THEME.HORIZONTAL}
        styleTheme={INPUT_STYLE_THEME.DEFAULT}
        value={inputValue}
        onChange={setInputValue}
        onEnter={onClickHandler}
      />
      <Button label="입장" onClick={onClickHandler} />
      <Button label="나가기" onClick={onDisconnect} />
    </WaitingRoomWrapper>
  );
}

const WaitingRoomWrapper = styled.div`
  display: flex;
`;
