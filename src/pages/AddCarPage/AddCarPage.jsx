import { useState } from 'react';
import AddCarPhoto from '../../components/AddCarPhoto/AddCarPhoto';
import AddCarScreen from '../../components/AddCarScreen/AddCarScreen';

export default function AddCarPage() {
  const [photo, setPhoto] = useState(null);
  const [videoStream, setVideoStream] = useState(null);

  const [chosenMake, setChosenMake] = useState('');
  const [chosenModel, setChosenModel] = useState('');
  const [chosenYear, setChosenYear] = useState('');
  const [mileage, setMileage] = useState('');

  return (
    <div>
      <AddCarScreen
        photo={photo}
        stream={videoStream}
        setCarMake={setChosenMake}
        setCarModel={setChosenModel}
        setCarYear={setChosenYear}
        setCarMileage={setMileage}
      />
      <AddCarPhoto
        setPhoto={setPhoto}
        setVideoStream={setVideoStream}
        carMake={chosenMake}
        carModel={chosenModel}
        carYear={chosenYear}
        carMileage={mileage}
      />
    </div>
  );
}
