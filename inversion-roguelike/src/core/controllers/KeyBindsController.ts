import { keyBinds } from "@/utils/keyBinds";
import { KeyBindInterface } from "../interface/keyBindInterface";

export class KeyBindsController {
  static keyBinds: KeyBindInterface[] = [];
  static bindKey(keyBind: KeyBindInterface) {
    this.keyBinds.push(keyBind);
  }
  static unbindKey(key: string) {
    const keyBind = this.keyBinds.filter((keyBind) => keyBind.key !== key)[0];
    keyBind.action = () => {};
  }
  static bindKeys() {
    this.keyBinds = Object.values(keyBinds);
    console.log(keyBinds);
    window.addEventListener("keydown", (event) => {
      const key = event.key;
      const keyBind = this.keyBinds.filter((keyBind) => keyBind.key == key)[0];
      if (keyBind) {
        keyBind.action(event);
      }
    });
  }
}
