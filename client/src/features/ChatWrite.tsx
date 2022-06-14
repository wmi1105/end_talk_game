import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "../components/button";
import {
  Input,
  INPUT_LINE_THEME,
  INPUT_STYLE_THEME,
} from "../components/input";
import { RoomState, SendChatState } from "../store/controlState";

export function ChatWrite() {
  const [inputValue, setInputValue] = useState("");
  const [sendChatState, setSendChatState] = useRecoilState(SendChatState);
  const { name } = useRecoilValue(RoomState);
  const { send, suggestion, tern } = sendChatState;

  console.log(tern, name);

  const onSendHandler = () => {
    const suggestion = sendChatState.suggestion;

    if (
      inputValue !== "" &&
      (suggestion === "" || inputValue[0] === suggestion)
    ) {
      setSendChatState((prev) => ({ ...prev, send: inputValue }));
      setInputValue("");
    }
  };

  useEffect(() => {
    if (tern === name) setInputValue(sendChatState.suggestion);
  }, [sendChatState, tern, name]);

  return (
    <InputWrapper>
      <Input
        lineTheme={INPUT_LINE_THEME.HORIZONTAL}
        styleTheme={INPUT_STYLE_THEME.OUTLINE}
        value={inputValue}
        onChange={setInputValue}
        onEnter={onSendHandler}
        disabled={tern !== name}
      />
      <Button label="전송" onClick={onSendHandler} />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  position: absolute;
  background-color: white;
  width: calc(100% - 10px);
  bottom: 5px;
  left: 5px;
  display: flex;
  justify-content: space-between;
  > div {
    width: calc(100% - 50px);
  }
`;
