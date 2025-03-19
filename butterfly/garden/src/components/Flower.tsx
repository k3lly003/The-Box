import React from 'react';

interface FlowerProps {
  color: string;
  scale: number;
}

export const Flower: React.FC<FlowerProps> = ({ color, scale }) => {
  return (
    <div style={{ transform: `scale(${scale})` }}>
      {/* Flower petals */}
      <div className="relative w-8 h-8">
        {[0, 72, 144, 216, 288].map((rotation, index) => (
          <div
            key={index}
            className="absolute w-4 h-4 rounded-full"
            style={{
              backgroundColor: color,
              transform: `rotate(${rotation}deg) translateY(-8px)`,
              transformOrigin: 'center center',
            }}
          />
        ))}
        {/* Flower center */}
        <div
          className="absolute w-4 h-4 rounded-full left-2 top-2"
          style={{
            backgroundColor: '#FFD700',
          }}
        />
      </div>
      {/* Stem */}
      <div
        className="w-1 h-12 -mt-1 mx-auto"
        style={{
          backgroundColor: '#4CAF50',
        }}
      />
    </div>
  );
};