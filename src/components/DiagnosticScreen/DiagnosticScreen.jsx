import { Link } from 'react-router-dom';
import CarDetailsPart from './CarDetailsPart/CarDetailsPart';
import WorksSwitcher from './WorksSwitcher/WorksSwitcher';

export default function DiagnosticScreen({ setDiagOpen }) {
  return (
    <div>
      <CarDetailsPart />
      <WorksSwitcher />

      <Link to="/main">back</Link>
    </div>
  );
}
