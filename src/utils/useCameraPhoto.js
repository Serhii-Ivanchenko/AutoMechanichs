import { useRef, useState } from 'react';

// export const useCameraPhoto = onPhotoReady => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [stream, setStream] = useState(null);

//   const startCamera = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//       });
//       videoRef.current.srcObject = mediaStream;
//       setStream(mediaStream);
//     } catch (err) {
//       console.error('Ошибка при доступе к камере', err);
//     }
//   };

//   const stopCamera = () => {
//     if (stream) {
//       stream.getTracks().forEach(track => track.stop());
//       setStream(null);
//     }
//   };

//   const takePhoto = () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     const photoData = canvas.toDataURL('image/jpeg');
//     onPhotoReady(photoData);
//     stopCamera();
//   };

//   const handleTakePhoto = async () => {
//     await startCamera();
//     setTimeout(takePhoto, 500); // задержка, чтобы видео успело загрузиться
//   };

//   return {
//     handleTakePhoto,
//     videoRef,
//     canvasRef,
//   };
// };

export const useCameraPhoto = onPhotoReady => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // задня камера на телефоні
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
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (video.videoWidth === 0) return; // захист

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const photoData = canvas.toDataURL('image/jpeg');
    onPhotoReady(photoData);
    stopCamera();
  };

  return {
    startCamera,
    takePhoto,
    stopCamera,
    videoRef,
    canvasRef,
  };
};
