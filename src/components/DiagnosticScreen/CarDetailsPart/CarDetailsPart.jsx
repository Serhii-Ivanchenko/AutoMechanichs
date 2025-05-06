import css from './CarDetailsPart.module.css';
import flag from '../../../assets/images/flagUa.webp';
import car from '../../../assets/images/absentAutoImg.webp';
import { BiSolidMessageDetail } from 'react-icons/bi';

export default function CarDetailsPart() {
  return (
    <div className={css.wrapper}>
      <img src={car} alt="car" className={css.image} />
      <div className={css.statusStick}></div>
      <div className={css.carRegContainer}>
        <div className={css.carRegCountry}>
          <img
            className={css.carRegFlag}
            src={flag}
            alt="Car registration country flag"
          />
          <p className={css.carRegCountry}>ua</p>
        </div>
        <p className={css.carRegNumber}>{'- - - - -'}</p>
      </div>
      <BiSolidMessageDetail className={css.iconM} />
    </div>
  );
}
