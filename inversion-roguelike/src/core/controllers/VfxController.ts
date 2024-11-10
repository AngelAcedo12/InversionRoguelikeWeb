export class VfxSoundController {
  static reproductor = new Audio();
  static path = "/vfx/";
  constructor() {}

  public static playSound(src: string) {
    this.reproductor.src = this.path + src;
    this.reproductor.play();
  }
}
