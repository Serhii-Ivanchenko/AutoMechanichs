import css from './AddCarPhoto.module.css';
import { IoCloseCircle, IoCheckmarkCircleSharp } from 'react-icons/io5';
import { BsCameraFill } from 'react-icons/bs';
import { useCameraPhoto } from '../../utils/useCameraPhoto';
import { Link } from 'react-router-dom';

export default function AddCarPhoto({ setPhoto }) {
  const { handleTakePhoto, videoRef, canvasRef } = useCameraPhoto(photoData => {
    setPhoto(photoData);
  });

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
          style={{ width: 0, height: 0 }}
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <button
          type="button"
          className={css.cameraBtn}
          onClick={handleTakePhoto}
        >
          <BsCameraFill className={css.cameraIcon} />
        </button>
      </div>
      <IoCheckmarkCircleSharp className={`${css.btn} ${css.check}`} />
    </div>
  );
}
