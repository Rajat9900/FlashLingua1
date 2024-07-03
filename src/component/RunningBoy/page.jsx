import manImg from "../../assets/English man image.png"
import React, { useEffect, useRef,useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import runningBoy from "../../assets/RunningBoy.png"


const RunningBoy = () => {
    const waveformRef = useRef(null);
    const wavesurferRef = useRef(null);
    const [file, setFile] = useState(null);
  
    useEffect(() => {
      if (waveformRef.current) {
        wavesurferRef.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: '#4CAF50',
          progressColor: 'purple',
          cursorColor: 'red',              
          cursorWidth: 1,                   
          barWidth: 2,                      
          barHeight: 1,                     
          barGap: 2,                        
          height: 50,                      
          responsive: true,                 
          scrollParent: true,               
          normalize: true,                  
          hideScrollbar: true,              
          partialRender: true,              
          minPxPerSec: 50,                  
          pixelRatio: 1,                    
          interact: true,                  
          splitChannels: false,             
          forceDecode: false,         
          backgroundColor: 'grey',     
          plugins: []  

        });
  
      
        return () => {
          if (wavesurferRef.current) {
            wavesurferRef.current.destroy();
          }
        };
      }
    }, []);
  
    useEffect(() => {
      if (file && wavesurferRef.current) {
        // Load the selected file
        const reader = new FileReader();
        reader.onload = (event) => {
          wavesurferRef.current.load(event.target.result);
          wavesurferRef.current.on('ready', () => {
            console.log('WaveSurfer is ready');
            wavesurferRef.current.play();
          });
        };
        reader.readAsDataURL(file);
      }
    }, [file]);
  
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
      }
    };
  

    const handlePause = () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.pause();
        }
      };

  
  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-6 m-auto text-center">
                      
                        <img src={runningBoy} className='m-auto' alt="" />
                        <div id="waveform" ref={waveformRef}></div>
                        <input type="file" accept="audio/*" onChange={handleFileChange} className="form-control m-auto mt-4 " style={{ width: '400px'}}/>
                        <div className="mt-3" id="waveform" ref={waveformRef} style={{ width: '400px', height: '100px',margin:"auto" }}></div>
                        <button type="button" style={{width:"150px",height:"40px",borderRadius:"10px",marginLeft:"30px",border:"1px solid #E6E6E6"}}>Back</button>  
                        <button type="button" style={{background:"#4CAF50",width:"150px",height:"40px",borderRadius:"10px",marginLeft:"30px",color:"white"}}>Next</button>  
                        <p style={{fontWeight:"700",fontSize:"20px",color:"#4CAF50",cursor:"pointer"}} className="mt-3 mb-5"> swap languages</p>
                        <button onClick={handlePause}>Pause</button>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default RunningBoy