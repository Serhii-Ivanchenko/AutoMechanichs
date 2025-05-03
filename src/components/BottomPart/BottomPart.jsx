import { RxCross1 } from 'react-icons/rx';
import { BsCheckLg } from 'react-icons/bs';
import css from './BottomPart.module.css';
import { Link } from 'react-router-dom';
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
        <Link to={back} className={css.cancel}>
          <RxCross1 className={css.icon} />
        </Link>
      )}

      {buttonSpares ? (
        <>
          <div className={css.greyCircle}>
            <BsFillMicFill />
          </div>
          <div className={css.greyCircle}>
            <BsCameraFill />
          </div>
          <div className={css.greyCircle}>
            <BiSolidMessageDetail />
          </div>
        </>
      ) : (
        <p className={css.money}>0</p>
      )}

      {categ ? (
        <div style={{ width: '41px' }}></div>
      ) : button || btnToggle ? (
        <div onClick={() => setNext(true)} className={css.confirm}>
          <BsCheckLg className={css.icon} />
        </div>
      ) : (
        <Link to={next} className={css.confirm}>
          <BsCheckLg className={css.icon} />
        </Link>
      )}

      {}
    </div>
  );
}
