import CalendarPart from './CalendarPart/CalendarPart';
import CarsInWorkOrDoneList from './CarsInWorkOrDoneList/CarsInWorkOrDoneList';
import { IoCarSport } from 'react-icons/io5';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { BsCameraFill, BsBoxArrowLeft } from 'react-icons/bs';
import { BiSolidMessageDetail } from 'react-icons/bi';
import css from './MainScreenSection.module.css';
import { useState } from 'react';
import DiagnosticScreen from '../DiagnosticScreen/DiagnosticScreen';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectCars } from '../../redux/cars/selectors';
import { Link } from 'react-router-dom';
import { selectBalance } from '../../redux/auth/selectors.js';
import { clearChosenDate } from '../../redux/cars/slice.js';

export default function MainScreenSection({ array1, array2, wage }) {
  // const [car, setCar] = useState('');
  // const [diagOpen, setDiagOpen] = useState(false);
  const cars = useSelector(selectCars);
  const balance = useSelector(selectBalance);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    // localStorage.removeItem('date');
    // dispatch(clearChosenDate());
  };

  console.log('cars', cars);

  const carsInWork = cars.filter(car => car?.status !== 'complete');
  const carsDone = cars.filter(car => car?.status === 'complete');
  // console.log('carsInWork', carsInWork);
  // console.log('carsDone', carsDone);

  return (
    <div className={css.sectionWrapper}>
      {/* //   <div className={css.topPart}>
    //     <div className={css.mechNameBox}>
    //       <p className={css.name}>Блудов О.А.</p>
    //       <p className={css.paleText}>Механік</p>
    //     </div>
    //     <div className={css.salaryInfoBox}>
    //       <div className={css.salaryPoint}>
    //         <p className={css.paleText}>Нараховано</p>
    //         <p className={css.amount}>{wage}</p>
    //       </div>
    //       <div className={css.salaryPoint}>
    //         <p className={css.paleText}>Сьогодні</p>
    //         <p className={css.amount}>{'+' + wage}</p>
    //       </div>
    //       <div className={css.salaryPoint}>
    //         <p className={css.paleText}>Можлива ЗП</p>
    //         <p className={css.amountPossible}>{amountPossible}</p>
    //       </div>
    //     </div>
    //   </div> */}

      {/* <CalendarPart /> */}

      {/* {diagOpen ? (
        <DiagnosticScreen setDiagOpen={setDiagOpen} />
      ) : (
        <> */}
      <CarsInWorkOrDoneList list={carsInWork} />

      <Link to="/add-car" className={css.btnAddPhoto}>
        <IoCarSport className={css.icon} />
        <BsPlusCircleDotted className={css.icon} />
        <BsCameraFill className={css.icon} />
      </Link>

      <CarsInWorkOrDoneList
        done={true}
        list={carsDone}
        // setDiagOpen={setDiagOpen}
      />

      <div className={css.bottomPart}>
        <button className={css.exitBox} onClick={() => handleLogOut()}>
          <BsBoxArrowLeft className={css.iconExit} />
        </button>
        <BiSolidMessageDetail className={css.iconMessage} />
        <p className={css.wage}>+ {balance?.today_earned ?? '----'}</p>
      </div>
      {/* </>
      )} */}
    </div>
  );
}
