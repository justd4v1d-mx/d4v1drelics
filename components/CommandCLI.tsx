import React, { useState, useEffect, useRef } from 'react';

const CommandCLI: React.FC<{ onExecute: (cmd: string) => void }> = ({ onExecute }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle CLI with the backquote key
      if (e.key === '`' || e.key === 'º' || e.key === '~') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onExecute(input.toLowerCase());
      setInput('');
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cli-overlay">
      <form onSubmit={handleSubmit} className="cli-form">
        <span className="cli-prompt">{'>'} SYS_ADMIN:</span>
        <input 
          ref={inputRef}
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          className="cli-input loader-num"
          placeholder="ENTER_COMMAND..."
        />
      </form>
    </div>
  );
};

export default CommandCLI;