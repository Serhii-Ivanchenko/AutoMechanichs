import { useParams } from 'react-router-dom';
import CarDetailsPart from '../DiagnosticScreen/CarDetailsPart/CarDetailsPart';
import SavedSparesPart from '../DiagnosticScreen/SavedSparesPart/SavedSparesPart';
import WorksSwitcher from '../DiagnosticScreen/WorksSwitcher/WorksSwitcher';
import { useSelector } from 'react-redux';
import { selectCars } from '../../redux/cars/selectors';
import BottomPart from '../BottomPart/BottomPart';
import css from './CompletedDocSection.module.css';
import { BsUiRadiosGrid, BsWrench } from 'react-icons/bs';

export default function CompletedDocSection() {
  const { carId } = useParams();
  // console.log('carId', carId);

  const cars = useSelector(selectCars);
  // console.log('cars', cars);

  const particularCar = cars?.find(car => car?.car_id === Number(carId));
  // console.log('particularCar', particularCar);
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
      <SavedSparesPart nodes={[]} />
      <BottomPart savedPartScreen={true} button={true} />
    </div>
  );
}
