import { VfxSoundController } from "./VfxController";

export class TimeController {
  protected static instance: TimeController = new TimeController();
  private static isPaused = false;
  private timeSpeed: number = 1000;
  private fastFoward = false;
  private interval: NodeJS.Timeout | null = null;
  private day = 1;
  private month = 0;
  private year = 0;

  private constructor() {
    this.timeSpeed = 1000;

    if (TimeController.instance) {
      throw new Error(
        "Error: Instantiation failed: Use TimeController.getInstance() instead of new."
      );
    }
    TimeController.instance = this;
  }

  public static getInstance() {
    return this.instance;
  }

  start() {
    this.interval = setInterval(() => {
      console.log(this.day);
      this.update();
    }, this.timeSpeed);
  }

  public static activeFastFoward() {
    if (TimeController.getInstance().interval) {
      clearInterval(TimeController.getInstance().interval!);
    }
    TimeController.getInstance().interval = setInterval(() => {
      console.log(TimeController.getInstance().day);
      TimeController.getInstance().update();
    }, 500);
  }

  public static disableFastFoward() {
    if (TimeController.getInstance().interval) {
      clearInterval(TimeController.getInstance().interval!);
    }
    TimeController.getInstance().interval = setInterval(() => {
      console.log(TimeController.getInstance().day);
      TimeController.getInstance().update();
    }, 1000);
  }

  public static resume() {
    if (TimeController.getInstance().interval) {
      TimeController.getInstance().interval = setInterval(() => {
        console.log(TimeController.getInstance().day);
        TimeController.getInstance().update();
      }, TimeController.getInstance().timeSpeed);
    }
  }
  public static togglePause() {
    if (TimeController.getInstance().interval) {
      if (TimeController.isPaused) {
        TimeController.isPaused = false;
        TimeController.resume();
        VfxSoundController.playSound("resume.mp3");
      } else {
        TimeController.isPaused = true;
        clearInterval(TimeController.getInstance().interval!);
        VfxSoundController.playSound("pause.mp3");
      }
    }
  }

  public update() {
    this.day++;
    if (this.day > 30) {
      this.day = 1;
      this.month++;
    }
    if (this.month > 12) {
      this.month = 1;
      this.year++;
    }
  }
  public static getTimeSpeed() {
    return this.instance.timeSpeed;
  }
  public static setTimeSpeed(timeSpeed: number) {
    this.instance.timeSpeed = timeSpeed;
  }
}
