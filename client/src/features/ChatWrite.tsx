import styled from "@emotion/styled";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { Button } from "../components/button";
import {
  Input,
  INPUT_LINE_THEME,
  INPUT_STYLE_THEME,
} from "../components/input";
import { SendChatState } from "../store/controlState";

export function ChatWrite() {
  const [inputValue, setInputValue] = useState("");
  const setSendChatState = useSetRecoilState(SendChatState);

  const onSendHandler = () => {
    if (inputValue !== "") {
      setSendChatState(inputValue);
      setInputValue("");
    }
  };

  return (
    <InputWrapper>
      <Input
        lineTheme={INPUT_LINE_THEME.HORIZONTAL}
        styleTheme={INPUT_STYLE_THEME.OUTLINE}
        value={inputValue}
        onChange={setInputValue}
        onEnter={onSendHandler}
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
