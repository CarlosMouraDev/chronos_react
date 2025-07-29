import alarm from '../assets/audio/alarm-2-375697.mp3';

export function loadBeep() {
  const audio = new Audio(alarm);
  audio.load();

  return () => {
    audio.currentTime = 0;
    audio.play().catch(err => console.log('Error loading audio: ' + err));
  };
}
