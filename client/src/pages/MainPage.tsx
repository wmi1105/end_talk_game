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
    if (inputValue !== "") setRoomState({ name: inputValue, roomId: "" });
  };

  return (
    <MainPageStyled>
      <Input
        lineTheme={INPUT_LINE_THEME.HORIZONTAL}
        styleTheme={INPUT_STYLE_THEME.DEFAULT}
        value={inputValue}
        onChange={setInputValue}
        onEnter={onClickHandler}
      />
      <Button label="입장" onClick={onClickHandler} />
    </MainPageStyled>
  );
}

const MainPageStyled = styled.div`
  display: flex;
  justify-content: center;
  margin-top: calc(100vh - 50% - 16px);
`;
