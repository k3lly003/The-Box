import React from 'react';
import './Butterfly.css';

interface ButterflyProps {
  color: string;
  subColor: string;
  scale: number;
  direction: number;
}

export const Butterfly: React.FC<ButterflyProps> = ({ color, subColor, scale, direction }) => {
  return (
    <div style={{ 
      transform: `scale(${scale}) scaleX(${direction})`,
      transformOrigin: 'center'
    }}>
      <div className="butterfly" style={{ '--wing-color': color, '--sub-wing-color': subColor } as React.CSSProperties}>
        <div className="wing">
          <div className="bit"></div>
          <div className="bit"></div>
        </div>
        <div className="wing">
          <div className="bit"></div>
          <div className="bit"></div>
        </div>
      </div>
      <div className="shadow"></div>
    </div>
  );
};