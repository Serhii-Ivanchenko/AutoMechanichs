import css from './AddCarScreen.module.css';
import autoPhoto from '../../assets/images/absentAutoImg.webp';
import flag from '../../assets/images/flagUa.webp';
import {
  BsFillCpuFill,
  BsFillCaretDownFill,
  BsCameraFill,
} from 'react-icons/bs';
import { SlSpeedometer } from 'react-icons/sl';
import carData from '../../utils/output.json';
import { useEffect, useRef, useState } from 'react';
import AddCarPopup from './AddCarPopup/AddCarPopup';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { recognizeLicensePlate } from '../../redux/cars/operations';
import {
  selectCarInfo,
  selectIsRecognitionLoading,
} from '../../redux/cars/selectors';
import LoaderSvg from '../Loader/LoaderSvg.jsx';

export default function AddCarScreen({
  photo,
  stream,
  setCarMake,
  setCarModel,
  setCarYear,
  setCarMileage,
}) {
  const [chosenMake, setChosenMake] = useState({});
  const [chosenModel, setChosenModel] = useState({});
  const [makePopupOpen, setMakePopupOpen] = useState(false);
  const [modelPopupOpen, setModelPopupOpen] = useState(false);
  const [makeSearchQuery, setMakeSearchQuery] = useState('');
  const [modelSearchQuery, setModelSearchQuery] = useState('');
  const [displayedMakeArr, setDisplayedMakeArr] = useState([]);
  const [displayedModelArr, setDisplayedModelArr] = useState([]);
  const [yearPopupOpen, setYearPopupOpen] = useState(false);
  const [yearSearchQuery, setYearSearchQuery] = useState('');
  const [displayedYearArr, setDisplayedYearArr] = useState([]);
  const [chosenYear, setChosenYear] = useState('');
  const [mileage, setMileage] = useState('');
  const dispatch = useDispatch();

  const buttonMakeRef = useRef(null);
  const buttonModelRef = useRef(null);
  const buttonYearRef = useRef(null);
  const videoRef = useRef(null);

  const carInfo = useSelector(selectCarInfo);
  const isRecoginitionLoading = useSelector(selectIsRecognitionLoading);
  console.log('carInfo', carInfo);

  const makeInputClick = e => {
    e.stopPropagation();
    setMakePopupOpen(!makePopupOpen);
    setMakeSearchQuery('');
    setChosenModel({});
    setChosenYear('');
  };

  const modelInputClick = e => {
    e.stopPropagation();
    setModelPopupOpen(!modelPopupOpen);
    setModelSearchQuery('');
  };

  const yearInputClick = e => {
    e.stopPropagation();
    setYearPopupOpen(!yearPopupOpen);
    setYearSearchQuery('');
  };

  const carMakesArr = carData?.map(car => ({ id: car.id, make: car.make }));

  useEffect(() => {
    setDisplayedMakeArr(
      makeSearchQuery.trim() === ''
        ? carMakesArr
        : carMakesArr?.filter(car =>
            car.make
              .toString()
              .toLowerCase()
              .includes(makeSearchQuery.trim().toLowerCase())
          )
    );
  }, [makeSearchQuery]);

  useEffect(() => {
    if (!chosenMake?.make) {
      return;
    }
    const existedMake = carData?.find(
      item => Number(item.id) === Number(chosenMake?.id)
    );
    setDisplayedModelArr(
      modelSearchQuery.trim() === ''
        ? existedMake?.models
        : existedMake?.models?.filter(car =>
            car?.model_name
              .toString()
              .toLowerCase()
              .includes(modelSearchQuery.trim().toLowerCase())
          )
    );
  }, [chosenMake, modelSearchQuery]);

  useEffect(() => {
    if (!chosenMake?.make || !chosenModel?.model_name) {
      return;
    }

    const existedMake = carData?.find(
      item => Number(item.id) === Number(chosenMake?.id)
    );
    const selectedCarModel = existedMake?.models.find(
      car =>
        chosenModel?.model_name?.toLocaleLowerCase() ===
        car.model_name.toLocaleLowerCase()
    );
    const selectedCarModelConstructionInterval =
      selectedCarModel?.construction_interval;
    const [startDate, endDate] =
      selectedCarModelConstructionInterval.split('- ');
    const [startMonth, startYear] = startDate.split('.');
    const [endMonth, endYear] = endDate.split('.');
    const defaultEndYear = endYear ? endYear : new Date().getFullYear();
    const yearArr = [];
    for (let i = startYear; i <= defaultEndYear; i++) {
      yearArr.push(i);
    }

    setDisplayedYearArr(
      yearSearchQuery.trim() === ''
        ? yearArr
        : yearArr?.filter(year =>
            year
              .toString()
              .toLowerCase()
              .includes(yearSearchQuery.trim().toLowerCase())
          )
    );
  }, [chosenModel, yearSearchQuery, chosenMake]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    setCarMake(chosenMake?.make ? chosenMake?.make : ''),
      setCarModel(chosenModel?.model_name ? chosenModel?.model_name : ''),
      setCarYear(chosenYear ? chosenYear : ''),
      setCarMileage(mileage ? mileage : '');
  }, [chosenMake, chosenModel, chosenYear, mileage]);

  const handleSend = () => {
    if (!photo) {
      return;
    }
    const dataURLtoBlob = dataUrl => {
      const arr = dataUrl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) u8arr[n] = bstr.charCodeAt(n);
      return new Blob([u8arr], { type: mime });
    };

    const photoToSend = dataURLtoBlob(photo);
    console.log('photoToSend', photoToSend);
    dispatch(recognizeLicensePlate(photoToSend));
  };

  return isRecoginitionLoading ? (
    <LoaderSvg />
  ) : (
    <div className={`${css.wrapper} ${stream ? css.cameraOn : ''}`}>
      {stream ? (
        <video ref={videoRef} autoPlay playsInline className={css.video} />
      ) : (
        <>
          <div className={css.carPhoto}>
            {/* {!photo && !stream && (
          <img src={autoPhoto} alt="car photo" className={css.carImg} />
        )} */}

            {photo ? (
              <img src={photo} alt="car photo" className={css.carImg} />
            ) : (
              <img src={autoPhoto} alt="car photo" className={css.carImg} />
            )}
          </div>

          <div className={css.topWrapper}>
            <div className={css.carNumberWrapper}>
              <div className={css.numberWrapper}>
                <img src={flag} alt="flag image" />
                <p className={css.flagText}>UA</p>
              </div>
              <p className={css.number}>
                {carInfo?.license_plate ?? '- - - -'}
              </p>
            </div>
            <button type="button" className={css.btn} onClick={handleSend}>
              <BsFillCpuFill className={css.btnIcon} />
              Розпізнати
            </button>
          </div>
          <div className={css.bottomWrapper}>
            <div
              onClick={makeInputClick}
              ref={buttonMakeRef}
              className={css.inputWithPopup}
            >
              <div className={css.inputWrapper} onClick={makeInputClick}>
                {makePopupOpen ? (
                  <input
                    type="text"
                    value={makeSearchQuery}
                    onChange={e => setMakeSearchQuery(e.target.value)}
                    className={`${css.input} ${css.text} ${css.textColor}`}
                    onClick={e => e.stopPropagation()}
                    placeholder="Марка авто"
                  />
                ) : (
                  <p
                    className={clsx(
                      css.text,
                      chosenMake?.make ? css.textColor : css.placeholderColor
                    )}
                  >
                    {chosenMake?.make || 'Марка авто'}
                  </p>
                )}
                <button
                  type="button"
                  className={css.arrow}
                  onClick={makeInputClick}
                >
                  <BsFillCaretDownFill
                    className={clsx(
                      css.arrowIcon,
                      makePopupOpen && css.arrowIconOpen
                    )}
                  />
                </button>
              </div>

              {makePopupOpen && (
                <AddCarPopup
                  arr={displayedMakeArr}
                  fieldKey="make"
                  setFieldValue={setChosenMake}
                  buttonRef={buttonMakeRef}
                  onClose={() => setMakePopupOpen(false)}
                  isOpen={makePopupOpen}
                />
              )}
            </div>
            <div
              onClick={modelInputClick}
              ref={buttonModelRef}
              className={css.inputWithPopup}
            >
              <div className={css.inputWrapper} onClick={modelInputClick}>
                {modelPopupOpen ? (
                  <input
                    type="text"
                    value={modelSearchQuery}
                    onChange={e => setModelSearchQuery(e.target.value)}
                    className={`${css.input} ${css.text} ${css.textColor}`}
                    onClick={e => e.stopPropagation()}
                    placeholder="Модель авто"
                  />
                ) : (
                  <p
                    className={clsx(
                      css.text,
                      chosenModel?.model_name
                        ? css.textColor
                        : css.placeholderColor
                    )}
                  >
                    {chosenModel?.model_name || 'Модель авто'}
                  </p>
                )}
                <button
                  type="button"
                  className={css.arrow}
                  onClick={modelInputClick}
                >
                  <BsFillCaretDownFill
                    className={clsx(
                      css.arrowIcon,
                      modelPopupOpen && css.arrowIconOpen
                    )}
                  />
                </button>
              </div>
              {modelPopupOpen && (
                <AddCarPopup
                  arr={displayedModelArr}
                  fieldKey="model_name"
                  setFieldValue={setChosenModel}
                  buttonRef={buttonModelRef}
                  onClose={() => setModelPopupOpen(false)}
                  isOpen={modelPopupOpen}
                />
              )}
            </div>
            <div
              onClick={yearInputClick}
              ref={buttonYearRef}
              className={css.inputWithPopup}
            >
              <div className={css.inputWrapper} onClick={yearInputClick}>
                {yearPopupOpen ? (
                  <input
                    type="text"
                    value={yearSearchQuery}
                    onChange={e => setYearSearchQuery(e.target.value)}
                    className={`${css.input} ${css.text} ${css.textColor}`}
                    onClick={e => e.stopPropagation()}
                    placeholder="Рік випуску"
                  />
                ) : (
                  <p
                    className={clsx(
                      css.text,
                      chosenYear ? css.textColor : css.placeholderColor
                    )}
                  >
                    {chosenYear || 'Рік випуску'}
                  </p>
                )}
                <button
                  type="button"
                  className={css.arrow}
                  onClick={yearInputClick}
                >
                  <BsFillCaretDownFill
                    className={clsx(
                      css.arrowIcon,
                      yearPopupOpen && css.arrowIconOpen
                    )}
                  />
                </button>
              </div>

              {yearPopupOpen && (
                <AddCarPopup
                  arr={displayedYearArr}
                  // fieldKey="make"
                  setFieldValue={setChosenYear}
                  buttonRef={buttonYearRef}
                  onClose={() => setYearPopupOpen(false)}
                  isOpen={yearPopupOpen}
                />
              )}
            </div>
            <div className={css.mileageWrapper}>
              <SlSpeedometer className={css.mileageIcon} />
              <p className={css.mileage}>
                257 <span className={css.mileageText}>тис. км</span>
              </p>
              <BsCameraFill className={css.cameraIcon} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
