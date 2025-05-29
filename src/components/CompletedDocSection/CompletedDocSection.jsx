import { useParams } from 'react-router-dom';
import CarDetailsPart from '../DiagnosticScreen/CarDetailsPart/CarDetailsPart';
import SavedSparesPart from '../DiagnosticScreen/SavedSparesPart/SavedSparesPart';
import WorksSwitcher from '../DiagnosticScreen/WorksSwitcher/WorksSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCars,
  selectDiagnostic,
  selectRepair,
} from '../../redux/cars/selectors';
import BottomPart from '../BottomPart/BottomPart';
import css from './CompletedDocSection.module.css';
import { BsUiRadiosGrid, BsWrench } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { getDiagnostic, getRepair } from '../../redux/cars/operations';
import { clearDiag } from '../../redux/cars/slice';
import PartsForRepair from '../RepairScreen/PartsForRepair/PartsForRepair';

export default function CompletedDocSection() {
  const [page, setPage] = useState('diag');
  const { carId } = useParams();
  // console.log('carId', carId);

  const cars = useSelector(selectCars);
  // console.log('cars', cars);

  const particularCar = cars?.find(car => car?.car_id === Number(carId));
  // console.log('particularCar', particularCar);

  const dispatch = useDispatch();

  const id = '682ce6104f095bf3de2739ef';
  // const id = particularCar?.diagnostic_id;
  const idRepair = '6830155a926bc65393d0eff6';

  useEffect(() => {
    id && dispatch(getDiagnostic(id));
    idRepair && dispatch(getRepair(idRepair));
  }, [id, dispatch, particularCar, idRepair]);

  const completedDiag = useSelector(selectDiagnostic);
  const completedDiagWithId = completedDiag?.nodes?.map(diag => ({
    ...diag,
    id: Math.random(),
  }));

  const repair = useSelector(selectRepair);
  console.log('repair', repair);

  // console.log('completedDiagWithId', completedDiagWithId);
  useEffect(() => {
    dispatch(clearDiag());
  }, [id, dispatch]);

  return (
    <div className={css.wrapper}>
      <CarDetailsPart particularCar={particularCar} />
      {/* <WorksSwitcher disabled={true} /> */}
      {
        // particularCar.diagnostic_id && particularCar.repair_id
        id && idRepair ? (
          <div className={css.btnBox}>
            <button
              className={`${css.buttons} ${
                page === 'diag' && css.buttonActive
              }`}
              onClick={() => setPage('diag')}
            >
              <p>Діагностика</p>
              <div className={css.indicator}>
                <BsUiRadiosGrid />
              </div>
            </button>

            <button
              className={`${css.buttons} ${
                page === 'repair' && css.buttonActive
              }`}
              onClick={() => setPage('repair')}
            >
              <p>Ремонт</p>
              <div className={css.indicator}>
                <BsWrench />
              </div>
            </button>
          </div>
        ) : (
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
        )
      }

      {particularCar?.diagnostic_id && particularCar?.repair_id ? (
        page === 'diag' ? (
          <SavedSparesPart
            nodes={completedDiag ? completedDiagWithId : []}
            completed={true}
          />
        ) : page === 'repair' ? (
          <PartsForRepair
            completedRepair={true}
            statusParts={repair?.parts}
            statusServices={repair?.services}
          />
        ) : (
          ''
        )
      ) : particularCar?.diagnostic_id ? (
        <SavedSparesPart
          nodes={completedDiag ? completedDiagWithId : []}
          completed={true}
        />
      ) : particularCar?.repair_id ? (
        <PartsForRepair
          completedRepair={true}
          parts={repair?.parts}
          services={repair?.services}
        />
      ) : (
        ''
      )}

      <BottomPart savedPartScreen={true} button={true} />
    </div>
  );
}
