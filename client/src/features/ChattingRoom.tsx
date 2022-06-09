import styled from "@emotion/styled";
import { useState } from "react";
import { Button } from "../components/button";
import {
  Input,
  INPUT_LINE_THEME,
  INPUT_STYLE_THEME,
} from "../components/input";

export function ChattingRoom() {
  const [inputValue, setInputValue] = useState("");

  return (
    <ChattingRoomWrapper>
      <InputWrapper>
        <Input
          lineTheme={INPUT_LINE_THEME.HORIZONTAL}
          styleTheme={INPUT_STYLE_THEME.OUTLINE}
          value={inputValue}
          onChange={setInputValue}
        />
        <Button label="전송" onClick={() => console.log()} />
      </InputWrapper>
    </ChattingRoomWrapper>
  );
}

const ChattingRoomWrapper = styled.div`
  background-color: #ffe6d1;
  padding: 0 10px;
  height: calc(100vh - 100px);
  margin: 10px auto;
  border-radius: 5px;
  position: relative;
`;

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
