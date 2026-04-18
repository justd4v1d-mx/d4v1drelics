import React from 'react';
/* Import the external data */
import { fragments } from './fragmentsData'; 
/* Import the new decryption component */
import DecryptText from './DecryptText'; 

interface FragmentsProps {
  onClose: () => void;
}

const Fragments: React.FC<FragmentsProps> = ({ onClose }) => {
  /* Sorting: First entry (ID 1) shows up first */
  const sortedFragments = [...fragments].sort((a, b) => a.id - b.id);

  return (
    <div className="fragments-overlay">
      {/* Static Neon Green Button */}
      <button className="close-btn gothic-text" onClick={onClose}>
        [ return_to_core ]
      </button>
      
      <div className="fragments-scroll-area">
        <header className="fragments-header">
          <h2 className="gothic-text title-main">
            {/* Animating the main header */}
            <DecryptText text="recovered_fragments" />
          </h2>
          <p className="loader-num">
            accessing_database... {fragments.length} fragments_found
          </p>
        </header>

        <div className="fragments-list">
          {sortedFragments.map((entry) => (
            <article key={entry.id} className="fragment-item">
              <div className="fragment-meta">
                {/* Record ID formatting */}
                <span className="loader-num">id_{entry.id.toString().padStart(3, '0')}</span>
                <span className="loader-num">{entry.date}</span>
                <span className="category-tag">#{entry.category}</span>
              </div>
              
              <h3 className="gothic-text">
                {/* Title decryption effect */}
                <DecryptText text={entry.title} />
              </h3>
              
              <p className="fragment-body">
                {/* Content decryption effect (triggered on mount) */}
                <DecryptText text={entry.content} />
              </p>
              
              <div className="fragment-separator" />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fragments;