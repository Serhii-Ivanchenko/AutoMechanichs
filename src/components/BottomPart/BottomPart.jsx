import { RxCross1 } from 'react-icons/rx';
import { BsCheckLg } from 'react-icons/bs';
import css from './BottomPart.module.css';
import { NavLink } from 'react-router-dom';
import { BsFillMicFill } from 'react-icons/bs';
import { BsCameraFill } from 'react-icons/bs';
import { BiSolidMessageDetail } from 'react-icons/bi';
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { TiHome } from 'react-icons/ti';

export default function BottomPart({
  back,
  next,
  button,
  categ,
  btnToggle,
  buttonSpares,
  chosenPoints,
  savedPartBottom,
  handleCreateDiag,
  savedPartScreen,
  setRecordAudio,
}) {
  const isDisabled = chosenPoints?.length === 0;

  return (
    <div
      className={`${css.wrapper} ${savedPartScreen ? css.wrapperSaved : ''}`}
    >
      {button || buttonSpares ? (
        <button
          type="button"
          onClick={back}
          className={`${css.cancel} ${savedPartScreen ? css.savedScreen : ''}`}
        >
          <FaArrowLeft className={css.icon} />
        </button>
      ) : (
        <NavLink to={back} className={css.cancel}>
          <FaArrowLeft className={css.icon} />
        </NavLink>
      )}

      {categ ? (
        <>
          <NavLink to="/main" className={css.home}>
            <TiHome className={css.icon} />
          </NavLink>
          <div className={css.greyCircle} onClick={() => setRecordAudio(true)}>
            <BsFillMicFill className={css.icon} />
          </div>
          <div className={css.greyCircle}>
            <BsCameraFill className={css.icon} />
          </div>
          <div className={css.greyCircle}>
            <BiSolidMessageDetail className={css.icon} />
          </div>
        </>
      ) : (
        <NavLink to="/main" className={css.home}>
          <TiHome className={css.icon} />
        </NavLink>
      )}
      {/* 
      categ ? (
        <div style={{ width: '41px' }}></div>
      ) : */}
      {button || btnToggle || buttonSpares ? (
        <button
          type="button"
          onClick={savedPartBottom ? handleCreateDiag : next}
          className={`${css.confirm} ${isDisabled && css.confirmDisabled} ${
            savedPartScreen ? css.savedScreen : ''
          }`}
          disabled={isDisabled}
        >
          {savedPartBottom ? (
            <BsCheckLg className={css.icon} />
          ) : (
            <FaArrowRight className={css.icon} />
          )}
        </button>
      ) : (
        <NavLink to={next} className={css.confirm}>
          <FaArrowRight className={css.icon} />
        </NavLink>
      )}

      {}
    </div>
  );
}
