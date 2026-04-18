import React from 'react';
import { useDecrypt } from './hooks/useDecrypt';

interface DecryptProps {
  text: string;
  className?: string;
  delay?: number; // Optional delay before starting
}

const DecryptText: React.FC<DecryptProps> = ({ text, className }) => {
  const decryptedText = useDecrypt(text);

  return (
    <span className={className}>
      {decryptedText}
    </span>
  );
};

export default DecryptText;