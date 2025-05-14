import { BsCheckLg } from 'react-icons/bs';
import { BsFillMicFill } from 'react-icons/bs';
import { BsCameraFill } from 'react-icons/bs';
import css from './SavedSparesPart.module.css';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

export default function SavedSparesPart({ nodes }) {
  return (
    <div>
      <ul className={css.SavedSparesList}>
        {nodes.length === 0 ? (
          <p className={css.noProblems}>
            Після проведення діагностики проблем з автомобілем не виявлено
          </p>
        ) : (
          nodes.map((node, index) => (
            <li key={index}>
              <p className={css.nodeName}>{node.node_name}</p>
              <ul className={css.subcatList}>
                {node.node_subcat.map((item, index) => (
                  <li key={index}>
                    <Accordion className={css.accordion}>
                      <AccordionSummary
                        className={css.subcatListItem}
                        sx={{
                          // position:
                          //   expandedMap[node.id] === node.id
                          //     ? 'sticky'
                          //     : 'static',
                          // top: '27px',
                          // overflowAnchor: 'none',
                          '&.Mui-expanded': { minHeight: 'unset' },
                          minHeight: 'unset',
                        }}
                        // ref={el => {
                        //   if (el) summaryRefs.current[node.id] = el;
                        // }}
                      >
                        <p className={css.subcatName}>{item.name}</p>
                        <div className={css.btnBox}>
                          <div
                            className={`${css.circle} ${
                              item?.parts?.length > 0 ? css.circleFilled : ''
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
                      </AccordionSummary>
                      <AccordionDetails>
                        <ul className={css.sparesList}>
                          {item?.parts
                            ? item?.parts?.map((part, index) => (
                                <li key={index} className={css.sparesListItem}>
                                  <p className={css.sparesNames}>
                                    {part?.part_name}
                                  </p>
                                </li>
                              ))
                            : item?.subNode?.flatMap(part =>
                                part?.parts.map(item => (
                                  <li
                                    key={item.id}
                                    className={css.sparesListItem}
                                  >
                                    <p className={css.sparesNames}>
                                      {item?.part_name}
                                    </p>
                                  </li>
                                ))
                              )}
                        </ul>
                      </AccordionDetails>
                    </Accordion>
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
