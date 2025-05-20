import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import CarDetailsPart from './CarDetailsPart/CarDetailsPart';
import WorksSwitcher from './WorksSwitcher/WorksSwitcher';
import newTree from '../../utils/tree.json';
import TogglePoints from './TogglePoints/TogglePoints';
import BottomPart from '../BottomPart/BottomPart';
import { useEffect, useRef, useState } from 'react';
import SubcategoriesPart from './SubcategoriesPart/SubcategoriesPart';
import SparesPart from './SparesPart/SparesPart';
import css from './DiagnosticScreen.module.css';
import SavedSparesPart from './SavedSparesPart/SavedSparesPart';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCars,
  selectNodesAndPartsForDiagnostics,
} from '../../redux/cars/selectors';
import {
  createDiagnostic,
  getDiagnostic,
  getNodesAndParts,
} from '../../redux/cars/operations';
import toast from 'react-hot-toast';
import Filter from './Filter/Filter';

export default function DiagnosticScreen() {
  const [chosenPoints, setChosenPoints] = useState([]);
  const [categoryForDetailsPart, setCategoryForDetailsPart] = useState('');
  const [subcatOpen, setSubcatOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(null);
  const [chosenSpares, setChosenSpares] = useState([]);
  const [spares, setSpares] = useState([]);
  const [savedSparesPartOpen, setSavedSparesPartOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { carId } = useParams();
  // console.log('carId', carId);

  const cars = useSelector(selectCars);
  // console.log('cars', cars);

  const particularCar = cars?.find(car => car?.car_id === Number(carId));
  // console.log('particularCar', particularCar);
  //

  useEffect(() => {
    dispatch(getNodesAndParts());
  }, [dispatch]);

  const togglePoints = useSelector(selectNodesAndPartsForDiagnostics);

  const handleCloseSavedScreen = () => {
    setSavedSparesPartOpen(false);
    setSubcatOpen(true);
  };

  // console.log('chosenSpares', chosenSpares);
  // console.log('spares', spares);

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

  const groupNodeSubcat = node_subcat => {
    const result = [];

    node_subcat.forEach(entry => {
      // Якщо це subNode (3-й рівень)
      if (entry.subNode) {
        const existing = result.find(e => e.name === entry.name);
        const subNodeEntry = {
          subNodeName: entry.subNode.subNodeName,
          parts: entry.subNode.parts,
        };

        if (existing) {
          existing.subNode.push(subNodeEntry);
        } else {
          result.push({
            name: entry.name,
            id: entry.id,
            subNode: [subNodeEntry],
          });
        }
      } else {
        // Якщо це parts напряму (1-й або 2-й рівень без вкладеного subNode)
        result.push(entry);
      }
    });

    return result;
  };

  // Вузли для відмальовки збереженої після вибору запчастин

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
            id: spare.id,
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
              id: node.id,
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
                  name: node.name,
                  id: node.id,
                  subNode: {
                    subNodeName: subNode.name,
                    parts: chosen.map(part => ({
                      id: part.id,
                      tag: part.tag,
                      code: part.code,
                      part_name: part.name,
                      comment: 'Заміна',
                      audio_file: '',
                      photo_file: '',
                    })),
                  },
                });
              }
            });
            // console.log('node_subcat', node_subcat);
            // console.log('chosen', chosen);
            // console.log('node', node);
          }
        });
      }

      // Повертаємо об'єкт тільки якщо є хоча б один підвузол з частинами
      return node_subcat.length > 0
        ? {
            node_name: spare.name,
            node_subcat: groupNodeSubcat(node_subcat),
          }
        : null;
    })
    .filter(Boolean);

  // console.log('nodes', nodes);

  // For diagnostic creation

  const nodesToCreateDiag = spares
    .map(spare => {
      let chosenParts = [];

      // Обробка запчастин на першому рівні
      if (spare.spareParts) {
        chosenParts = spare.spareParts.filter(
          part => part.isChosen || part.isChosenRight || part.isChosenLeft
        );
      }

      // Обробка вкладених рівнів (2-й і 3-й рівень)
      if (spare.nodes) {
        chosenParts = [
          ...chosenParts,
          ...spare.nodes.flatMap(node =>
            node.spareParts
              ? node.spareParts.filter(
                  part =>
                    part.isChosen || part.isChosenRight || part.isChosenLeft
                )
              : []
          ),
          ...spare.nodes.flatMap(node =>
            node.nodes
              ? node.nodes.flatMap(subNode =>
                  subNode.spareParts
                    ? subNode.spareParts.filter(
                        part =>
                          part.isChosen ||
                          part.isChosenRight ||
                          part.isChosenLeft
                      )
                    : []
                )
              : []
          ),
        ];
      }

      // Формуємо об'єкт тільки якщо є вибрані запчастини
      return chosenParts.length > 0
        ? {
            node_name: spare.name,
            parts: chosenParts.map(part => ({
              id: part.id,
              tag: part.tag,
              code: part.code,
              part_name: part.name,
              comment: 'Заміна',
              audio_file: '',
              photo_file: '',
            })),
          }
        : null;
    })
    .filter(Boolean);

  // console.log("dataToSend", nodes);
  const dataToSend = {
    car_id: carId,
    mechanic_id: 1,
    nodes: nodesToCreateDiag,
  };

  // console.log('dataToSend', dataToSend);

  const handleCreateDiag = () => {
    dispatch(createDiagnostic(dataToSend))
      .unwrap()
      .then(() => {
        console.log('Діагностика успішно створена');
        toast.success('Діагностика успішно створена', {
          position: 'top-center',
          duration: 3000,
          style: {
            background: 'var(--bg-input)',
            color: 'var(--white)',
          },
        });
        navigate('/main');
      });
  };

  // console.log('chosenPoints', chosenPoints);

  const visiblePoints = togglePoints.filter(category => {
    // Перевірка spareParts на рівні категорії
    const hasCategoryMatch = category.spareParts?.some(spare =>
      spare.name.toLowerCase().includes(filter.toLowerCase())
    );

    // Перевірка spareParts на рівні першого node
    const hasNodeMatch = category.nodes?.some(node =>
      node.spareParts?.some(spare =>
        spare.name.toLowerCase().includes(filter.toLowerCase())
      )
    );

    // Перевірка spareParts на рівні глибших node.nodes
    const hasDeepNodeMatch = category.nodes?.some(node =>
      node.nodes?.some(part =>
        part.spareParts?.some(spare =>
          spare.name.toLowerCase().includes(filter.toLowerCase())
        )
      )
    );

    return hasCategoryMatch || hasNodeMatch || hasDeepNodeMatch;
  });

  const chp = chosenPoints.map(p => p.label);
  // console.log('chp', chp);

  const visibleSubcategories = visiblePoints.filter(point =>
    chp.includes(point.name)
  );

  // console.log('visibleSubcategories', visibleSubcategories);

  return (
    <div>
      <CarDetailsPart particularCar={particularCar} />
      <WorksSwitcher
        subcatOpen={subcatOpen}
        carId={carId}
        car={particularCar}
      />

      {particularCar?.status === 'complete' ? (
        <SavedSparesPart />
      ) : savedSparesPartOpen ? (
        <SavedSparesPart nodes={nodes} dataToSend={dataToSend} />
      ) : subcatOpen ? (
        <>
          <Filter filter={filter} setFilter={setFilter} />
          <ul className={css.list} ref={containerRef}>
            {visibleSubcategories?.map(point => (
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
                containerRef={containerRef}
                filter={filter}
              />
            ))}
          </ul>
        </>
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
        handleCreateDiag={() => handleCreateDiag()}
      />
    </div>
  );
}
