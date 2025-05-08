import { useDispatch, useSelector } from 'react-redux';
import css from './topPart.module.css';
import { useEffect } from 'react';
import { getMechanicBalance } from '../../redux/auth/operations';
import { selectBalance } from '../../redux/auth/selectors';

export default function TopPart({ wage, amountPossible }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMechanicBalance(1));
  }, [dispatch]);

  const balance = useSelector(selectBalance);
  console.log('balance', balance);

  return (
    <div className={css.topPart}>
      <div className={css.mechNameBox}>
        <p className={css.name}>Макаренковчук О.А.</p>
        <p className={css.paleText}>Механік</p>
      </div>
      <div className={css.salaryInfoBox}>
        <div className={css.salaryPoint}>
          <p className={css.paleText}>Нараховано</p>
          <p className={css.amount}>{balance.total_earned || wage}</p>
        </div>
        <div className={css.salaryPoint}>
          <p className={css.paleText}>Сьогодні</p>
          <p className={css.amount}>{balance.today_earned || '+' + wage}</p>
        </div>
        <div className={css.salaryPoint}>
          <p className={css.paleText}>Можлива ЗП</p>
          <p className={css.amountPossible}>
            {balance.potential_earned || amountPossible}
          </p>
        </div>
      </div>
    </div>
  );
}
