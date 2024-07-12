import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import { IoPauseSharp } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa';
const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#eee",
   progressColor: '#4CAF50',
          cursorColor: '#4CAF50',
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 30,
  width:130,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true
});

export default function Waveform({ url }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [remainingtime, setRemainingtime] = useState(0);
const formatTime = (seconds) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')
  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false);
    


    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function() {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
        


        
      }

      wavesurfer.current.on('audioprocess', function() {
          if (wavesurfer.current.isPlaying()) {
            var totalTime = wavesurfer.current.getDuration(),
                currentTime = wavesurfer.current.getCurrentTime(),
                remainingTime = totalTime - currentTime;
                
           setRemainingtime(remainingTime);
          };
      })


   
    

   
});

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [url]);


  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const onVolumeChange = e => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  return (
    <div>
     
      <div className="flex">
        
        <button style={{ marginRight: '18px', display: 'block', width: 'fit-content' }} onClick={handlePlayPause}>
                  {playing ? <IoPauseSharp style={{ color: '#4CAF50' }} /> : <FaPlay style={{ color: '#4CAF50' }} />}
                </button>

                 <div id="waveform" ref={waveformRef} />
                 <div style={{ width: 'fit-content', marginTop: '6px' }}>
                  <p style={{ fontWeight: '600',color:"rgb(76 175 80)" }}>{formatTime(remainingtime)}</p>
                {/* <button onClick={()=>deleteAudio('english')}>cancel</button> */}
                </div>
        
      </div>
    </div>
  );
}
