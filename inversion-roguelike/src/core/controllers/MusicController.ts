import { ConfigController } from "./ConfigController";
import { TimeController } from "./TimeController";

export class MusicController {
  public static instance: MusicController;
  private static isInit = false;
  private audioElement: HTMLAudioElement | null = null;
  public musicOn: boolean = true;
  private static path = "/music/";
  private static musicList: string[] = [
    "music1.mp3",
    "music2.mp3",
    "music3.mp3",
  ];

  private constructor() {
    MusicController.instance = this;
    this.initAudioElement();
  }

  private initAudioElement() {
    try {
      console.log("Creando elemento de audio");
      if (typeof window === "undefined") return; // Ejecutar solo en el navegador
      this.audioElement = new Audio();
      this.audioElement.volume =
        ConfigController.getInstance().getMusicVolume();
      console.log(this.audioElement.volume);
      this.audioElement = new Audio();
    } catch (error) {
      console.error("Error al crear el elemento de audio:", error);
      this.initAudioElement();
    } finally {
      this.audioElement = null;
    } // Si no se puede crear el elemento de audio, se asigna null
  }

  public static getInstance() {
    if (!MusicController.instance && !MusicController.isInit) {
      console.log("Creando instancia de MusicController");
      MusicController.isInit = true;
      MusicController.instance = new MusicController();
      MusicController.getInstance().configureReproductor();
    }
    return MusicController.instance;
  }

  private configureReproductor() {
    this.loadAndPlayMusic();
  }

  private loadAndPlayMusic() {
    if (this.musicOn) {
      MusicController.getInstance().playRandomMusic();
    }
  }

  public playRandomMusic() {
    const randomIndex = Math.floor(
      Math.random() * MusicController.musicList.length
    );
    MusicController.getInstance().playMusic(
      MusicController.musicList[randomIndex]
    );
  }

  public playFastFowardMusic() {
    this.playMusic("fastfoward.mp3");
  }

  public playMusic(src: string) {
    const instance = MusicController.getInstance();
    const audioUrl = `${MusicController.path}${src}`;

    if (instance?.audioElement) {
      instance.audioElement.src = audioUrl;
      instance.audioElement
        .play()
        .then(() => {
          console.log("Reproduciendo música:", src);
        })
        .catch((error) => {
          console.error("Error al reproducir música:", error);
        });

      instance.audioElement.onended = () => {
        if (TimeController.fastFoward) {
          MusicController.getInstance().playFastFowardMusic();
        } else {
          this.onFinishedPlaying();
        }
      };
    }
  }
  public setVolume(volume: number) {
    if (this.audioElement) {
      this.audioElement.volume = volume;
    }
  }

  public stopMusic() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
  }

  public toggleMusic() {
    this.musicOn = !this.musicOn;
    if (this.musicOn) {
      MusicController.getInstance().playRandomMusic();
    } else {
      this.stopMusic();
    }
  }

  private onFinishedPlaying() {
    MusicController.getInstance().playRandomMusic();
  }
}
