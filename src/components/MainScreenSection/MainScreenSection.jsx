import CalendarPart from './CalendarPart/CalendarPart';
import CarsInWorkOrDoneList from './CarsInWorkOrDoneList/CarsInWorkOrDoneList';
import { IoCarSport } from 'react-icons/io5';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { BsCameraFill } from 'react-icons/bs';
import { IoExitOutline } from 'react-icons/io5';
import { BiSolidMessageDetail } from 'react-icons/bi';
import css from './MainScreenSection.module.css';

export default function MainScreenSection() {
  return (
    <div>
      <div className={css.topPart}>
        <div className={css.mechNameBox}>
          <p className={css.name}>Блудов О.А.</p>
          <p className={css.paleText}>Механік</p>
        </div>
        <div>
          <div>
            <p>Нараховано</p>
            <p></p>
          </div>
          <div>
            <p>Сьогодні</p>
            <p></p>
          </div>
          <div>
            <p>Можлива ЗП</p>
            <p></p>
          </div>
        </div>
      </div>

      <CalendarPart />

      <CarsInWorkOrDoneList />

      <button>
        <IoCarSport />
        <BsPlusCircleDotted />
        <BsCameraFill />
      </button>

      <CarsInWorkOrDoneList />

      <div>
        <div>
          <IoExitOutline />
        </div>
        <BiSolidMessageDetail />
        <p></p>
      </div>
    </div>
  );
}
