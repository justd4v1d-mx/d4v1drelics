import React from 'react';

/* Database of recovered logs and dev notes */
const entries = [
  {
    id: 1,
    date: "2026.02.21",
    title: "Neuro-Plasticidad",
    category: "Log",
    content: "Redefiniendo el enfoque de mi vida. En lugar de perseguir metas externas, me concentro en moldear mi mente y hábitos. Cada día es una oportunidad para reprogramar mi cerebro, cultivando pensamientos y acciones que reflejen la persona que deseo ser."
  },
  {
    id: 2,
    date: "2026.03.15",
    title: "Inicio del dev de relyquary",
    category: "Dev",
    content: "Realizo una lluvia de idas para definir las características principales de d4v1d reliquary. Decido enfocarme en una experiencia inmersiva que combine arte, música y tecnología, creando un espacio digital que refleje mi visión creativa."
  },
  {
    id: 3,
    date: "2026.04.10",
    title: "Gravitacional Shader v2",
    category: "Dev",
    content: "Implementación de lerp para el seguimiento del mouse en el horizonte de sucesos."
  }
];

interface FragmentsProps {
  onClose: () => void;
}

const Fragments: React.FC<FragmentsProps> = ({ onClose }) => {
  return (
    <div className="fragments-overlay">
      {/* Static Neon Green Button - Pure text, no movement */}
      <button className="close-btn gothic-text" onClick={onClose}>
        [ return_to_core ]
      </button>
      
      {/* Scrollable area for content */}
      <div className="fragments-scroll-area">
        <header className="fragments-header">
          <h2 className="gothic-text title-main">recovered_fragments</h2>
          <p className="loader-num">accessing_database... ok</p>
        </header>

        <div className="fragments-list">
          {entries.map((entry) => (
            <article key={entry.id} className="fragment-item">
              <div className="fragment-meta">
                <span className="loader-num">{entry.date}</span>
                <span className="category-tag">#{entry.category}</span>
              </div>
              
              <h3 className="gothic-text">{entry.title}</h3>
              <p className="fragment-body">{entry.content}</p>
              
              <div className="fragment-separator" />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fragments;