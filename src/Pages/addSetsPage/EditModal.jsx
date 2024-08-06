import { useState, useRef, useEffect, useContext } from 'react';
import { IoPauseSharp } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa';
import Icon from '../../assets/Icon.png';
import WaveSurfer from 'wavesurfer.js';
import RecordButtonImg from "../../assets/recordButton.png"
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { AppContext } from '../../context/appContext';
import { EditCard,getSets,getCard } from '../../../services';
import { useNavigate } from 'react-router-dom';
import { useSearchParams,useLocation } from "react-router-dom";
import Loader from "../../component/Loader/Loader";
import {Modal, Button} from 'react-bootstrap'
 

const EditModal = (props) => {
  
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
  const [audioBlobEnglish, setAudioBlobEnglish] = useState(null);
  const [audioBlobSpanish, setAudioBlobSpanish] = useState(null);
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


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if(storedToken == null){
      navigate('/login');
  }

  async function getCarddetail(){
    if(props.cardid != ''){
    
      const getAPiToken = localStorage.getItem("token");

      setCardId(true);

      console.log("SHivi - "+props.cardid);

       const formData = new FormData()
        formData.append('cardid',props.cardid)
        formData.append('istype',0);
         setIsLoading(true);
        await getCard(formData,getAPiToken).then(res => {

        setIsLoading(false);
        
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
        if(dadta.illustration != null){
           setProfilePic(dadta.illustration);
           setIsprevimg(dadta.illustration)
        }

        if(dadta.sourceAudio != null){
          setIssourceAudio(dadta.sourceAudio);
        }
        
        if(dadta.targetAudio != null){
          setIstargetAudio(dadta.targetAudio);
        }

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


      if(res.data.length == 0){
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

    
    
      }).catch(err => {
        console.error("Error fetching data:", err);
      });
    

  }
  }


    const storedLanguage=  localStorage.getItem("selectedLanguage");
    setToken(storedToken);
    setLanguage1(storedLanguage);

    getCarddetail();

     


  }, []);

 

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

    if(language == 'english'){
      setIssourceAudio('');
    }else{
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


  const deleteAudio=(language)=>{

    if(language == 'english'){
       setIssourceAudio('');
    }else{
         setIstargetAudio('');
    }
   
   
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
  
const navigate= useNavigate()

const context = useContext(AppContext)
 
    const submitData = () => {
      // console.log(audioBlobEnglish)
      // console.log(audioBlobSpanish)


     // navigate('/cards', { state: {cardIdRec: {curindex: newindex}} })


     // return
      const sourceAudioFile=new File([audioBlobEnglish], `audio${Date.now()}.ogg`, { type: 'audio/ogg' })
    
     
      const targetAudioFile=new File([audioBlobSpanish], `audio${Date.now()}.ogg`, { type: 'audio/ogg' })
        
      if((selectedItem == null || selectedItem == '') && isnewset == 0){
        alert('Please Select Set');
        return
      }

     
      let setVal = selectedItem;
      //alert(isnewset);
      if(isnewset == 1){
        setVal = 'new';
      }
      let sourceAudio = sourceAudioFile;
      let targetAudio = targetAudioFile;
      if(issourceAudio != ''){
        sourceAudio = audioURLEnglish;
       
      }

      if(istargetAudio != ''){
       
        sourceAudio = audioURLSpanish;
      }



      const formData = new FormData()
      formData.append('image',image)
      formData.append('sourceLang',getFirstItem)
      formData.append('targetLang',getSecondItem )
      formData.append('sourceText',englishWord),
      formData.append('targetText',Spanish),
      // formData.append('sourceAudio',audioURLEnglish),
      formData.append('sourceAudio',sourceAudioFile),
      formData.append('targetAudio',targetAudioFile),
      formData.append('isprevimg',isprevimg),
      formData.append('issourceAudio',issourceAudio),
      formData.append('istargetAudio',istargetAudio),

      formData.append('setId',setVal);
      formData.append('cardId',props.cardid);


      console.log();
      setIsLoading(true);

      EditCard(formData,context.token).then(res=>{
        if(res.status==201){
          alert('card updated successfully.')
          setIsLoading(false);
          props.toggle();
        }
      }).catch(err=>{
        alert(err.response.data.message) 
      })
    }


    



  return (
    <div className="flex justify-center">
    <Modal size="lg" show={props.isOpen}>
    <Modal.Header className="d-flex justify-content-sm-between">
          <Modal.Title>Edit Card!</Modal.Title>
          <Button variant="primary" onClick={props.toggle}>Close</Button>
        </Modal.Header>
        <Modal.Body className="flex flex-col  w-[100%] justify-center items-center">
      <div className="flex flex-col  w-[90%] justify-center items-center mb-5 mt-3 p-6">
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
           
            <h1 className="mb-3">Native language</h1>
             <select className="pl-3 pt-3 pb-3 w-[270px] border-gray-200 border-2 rounded-xl" onChange={e => setsourceLang(e.target.value)} value={sourcelang} required>
             <option value="">Please Select Set</option>
      {languages.map((itemm, indexx) => (
        <option key={itemm.names}  value={itemm.names} >
          {itemm.names}
        </option>
      ))}

      
    </select>
          </div> 

          <div>
           
            <h1 className="mb-3">Learn language</h1>
             <select className="pl-3 pt-3 pb-3 w-[270px] border-gray-200 border-2 rounded-xl" onChange={e => settargetLang(e.target.value)} value={targetlang} required>
             <option value="">Please Select Set</option>
      {languages.map((itemm, indexx) => (
        <option key={itemm.names}  value={itemm.names}>
          {itemm.names}
        </option>
      ))}

      
    </select>
          </div> 
        </div>



        <div className="flex justify-between w-full gap-3">
          
          <div>
           
            <h1 className="mb-3">Word in {getFirstItem}</h1>
            <input onChange={(e) => setEnglishWord(e.target.value)} type="text" placeholder="Write here..." className="pl-3 pt-3 pb-3 w-[270px] border-gray-200 border-2 rounded-xl" value={englishWord} required/>
          </div>
          <div>
            <h1 className="mb-3">Word in {getSecondItem}</h1>
            <input  onChange={(e) => setSpanish(e.target.value)} type="text" placeholder="Write here..." className="pl-3 pt-3 pb-3 w-[270px] border-gray-200 border-2 rounded-xl" value={Spanish}  required/>
          </div>
        </div>
        <div className="flex justify-between w-full gap-3 mt-4">
          <div className='w-full'>
            <h1 onClick={() => toggleMic('english')} style={{ cursor: "pointer" }} className="mb-3">
              {isRecordingEnglish ? 'Stop' : 'Record'} voice in {getFirstItem}
            </h1>
            <p>Recording Time: {formatTime(recordingTimeEnglish)}</p>
            {/* <div className='border' style={{}}> */}
            <div className='mt-3' style={{ width: '100%',height:"50px", margin: 'auto', display: 'flex', borderRadius: '15px', border: '1px solid #E6E6E6', alignItems: 'center', padding: '7px 13px'}}>
            
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
          <div className='w-full'>
            <h1 onClick={() => toggleMic('spanish')} style={{ cursor: "pointer" }} className="mb-3">
              {isRecordingSpanish ? 'Stop' : 'Record'} voice in {getSecondItem}
            </h1>
            <p>Recording Time: {formatTime(recordingTimeSpanish)}</p>
            <div className='mt-3' style={{ width: '100%',height:"50px", margin: 'auto', display: 'flex', borderRadius: '15px', border: '1px solid #E6E6E6', alignItems: 'center', padding: '7px 13px' }}>
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
        {sets.length > 0 && <div className="flex justify-between w-full gap-3">
          
          <div>
           
            <h1 className="mb-3">Asign Set</h1>
             <select className="pl-3 pt-3 pb-3 w-[600px] border-gray-200 border-2 rounded-xl" onChange={e => setSelectedItem(e.target.value)} value={selectedItem} required>
             <option value="">Please Select Set</option>
      {sets.map((itemm, indexx) => (
        <option key={itemm._id}  value={itemm._id}>
          {itemm.name}
        </option>
      ))}

      
    </select>
          </div> 
        </div> }
        <button onClick={submitData} className="bg-[#4CAF50] w-full p-2 rounded-xl text-white mt-5">Update card</button>
      {/* </div> */}
      {isLoading && <div className="position-absolute top-[90%]"> <Loader /> </div> }
    </div>
    </Modal.Body>
</Modal>
    </div>
  );
};

export default EditModal;