import { useRef, useState } from 'react';

export const useCameraPhoto = onPhotoReady => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [photoTaken, setPhotoTaken] = useState(false);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
    } catch (err) {
      console.error('Ошибка при доступе к камере', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    // const canvas = document.createElement('canvas');
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const photoData = canvas.toDataURL('image/jpeg');
    setPhotoTaken(true);
    onPhotoReady(photoData);
    stopCamera();
  };

  const handleClick = async () => {
    if (!stream) {
      setPhotoTaken(false);
      await startCamera();
    } else if (!photoTaken) {
      takePhoto();
    }
  };

  return {
    handleClick,
    videoRef,
    stream,
  };
};
