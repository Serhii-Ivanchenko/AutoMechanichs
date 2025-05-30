import css from './ModalForComments.module.css';

export default function ModalForComments({ onClose, setComment, comment }) {
  const hanleAddComment = e => {
    setComment(e.target.value);
  };

  return (
    <div className={css.wrapper}>
      <p className={css.title}>Коментар</p>
      <textarea
        className={css.textarea}
        onChange={hanleAddComment}
        value={comment}
      />
      <div className={css.btnBox}>
        <button
          type="button"
          className={css.cancel}
          onClick={() => {
            onClose();
            setComment('');
          }}
        >
          Закрити
        </button>
        <button type="button" className={css.confirm} onClick={onClose}>
          Підтвердити
        </button>
      </div>
    </div>
  );
}
