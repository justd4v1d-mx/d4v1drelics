import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const GothicIcons = {

  gnosticCross: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11 5.5L12 2L13 5.5L12.5 5.5L12.5 18.5L13 18.5L12 22L11 18.5L11.5 18.5L11.5 5.5L11 5.5Z" />
      <path d="M5.5 11L2 12L5.5 13L5.5 12.5L18.5 12.5L18.5 13L22 12L18.5 11L18.5 11.5L5.5 11.5L5.5 11Z" />
    </svg>
  ),
  
  
  voidStar: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  ),

  archivesStar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2V22M2 12H22M5.6 5.6L18.4 18.4M5.6 18.4L18.4 5.6" />
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" />
    </svg>
  ),
  
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V5A2.5 2.5 0 0 1 6.5 2.5H20" />
      <path d="M12 2.5L12 17.5" stroke="currentColor" strokeDasharray="3 3" />
      <text x="6" y="11" fill="currentColor" fontFamily="Pirata One" fontSize="4">D</text>
    </svg>
  ),
  
  gothicCard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="3" width="14" height="18" rx="1" ry="1" />
      <path d="M12 7L12 17M8 12L16 12M12 7A2 2 0 0 1 14 9A2 2 0 0 1 12 11A2 2 0 0 1 10 9A2 2 0 0 1 12 7Z" />
      <path d="M5 6H19" stroke="currentColor" strokeWidth="0.5" />
      <path d="M5 18H19" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  ),
  
  vinyl: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeOpacity="0.3" />
    </svg>
  )
};

const socialData = [
  { name: 'instagram', icon: GothicIcons.gnosticCross, link: 'https://www.instagram.com/d4v1d_nh/' },
  { name: 'github', icon: GothicIcons.book, link: 'https://github.com/justd4v1d-mx' },
  { name: 'discord', icon: GothicIcons.gothicCard, link: '#' },
  { name: 'spotify', icon: GothicIcons.vinyl, link: 'https://open.spotify.com/user/vyv3wbv7f324u9je96nqsx116?si=98a0580e9d3447b6' },
  { name: 'void', icon: GothicIcons.voidStar, link: '#' }, 
  { name: 'archives', icon: GothicIcons.archivesStar, link: '#' }, 
];

const SocialSlider = () => {
  const [itemsPerView, setItemsPerView] = useState(window.innerWidth < 768 ? 1 : 3);
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const handleResize = () => setItemsPerView(window.innerWidth < 768 ? 1 : 3);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => {
    if (startIndex + itemsPerView < socialData.length) {
      setDirection(1);
      setStartIndex(startIndex + itemsPerView);
    }
  };

  const prev = () => {
    if (startIndex - itemsPerView >= 0) {
      setDirection(-1);
      setStartIndex(startIndex - itemsPerView);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [startIndex, itemsPerView]);

  const currentItems = socialData.slice(startIndex, startIndex + itemsPerView);
  const placeholdersNeeded = itemsPerView - currentItems.length;
  const displayItems = [...currentItems];

  for (let i = 0; i < placeholdersNeeded; i++) {
    
    displayItems.push({ name: 'empty', icon: GothicIcons.voidStar, link: '#' });
  }

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -100 : 100, opacity: 0 })
  };

  return (
    <div className="slider-wrapper">
      <div className="nav-controls" style={{ marginBottom: '10px' }}>
        <button onClick={prev} className={`gothic-arrow ${startIndex === 0 ? 'disabled' : ''}`}>✙</button>
        <span className="gothic-text section-label">fragments</span>
        <button onClick={next} className={`gothic-arrow ${startIndex + itemsPerView >= socialData.length ? 'disabled' : ''}`}>✙</button>
      </div>

      <div className="slots-area">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div 
            className="slots-grid"
            key={`${startIndex}-${itemsPerView}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          >
            {displayItems.map((item, i) => {
              const isEmpty = item.name === 'empty';
              return (
                <a 
                  key={isEmpty ? `empty-${i}` : item.name} 
                  href={isEmpty ? undefined : item.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className={`slot glass-card ${isEmpty ? 'empty-slot' : ''}`}
                  style={{ pointerEvents: isEmpty ? 'none' : 'auto' }}
                >
                  {!isEmpty && <div className="slot-glow"></div>}
                  <span className="slot-icon" style={{ opacity: isEmpty ? 0.05 : 1, color: 'white' }}>{item.icon}</span>
                  <span className="gothic-text slot-name" style={{ opacity: isEmpty ? 0.05 : 1, color: 'white' }}>
                    {isEmpty ? "void" : item.name}
                  </span>
                </a>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SocialSlider;
