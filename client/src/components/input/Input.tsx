import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { ChangeEvent, KeyboardEvent, useRef } from "react";
import { IInput, INPUT_STYLE_THEME, INPUT_LINE_THEME } from "./types";

export function Input({
  label,
  styleTheme,
  lineTheme,
  placeholder,
  value,
  disabled,
  onEnter,
  onChange,
}: IInput) {
  const inputStyles = inputTheme[styleTheme];
  // const lineStyels = inputLineTheme[lineTheme];

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const onKeyupHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) {
      onEnter();
    }
  };

  return (
    <InputWrapper
      inputStyles={inputStyles}
      styleTheme={lineTheme}
      lineTheme={lineTheme}
    >
      {label && <LabelStyles>{label}</LabelStyles>}
      <InputStyled
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder ? placeholder : ""}
        onKeyUp={onKeyupHandler}
        disabled={disabled}
      />
    </InputWrapper>
  );
}

Input.defaultProps = {
  disabled: false,
};

const InputWrapper = styled.div<{
  inputStyles: SerializedStyles;
  styleTheme: string;
  lineTheme: string;
}>`
  box-sizing: border-box;
  ${({ inputStyles }) => inputStyles}
  ${({ styleTheme }) => {
    return css``;
  }}
  ${({ lineTheme }) => {
    switch (lineTheme) {
      case INPUT_LINE_THEME.HORIZONTAL:
        return css`
          display: flex;
          justify-content: left;
        `;

      case INPUT_LINE_THEME.VERTICAL:
        break;

      default:
        break;
    }
  }}
  padding: 5px;
`;

const InputStyled = styled.input`
  font-size: 15px;
  background: none;
  width: 100%;
  padding: 0;
  margin: 0;
  border: 0;
  :focus {
    outline: none;
  }
`;

const LabelStyles = styled.label`
  min-width: 80px;
  text-align: center;
`;

const inputTheme = {
  [INPUT_STYLE_THEME.DEFAULT]: css`
    background-color: #dbdbdb;
  `,
  [INPUT_STYLE_THEME.OUTLINE]: css`
    border: 1px solid blue;
  `,
  [INPUT_STYLE_THEME.BOTTOMLINE]: css`
    border-bottom: 1px solid blue;
  `,
};
