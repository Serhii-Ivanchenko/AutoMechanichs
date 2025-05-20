import { useState } from 'react';
import css from './WorksSwitcher.module.css';
import { BsUiRadiosGrid, BsWrench } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

export default function WorksSwitcher({
  subcatOpen,
  subcatRepairOpen,
  carId,
  disabled,
  car,
}) {
  // const [isActive, setIsActive] = useState('diag');

  return (
    <div className={css.btnsBox}>
      {!subcatRepairOpen && car?.status === 'diagnostic' && (
        <NavLink
          to={`/car/${carId}/diagnostics`}
          className={({ isActive }) =>
            `${css.buttons} ${isActive ? css.buttonsActive : ''}`
          }
          // onClick={() => {
          //   setIsActive('diag');
          // }}
          onClick={e => {
            if (disabled) e.preventDefault();
          }}
        >
          Діагностика
          <div className={css.indicator}>
            <BsUiRadiosGrid />
          </div>
        </NavLink>
      )}

      {!subcatOpen && car?.status === 'repair' && (
        <NavLink
          to={`/car/${carId}/repair`}
          className={({ isActive }) =>
            `${css.buttons} ${isActive ? css.buttonsActive : ''}`
          }
          // onClick={() => setIsActive('repair')}
          onClick={e => {
            if (disabled) e.preventDefault();
          }}
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
