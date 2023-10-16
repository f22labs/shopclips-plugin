import { useEffect, useState, JSX, useReducer, useRef } from "uelements";
import SmallComponent from "./Components/SmallComponent";
import { Crossicon, Muteicon, UnMuteicon } from "./assets/Icons";
import { State, Action } from "./types/index";

function reducer(state: State, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case "SETTOGGLE":
      return { ...state, toggleOpen: !state.toggleOpen };
    case "SETVIDEOLENGTH":
      return { ...state, videolength: payload };
    case "SETToggle":
      return { ...state, ismute: !state.ismute };
  }
}

const initialState = {
  toggleOpen: false,
  videolength: null,
  ismute: false,
};

function App({ dataURL }: { dataURL: string }): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  const videoEl = useRef<HTMLVideoElement>(null);
  const [count, setCount] = useState(0);

  const handlePopup = (event: MouseEvent): void => {
    dispatch({
      type: "SETTOGGLE",
      payload: undefined,
    });
  };

  const handleLoadedMetadata = () => {
    const video = videoEl.current!;
    if (!video) return;
    // video.pause();
    dispatch({ type: "SETVIDEOLENGTH", payload: video.duration });
  };

  useEffect(() => {
    videoEl.current!?.addEventListener("timeupdate", handleTimeUpdate);
    // videoEl?.current?.play();
    return () => {
      videoEl.current!?.removeEventListener("timeupdate", () => setCount(0));
    };
  }, [videoEl.current]);

  const handleTimeUpdate = () => {
    const progress = (videoEl.current!?.currentTime / state.videolength!) * 100;
    setCount(progress);
  };

  const handleToogle = () => {
    // dispatch({ type: "SETToggle" });
    if (!state.ismute) {
      videoEl.current!.muted = true;
    } else {
      videoEl.current!.muted = false;
    }
  };

  if (state.toggleOpen) {
    return (
      <div>
        <div className="overlay-thing"></div>
        <div className="video-box">
          {state.videolength ? (
            <>
              <div
                className="playbar"
                style={{
                  gridTemplateColumns: ` repeat($1 ,1fr)  `,
                }}
              >
                <div className="playbarinline__wrapper">
                  <div
                    style={{
                      display: "block !important",
                      transform: `scaleX(${count / 100})`,
                    }}
                    className={`playbarinline   `}
                  ></div>
                  <div className="playbarinline__background"></div>
                </div>
              </div>
              <div className="muteop" onClick={handleToogle}>
                {!state.ismute ? <Muteicon /> : <UnMuteicon />}
              </div>
              <div className="crossiconop" onClick={handlePopup}>
                <Crossicon />
              </div>
            </>
          ) : (
            ""
          )}

          <video
            ref={videoEl}
            src={
              "https://f22videoplugin.s3.ap-northeast-1.amazonaws.com/lapp/lappintro.mp4"
            }
            onLoadedMetadata={handleLoadedMetadata}
            autoPlay
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <div onClick={handlePopup} > */}
      <SmallComponent
        video={
          "https://f22videoplugin.s3.ap-northeast-1.amazonaws.com/lapp/lappintro.mp4"
        }
        handlePopup={handlePopup}
      />
      {/* </div> */}
    </>
  );
}

export default App;
