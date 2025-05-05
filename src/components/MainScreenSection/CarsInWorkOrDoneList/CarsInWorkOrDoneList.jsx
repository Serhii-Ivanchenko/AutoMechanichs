import { Link } from 'react-router-dom';
import css from './CarsInWorkOrDoneList.module.css';
import { BsPatchExclamationFill } from 'react-icons/bs';

export default function CarsInWorkOrDoneList({ done, list }) {
  return (
    <>
      <ul className={`${css.list} ${done ? css.listDone : ''}`}>
        {list?.map((item, index) => (
          <li
            key={index}
            // onClick={() => setDiagOpen(true)}
            // className={css.listItem}
          >
            <Link to="/car/:carId/diagnostics">
              <div className={css.listItem}>
                {done ? (
                  <span className={css.iconBox}>
                    <BsPatchExclamationFill className={css.icon} />
                  </span>
                ) : (
                  <p className={css.time}>{item.time}</p>
                )}
                <div
                  className={`${css.stick} ${done ? css.stickDone : ''}`}
                ></div>
                <div className={css.carWrapper}>
                  <p className={css.car}>{item.carModel}</p>
                  <p className={css.problem}>{item.problem}</p>
                </div>
                <p className={`${css.salary} ${done ? css.salaryDone : ''}`}>
                  {item.salary}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
