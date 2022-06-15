import styled from "@emotion/styled";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { Button } from "../components/button";
import {
  Input,
  INPUT_LINE_THEME,
  INPUT_STYLE_THEME,
} from "../components/input";
import { RoomState } from "../store/controlState";

export function MainPage() {
  const [roomState, setRoomState] = useRecoilState(RoomState);
  const [inputValue, setInputValue] = useState("");

  const onClickHandler = () => {
    if (inputValue !== "")
      setRoomState({
        name: inputValue,
        roomId: "",
        master: "",
        gameState: false,
      });
  };

  return (
    <MainPageStyled>
      닉네임을 입력해 주세요.
      <InputWrapper>
        <Input
          lineTheme={INPUT_LINE_THEME.HORIZONTAL}
          styleTheme={INPUT_STYLE_THEME.DEFAULT}
          value={inputValue}
          onChange={setInputValue}
          onEnter={onClickHandler}
        />
        <Button label="입장" onClick={onClickHandler} />
      </InputWrapper>
    </MainPageStyled>
  );
}

const MainPageStyled = styled.div`
  margin-top: calc(100vh - 50% - 16px);
  text-align: center;
`;

const InputWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
`;
