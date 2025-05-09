import { useState } from 'react';
import AddCarPhoto from '../../components/AddCarPhoto/AddCarPhoto';
import AddCarScreen from '../../components/AddCarScreen/AddCarScreen';

export default function AddCarPage() {
  const [photo, setPhoto] = useState(null);

  return (
    <div>
      <AddCarScreen photo={photo} />
      <AddCarPhoto setPhoto={setPhoto} />
    </div>
  );
}
