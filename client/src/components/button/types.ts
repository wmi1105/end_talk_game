export enum BUTTON_THEME {
  DEFAULT = "DEFAULT",
  OUTLINE = "OUTLINE",
}

export enum BUTTON_SIZE {
  AUTO = "AUTO",
  FULL = "FULL",
}

export interface IButton {
  /**
   * Button Theme
   */
  theme: BUTTON_THEME;
  /**
   * button width wize auto or full
   */
  size: BUTTON_SIZE;
  /**
   * Button Label
   */
  label: string;
  /**
   * Button is Disable?
   */
  isDisable: boolean;
  /**
   * Button Click Event
   */
  onClick: () => void;
}
