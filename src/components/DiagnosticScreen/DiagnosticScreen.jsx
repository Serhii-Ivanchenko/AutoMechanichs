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
import SavedSparesPart from './savedSparesPart/savedSparesPart';

export default function DiagnosticScreen() {
  const togglePoints = newTree?.nodes;
  const [chosenPoints, setChosenPoints] = useState([]);
  const [categoryForDetailsPart, setCategoryForDetailsPart] = useState('');
  const [subcatOpen, setSubcatOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(null);
  const [chosenSpares, setChosenSpares] = useState([]);
  const [spares, setSpares] = useState([]);
  const [savedSparesPartOpen, setSavedSparesPartOpen] = useState(false);

  const handleCloseSavedScreen = () => {
    setSavedSparesPartOpen(false);
    setSubcatOpen(true);
  };

  console.log('chosenSpares', chosenSpares);
  console.log('spares', spares);

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

  const nodes = spares
    .map(spare => {
      const node_subcat = [];

      // 1-й рівень: якщо є вибрані запчастини прямо в spare
      if (spare.spareParts) {
        const chosen = spare.spareParts.filter(
          part => part.isChosen || part.isChosenRight || part.isChosenLeft
        );

        if (chosen.length > 0) {
          node_subcat.push({
            name: spare.name, // ім'я вузла верхнього рівня
            parts: chosen.map(part => ({
              id: part.id,
              tag: part.tag,
              code: part.code,
              part_name: part.name,
              comment: 'Заміна',
              audio_file: '',
              photo_file: '',
            })),
          });
        }
      }

      // 2-й рівень
      if (spare.nodes) {
        spare.nodes.forEach(node => {
          const chosen = node.spareParts
            ? node.spareParts.filter(
                part => part.isChosen || part.isChosenRight || part.isChosenLeft
              )
            : [];

          if (chosen.length > 0) {
            node_subcat.push({
              name: node.name,
              parts: chosen.map(part => ({
                id: part.id,
                tag: part.tag,
                code: part.code,
                part_name: part.name,
                comment: 'Заміна',
                audio_file: '',
                photo_file: '',
              })),
            });
          }

          // 3-й рівень
          if (node.nodes) {
            node.nodes.forEach(subNode => {
              const chosen = subNode.spareParts
                ? subNode.spareParts.filter(
                    part =>
                      part.isChosen || part.isChosenRight || part.isChosenLeft
                  )
                : [];

              if (chosen.length > 0) {
                node_subcat.push({
                  name: subNode.name,
                  parts: chosen.map(part => ({
                    id: part.id,
                    tag: part.tag,
                    code: part.code,
                    part_name: part.name,
                    comment: 'Заміна',
                    audio_file: '',
                    photo_file: '',
                  })),
                });
              }
            });
          }
        });
      }

      // Повертаємо об'єкт тільки якщо є хоча б один підвузол з частинами
      return node_subcat.length > 0
        ? {
            node_name: spare.name,
            node_subcat,
          }
        : null;
    })
    .filter(Boolean);

  console.log('nodes', nodes);

  return (
    <div>
      <CarDetailsPart />
      <WorksSwitcher subcatOpen={subcatOpen} />

      {savedSparesPartOpen ? (
        <SavedSparesPart nodes={nodes} />
      ) : subcatOpen ? (
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
              categoryForDetailsPart={categoryForDetailsPart}
              spares={spares}
              setSpares={setSpares}
              setChosenSpares={setChosenSpares}
              chosenSpares={chosenSpares}
            />
          ))}
        </ul>
      ) : (
        <TogglePoints
          togglePoints={togglePoints}
          handleCheckboxChange={handleCheckboxChange}
          chosenPoints={chosenPoints}
        />

      )}


      <BottomPart
        back={
          subcatOpen
            ? () => setSubcatOpen(false)
            : savedSparesPartOpen
            ? handleCloseSavedScreen()
            : '/main'
        }
        button={subcatOpen}
        btnToggle={true}
        // next="diagnostics-subcategories"
        categ={subcatOpen && !savedSparesPartOpen}
        next={
          !subcatOpen
            ? () => setSubcatOpen(true)
            : () => setSavedSparesPartOpen(true)
        }
        chosenPoints={chosenPoints}
        savedPartBottom={savedSparesPartOpen}
      />
    </div>
  );
}
