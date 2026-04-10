import { useEffect, useRef, useState } from 'react';

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };


  return (
    <div className="audio-controls">
      <audio 
        ref={audioRef} 
        
        src={`${import.meta.env.BASE_URL}ritual.mp3`} 
        loop 
      />
      
      {}
      <button 
        onClick={toggleAudio} 
        className="gothic-audio-btn"
        style={{ opacity: isPlaying ? 1 : 0.5 }}
      >
        {isPlaying ? '▶' : '⏸'}
      </button>
    </div>
  );
};

export default AudioPlayer;
