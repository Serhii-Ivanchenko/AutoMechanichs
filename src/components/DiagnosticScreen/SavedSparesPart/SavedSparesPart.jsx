import { BsCheckLg } from 'react-icons/bs';
import { BsFillMicFill } from 'react-icons/bs';
import { BsCameraFill } from 'react-icons/bs';
import css from './SavedSparesPart.module.css';

export default function SavedSparesPart({ nodes }) {
  return (
    <div>
      <ul className={css.SavedSparesList}>
        {nodes.length === 0 ? (
          <p className={css.noProblems}>Після проведення діагностики проблем з автомобілем не виявлено</p>
        ) : (
          nodes.map((node, index) => (
            <li key={index}>
              <p className={css.nodeName}>{node.node_name}</p>
              <ul className={css.subcatList}>
                {node.node_subcat.map((item, index) => (
                  <li key={index} className={css.subcatListItem}>
                    <p className={css.subcatName}>{item.name}</p>
                    <div className={css.btnBox}>
                      <div
                        className={`${css.circle} ${
                          item.parts.length > 0 ? css.circleFilled : ''
                        }`}
                      >
                        <BsCheckLg className={css.iconCheck} />
                      </div>
                      <div className={css.circle}>
                        <BsFillMicFill className={css.icon} />
                      </div>
                      <div className={css.circle}>
                        <BsCameraFill className={css.icon} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
