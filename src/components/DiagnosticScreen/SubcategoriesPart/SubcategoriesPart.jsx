import { useEffect } from 'react';
import css from './SubcategoriesPart.module.css';
import { BsFillCaretDownFill } from 'react-icons/bs';

export default function SubcategoriesPart({
  setCategoryForDetailsPart,
  chosenPoints,
  point,
  togglePoints,
  openDetails,
  setOpenDetails,
}) {
  const matchedPoint = togglePoints.find(cat => cat.name === point.label);
  // console.log("matched", matchedPoint);

  const showDetails = id => {
    setOpenDetails(prevId => (prevId === id ? null : id));
  };

  useEffect(() => {
    if (openDetails === null) {
      return;
    }

    // Перевіряємо серед підкатегорій
    const allNodes = togglePoints.flatMap(cat => cat.nodes || []);
    const chosenCategory = allNodes.find(node => node.id === openDetails);

    if (chosenCategory) {
      setCategoryForDetailsPart(chosenCategory.name);
      return;
    }

    // Якщо не знайдено серед підкатегорій, шукаємо серед головних категорій
    const mainCategory = togglePoints.find(cat => cat.id === openDetails);
    if (mainCategory) {
      setCategoryForDetailsPart(mainCategory.name);
    }
  }, [openDetails, togglePoints, setCategoryForDetailsPart]);

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
              <li
                key={node.id}
                className={css.subcategoriesListItem}
                onClick={() => showDetails(node.id)}
              >
                <p className={css.subCategory}>{node.name || 'lala'}</p>
                <div className={css.divForShadow}>
                  <span
                    className={`${css.iconBox} ${
                      openDetails === node.id ? css.rotated : ''
                    }`}
                  >
                    <BsFillCaretDownFill className={css.icon} />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className={css.subcategoriesList}>
            <li
              className={css.subcategoriesListItem}
              onClick={() => showDetails(point.id)}
            >
              <p className={css.subCategory}>{point.label}</p>
              <div className={css.divForShadow}>
                <span
                  className={`${css.iconBox} ${
                    openDetails === point.id && css.rotated
                  }`}
                >
                  <BsFillCaretDownFill className={css.icon} />
                </span>
              </div>
            </li>
          </ul>
        )}
      </li>
    // </ul>
  );
}
