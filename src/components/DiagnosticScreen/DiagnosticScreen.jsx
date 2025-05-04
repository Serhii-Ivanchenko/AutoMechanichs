import { Link, Outlet } from 'react-router-dom';
import CarDetailsPart from './CarDetailsPart/CarDetailsPart';
import WorksSwitcher from './WorksSwitcher/WorksSwitcher';
import newTree from '../../utils/tree.json';
import TogglePoints from './TogglePoints/TogglePoints';
import BottomPart from '../BottomPart/BottomPart';
import { useState } from 'react';
import SubcategoriesPart from './SubcategoriesPart/SubcategoriesPart';
import SparesPart from './SparesPart/SparesPart';
import css from './DiagnosticScreen.module.css';

export default function DiagnosticScreen() {
  const togglePoints = newTree?.nodes;
  const [chosenPoints, setChosenPoints] = useState([]);
  const [categoryForDetailsPart, setCategoryForDetailsPart] = useState('');
  const [subcatOpen, setSubcatOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(null);
  const [chosenSpares, setChosenSpares] = useState([]);
  const [spares, setSpares] = useState([]);

  const handleCheckboxChange = (event, id, label) => {
    setChosenPoints(prevPoints => {
      if (event.target.checked) {
        return [...prevPoints, { id, label }];
      } else {
        return prevPoints?.filter(point => point.id !== id);
      }
    });
    //  setWithoutDamages(false);
  };

  return (
    <div>
      <CarDetailsPart />
      <WorksSwitcher subcatOpen={subcatOpen} />

      {subcatOpen ? (
        <ul className={css.list}>
          {chosenPoints?.map(point => (
            <SubcategoriesPart
              key={point.id}
              point={point}
              setCategoryForDetailsPart={setCategoryForDetailsPart}
              chosenPoints={chosenPoints}
              togglePoints={togglePoints}
              setOpenDetails={setOpenDetails}
              openDetails={openDetails}
            />
          ))}
        </ul>
      ) : (
        <TogglePoints
          togglePoints={togglePoints}
          handleCheckboxChange={handleCheckboxChange}
          chosenPoints={chosenPoints}
        />
        // <Outlet />
      )}

      {openDetails && (
        <SparesPart
          title={categoryForDetailsPart}
          togglePoints={togglePoints}
          setChosenSpares={setChosenSpares}
          chosenSpares={chosenSpares}
          spares={spares}
          setSpares={setSpares}
          openDetails={openDetails}
          setOpenDetails={setOpenDetails}
        />
      )}
      <BottomPart
        back={subcatOpen ? () => setSubcatOpen(false) : '/main'}
        button={subcatOpen}
        btnToggle={true}
        // next="diagnostics-subcategories"
        categ={subcatOpen}
        setNext={setSubcatOpen}
      />
      {/* <Link to="/main">back</Link> */}
    </div>
  );
}
