import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Photo3 from '../../assets/Photo3.png';
import { IoMicOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";
import { FaPlay } from 'react-icons/fa';
import { IoPauseSharp } from 'react-icons/io5';

const Phrase = () => {
    const [canRecord, setCanRecord] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [playbackTime, setPlaybackTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isWaveformReady, setIsWaveformReady] = useState(false);
    const recorderRef = useRef(null);
    const chunksRef = useRef([]);
    const waveformRef = useRef(null);
    const waveSurferRef = useRef(null);
    const recordingIntervalRef = useRef(null);

    useEffect(() => {
        const setAudio = async () => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    setupStream(stream);
                } catch (err) {
                    console.error(err);
                }
            }
        };

        const setupStream = (stream) => {
            if (recorderRef.current) {
                recorderRef.current.stream.getTracks().forEach(track => track.stop());
            }
            recorderRef.current = new MediaRecorder(stream);
            recorderRef.current.ondataavailable = (e) => {
                chunksRef.current.push(e.data);
            };
            recorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/ogg; codecs=opus" });
                chunksRef.current = [];
                const audioURL = window.URL.createObjectURL(blob);
                setAudioURL(audioURL);
                if (waveSurferRef.current) {
                    waveSurferRef.current.load(audioURL);
                }
            };
            setCanRecord(true);
        };

        setAudio();

        waveSurferRef.current = WaveSurfer.create({
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

        waveSurferRef.current.on('ready', () => {
            setIsWaveformReady(true);
        });

        waveSurferRef.current.on('audioprocess', () => {
            setPlaybackTime(waveSurferRef.current.getCurrentTime());
        });

        waveSurferRef.current.on('finish', () => {
            setPlaybackTime(0);
            setIsPlaying(false);
        });

        return () => {
            if (waveSurferRef.current) {
                waveSurferRef.current.destroy();
            }
            if (recorderRef.current) {
                recorderRef.current.stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const toggleMic = () => {
        if (!canRecord) return;

        setIsRecording((prev) => {
            if (!prev) {
                if (recorderRef.current.state !== 'recording') {
                    setRecordingTime(0); // Reset the timer when starting a new recording
                    recorderRef.current.start();
                    recordingIntervalRef.current = setInterval(() => {
                        setRecordingTime(prevTime => prevTime + 1);
                    }, 1000);
                }
            } else {
                recorderRef.current.stop();
                clearInterval(recordingIntervalRef.current);
            }
            return !prev;
        });
    };

    const runWave = () => {
        if (waveSurferRef.current) {
            waveSurferRef.current.playPause();
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const formatReverseTime = (totalTime, currentTime) => {
        const remainingTime = totalTime - currentTime;
        return formatTime(remainingTime);
    };

    console.log(waveSurferRef)

    console.log(audioURL);

    return (
        <>
            <div style={{ marginBottom: "10px" }} className="flex justify-center flex-col items-center mb-(100px)">
                <div className=' flex gap-1'>
                    Click on <span className="font-bold">Add<span className=" text-[#4CAF50]"> Flash</span> Cards</span> or <span className=" font-bold">Add Cards</span><span className='text-[#4CAF50]'><MdArrowOutward className=' mt-1 font-extrabold' /></span>
                </div>
                <div className=" flex  flex-col gap-4 w-[30%] justify-center items-center">
                    <img src={Photo3} alt="text" />
                    <p className='text-left'>Write a phrase</p>
                    <input type="text" placeholder="having fun on the trampoline " className='w-full pt-2 pb-2 pl-6 rounded-lg ' />

                    <div onClick={toggleMic} className='w-full bg-[#4CAF50] text-center text-white pt-2 pb-2 rounded-2xl flex gap-1 justify-center cursor-pointer'>
                        <button className="">{isRecording ? 'Stop' : 'Record'}</button>
                        <IoMicOutline className='size-6' />
                    </div>
                    <div>
                        {isRecording && <div> {formatTime(recordingTime)}</div>}
                    </div>
                </div>
                <div className="d-flex " style={{alignItems:"center"}}>
                {audioURL ? (
                    <div style={{ width: "fit-content", margin: "auto", display: "flex",borderRadius:"15px" }}>
                    {/* {isWaveformReady ? ( */}
                        <button className='border' style={{ marginRight: "20px", padding: "10px 20px", marginTop:"45px",borderRadius: "20px", display: "block", width: "fit-content" }} onClick={runWave}>
                            {isPlaying ? <IoPauseSharp /> : <FaPlay />}
                        </button>
                    {/* ):null} */}
                    <div style={{ width: "fit-content", marginTop: "6px" }}>
                    </div>
                </div>
                ):null}
                <div className='mt-5' style={{ width: "300px", marginRight: "20px",marginTop:"-10px"}} id="waveform" ref={waveformRef}></div>
              <p style={{marginTop:"45px"}}> {audioURL && <div>{formatReverseTime(waveSurferRef.current.getDuration(), playbackTime)}</div>}</p> 
                </div>
            </div>
        </>
    );
};  

export default Phrase;
