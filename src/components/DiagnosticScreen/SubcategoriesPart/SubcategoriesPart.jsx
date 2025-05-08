import React, { useEffect, useMemo, useRef, useState } from 'react';
import css from './SubcategoriesPart.module.css';
import { BsFillCaretDownFill } from 'react-icons/bs';
import SparesPart from '../SparesPart/SparesPart';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

export default function SubcategoriesPart({
  setCategoryForDetailsPart,
  chosenPoints,
  point,
  togglePoints,
  openDetails,
  setOpenDetails,
  categoryForDetailsPart,
  spares,
  setSpares,
  chosenSpares,
  setChosenSpares,
  repair,
  containerRef,
}) {
  const matchedPoint = togglePoints.find(cat => cat.name === point.label);

  const [expandedMap, setExpandedMap] = useState({});

  const summaryRefs = useRef({});

  const scrollTopRef = useRef({}); // Реф для збереження прокрутки кожного акордеону

  const handleAccordionToggle =
    (categoryId, nodeId, name) => (event, isExpanded) => {
      // Зберігаємо поточну позицію прокрутки контейнера перед закриттям акордеону
      if (!isExpanded && containerRef.current) {
        scrollTopRef.current[nodeId] = containerRef.current.scrollTop;
      }

      // Оновлюємо стан для розширених акордеонів
      setExpandedMap(prev => ({
        ...prev,
        [categoryId]: isExpanded ? nodeId : null,
      }));

      setOpenDetails(isExpanded ? nodeId : null);
      setCategoryForDetailsPart(isExpanded ? name : '');

      // Після закриття акордеону, відновлюємо позицію прокрутки
      if (!isExpanded && containerRef.current) {
        setTimeout(() => {
          const savedScrollTop = scrollTopRef.current[nodeId] || 0;
          containerRef.current.scrollTop = savedScrollTop; // Відновлюємо прокрутку
        }, 200); // Затримка для стабільності
      }
    };

  // console.log("matched", matchedPoint);

  // const showDetails = id => {
  //   setOpenDetails(prevId => (prevId === id ? null : id));
  //   if (openDetails === null) {
  //     return;
  //   }

  //   // Перевіряємо серед підкатегорій
  //   const allNodes = togglePoints.flatMap(cat => cat.nodes || []);
  //   const chosenCategory = allNodes.find(node => node.id === openDetails);

  //   if (chosenCategory) {
  //     setCategoryForDetailsPart(chosenCategory.name);
  //     return;
  //   }

  //   // Якщо не знайдено серед підкатегорій, шукаємо серед головних категорій
  //   const mainCategory = togglePoints.find(cat => cat.id === openDetails);
  //   if (mainCategory) {
  //     setCategoryForDetailsPart(mainCategory.name);
  //   }
  // };

  // useEffect(() => {

  // }, [openDetails, togglePoints, setCategoryForDetailsPart]);

  useEffect(() => {
    // console.log("openDetails", openDetails);
  }, [openDetails]);

  return (
    // <ul>
    <li>
      <p className={css.categoryName}>{point.label}</p>

      {matchedPoint?.nodes?.length > 0 ? (
        <ul className={css.subcategoriesList}>
          {matchedPoint.nodes.map(node => (
            <li key={node.id}>
              <Accordion
                className={css.accordion}
                expanded={expandedMap[node.id] === node.id}
                onChange={handleAccordionToggle(node.id, node.id, node.name)}
              >
                <AccordionSummary
                  className={css.subcategoriesListItem}
                  sx={{
                    '&.Mui-expanded': { minHeight: 'unset' },
                    minHeight: 'unset',
                  }}
                  ref={el => {
                    if (el) summaryRefs.current[node.id] = el;
                  }}
                >
                  <p className={css.subCategory}>{node.name || 'lala'}</p>
                  <div className={css.divForShadow}>
                    <div className={`${css.iconBox}`}>
                      <BsFillCaretDownFill
                        className={`${css.icon} ${
                          expandedMap[node.id] === node.id ? css.rotated : ''
                        }`}
                      />
                    </div>
                  </div>
                </AccordionSummary>

                {/* {openDetails && ( */}
                <AccordionDetails className={css.details}>
                  <SparesPart
                    title={node.name}
                    togglePoints={togglePoints}
                    setChosenSpares={setChosenSpares}
                    chosenSpares={chosenSpares}
                    spares={spares}
                    setSpares={setSpares}
                    openDetails={openDetails}
                    setOpenDetails={setOpenDetails}
                    // setSavedSparesPartOpen={setSavedSparesPartOpen}
                    setCategoryForDetailsPart={setCategoryForDetailsPart}
                    repair={repair}
                    chosenPoints={chosenPoints}
                  />
                </AccordionDetails>
              </Accordion>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={css.subcategoriesList}>
          <li>
            <Accordion
              className={css.accordion}
              expanded={expandedMap[point.id] === point.id}
              onChange={handleAccordionToggle(point.id, point.id, point.label)}
            >
              <AccordionSummary
                className={css.subcategoriesListItem}
                sx={{
                  '&.Mui-expanded': { minHeight: 'unset' },
                  minHeight: 'unset',
                }}
              >
                <p className={css.subCategory}>{point.label}</p>
                <div className={css.divForShadow}>
                  <div className={`${css.iconBox} `}>
                    <BsFillCaretDownFill
                      className={`${css.icon} ${
                        expandedMap[point.id] === point.id && css.rotated
                      }`}
                    />
                  </div>
                </div>
              </AccordionSummary>

              <AccordionDetails>
                <SparesPart
                  title={point.label}
                  togglePoints={togglePoints}
                  setChosenSpares={setChosenSpares}
                  chosenSpares={chosenSpares}
                  spares={spares}
                  setSpares={setSpares}
                  openDetails={openDetails}
                  setOpenDetails={setOpenDetails}
                  // setSavedSparesPartOpen={setSavedSparesPartOpen}
                  setCategoryForDetailsPart={setCategoryForDetailsPart}
                  repair={repair}
                  chosenPoints={chosenPoints}
                />
              </AccordionDetails>
            </Accordion>
          </li>
        </ul>
      )}
    </li>
    // </ul>
  );
}
