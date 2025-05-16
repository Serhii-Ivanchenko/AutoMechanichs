import { useParams } from 'react-router-dom';
import CarDetailsPart from '../DiagnosticScreen/CarDetailsPart/CarDetailsPart';
import SavedSparesPart from '../DiagnosticScreen/SavedSparesPart/SavedSparesPart';
import WorksSwitcher from '../DiagnosticScreen/WorksSwitcher/WorksSwitcher';
import { useSelector } from 'react-redux';
import { selectCars } from '../../redux/cars/selectors';
import BottomPart from '../BottomPart/BottomPart';

export default function CompletedDocSection() {
  const { carId } = useParams();
  // console.log('carId', carId);

  const cars = useSelector(selectCars);
  // console.log('cars', cars);

  const particularCar = cars?.find(car => car?.car_id === Number(carId));
  // console.log('particularCar', particularCar);
  return (
    <div>
      <CarDetailsPart particularCar={particularCar} />
      <WorksSwitcher disabled={true} />
      <SavedSparesPart nodes={[]} />
      <BottomPart savedPartScreen={true} button={true} />
    </div>
  );
}
