import AudioRecorder from '../AudioRecorder/AudioRecorder';

export default function ModalForListOfRecordings({ audios }) {
  return (
    <ul>
      {audios.map((audio, index) => (
        <li key={index}>
          <AudioRecorder completedDoc={true} audioURL={audio} />
        </li>
      ))}
    </ul>
  );
}
