import css from './topPart.module.css';

export default function TopPart({ wage, amountPossible }) {
  return (
    <div className={css.topPart}>
      <div className={css.mechNameBox}>
        <p className={css.name}>Макаренковчук О.А.</p>
        <p className={css.paleText}>Механік</p>
      </div>
      <div className={css.salaryInfoBox}>
        <div className={css.salaryPoint}>
          <p className={css.paleText}>Нараховано</p>
          <p className={css.amount}>{wage}</p>
        </div>
        <div className={css.salaryPoint}>
          <p className={css.paleText}>Сьогодні</p>
          <p className={css.amount}>{'+' + wage}</p>
        </div>
        <div className={css.salaryPoint}>
          <p className={css.paleText}>Можлива ЗП</p>
          <p className={css.amountPossible}>{amountPossible}</p>
        </div>
      </div>
    </div>
  );
}
