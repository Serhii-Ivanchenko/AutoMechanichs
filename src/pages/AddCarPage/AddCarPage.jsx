import css from './AddCarPage.module.css';
import autoPhoto from '../../assets/images/autoPhoto.png';
import flag from '../../assets/images/flagUa.webp';
import { BsFillCpuFill, BsFillCaretDownFill } from 'react-icons/bs';
import { SlSpeedometer } from 'react-icons/sl';
import carData from '../../utils/output.json';
import { useEffect, useRef, useState } from 'react';
import AddCarPopup from './AddCarPopup/AddCarPopup';
import clsx from 'clsx';

export default function AddCarPage() {
  const [chosenMake, setChosenMake] = useState({});
  const [chosenModel, setChosenModel] = useState({});
  const [makePopupOpen, setMakePopupOpen] = useState(true);
  const [modelPopupOpen, setModelPopupOpen] = useState(false);
  const [makeSearchQuery, setMakeSearchQuery] = useState('');
  const [modelSearchQuery, setModelSearchQuery] = useState('');
  const [displayedMakeArr, setDisplayedMakeArr] = useState([]);
  const [displayedModelArr, setDisplayedModelArr] = useState([]);

  const buttonMakeRef = useRef(null);
  const buttonModelRef = useRef(null);

  const makeInputClick = e => {
    e.stopPropagation();
    setMakePopupOpen(!makePopupOpen);
    setMakeSearchQuery('');
    setChosenModel({});
  };

  const modelInputClick = e => {
    e.stopPropagation();
    setModelPopupOpen(!modelPopupOpen);
    setModelSearchQuery('');
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

  return (
    <div className={css.wrapper}>
      <img src={autoPhoto} alt="car photo" className={css.carPhoto} />
      <div className={css.topWrapper}>
        <div className={css.carNumberWrapper}>
          <div className={css.numberWrapper}>
            <img src={flag} alt="flag image" />
            <p className={css.flagText}>UA</p>
          </div>
          <p className={css.number}>CA8876CO</p>
        </div>
        <button type="button" className={css.btn}>
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
                  chosenModel?.model_name ? css.textColor : css.placeholderColor
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
        <div className={css.mileageWrapper}>
          <SlSpeedometer className={css.mileageIcon} />
          <p className={css.mileage}>
            257 <span className={css.mileageText}>тис. км</span>
          </p>
        </div>
      </div>
    </div>
  );
}
