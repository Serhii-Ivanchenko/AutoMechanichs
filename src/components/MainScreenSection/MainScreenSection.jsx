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

export default function MainScreenSection({ array1, array2, wage }) {
  // const [car, setCar] = useState('');
  // const [diagOpen, setDiagOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const cars = useSelector(selectCars);
  console.log('cars', cars);

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
      <CarsInWorkOrDoneList list={cars} />

      <button className={css.btnAddPhoto}>
        <IoCarSport className={css.icon} />
        <BsPlusCircleDotted className={css.icon} />
        <BsCameraFill className={css.icon} />
      </button>

      <CarsInWorkOrDoneList
        done={true}
        list={array2}
        // setDiagOpen={setDiagOpen}
      />

      <div className={css.bottomPart}>
        <button className={css.exitBox} onClick={() => handleLogOut()}>
          <BsBoxArrowLeft className={css.iconExit} />
        </button>
        <BiSolidMessageDetail className={css.iconMessage} />
        <p className={css.wage}>{'+' + wage}</p>
      </div>
      {/* </>
      )} */}
    </div>
  );
}
