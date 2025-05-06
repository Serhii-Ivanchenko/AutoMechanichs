import { useEffect, useState } from 'react';
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
}) {
  const matchedPoint = togglePoints.find(cat => cat.name === point.label);

  const [expandedId, setExpandedId] = useState(null);

  const handleAccordionToggle = (id, name) => (event, isExpanded) => {
    setExpandedId(isExpanded ? id : null);
    if (isExpanded) {
      setCategoryForDetailsPart(name);
      setOpenDetails(id); // якщо потрібно для іншого
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

  const showDetails = (id, name) => {
    const isSame = openDetails === id;
    setOpenDetails(isSame ? null : id);
    setCategoryForDetailsPart(isSame ? '' : name); // Якщо закриваєш, очищаєш
  };

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
            <li key={node.id} onClick={() => showDetails(node.id, node.name)}>
              <Accordion
                className={css.accordion}
                expanded={expandedId === node.id}
                onChange={handleAccordionToggle(node.id, node.name)}
              >
                <AccordionSummary className={css.subcategoriesListItem}>
                  <p className={css.subCategory}>{node.name || 'lala'}</p>
                  <div className={css.divForShadow}>
                    <span className={`${css.iconBox}`}>
                      <BsFillCaretDownFill
                        className={`${css.icon} ${
                          expandedId === node.id ? css.rotated : ''
                        }`}
                      />
                    </span>
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
              expanded={expandedId === point.id}
              onChange={handleAccordionToggle(point.id, point.label)}
            >
              <AccordionSummary className={css.subcategoriesListItem}>
                <p className={css.subCategory}>{point.label}</p>
                <div className={css.divForShadow}>
                  <span className={`${css.iconBox} `}>
                    <BsFillCaretDownFill
                      className={`${css.icon} ${
                        expandedId === point.id && css.rotated
                      }`}
                    />
                  </span>
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
