import css from './ModalForComments.module.css';

export default function ModalForComments({ onClose }) {
  return (
    <div className={css.wrapper}>
      <p className={css.title}>Коментар</p>
      <textarea className={css.textarea} />
      <div className={css.btnBox}>
        <button type="button" className={css.confirm}>
          Підтвердити
        </button>
        <button type="button" className={css.cancel} onClick={onClose}>
          Закрити
        </button>
      </div>
    </div>
  );
}
