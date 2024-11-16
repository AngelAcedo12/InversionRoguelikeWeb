export class ConfigController {
  public static instance: ConfigController;
  private masterVolume: number = 0;
  private musicVolume: number = 0;
  private vfxVolume: number = 0;

  private constructor() {
    ConfigController.instance = this;
  }

  public static getInstance(): ConfigController {
    if (!ConfigController.instance) {
      ConfigController.instance = new ConfigController();
    }
    return ConfigController.instance;
  }

  public init() {
    this.masterVolume = 1;
    this.musicVolume = 1;
    this.vfxVolume = 1;
  }

  public setMasterVolume(volume: number) {
    this.masterVolume = volume;
  }
  public setMusicVolume(volume: number) {
    this.musicVolume = volume;
  }
  public setVfxVolume(volume: number) {
    this.vfxVolume = volume;
  }
  public getMasterVolume() {
    return this.masterVolume;
  }
  public getMusicVolume() {
    return this.musicVolume;
  }
  public getVfxVolume() {
    return this.vfxVolume;
  }
}
