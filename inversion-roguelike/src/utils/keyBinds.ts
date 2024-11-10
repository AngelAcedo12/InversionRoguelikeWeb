import { TimeController } from "@/core/controllers/TimeController";
import { KeyBindType } from "./../core/interface/keyBindInterface";


const pause: KeyBindType = {
  actions: "pause",
  key: " ",
  description: "Pause the game",
  action: (e) => {
    if (e.key === " ") {
      TimeController.togglePause();
     
    }
  },
};

export const keyBinds = {
  pause,
};
