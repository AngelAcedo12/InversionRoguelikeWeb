export class VfxSoundController {
  static reproductor = new Audio();
  static path = "/vfx/";
  static queue: string[] = [];
  static isPlaying = false;

  constructor() {}

  public static playSound(src: string) {
    this.queue.push(this.path + src);
    if (!this.isPlaying) {
      this.playNext();
    }
  }

  private static playNext() {
    if (this.queue.length === 0) {
      this.isPlaying = false;
      return;
    }

    this.isPlaying = true;
    const nextSrc = this.queue.shift();
    this.reproductor.src = nextSrc!;
    this.reproductor.play();
    this.reproductor.onended = () => {
      this.playNext();
    };
  }
}
