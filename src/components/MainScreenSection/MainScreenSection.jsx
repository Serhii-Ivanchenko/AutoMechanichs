import CalendarPart from './CalendarPart/CalendarPart';
import CarsInWorkOrDoneList from './CarsInWorkOrDoneList/CarsInWorkOrDoneList';
import { IoCarSport } from 'react-icons/io5';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { BsCameraFill } from 'react-icons/bs';
import { IoExitOutline } from 'react-icons/io5';
import { BiSolidMessageDetail } from 'react-icons/bi';
import css from './MainScreenSection.module.css';
const array1 = [
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2020 VW Passat',
    problem: 'Стукає сперeду справа',
    salary: '35000',
  },
  {
    time: '12:00',
    carModel: '2020 VW Passat',
    problem: 'Стукає сперeду справа',
    salary: '3000',
  },
  {
    time: '12:00',
    carModel: '2020 VW Polo',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2020 VW Polo',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '8482',
  },
];

const array2 = [
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
  {
    time: '12:00',
    carModel: '2001 HONDA CIVIC',
    problem: 'Стукає сперeду справа',
    salary: '400',
  },
];

export default function MainScreenSection() {
  const wage = array2.reduce((sum, i) => sum + Number(i.salary || 0), 0);
  const possibleSum = array1.reduce((sum, i) => sum + Number(i.salary || 0), 0);
  const amountPossible = wage + possibleSum;

  return (
    <div className={css.sectionWrapper}>
      <div className={css.topPart}>
        <div className={css.mechNameBox}>
          <p className={css.name}>Блудов О.А.</p>
          <p className={css.paleText}>Механік</p>
        </div>
        <div className={css.salaryInfoBox}>
          <div className={css.salaryPoint}>
            <p className={css.paleText}>Нараховано</p>
            <p className={css.amount}>{wage}</p>
          </div>
          <div className={css.salaryPoint}>
            <p className={css.paleText}>Сьогодні</p>
            <p className={css.amount}>{'+' + wage}</p>
          </div>
          <div className={css.salaryPoint}>
            <p className={css.paleText}>Можлива ЗП</p>
            <p className={css.amountPossible}>{amountPossible}</p>
          </div>
        </div>
      </div>

      <CalendarPart />

      <CarsInWorkOrDoneList list={array1} />

      <button className={css.btnAddPhoto}>
        <IoCarSport className={css.icon} />
        <BsPlusCircleDotted className={css.icon} />
        <BsCameraFill className={css.icon} />
      </button>

      <CarsInWorkOrDoneList done={true} list={array2} />

      <div className={css.bottomPart}>
        <div className={css.exitBox}>
          <IoExitOutline className={css.iconExit} />
        </div>
        <BiSolidMessageDetail className={css.iconMessage} />
        <p className={css.wage}>{'+' + wage}</p>
      </div>
    </div>
  );
}
