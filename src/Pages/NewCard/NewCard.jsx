import { useState, useRef, useEffect, useContext } from 'react';
import { IoPauseSharp } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa';
import Icon from '../../assets/Icon.png';
import WaveSurfer from 'wavesurfer.js';
import RecordButtonImg from "../../assets/recordButton.png"
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { AppContext } from '../../context/appContext';
import { AddCard, getSets, getCard } from '../../../services';
import { useNavigate } from 'react-router-dom';
import { useSearchParams, useLocation } from "react-router-dom";
import Loader from "../../component/Loader/Loader";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import './Card.css';


const NewCard = () => {

  const [profilePic, setProfilePic] = useState(Icon);
  const [image, setImage] = useState(null);
  const [token, setToken] = useState(null);
  const [language1, setLanguage1] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  let [cardId, setCardId] = useState(false);
  let [showcard, setShowcard] = useState([]);
  const [canRecordEnglish, setCanRecordEnglish] = useState(false);
  const [isRecordingEnglish, setIsRecordingEnglish] = useState(false);
  const [audioURLEnglish, setAudioURLEnglish] = useState(null);
  const [audioURLSpanish, setAudioURLSpanish] = useState(null);
  const [audioBlobEnglish, setAudioBlobEnglish] = useState({audios: null});
  const [audioBlobSpanish, setAudioBlobSpanish] = useState({audios: null});
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
  const [sets, setSets] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sourcelang, setsourceLangVal] = useState(null);
  const [targetlang, settargetLangVal] = useState(null);
  const [getFirstItem, setGetFirstItem] = useState(null);
  const [getSecondItem, setGetSecondItem] = useState(null);
  const [isnewset, setIsnewset] = useState(0);
  const [isprevimg, setIsprevimg] = useState('');
  const [issourceAudio, setIssourceAudio] = useState('');
  const [istargetAudio, setIstargetAudio] = useState('');
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [newindex, setNewindex] = useState('');
  const [isRecordingStatus1, setIsRecordingStatus1] = useState(false);
  const [isRecordingStatus2, setIsRecordingStatus2] = useState(false);


  const recorderControls1 = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err)
  );

  const recorderControls2 = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err)
  );


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken == null) {
      navigate('/login');
    }


    const storedLanguage = localStorage.getItem("selectedLanguage");
    setToken(storedToken);
    setLanguage1(storedLanguage);



    if (location.state != null) {
      const { cardIdRec } = location.state;
      console.log(cardIdRec);
      console.log(cardIdRec.id);
      setNewindex(cardIdRec.nextindex);
      const getAPiToken = localStorage.getItem("token");

      setCardId(true);

      const formData = new FormData()
      formData.append('cardid', cardIdRec.id)
      formData.append('istype', 0);
      setIsLoading(true);
      getCard(formData, getAPiToken).then(res => {

        setIsLoading(false);
        console.log(res.data, "data");
        setShowcard(res.data.cards);

        let dadta = res.data.cards;

        console.log(dadta.sourceLang);

        setsourceLang(dadta.sourceLang);
        settargetLang(dadta.targetLang);

        setEnglishWord(dadta.sourceText);
        setSpanish(dadta.targetText);


        setAudioURLEnglish(dadta.sourceAudio);
        setAudioURLSpanish(dadta.targetAudio);

        setSelectedItem(res.data.setid);
        if (dadta.illustration != null) {
          setProfilePic(dadta.illustration);
          setIsprevimg(dadta.illustration)
        }

        if (dadta.sourceAudio != null) {
          setIssourceAudio(dadta.sourceAudio);
        }

        if (dadta.targetAudio != null) {
          setIstargetAudio(dadta.targetAudio);
        }



      }).catch(err => {
        console.error("Error fetching data:", err);
      });
    navigate(location.state, {}); 

    }


  }, []);


    const handleRecordClick = (index) => {
      const isCurrentlyRecording = isRecordingStatus+index;

      const selectedRecorderControls = index === 1 ? recorderControls1 : recorderControls2;

      if (isCurrentlyRecording) {
        selectedRecorderControls.stopRecording();
      } else {
        selectedRecorderControls.startRecording();
      }

      if(index == 1){
         setIsRecordingStatus1((prevStatus) => {
          let newStatus = [...prevStatus];
          newStatus = !isCurrentlyRecording;
          return newStatus;
        });
      }else{
         setIsRecordingStatus2((prevStatus) => {
          let newStatus = [...prevStatus];
          newStatus = !isCurrentlyRecording;
          return newStatus;
        });
      }

     
    };



  const handleInput = (event) => {
    setImage(event.target.files[0])
    setIsprevimg('')
    setProfilePic(URL.createObjectURL(event.target.files[0]));
  };






  const languages = [
    { names: "English" },
    { names: "Hindi" },
    { names: "Spanish" },
    { names: "French" },
    { names: "Italian" },
    { names: "Japanese" },
    { names: "Chinese" },
    { names: "Portuguese" },
    { names: "German" },
    { names: "Greek" },
    { names: "Russian" },
  ];



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

    const getAPiToken = localStorage.getItem("token");
    getSets(getAPiToken).then(res => {

      setSets(res.data);


      if (res.data.length == 0) {
        setIsnewset(1);
      }

    }).catch(err => {
      console.error("Error fetching data:", err);
    });

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
        const setAudioBlob = language === 'english' ? setAudioBlobEnglish : setAudioBlobSpanish;
        const blob = new Blob(chunksRef.current, { type: 'audio/ogg; codecs=opus' });
        chunksRef.current = [];

        const audioURL = window.URL.createObjectURL(blob);
        // console.log(audioURL)
        setAudioBlob(blob);
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
          barWidth: 2,
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

    if (language == 'english') {
      setIssourceAudio('');
    } else {
      setIstargetAudio('');
    }

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


  const deleteAudio = (language) => {

    if (language == 'english') {
      setIssourceAudio('');
    } else {
      setIstargetAudio('');
    }


    const chunksRef = language === 'english' ? chunksRefEnglish : chunksRefSpanish;

    const setAudioURL = language === 'english' ? setAudioURLEnglish : setAudioURLSpanish;

    const waveSurferRef = language === 'english' ? waveSurferRefEnglish : waveSurferRefSpanish;
    const confirmDelete = () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
        waveSurferRef.current = null;
      }
      setAudioURL(null);
      chunksRef.current = [];
    }
    const userConfirmed = window.confirm('Are you sure you want to delete the audio ?')
    if (userConfirmed) {
      confirmDelete();
    }

  }

  const setSelectedItemCal = (event) => {
    setSelectedItem(event.target.value)

  }





  const setsourceLang = (event) => {

    setsourceLangVal(event)
    setGetFirstItem(event);

  }
  const settargetLang = (event) => {
    settargetLangVal(event)
    setGetSecondItem(event);
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

  const navigate = useNavigate()

  const context = useContext(AppContext)

  const submitData = () => {

    console.log(audioBlobEnglish);
//     console.log(audioBlobSpanish);

//return

//     const url = URL.createObjectURL(audioBlobEnglish.audios.English);
//     console.log(url);
//   const audio = document.createElement("audio");
//   audio.src = url;
//    audio.controls = true;
//   document.body.appendChild(audio);

// return
    // console.log(audioBlobEnglish)

    // console.log('Hello India');


    // console.log(audioBlobSpanish)

    // return


    // navigate('/cards', { state: {cardIdRec: {curindex: newindex}} })


    // return
    const sourceAudioFile = audioBlobEnglish.audios


    const targetAudioFile = audioBlobSpanish.audios

    if ((selectedItem == null || selectedItem == '') && isnewset == 0) {
      alert('Please Select Set');
      return
    }


    let setVal = selectedItem;
    //alert(isnewset);
    if (isnewset == 1) {
      setVal = 'new';
    }
    let sourceAudio = sourceAudioFile;
    let targetAudio = targetAudioFile;
    if (issourceAudio != '') {
      sourceAudio = audioURLEnglish;

    }

    if (istargetAudio != '') {

      sourceAudio = audioURLSpanish;
    }



    const formData = new FormData()
    formData.append('image', image)
    formData.append('sourceLang', getFirstItem)
    formData.append('targetLang', getSecondItem)
    formData.append('sourceText', englishWord),
      formData.append('targetText', Spanish),
      // formData.append('sourceAudio',audioURLEnglish),
      formData.append('sourceAudio', sourceAudioFile),
      formData.append('targetAudio', targetAudioFile),
      formData.append('isprevimg', isprevimg),
      formData.append('issourceAudio', issourceAudio),
      formData.append('istargetAudio', istargetAudio),

      formData.append('setId',setVal)
setIsLoading(true);
      console.log();

      AddCard(formData,context.token).then(res=>{
        if(res.status==201){
          setIsLoading(false);
          alert('card added successfully.')
          navigate('/cards', { state: {cardIdRec: {curindex: newindex}} })
        }
      }).catch(err=>{
        alert(err.response.data.message) 
      })
    }






  return (
    <div className="flex justify-center mx-auto">
      <div className="flex flex-col gap-4  items-center mb-5 mt-20">
        <p>Create a new card</p>
        <div className="h-[220px] flex flex-col justify-center items-center sm-max:w-[300px] lg-range:w-full bg-[#FAFAFA] rounded-2xl border-dashed border-[#FAFAFA] border-2 md-range:w-[100%]">
          <div className="h-[220px] flex flex-col justify-center items-center w-full bg-[#FAFAFA] rounded-2xl border-dashed border-[#FAFAFA] border-2">
            <img
              src={profilePic}
              className={`${profilePic !== Icon ? 'h-[150px] w-[150px]' : 'h-[36px] w-[36px]'
                }`}
              id="profile-pic"
              alt="Profile"

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


        <div className="flex justify-between  gap-3 sm-max:!w-[300px ] lg-range:w-full">

          <div>

            <h1 className="mb-3">Native language</h1>
            <select className="pl-3 pt-3 pb-3 w-[270px] border-gray-200 border-2 rounded-xl sm-max:w-[140px]" onChange={e => setsourceLang(e.target.value)} value={sourcelang} required>
              <option value="">Please Select Set</option>
              {languages.map((itemm, indexx) => (
                <option key={itemm.names} value={itemm.names} >
                  {itemm.names}
                </option>
              ))}


            </select>
          </div>

          <div>

            <h1 className="mb-3">Learn language</h1>
            <select className="pl-3 pt-3 pb-3 w-[270px] border-gray-200 border-2 rounded-xl sm-max:w-[140px]" onChange={e => settargetLang(e.target.value)} value={targetlang} required>
              <option value="">Please Select Set</option>
              {languages.map((itemm, indexx) => (
                <option key={itemm.names} value={itemm.names}>
                  {itemm.names}
                </option>
              ))}


            </select>
          </div>
        </div>



        <div className="flex justify-between lg-range:w-full sm-max:w-[300px] gap-3">

          <div>

            <h1 className="mb-3">Word in {getFirstItem}</h1>
            <input onChange={(e) => setEnglishWord(e.target.value)} type="text" placeholder="Write here..." className="pl-3 pt-3 pb-3 w-[270px] sm-max:w-[140px] border-gray-200 border-2 rounded-xl" value={englishWord} required />
          </div>
          <div>
            <h1 className="mb-3">Word in {getSecondItem}</h1>
            <input onChange={(e) => setSpanish(e.target.value)} type="text" placeholder="Write here..." className="pl-3 pt-3 pb-3 w-[270px] sm-max:w-[140px] border-gray-200 border-2 rounded-xl" value={Spanish} required />
          </div>
        </div>
        <div className="flex justify-between lg-range:w-full mt-4 auidesc">
          <div className='w-[100%] mr-5'>
           
            <button
                type="button"
                onClick={() => handleRecordClick(1)}
              >
                {isRecordingStatus1 ? 'Stop' : 'Record'} voice in {getFirstItem}
              </button>
              <br />
              <div className="w-[300px]">
              <AudioRecorder
                onRecordingComplete={(blob) =>
                  setAudioBlobEnglish((prevData) => ({
                    ...prevData,
                    audios: blob,
                  }))
                }
                recorderControls= {recorderControls1}
                showVisualizer={true}
              />

              </div>
          </div>
          <div className='w-[100%]'>
            <div className=''>
           
            <button
                type="button"
                onClick={() => handleRecordClick(2)}
              >
                {isRecordingStatus2 ? 'Stop' : 'Record'} voice in {getSecondItem}
              </button>
              <br />
              <div className="w-[300px]">
              <AudioRecorder
                onRecordingComplete={(blob) =>
                  setAudioBlobSpanish((prevData) => ({
                    ...prevData,
                    audios: blob,
                  }))
                }
                recorderControls= {recorderControls2}
                showVisualizer={true}
              />

              </div>
          </div>
          </div>
        </div>
        {sets.length > 0 && <div className="flex justify-between lg-range:w-full gap-3 sm-max:w-[300px]">

          <div>

            <h1 className="mb-3 ml-[10px]">Asign Set</h1>
            <select className="mx-10px text-center justify-center pl-3 pt-3 pb-3 w-[600px] border-gray-200 border-2 rounded-xl sm-max:w-[250px] sm-max:ml-[24px]" onChange={e => setSelectedItem(e.target.value)} value={selectedItem} required>
              <option value="">Please Select Set</option>
              {sets.map((itemm, indexx) => (
                <option key={itemm._id} value={itemm._id}>
                  {itemm.name}
                </option>
              ))}

      
    </select>
          </div> 
        </div> }
        <button onClick={submitData} className="bg-[#4CAF50] w-full p-2 rounded-xl text-white mt-5">Create card</button>
      {/* </div> */}
      {isLoading &&  <Loader /> }
    </div>

    </div>
  );
};

export default NewCard;
