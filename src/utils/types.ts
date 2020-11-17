export interface UserDevices {
  videoInDevices: MediaDeviceInfo[] | null;
  audioInDevices: MediaDeviceInfo[] | null;
}

export type VideoType = "camera" | "display" | null;

export interface MediaConfig {
  video: boolean
  mic: boolean
  settings: boolean
}
