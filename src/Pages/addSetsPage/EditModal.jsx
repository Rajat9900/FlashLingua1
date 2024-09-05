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
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
 import Swal from 'sweetalert2'

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
    if(localStorage.getItem('isTeacher') != 1){
       Swal.fire({
            title: 'Unauthorized',
            text: 'You are not authorized to access this',
            icon: 'error',
            didClose: () => {
                 navigate('/');
            }
        });
       
    }
    const storedToken = localStorage.getItem('token');
    if(storedToken == null){
      navigate('/login');
    }
    const storedLanguage=  localStorage.getItem("selectedLanguage");
    setToken(storedToken);
    setLanguage1(storedLanguage);
    getCarddetail();

  }, []);

   async function getCarddetail(){
    console.log('Hello');
    if(props.cardid != ''){
    
      const getAPiToken = localStorage.getItem("token");

      setCardId(true);

    

       const formData = new FormData()
        formData.append('cardid',props.cardid)
        formData.append('istype',0);
         setIsLoading(true);
        await getCard(formData,getAPiToken).then(res => {

        setIsLoading(false);
        
        setShowcard(res.data.cards);

        let dadta = res.data.cards;

        

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

       
     const getAPiToken = localStorage.getItem("token");
      getSets(getAPiToken).then(res => {
      
      setSets(res.data);


      if(res.data.length == 0){
        setIsnewset(1);
      } 
      
    }).catch(err => {
      console.error("Error fetching data:", err); 
    });

   

    
    
      }).catch(err => {
        console.error("Error fetching data:", err);
      });
    

  }
  }

 
   const completeAudio = (blob,isd) => {
   
    if(isd == 1){
      setIssourceAudio('');
       setAudioBlobEnglish((prevData) => ({
                    ...prevData,
                    audios: blob,
                  }))
    }else{
      setIstargetAudio('');
       setAudioBlobSpanish((prevData) => ({
                    ...prevData,
                    audios: blob,
                  }))
    }
    
  } 


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
       const sourceAudioFile = audioBlobEnglish.audios
    const targetAudioFile = audioBlobSpanish.audios

    
      // const sourceAudioFile=new File([audioBlobEnglish], `audio${Date.now()}.ogg`, { type: 'audio/ogg' })
    
     
      // const targetAudioFile=new File([audioBlobSpanish], `audio${Date.now()}.ogg`, { type: 'audio/ogg' })
        
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
        }else if(res.status==203){
           Swal.fire({
            title: 'Unauthorized',
            text: 'You are not authorized to access this',
            icon: 'error',
            didClose: () => {
              localStorage.setItem('isTeacher',0);
                 navigate('/');
            }
        });
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
        <div className="flex justify-between lg-range:w-full sm-max:w-[300px] gap-3 auidesc">
        <div className="w-[270px]">
        {issourceAudio != '' && 
          <audio key={issourceAudio} controls={true}>
                        <source src={issourceAudio} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
        }
        <button
                type="button"
                onClick={() => handleRecordClick(1)}
              >
                {isRecordingStatus1 ? 'Stop' : 'Record'} voice in {getFirstItem}
              </button>
              <AudioRecorder
               onRecordingComplete={(blob) => completeAudio(blob,1)}
                
                recorderControls= {recorderControls1}
                showVisualizer={true}

              />
        </div>
          
          <div className="w-[270px]">
            {istargetAudio != '' && 
          <audio key={istargetAudio} controls={true}>
                        <source src={istargetAudio} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
        }
            <button
                type="button"
                onClick={() => handleRecordClick(2)}
              >
                {isRecordingStatus2 ? 'Stop' : 'Record'} voice in {getSecondItem}
              </button>
              <br />
             
              <AudioRecorder
                onRecordingComplete={(blob) => completeAudio(blob,2)}
                recorderControls= {recorderControls2}
                showVisualizer={true}
              />

              
          
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
