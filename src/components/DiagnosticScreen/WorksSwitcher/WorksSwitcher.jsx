import { useState } from 'react';
import css from './WorksSwitcher.module.css';
import {
  BsUiRadiosGrid,
  //   BsClipboardCheck,
  // BsCurrencyDollar,
  BsWrench,
} from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

export default function WorksSwitcher({ subcatOpen, subcatRepairOpen }) {
  // const [isActive, setIsActive] = useState('diag');

  return (
    <div className={css.btnsBox}>
      {!subcatRepairOpen && (
        <NavLink
          to="/car/:carId/diagnostics"
          className={({ isActive }) =>
            `${css.buttons} ${isActive ? css.buttonsActive : ''}`
          }
          // onClick={() => {
          //   setIsActive('diag');
          // }}
        >
          Діагностика
          <div className={css.indicator}>
            <BsUiRadiosGrid />
          </div>
        </NavLink>
      )}

      {!subcatOpen && (
        <NavLink
          to="/car/:carId/repair"
          className={({ isActive }) =>
            `${css.buttons} ${isActive ? css.buttonsActive : ''}`
          }
          // onClick={() => setIsActive('repair')}
        >
          Ремонт{' '}
          <div className={css.indicator}>
            <BsWrench />
          </div>
        </NavLink>
      )}
    </div>
  );
}
