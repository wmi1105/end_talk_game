export enum INPUT_STYLE_THEME {
  DEFAULT = "DEFAULT",
  OUTLINE = "OUTLINE",
  BOTTOMLINE = "BOTTOMLINE",
}

export enum INPUT_LINE_THEME {
  VERTICAL = "VERTICAL",
  HORIZONTAL = "HORIZONTAL",
}

export enum INPUT_SIZE_THEME {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export interface IInput {
  label?: string;
  styleTheme: INPUT_STYLE_THEME;
  lineTheme: INPUT_LINE_THEME;
  placeholder?: string;
  value: string;
  onEnter?: () => void;
  onChange: (val: string) => void;
}

export interface IInputSocialNumber {
  onValue: (value: string[]) => void;
}
