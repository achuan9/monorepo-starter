export interface ButtonProps {
  /** The type of the button */
  type?: "primary" | "secondary" | "tertiary";
  /** The size of the button */
  size?: "small" | "medium" | "large";
  /** Whether the button is disabled */
  disabled?: boolean;
}

export interface ButtonSlots {
  default(): any;
}

export type ButtonEmits = {
  click: [];
};
