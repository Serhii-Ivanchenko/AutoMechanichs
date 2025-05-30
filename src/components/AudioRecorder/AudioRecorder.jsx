import { BsRecordCircle } from 'react-icons/bs';
import { BsFillMicFill } from 'react-icons/bs';
import { BsFillDoorOpenFill } from 'react-icons/bs';
import { GiSoundWaves } from 'react-icons/gi';
import { MdGraphicEq } from 'react-icons/md';
import { FaPlay, FaPause, FaArrowLeft } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';
import { BsCheckLg, BsFillStopFill } from 'react-icons/bs';

import css from './AudioRecorder.module.css';
import { useEffect, useRef, useState } from 'react';

export default function AudioRecorder({
  setRecordAudio,
  audioURL,
  setAudioURL,
  completedDoc,
  setOpenAudio,
  repair,
}) {
  const mediaRecorderRef = useRef(null);
  // const [audioURL, setAudioURL] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const audioChunks = useRef([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef(null);
  const audioRef = useRef(null);
  const streamRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  console.log('audioUrl', audioURL);

  // const [time, setTime]=

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);

      audioChunks.current = [];

      mediaRecorderRef.current.ondataavailable = e => {
        audioChunks.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        // if (repair) {
        //   setAudioURL(prev => [...prev, url]);
        // } else {
        setAudioURL(url);
        // }
        // const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const arrayBuffer = await blob.arrayBuffer();
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const duration = audioBuffer.duration;
        setDuration(formatTime(duration));

        clearInterval(timerRef.current);
        setRecordingTime(0);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Не вдалося отримати доступ до мікрофона:', err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach(track => track.stop());
    setIsRecording(false);
  };

  const formatTime = time => {
    const mins = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const secs = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    console.log('secs', secs);

    return `${mins}:${secs}`;
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // const handleLoadedMetadata = () => {
  //   if (completedDoc) {
  //     const audioElement = audioRef.current;
  //     console.log('readyState:', audioElement.readyState); // Чи повністю готове
  //     const seconds = audioElement?.duration;
  //     console.log('seconds loaded:', seconds);
  //     if (seconds && isFinite(seconds)) {
  //       setDuration(formatTime(seconds));
  //     } else {
  //       console.warn('Duration not available yet');
  //     }
  //   }
  // };
  useEffect(() => {
    if (audioURL) {
      const loadAudioDuration = async () => {
        setIsLoading(true);

        try {
          const response = await fetch(audioURL);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const blob = await response.blob();
          const arrayBuffer = await blob.arrayBuffer();

          // Використовуємо AudioContext для декодування
          const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

          const duration = audioBuffer.duration;
          console.log('MP3 Duration from decodeAudioData:', duration);

          if (isFinite(duration)) {
            setDuration(formatTime(duration));
          } else {
            console.warn('Duration not available yet');
          }
        } catch (err) {
          console.error('Error loading audio duration:', err);
        } finally {
          setIsLoading(false);
        }
      };

      loadAudioDuration();
    }
  }, [audioURL, completedDoc]);
  console.log('duration', duration);
  console.log('seconds', audioRef?.current?.duration);

  // useEffect(() => {
  //   if (audioRef.current?.duration) {
  //     setDuration(formatTime(audioRef.current.duration));
  //   }
  // }, [audioURL]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('timeupdate', updateCurrentTime);

    return () => {
      audio.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, [audioRef.current]);

  return (
    <div className={css.wrapper}>
      <div className={css.player}>
        {!audioURL ? (
          <>
            {' '}
            <p>{formatTime(recordingTime)}</p>
            {isRecording ? (
              <div className={css.soundBox}>
                <GiSoundWaves size={50} className={css.sound} />
                <GiSoundWaves size={50} className={css.sound} />
                {/* <MdGraphicEq size={30} /> */}
              </div>
            ) : (
              ''
            )}
            <button
              className={`${css.microBtn} ${isRecording ? css.active : ''}`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? (
                <BsFillStopFill className={css.icon} />
              ) : (
                <BsFillMicFill className={css.icon} />
              )}
              {/* <BsFillMicFill className={css.icon} /> */}
            </button>
          </>
        ) : (
          <>
            {isLoading ? (
              'Зачекайте...'
            ) : (
              <>
                {' '}
                <button className={css.playBtn} onClick={togglePlay}>
                  {isPlaying ? (
                    <FaPause size={24} className={css.playerBtn} />
                  ) : (
                    <FaPlay size={24} className={css.playerBtn} />
                  )}
                </button>
                <audio
                  src={audioURL}
                  ref={audioRef}
                  // onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                />
                <p>
                  {formatTime(currentTime)} / {duration}
                </p>
                {!completedDoc && (
                  <RxCrossCircled
                    size={24}
                    className={css.iconCross}
                    onClick={() => {
                      // if (repair) {
                      //   setAudioURL([]);
                      // } else {
                      setAudioURL(null);
                      // }
                      setDuration(null);
                      setCurrentTime(0);
                      setIsPlaying(false);
                    }}
                  />
                )}{' '}
              </>
            )}
          </>
        )}
      </div>
      <div className={css.btnBox}>
        {audioURL && !completedDoc ? (
          <button
            className={css.btnCheck}
            onClick={() => setRecordAudio(false)}
          >
            <BsCheckLg className={css.iconCheck} />
          </button>
        ) : (
          // <button className={css.btn} onClick={() => setRecordAudio(false)}>
          //   <BsFillDoorOpenFill className={css.iconDoor} />
          // </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              if (completedDoc) {
                setOpenAudio(false);
              } else {
                setRecordAudio(false);
              }
            }}
            className={css.cancel}
          >
            <FaArrowLeft />
          </button>
        )}
      </div>
    </div>
  );
}
