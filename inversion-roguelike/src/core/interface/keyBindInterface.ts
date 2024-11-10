export interface KeyBindInterface {
  actions: string;
  key: string;
  description: string;
  action: (e: KeyboardEvent) => void;
}

export type KeyBindType = KeyBindInterface;
