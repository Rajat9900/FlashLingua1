import manImg from "../../assets/English man image.png"
import React, { useEffect, useRef,useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import man from "../../assets/englishReadingMAn.png"



const Language2 = () => {
    const waveformRef = useRef(null);
    const wavesurferRef = useRef(null);
    const [file, setFile] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
  
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
  

    const handlePlayPause = () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.playPause();
        }
      };

  
  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-6 m-auto text-center">
                    <p>Hello! Welcome</p>
                    <p style={{color:"#4CAF50",fontWeight:"600"}}>in English</p>
                    <p className="mb-5">Reading a journal in morning</p>
                
                        <img src={man} className='m-auto' alt="" />
                        <div id="waveform" ref={waveformRef}></div>
                        <input type="file" accept="audio/*" onChange={handleFileChange} className="form-control m-auto mt-4 " style={{ width: '400px'}}/>
                        <div className="mt-3" id="waveform" ref={waveformRef} style={{ width: '400px', height: '100px',margin:"auto" }}></div>
                        <button type="button" style={{width:"150px",height:"40px",borderRadius:"10px",marginLeft:"30px",border:"1px solid #E6E6E6"}}>Back</button>  
                        <button type="button" style={{background:"#4CAF50",width:"150px",height:"40px",borderRadius:"10px",marginLeft:"30px",color:"white"}}>Next</button>  
                        <p style={{fontWeight:"700",fontSize:"20px",color:"#4CAF50",cursor:"pointer"}} className="mt-3 mb-5"> swap language2s</p>
                        <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default Language2