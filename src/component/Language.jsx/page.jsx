import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import man from "../../assets/englishReadingMAn.png";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { IoPauseSharp } from "react-icons/io5";

const Language = () => {
    const waveformRef = useRef(null);
    const wavesurferRef = useRef(null);
    const [file, setFile] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    
    useEffect(() => {
        if (waveformRef.current) {
            wavesurferRef.current = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#4CAF50',
                progressColor: '#4CAF50',
                cursorColor: '#4CAF50',
                cursorWidth: 2,
                barWidth: 3,
                barHeight: 1,
                barGap: 2,
                height: 30,
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

            wavesurferRef.current.on('audioprocess', () => {
                setCurrentTime(wavesurferRef.current.getCurrentTime());
            });

            wavesurferRef.current.on('ready', () => {
                setDuration(wavesurferRef.current.getDuration());
            });

            return () => {
                if (wavesurferRef.current) {
                    wavesurferRef.current.destroy();
                }
            };
        }
    }, [file]);

    useEffect(() => {
        if (file && wavesurferRef.current) {
            const reader = new FileReader();
            reader.onload = (event) => {
                wavesurferRef.current.load(event.target.result);
                wavesurferRef.current.on('ready', () => {
                    setDuration(wavesurferRef.current.getDuration());
                    wavesurferRef.current.play();
                    setIsPlaying(true);
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
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6 m-auto text-center">
                        <p>English to Spanish</p>
                        <p style={{ color: "#4CAF50", fontWeight: "600" }}>in English</p>
                        <p className="mb-5">Reading a journal in morning</p>

                        <img src={man} className='m-auto' alt="" />
                        <input type="file" accept="audio/*" onChange={handleFileChange} className="form-control m-auto mt-4" style={{ width: '400px' }} />
                       
                        {file ? (
             <div className="d-flex mt-5 mb-5" style={{ margin: "auto", width: "fit-content", height: "fit-content", display: "flex", alignItems: "center", border:"1px solid #E6E6E6",padding:"17px 30px",borderRadius:"15px" }}>
                            <div style={{width:"40px",height:"30px"}}>
                            {/* {wavesurferRef.current ? ( */}
                             { isPlaying ? (
                                <IoPauseSharp style={{width:"40px", fontSize: "30px", marginRight: "4px", color: "rgb(76, 175, 80)", cursor: "pointer" }} onClick={handlePlayPause} />
                              ) : (
                                <FaPlay style={{width:"40px", fontSize: "20px",marginTop:"4px", marginRight: "11px", color: "rgb(76, 175, 80)", cursor: "pointer" }} id="addPause" onClick={handlePlayPause} />
                              )}
                            {/* ) : null} */}
                            </div>
                            <div id="waveform" style={{width:"300px",marginRight:"8px"}} ref={waveformRef}></div>
                      
                            {duration > 0 && <p style={{fontWeight:"600"}}> {formatTime(duration - currentTime)}</p>}
                        </div>

                       ):null}
                        <Link to='/languagetoLearn'><button type="button" className='mt-5' style={{ width: "150px", height: "40px", borderRadius: "10px", marginLeft: "30px", border: "1px solid #E6E6E6" }}>Back</button>  </Link>
                        <Link to='/runningboy'> <button type="button" style={{ background: "#4CAF50", width: "150px", height: "40px", borderRadius: "10px", marginLeft: "30px", color: "white" }}>Next</button>  </Link>
                        <p style={{ fontWeight: "700", fontSize: "20px", color: "#4CAF50", cursor: "pointer" }} className="mt-3 mb-5"> swap languages</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Language;
