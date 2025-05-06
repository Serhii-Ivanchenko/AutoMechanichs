import { useState } from 'react';
import css from './WorksSwitcher.module.css';
import {
  BsUiRadiosGrid,
  //   BsClipboardCheck,
  // BsCurrencyDollar,
  BsWrench,
} from 'react-icons/bs';

export default function WorksSwitcher({ subcatOpen }) {
  const [isActive, setIsActive] = useState('diag');

  return (
    <div className={css.btnsBox}>
      <button
        type="button"
        className={`${css.buttons} ${isActive === 'diag' && css.buttonsActive}`}
        onClick={() => {
          setIsActive('diag');
        }}
      >
        Діагностика
        <div className={css.indicator}>
          <BsUiRadiosGrid />
        </div>
      </button>

      {!subcatOpen && (
        <button
          type="button"
          className={`${css.buttons} ${
            isActive === 'repair' && css.buttonsActive
          }`}
          onClick={() => setIsActive('repair')}
        >
          Ремонт{' '}
          <div className={css.indicator}>
            <BsWrench />
          </div>
        </button>
      )}
    </div>
  );
}
