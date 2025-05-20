import { useParams } from 'react-router-dom';
import CarDetailsPart from '../DiagnosticScreen/CarDetailsPart/CarDetailsPart';
import SavedSparesPart from '../DiagnosticScreen/SavedSparesPart/SavedSparesPart';
import WorksSwitcher from '../DiagnosticScreen/WorksSwitcher/WorksSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import { selectCars, selectDiagnostic } from '../../redux/cars/selectors';
import BottomPart from '../BottomPart/BottomPart';
import css from './CompletedDocSection.module.css';
import { BsUiRadiosGrid, BsWrench } from 'react-icons/bs';
import { useEffect } from 'react';
import { getDiagnostic } from '../../redux/cars/operations';

export default function CompletedDocSection() {
  const { carId } = useParams();
  // console.log('carId', carId);

  const cars = useSelector(selectCars);
  // console.log('cars', cars);

  const particularCar = cars?.find(car => car?.car_id === Number(carId));
  // console.log('particularCar', particularCar);

  const dispatch = useDispatch();

  const id = '682ce6104f095bf3de2739ef';

  useEffect(() => {
    dispatch(getDiagnostic(id));
  }, [id, dispatch]);

  const completedDiag = useSelector(selectDiagnostic);
  const completedDiagWithId = completedDiag?.nodes?.map(diag => ({
    ...diag,
    id: Math.random(),
  }));

  // console.log('completedDiagWithId', completedDiagWithId);

  return (
    <div className={css.wrapper}>
      <CarDetailsPart particularCar={particularCar} />
      {/* <WorksSwitcher disabled={true} /> */}
      <div className={css.buttons}>
        <p>
          {particularCar?.diagnostic_id
            ? 'Діагностика'
            : particularCar?.repair_id
            ? 'Ремонт'
            : 'Діагностика'}
        </p>
        <div className={css.indicator}>
          {particularCar?.diagnostic_id ? (
            <BsUiRadiosGrid />
          ) : particularCar?.repair_id ? (
            <BsWrench />
          ) : (
            <BsUiRadiosGrid />
          )}
        </div>
      </div>
      <SavedSparesPart
        nodes={completedDiag ? completedDiagWithId : []}
        completed={true}
      />
      <BottomPart savedPartScreen={true} button={true} />
    </div>
  );
}
