import { MusicController } from "./MusicController";
import { VfxSoundController } from "./VfxController";

export class TimeController {
  protected static instance: TimeController = new TimeController();
  public static isPaused = false;
  private timeSpeed: number = 1000;
  public static fastFoward = false;
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

    // Asegúrate de que solo se llame en el cliente
    if (typeof window !== "undefined") {
      MusicController.getInstance().playRandomMusic();  // Usando el singleton de MusicController
    }
  }

  public static activeFastFoward() {
    const instance = TimeController.getInstance();
    if (instance.interval) {
      clearInterval(instance.interval!);
    }
    instance.interval = setInterval(() => {
      console.log(instance.day);
      instance.update();
    }, 500);
    
    // Asegúrate de que solo se llame en el cliente
    if (typeof window !== "undefined") {
      MusicController.getInstance().playFastFowardMusic(); // Usando el singleton de MusicController
    }
    
    TimeController.fastFoward = true;
  }

  public static disableFastFoward() {
    const instance = TimeController.getInstance();
    if (instance.interval) {
      clearInterval(instance.interval!);
    }
    instance.interval = setInterval(() => {
      console.log(instance.day);
      instance.update();
    }, 1000);

    // Asegúrate de que solo se llame en el cliente
    if (typeof window !== "undefined") {
      MusicController.getInstance().playRandomMusic(); // Usando el singleton de MusicController
    }

    TimeController.fastFoward = false;
  }

  public static resume() {
    const instance = TimeController.getInstance();
    if (instance.interval) {
      instance.interval = setInterval(() => {
        console.log(instance.day);
        instance.update();
      }, instance.timeSpeed);
    }
  }

  public static togglePause() {
    const instance = TimeController.getInstance();
    if (instance.interval) {
      if (TimeController.isPaused) {
        TimeController.isPaused = false;
        TimeController.resume();
        VfxSoundController.playSound("resume.mp3");
      } else {
        TimeController.isPaused = true;
        clearInterval(instance.interval!);
        VfxSoundController.playSound("pause.mp3");

        TimeController.fastFoward = false;
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
