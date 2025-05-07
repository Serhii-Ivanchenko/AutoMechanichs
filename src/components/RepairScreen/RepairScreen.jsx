import BottomPart from '../BottomPart/BottomPart';
import CarDetailsPart from '../DiagnosticScreen/CarDetailsPart/CarDetailsPart';
import TogglePoints from '../DiagnosticScreen/TogglePoints/TogglePoints';
import WorksSwitcher from '../DiagnosticScreen/WorksSwitcher/WorksSwitcher';
import newTree from '../../utils/tree.json';
import { useState } from 'react';

export default function RepairScreen() {
  const togglePoints = newTree?.nodes;
  const [chosenPoints, setChosenPoints] = useState([]);

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
      <WorksSwitcher />
      <TogglePoints
        togglePoints={togglePoints}
        handleCheckboxChange={handleCheckboxChange}
        chosenPoints={chosenPoints}
      />
      <BottomPart />
    </div>
  );
}
