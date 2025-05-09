import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import css from './CalendarPart.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCars } from '../../../redux/cars/operations';

export default function CalendarPart() {
  const months = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ];
  const dispatch = useDispatch();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [day, setDay] = useState(today.getDate());
  // console.log('today', today);
  // console.log('month', today.getMonth());

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const changeDay = delta => {
    const daysInMonth = getDaysInMonth(year, month);
    let newDay = day + delta;

    if (newDay < 1) {
      // Перехід назад на попередній місяць
      const prevMonth = month === 0 ? 11 : month - 1;
      const newYear = month === 0 ? year - 1 : year;
      const prevMonthDays = getDaysInMonth(newYear, prevMonth);
      setYear(newYear);
      setMonth(prevMonth);
      setDay(prevMonthDays);
    } else if (newDay > daysInMonth) {
      // Перехід вперед на наступний місяць
      const nextMonth = month === 11 ? 0 : month + 1;
      const newYear = month === 11 ? year + 1 : year;
      setYear(newYear);
      setMonth(nextMonth);
      setDay(1);
    } else {
      setDay(newDay);
    }
  };

  useEffect(() => {
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(
      day
    ).padStart(2, '0')}`;

    const data = {
      date,
      mechanic_id: 1,
    };

    dispatch(getAllCars(data));
  }, [year, month, day, dispatch]);

  // const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(
  //   day
  // ).padStart(2, '0')}`;

  // console.log('date', date);

  // const getCarsByDate = () => {
  //   const data = {
  //     date: date,
  //     mechanic_id: 1,
  //   };

  //   dispatch(getAllCars(data));
  // };

  return (
    <div className={css.calendarBox}>
      <button className={css.btnArrow} onClick={() => changeDay(-1)}>
        <IoIosArrowBack className={css.icon} />
      </button>
      <div className={css.dayBox}>{day}</div>
      <p className={css.month}>{months[month]}</p>
      <button className={css.btnArrow} onClick={() => changeDay(1)}>
        <IoIosArrowForward className={css.icon} />
      </button>
    </div>
  );
}
