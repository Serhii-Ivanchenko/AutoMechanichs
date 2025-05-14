import css from './AddCarPhoto.module.css';
import { IoCloseCircle, IoCheckmarkCircleSharp } from 'react-icons/io5';
import { BsCameraFill } from 'react-icons/bs';
// import { useCameraPhoto } from '../../utils/useCameraPhoto';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

export default function AddCarPhoto({ setPhoto, setVideoStream }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setVideoStream(stream);
      setCameraOn(true);
    } catch (err) {
      console.error('Ошибка при доступе к камере', err);
    }
  };

  const stopCamera = () => {
    setCameraOn(false);
    setVideoStream(null);
    const tracks = videoRef.current?.srcObject?.getTracks();
    tracks?.forEach(track => track.stop());
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setPhoto(dataUrl);
    stopCamera();
  };

  const handleClick = () => {
    if (!cameraOn) {
      startCamera();
    } else {
      takePhoto();
    }
  };

  return (
    <div className={css.wrapper}>
      <Link to="/main">
        <IoCloseCircle className={`${css.btn} ${css.cross}`} />
      </Link>

      <div>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ display: 'none' }}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <button type="button" className={css.cameraBtn} onClick={handleClick}>
          <BsCameraFill className={css.cameraIcon} />
        </button>
      </div>
      <IoCheckmarkCircleSharp className={`${css.btn} ${css.check}`} />
    </div>
  );
}
