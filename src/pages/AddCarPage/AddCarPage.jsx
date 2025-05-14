import { useState } from 'react';
import AddCarPhoto from '../../components/AddCarPhoto/AddCarPhoto';
import AddCarScreen from '../../components/AddCarScreen/AddCarScreen';

export default function AddCarPage() {
  const [photo, setPhoto] = useState(null);
  const [videoStream, setVideoStream] = useState(null);

  return (
    <div>
      <AddCarScreen photo={photo} stream={videoStream} />
      <AddCarPhoto setPhoto={setPhoto} setVideoStream={setVideoStream} />
    </div>
  );
}
