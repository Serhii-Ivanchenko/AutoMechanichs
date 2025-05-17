import css from './Filter.module.css';
import { IoIosSearch } from 'react-icons/io';
import { RxCrossCircled } from 'react-icons/rx';

export default function Filter({ filter, setFilter }) {
  const handleChange = e => {
    setFilter(e.target.value);
  };
  return (
    <div className={css.searchBox}>
      <div className={css.circle}>
        <IoIosSearch size={20} />
      </div>
      <input
        className={css.input}
        placeholder="Пошук запчастин"
        onChange={handleChange}
        value={filter}
      />
      {filter && (
        <RxCrossCircled
          className={css.icon}
          size={30}
          onClick={() => setFilter('')}
        />
      )}
    </div>
  );
}
