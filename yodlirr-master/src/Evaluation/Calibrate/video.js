import React from 'react';
import '../../../node_modules/video-react/dist/video-react.css'  // import css
import {
  Player, ControlBar, ReplayControl,
  ForwardControl, CurrentTimeDisplay,
  TimeDivider, PlaybackRateMenuButton, VolumeMenuButton
} from 'video-react';
import YouTube from './youtube';

export default (props) => {
  debugger;
  let isYoutube = false
  let videoId = props.src
  if (props.src.includes("youtu")) {
    isYoutube = true
    if (props.src.includes("youtu")) {
      videoId = videoId.split("/")
      videoId = videoId[videoId.length - 1]
    } else {

    }

  } else {
    isYoutube = false
  }
  if (isYoutube) {
    return (<YouTube videoId={videoId} />)
   
  }
  else {
    return (
      <Player
        playsInline
        poster="/assets/poster.png"
        src={props.src}
      />
    );
  }

};