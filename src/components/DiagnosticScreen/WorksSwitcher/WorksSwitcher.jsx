import css from './WorksSwitcher.module.css';
import {
  BsUiRadiosGrid,
  //   BsClipboardCheck,
  // BsCurrencyDollar,
  BsWrench,
} from 'react-icons/bs';

export default function WorksSwitcher() {
  return (
    <div className={css.btnsBox}>
      <button type="button" className={css.buttons}>
        Діагностика
        <div className={css.indicator}>
          <BsUiRadiosGrid />
        </div>
      </button>
      <button type="button" className={css.buttons}>
        Ремонт{' '}
        <div>
          <BsWrench className={css.indicator} />
        </div>
      </button>
    </div>
  );
}
