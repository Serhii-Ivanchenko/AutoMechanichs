import { RxCross1 } from 'react-icons/rx';
import { BsCheckLg } from 'react-icons/bs';
import css from './BottomPart.module.css';
import { NavLink } from 'react-router-dom';
import { BsFillMicFill } from 'react-icons/bs';
import { BsCameraFill } from 'react-icons/bs';
import { BiSolidMessageDetail } from 'react-icons/bi';

export default function BottomPart({
  back,
  next,
  setNext,
  button,
  categ,
  btnToggle,
  buttonSpares,
}) {
  return (
    <div className={css.wrapper}>
      {button || buttonSpares ? (
        <div onClick={back} className={css.cancel}>
          <RxCross1 className={css.icon} />
        </div>
      ) : (
        <NavLink to={back} className={css.cancel}>
          <RxCross1 className={css.icon} />
        </NavLink>
      )}

      {buttonSpares ? (
        <>
          <div className={css.greyCircle}>
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
        <p className={css.money}>0</p>
      )}

      {categ ? (
        <div style={{ width: '41px' }}></div>
      ) : button || btnToggle || buttonSpares ? (
        <div onClick={() => setNext(true)} className={css.confirm}>
          <BsCheckLg className={css.icon} />
        </div>
      ) : (
        <NavLink to={next} className={css.confirm}>
          <BsCheckLg className={css.icon} />
        </NavLink>
      )}

      {}
    </div>
  );
}
