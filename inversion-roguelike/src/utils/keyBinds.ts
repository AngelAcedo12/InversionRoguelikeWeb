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
const fastFoward: KeyBindType = {
  actions: "fastFoward",
  key: "f",
  description: "Active fastFoward",
  action: (e) => {
    if (
      e.key === "f" &&
      !TimeController.isPaused &&
      !TimeController.fastFoward
    ) {
      TimeController.activeFastFoward();
    } else if (
      e.key === "f" &&
      !TimeController.isPaused &&
      TimeController.fastFoward
    ) {
      TimeController.disableFastFoward();
    }
  },
};

export const keyBinds = {
  pause,
  fastFoward,
};
