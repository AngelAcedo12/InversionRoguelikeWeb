import { TimeController } from "./TimeController";

export class MusicController {
  public static instance: MusicController;
  private static isInit = false;
  private audioContext: AudioContext | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private sourceNode: AudioBufferSourceNode | null = null;
  public musicOn: boolean = true;
  private static path = "/music/";
  private static musicList: string[] = [
    "music1.mp3",
    "music2.mp3",
    "music3.mp3",
  ];

  private constructor() {
    MusicController.instance = this;
    this.initAudioContext();
  }

  private initAudioContext() {
    if (typeof window === "undefined") return; // Ejecutar solo en el navegador
    this.audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
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

  public async playMusic(src: string) {
    const instance = MusicController.getInstance();
    const audioUrl = `${MusicController.path}${src}`;

    if (instance?.audioContext) {
      try {
        // Stop any currently playing music
        if (instance.sourceNode) {
          instance.stopMusic();
        }
        if (instance.audioContext.state === "suspended") {
          await instance.audioContext.resume();
        }
        if (instance.audioContext.state === "closed") {
          instance.initAudioContext();
        }

        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        console.log("Reproduciendo música:", src);
        console.log("ArrayBuffer:", arrayBuffer);
        instance.audioBuffer = await instance.audioContext.decodeAudioData(
          arrayBuffer
        );
        console.log(MusicController.instance.audioContext);
        instance.playBuffer();
      } catch (error) {
        console.error("Error al reproducir música:", error);
      }
    }
  }

  private playBuffer() {
    if (this.audioContext && this.audioBuffer) {
      this.sourceNode = this.audioContext.createBufferSource();
      this.sourceNode.buffer = this.audioBuffer;
      this.sourceNode.connect(this.audioContext.destination);
      this.sourceNode.start(0);
      this.sourceNode.onended = () => {
        if (TimeController.fastFoward) {
          MusicController.getInstance().playFastFowardMusic();
        } else {
          this.onFinishedPlaying();
        }
      };
    }
  }

  public stopMusic() {
    if (this.sourceNode) {
      this.sourceNode.stop();
      this.sourceNode.disconnect();
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
