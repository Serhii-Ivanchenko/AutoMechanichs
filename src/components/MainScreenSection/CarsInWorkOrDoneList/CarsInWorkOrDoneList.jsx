import { Link } from 'react-router-dom';
import css from './CarsInWorkOrDoneList.module.css';
import { BsPatchExclamationFill } from 'react-icons/bs';
import { BsCheckCircleFill } from 'react-icons/bs';

export default function CarsInWorkOrDoneList({ done, list }) {
  const checkTime = time => {
    const currentTime = new Date();
    const timeOfRecord = time;

    const [hours, minutes] = timeOfRecord.split(':').map(Number);
    const dateOfRecord = new Date();
    dateOfRecord.setHours(hours, minutes, 0, 0);

    return dateOfRecord > currentTime;
  };

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
                ) : !checkTime(item.time) ? (
                  <span className={css.iconBox}>
                    <BsPatchExclamationFill
                      className={`${css.icon} ${css.iconRed}`}
                    />
                  </span>
                ) : (
                  <p className={css.time}>{item.time}</p>
                )}
                <div
                  className={`${css.stick} ${done ? css.stickDone : ''}`}
                ></div>
                <div className={css.carWrapper}>
                  <p className={css.car}>{item.carModel}</p>
                  <div className={css.problemAndSpares}>
                    <p className={css.problem}>{item.problem}</p>
                    {item.sparesStatus ? (
                      <BsCheckCircleFill
                        className={`${css.iconTick} ${
                          item.sparesStatus === 'received' && css.iconTickOK
                        } ${
                          item.sparesStatus === 'ordered' && css.iconTickWait
                        }`}
                      />
                    ) : (
                      ''
                    )}
                  </div>
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
