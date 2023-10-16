import { MutableRef, StateUpdater } from "preact/hooks";

export interface cssvalinterface {
  bottom?: string;
  right?: string;
  left?: string;
  top?: string;
  transform: string;
}

export interface LargeComponentprops {
  cssval: cssvalinterface;
  handleCloseforlargesize: () => void;
  video: string;
  videoEl: MutableRef<HTMLVideoElement | null>;
  handlemuted: () => void;
  muted: boolean;
  handleChange: (e: string) => void;
  show: boolean;
  buttons: never[];
}

export interface SmallComponentprops {
  video: string;
  handlePopup: (event: MouseEvent) => void;
}

export interface CustomButtomprops {
  show: boolean;
  buttons: any;
  handleChange: (e: string) => void;
  handletoast: () => void;
  setPause?: any;
  setCurrentTime: StateUpdater<number>;
  setShowPause: StateUpdater<boolean>;
}

export type State = {
  toggleOpen: boolean;
  videolength: number | null;
  ismute: boolean;
};

export type Action =
  | { type: "SETTOGGLE"; payload: any }
  | { type: "SETVIDEOLENGTH"; payload: any }
  | { type: "SETToggle"; payload: any };
