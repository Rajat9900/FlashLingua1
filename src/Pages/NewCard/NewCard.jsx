import { useState, useRef, useEffect } from 'react';
import { IoPauseSharp } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa';
import Icon from '../../assets/Icon.png';
import WaveSurfer from 'wavesurfer.js';
import RecordButtonImg from "../../assets/recordButton.png"
import { MdDelete } from "react-icons/md";
import axios from 'axios';


const NewCard = () => {
  
  const [profilePic, setProfilePic] = useState(Icon);
  const [token, setToken] = useState(null);
  const [language1, setLanguage1] = useState(null);


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedLanguage=  localStorage.getItem("selectedLanguage");
    setToken(storedToken);
    setLanguage1(storedLanguage);
  }, []);

  console.log(token);
  console.log("Himanshu",language1);

  const handleInput = (event) => {
    setProfilePic(URL.createObjectURL(event.target.files[0]));
  };

  const [canRecordEnglish, setCanRecordEnglish] = useState(false);
  const [isRecordingEnglish, setIsRecordingEnglish] = useState(false);
  const [audioURLEnglish, setAudioURLEnglish] = useState(null);
  const [recordingTimeEnglish, setRecordingTimeEnglish] = useState(0);
  const [playbackTimeEnglish, setPlaybackTimeEnglish] = useState(0);
  const [isPlayingEnglish, setIsPlayingEnglish] = useState(false);
  const [isWaveformReadyEnglish, setIsWaveformReadyEnglish] = useState(false);
  const recorderRefEnglish = useRef(null);
  const chunksRefEnglish = useRef([]);
  const waveformRefEnglish = useRef(null);
  const waveSurferRefEnglish = useRef(null);
  const recordingIntervalRefEnglish = useRef(null);

  const [canRecordSpanish, setCanRecordSpanish] = useState(false);
  const [isRecordingSpanish, setIsRecordingSpanish] = useState(false);
  const [audioURLSpanish, setAudioURLSpanish] = useState(null);
  const [recordingTimeSpanish, setRecordingTimeSpanish] = useState(0);
  const [playbackTimeSpanish, setPlaybackTimeSpanish] = useState(0);
  const [isPlayingSpanish, setIsPlayingSpanish] = useState(false);
  const [isWaveformReadySpanish, setIsWaveformReadySpanish] = useState(false);
  const recorderRefSpanish = useRef(null);
  const chunksRefSpanish = useRef([]);
  const waveformRefSpanish = useRef(null);
  const waveSurferRefSpanish = useRef(null);
  const recordingIntervalRefSpanish = useRef(null);


  const [englishWord, setEnglishWord] = useState('');
  const [Spanish, setSpanish] = useState('');

  const [uploadResponse, setUploadResponse] = useState(null);
  const [error, setError] = useState(null);
  

  console.log(englishWord);

  useEffect(() => {
    const setAudio = async (language) => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          setupStream(stream, language);
        } catch (err) {
          console.error(err);
        }
      }
    };

    const setupStream = (stream, language) => {
      const recorderRef = language === 'english' ? recorderRefEnglish : recorderRefSpanish;
      const setCanRecord = language === 'english' ? setCanRecordEnglish : setCanRecordSpanish;

      if (recorderRef.current) {
        recorderRef.current.stream.getTracks().forEach((track) => track.stop());
      }
      recorderRef.current = new MediaRecorder(stream);
      recorderRef.current.ondataavailable = (e) => {
        const chunksRef = language === 'english' ? chunksRefEnglish : chunksRefSpanish;
        chunksRef.current.push(e.data);
      };
      recorderRef.current.onstop = () => {
        const chunksRef = language === 'english' ? chunksRefEnglish : chunksRefSpanish;
        const setAudioURL = language === 'english' ? setAudioURLEnglish : setAudioURLSpanish;
        const blob = new Blob(chunksRef.current, { type: 'audio/ogg; codecs=opus' });
        chunksRef.current = [];
        const audioURL = window.URL.createObjectURL(blob);
        setAudioURL(audioURL);
      };
      setCanRecord(true);
    };

    setAudio('english');
    setAudio('spanish');

    return () => {
      if (waveSurferRefEnglish.current) {
        waveSurferRefEnglish.current.destroy();
      }
      if (recorderRefEnglish.current) {
        recorderRefEnglish.current.stream.getTracks().forEach((track) => track.stop());
      }
      if (waveSurferRefSpanish.current) {
        waveSurferRefSpanish.current.destroy();
      }
      if (recorderRefSpanish.current) {
        recorderRefSpanish.current.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const setupWaveSurfer = (audioURL, waveformRef, waveSurferRef, setPlaybackTime, setIsWaveformReady, setIsPlaying) => {
      if (audioURL && waveformRef.current && !waveSurferRef.current) {
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
          plugins: [],
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

        waveSurferRef.current.load(audioURL);
      }
    };

    setupWaveSurfer(audioURLEnglish, waveformRefEnglish, waveSurferRefEnglish, setPlaybackTimeEnglish, setIsWaveformReadyEnglish, setIsPlayingEnglish);
    setupWaveSurfer(audioURLSpanish, waveformRefSpanish, waveSurferRefSpanish, setPlaybackTimeSpanish, setIsWaveformReadySpanish, setIsPlayingSpanish);
  }, [audioURLEnglish, audioURLSpanish]);

  const toggleMic = (language) => {
    const canRecord = language === 'english' ? canRecordEnglish : canRecordSpanish;
    const setIsRecording = language === 'english' ? setIsRecordingEnglish : setIsRecordingSpanish;
    const isRecording = language === 'english' ? isRecordingEnglish : isRecordingSpanish;
    const recorderRef = language === 'english' ? recorderRefEnglish : recorderRefSpanish;
    const setRecordingTime = language === 'english' ? setRecordingTimeEnglish : setRecordingTimeSpanish;
    const recordingIntervalRef = language === 'english' ? recordingIntervalRefEnglish : recordingIntervalRefSpanish;
    const chunksRef = language === 'english' ? chunksRefEnglish : chunksRefSpanish;
    const setAudioURL = language === 'english' ? setAudioURLEnglish : setAudioURLSpanish;
    const waveSurferRef = language === 'english' ? waveSurferRefEnglish : waveSurferRefSpanish;
  
    if (!canRecord) return;
  
    setIsRecording((prev) => {
      if (!prev) {
        // Stop the previous recording if it's still running
        if (recorderRef.current && recorderRef.current.state === 'recording') {
          recorderRef.current.stop();
        }
  
        // Clear previous audio data
        if (waveSurferRef.current) {
          waveSurferRef.current.destroy();
          waveSurferRef.current = null;
        }
        setAudioURL(null);
        chunksRef.current = [];
  
        // Start a new recording
        setRecordingTime(0); // Reset the timer when starting a new recording
        recorderRef.current.start();
        recordingIntervalRef.current = setInterval(() => {
          setRecordingTime((prevTime) => prevTime + 1);
        }, 1000);
      } else {
        // Stop the current recording
        recorderRef.current.stop();
        clearInterval(recordingIntervalRef.current);
      }
      return !prev;
    });
  };


  const deleteAudio=(language)=>{
    const chunksRef = language === 'english' ? chunksRefEnglish : chunksRefSpanish;

    const setAudioURL = language === 'english' ? setAudioURLEnglish : setAudioURLSpanish;

    const waveSurferRef = language === 'english' ? waveSurferRefEnglish : waveSurferRefSpanish;
    const confirmDelete=()=>{
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
        waveSurferRef.current = null;
      }
      setAudioURL(null);
      chunksRef.current = [];
    }
    const userConfirmed=window.confirm('Are you sure you want to delete the audio ?')
    if(userConfirmed){
      confirmDelete();
    }

  }
  

  const runWave = (language) => {
    const waveSurferRef = language === 'english' ? waveSurferRefEnglish : waveSurferRefSpanish;
    const setIsPlaying = language === 'english' ? setIsPlayingEnglish : setIsPlayingSpanish;
    const isPlaying = language === 'english' ? isPlayingEnglish : isPlayingSpanish;

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
  



 
    const submitData = () => {
      const auth = {
        access_token: token
      };
       const formData = {
        // sourceLang:,
        targetLang:language1,
        sourceText: englishWord,
        targetText: Spanish,
        sourceAudio:audioURLEnglish,
        targetAudio:audioURLSpanish
      };
  
      axios.post('https://flashlingua.cards/api/v1/cards/add-card', formData, {
        headers: {
          Authorization: `Bearer ${auth.access_token}`, 
          // 'Content-Type': 'application/json' 
        }
      })
      .then(response => {

        console.log('Response:', response.data);

        setUploadResponse(response.data);
      })
      .catch(error => {

        console.error('Error:', error);
   
        setError(error.message);
      });
    }


    



  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-4 w-[40%] items-center mb-5 mt-20">
        <p>Create a new card</p>
        <div className="h-[220px] flex flex-col justify-center items-center w-full bg-[#FAFAFA] rounded-2xl border-dashed border-[#FAFAFA] border-2">
        <div className="h-[220px] flex flex-col justify-center items-center w-full bg-[#FAFAFA] rounded-2xl border-dashed border-[#FAFAFA] border-2">
          <img
            src={profilePic}
            className={`${
              profilePic !== Icon ? 'h-[150px] w-[150px]' : 'h-[36px] w-[36px]'
            }`}
            id="profile-pic"
            alt="Profile"
            onChange={(e) => setImg(e.target.value)} 
          />
          <label htmlFor="input-file" className="cursor-pointer mt-2">Select image</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            id="input-file"
            className="hidden"
            onChange={handleInput}
            // onChange={(e) => setImg(e.target.value)} 

          />
        </div>
        </div>
        <div className="flex justify-between w-full gap-3">
          <div>
            <h1 className="mb-3">Word in English</h1>
            <input onChange={(e) => setEnglishWord(e.target.value)} type="text" placeholder="Write here..." className="pl-3 pt-3 pb-3 w-[270px] border-gray-200 border-2 rounded-xl" required/>
          </div>
          <div>
            <h1 className="mb-3">Word in Spanish</h1>
            <input  onChange={(e) => setSpanish(e.target.value)} type="text" placeholder="Write here..." className="pl-3 pt-3 pb-3 w-[270px] border-gray-200 border-2 rounded-xl"  required/>
          </div>
        </div>
        <div className="flex justify-between w-full gap-3 mt-4">
          <div>
            <h1 onClick={() => toggleMic('english')} style={{ cursor: "pointer" }} className="mb-3">
              {isRecordingEnglish ? 'Stop' : 'Record'} voice in English
            </h1>
            <p>Recording Time: {formatTime(recordingTimeEnglish)}</p>
            {/* <div className='border' style={{}}> */}
            <div className='mt-3' style={{ width: '300px',height:"50px", margin: 'auto', display: 'flex', borderRadius: '15px', border: '1px solid #E6E6E6', alignItems: 'center', padding: '7px 13px'}}>
            
            {audioURLEnglish ? (
              <div className='d-flex'>
                <button style={{ marginRight: '18px', display: 'block', width: 'fit-content' }} onClick={() => runWave('english')}>
                  {isPlayingEnglish ? <IoPauseSharp style={{ color: '#4CAF50' }} /> : <FaPlay style={{ color: '#4CAF50' }} />}
                </button>
                <div style={{ width: '150px', marginRight: '20px' }} id="waveformEnglish" ref={waveformRefEnglish}></div>
                <div style={{ width: 'fit-content', marginTop: '6px' }}>
                  <p style={{ fontWeight: '600',color:"rgb(76 175 80)" }}>{audioURLEnglish && waveSurferRefEnglish.current && <div>{formatReverseTime(waveSurferRefEnglish.current.getDuration(), playbackTimeEnglish)}</div>}</p>
                {/* <button onClick={()=>deleteAudio('english')}>cancel</button> */}
                </div>
                <MdDelete style={{cursor:"pointer",color:"rgb(76 175 80)", marginTop: "8px", fontSize: "21px",marginLeft: "8px"}} onClick={()=>deleteAudio('english')}/>
              </div>
              ) : 
              (  <img  style={{cursor:"pointer"}}  onClick={() => toggleMic('english')} src={RecordButtonImg} alt='img not loading'/>)
              }
              </div>
            {/* </div> */}
          </div>
          <div>
            <h1 onClick={() => toggleMic('spanish')} style={{ cursor: "pointer" }} className="mb-3">
              {isRecordingSpanish ? 'Stop' : 'Record'} voice in Spanish
            </h1>
            <p>Recording Time: {formatTime(recordingTimeSpanish)}</p>
            <div className='mt-3' style={{ width: '300px',height:"50px", margin: 'auto', display: 'flex', borderRadius: '15px', border: '1px solid #E6E6E6', alignItems: 'center', padding: '7px 13px' }}>
            {audioURLSpanish ? (
              <div className="d-flex">
                <button style={{ marginRight: '18px', display: 'block', width: 'fit-content' }} onClick={() => runWave('spanish')}>
                  {isPlayingSpanish ? <IoPauseSharp style={{ color: '#4CAF50' }} /> : <FaPlay style={{ color: '#4CAF50' }} />}
                </button>
                <div style={{ width: '170px', marginRight: '20px' }} id="waveformSpanish" ref={waveformRefSpanish}></div>
                <div style={{ width: 'fit-content', marginTop: '6px' }}>
                  <p style={{ fontWeight: '600',color:"rgb(76 175 80)" }}>{audioURLSpanish && waveSurferRefSpanish.current && <div>{formatReverseTime(waveSurferRefSpanish.current.getDuration(), playbackTimeSpanish)}</div>}</p>
                </div>
                <MdDelete style={{cursor:"pointer",color:"rgb(76 175 80)", marginTop: "8px", fontSize: "21px",marginLeft: "8px"}} onClick={()=>deleteAudio('spanish')}/>
                </div>
              ) : 
              (<img style={{cursor:"pointer"}} onClick={() => toggleMic('spanish')} src={RecordButtonImg} alt='img not loading'/>)
              }
              </div>
          </div>
        </div>
        <button onClick={submitData} className="bg-[#4CAF50] w-full p-2 rounded-xl text-white mt-5">Create card</button>
      {/* </div> */}
    </div>
    </div>
  );
};

export default NewCard;
