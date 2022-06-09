import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { BUTTON_SIZE, BUTTON_THEME, IButton } from "./types";

export function Button({ theme, size, label, isDisable, onClick }: IButton) {
  const buttonStyles = ButtonTheme[theme];
  const buttonSizes = ButtonSize[size];

  return (
    <ButtonStyled
      buttonStyles={buttonStyles}
      buttonSizes={buttonSizes}
      onClick={onClick}
      disabled={isDisable}
    >
      {label}
    </ButtonStyled>
  );
}

Button.defaultProps = {
  theme: BUTTON_THEME.DEFAULT,
  size: BUTTON_SIZE.AUTO,
  isDisable: false,
};

interface ButtonStyles {
  buttonStyles: SerializedStyles;
  buttonSizes: SerializedStyles;
}

const ButtonStyled = styled.button<ButtonStyles>`
  ${(props) => props.buttonStyles}
  ${(props) => props.buttonSizes}
  ${(props) => {
    if (props.disabled) {
      return css`
        background-color: gray;
      `;
    }
  }}
  border: 1px solid #4549cf;
  border-radius: 5px;
  padding: 5px 11px;
`;

const ButtonTheme = {
  [BUTTON_THEME.DEFAULT]: css`
    background: #2027e6;
    color: #fff;
  `,
  [BUTTON_THEME.OUTLINE]: css`
    background: #fff;
    color: #4549cf;
  `,
};

const ButtonSize = {
  [BUTTON_SIZE.AUTO]: css`
    width: auto;
  `,
  [BUTTON_SIZE.FULL]: css`
    width: 100%;
  `,
};
