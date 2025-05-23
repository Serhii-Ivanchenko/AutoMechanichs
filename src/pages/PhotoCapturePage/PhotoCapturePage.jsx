import { Link, useNavigate, useParams } from 'react-router-dom';
import css from './PhotoCapturePage.module.css';
import { IoMdClose, IoMdCheckmark } from 'react-icons/io';
import { BsCameraFill, BsTrash } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCarPhotos } from '../../redux/cars/operations';
import autoPhoto from '../../assets/images/absentAutoImg.webp';


export default function PhotoCapturePage({ diag,
  // carId,
  setOpenCamera }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photoPreview, setPhotoPreview] = useState('');

  const params = useParams();
  const carId = params?.carId;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('photos', photos);

  useEffect(() => {
    const openCamera = async () => {
      if (isCameraOpen && videoRef.current && !stream) {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
        } catch (err) {
          console.error('Ошибка доступа к камере:', err);
        }
      }
    };

    openCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOpen, stream]);

  const handleMainButtonClick = () => {
    if (!isCameraOpen) {
      setIsCameraOpen(true);
    } else {
      // Делаем снимок
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!video || !canvas || !context) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const photoData = canvas.toDataURL('image/png');

      setPhotos(prev => [...prev, photoData]);
      setPhotoPreview(photoData);
    }
  };

  const handleCloseCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setStream(null);
    setIsCameraOpen(false);
  };

  const handlePhotoDelete = index => {
    setPhotos(prev => prev.filter((item, idx) => idx !== index));
  };

  const onCheckmarkBtnClick = () => {
    if (!carId) return;

    const carData = {
      car_id: carId,
      photos,
    };

    console.log('carData', carData);

    dispatch(uploadCarPhotos(carData))
      .unwrap()
      .then(() => {
        toast.success('Фото успішно додані', {
          position: 'top-center',
          duration: 3000,
          style: {
            background: 'var(--bg-input)',
            color: 'var(--white)FFF',
          },
        });
        navigate(`/car/${carId}/diagnostics`);
      })
      .catch(err => {
        console.log(err);

        toast.error('Щось сталося, спробуйте ще раз', {
          position: 'top-center',
          style: {
            background: 'var(--bg-input)',
            color: 'var(--white)FFF',
          },
        });
      });
  };

  return (
    <div className={`${css.wrapper} ${diag && css.wrapperDiag}`}>
      {isCameraOpen ? (
        <div className={`${css.video} ${diag && css.videoDiag}`}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className={`${css.video} ${diag && css.videoDiag}`}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      ) : (
        <div className={css.photoSectionWrapper}>
          {photos?.map((src, index) => (
            <div key={index} className={css.photoWrapper}>
              <img src={src} alt="car photo" className={css.photo} />
              <button type="button" className={css.deleteBtn}>
                <BsTrash
                  className={css.deleteBtnIcon}
                  onClick={() => handlePhotoDelete(index)}
                />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className={`${css.btnsWrapper} ${stream ? css.cameraOn : ''}`}>
        {!isCameraOpen ? (
          diag ? (
            <button
              className={css.cancelBtn}
              onClick={() => setOpenCamera(false)}
            >
              <IoMdClose className={`${css.cancelBtn} ${css.cross}`} />
            </button>
          ) : (
            <Link className={css.cancelBtn} to="/add-car">
              <IoMdClose className={`${css.cancelBtn} ${css.cross}`} />
            </Link>
          )
        ) : (
          <button className={css.cancelBtn} onClick={handleCloseCamera}>
            <IoMdClose className={`${css.cancelBtn} ${css.cross}`} />
          </button>
        )}

        <button
          type="button"
          className={css.cameraBtn}
          onClick={handleMainButtonClick}
        >
          <BsCameraFill className={css.cameraIcon} />
        </button>

        {!isCameraOpen ? (
          <Link className={css.acceptBtn} to={`/car/${carId}/diagnostics`}>
            <IoMdCheckmark className={`${css.acceptBtn} ${css.check}`} />
          </Link>
        )
        //  {!isCameraOpen ? (
        //   // <Link className={css.acceptBtn} to="/car/:carId/diagnostics">
        //   <IoMdCheckmark
        //     className={`${css.acceptBtn} ${css.check}`}
        //     onClick={onCheckmarkBtnClick}
        //   />
        //   // {/* </Link> */}
        // )
          : photos.length > 0 ? (
          <div className={css.photoPreviewWrapper}>
            <img
              src={photoPreview}
              alt="photo preview"
              className={css.photoPreview}
              onError={e => {
                e.target.onerror = null;
                e.target.src = autoPhoto;
              }}
            />
            <p className={css.photoQuantity}>{photos?.length}</p>
          </div>
        ) : (
          <div className={css.emptyDiv}></div>
        )}
      </div>
    </div>
  );
}
