import { useState, useRef, useEffect } from 'react';

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.05);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      
      const attemptPlay = () => {
        audioRef.current?.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
           
          });
      };

      
      attemptPlay();

      //
      window.addEventListener('click', attemptPlay, { once: true });
    }
  }, [volume]);

  const toggle = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // porcentaje 
  const volPercentage = Math.round(volume * 200);

  return (
    <div className="audio-minimalist">
      <div className="audio-expand-layer">
        <span className="gothic-text vol-num">{volPercentage}%</span>
        <input 
          type="range" min="0" max="0.5" step="0.01" 
          value={volume} 
          onChange={(e) => setVolume(parseFloat(e.target.value))} 
          className="mini-slider"
        />
      </div>
      
      <button onClick={toggle} className="gothic-toggle-btn">
        {isPlaying ? "✕" : "✦"}
      </button>
      
      <audio ref={audioRef} src="/ritual.mp3" loop />
    </div>
  );
};

export default AudioPlayer;