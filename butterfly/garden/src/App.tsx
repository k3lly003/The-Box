import React, { useEffect, useState } from 'react';
import { Butterfly } from './components/BUtterfly';
import { Flower } from './components/Flower';

interface ButterflyPosition {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  subColor: string;
  scale: number;
  rotation: number;
  direction: number;
}

interface FlowerPosition {
  x: number;
  y: number;
  color: string;
  scale: number;
  rotation: number;
}

function App() {
  const [butterflies] = useState<ButterflyPosition[]>([
    { x: 50, y: 50, targetX: 50, targetY: 50, color: '#FF6B6B', subColor: '#FF9999', scale: 1.2, rotation: 0, direction: -1 },
    { x: 70, y: 30, targetX: 70, targetY: 30, color: '#96FF4D', subColor: '#B7FF83', scale: 0.8, rotation: 0, direction: 1 },
    { x: 20, y: 40, targetX: 20, targetY: 40, color: '#FFD93D', subColor: '#FFE583', scale: 1.4, rotation: 0, direction: -1 },
    { x: 80, y: 60, targetX: 80, targetY: 60, color: '#FF4DFF', subColor: '#FF83FF', scale: 0.9, rotation: 0, direction: 1 },
    { x: 40, y: 80, targetX: 40, targetY: 80, color: '#4DFFF6', subColor: '#83FFF9', scale: 1.3, rotation: 0, direction: -1 },
    { x: 60, y: 20, targetX: 60, targetY: 20, color: '#FF8B3D', subColor: '#FFA96B', scale: 1.1, rotation: 0, direction: 1 },
    { x: 25, y: 75, targetX: 25, targetY: 75, color: '#C04DFF', subColor: '#D583FF', scale: 0.7, rotation: 0, direction: -1 },
    { x: 75, y: 25, targetX: 75, targetY: 25, color: '#FF4D7A', subColor: '#FF83A2', scale: 1.5, rotation: 0, direction: 1 },
    { x: 45, y: 55, targetX: 45, targetY: 55, color: '#4DFF9F', subColor: '#83FFC0', scale: 1, rotation: 0, direction: -1 },
    { x: 35, y: 45, targetX: 35, targetY: 45, color: '#FF9F4D', subColor: '#FFC083', scale: 1.2, rotation: 0, direction: 1 },
    { x: 65, y: 35, targetX: 65, targetY: 35, color: '#4D9FFF', subColor: '#83C0FF', scale: 0.9, rotation: 0, direction: -1 },
    { x: 55, y: 65, targetX: 55, targetY: 65, color: '#9F4DFF', subColor: '#C083FF', scale: 1.3, rotation: 0, direction: 1 },
    { x: 15, y: 85, targetX: 15, targetY: 85, color: '#FF4D9F', subColor: '#FF83C0', scale: 0.8, rotation: 0, direction: -1 }
  ]);

  const flowers: FlowerPosition[] = [
    { x: 10, y: 90, color: '#FF6B6B', scale: 1, rotation: 0 },
    { x: 20, y: 85, color: '#FFD93D', scale: 1.2, rotation: 45 },
    { x: 30, y: 88, color: '#FF4DFF', scale: 0.9, rotation: -20 },
    { x: 40, y: 92, color: '#4DFFF6', scale: 1.1, rotation: 30 },
    { x: 50, y: 87, color: '#FF8B3D', scale: 1.3, rotation: -45 },
    { x: 60, y: 91, color: '#C04DFF', scale: 0.8, rotation: 15 },
    { x: 70, y: 86, color: '#FF4D7A', scale: 1.2, rotation: -30 },
    { x: 80, y: 89, color: '#4DFF9F', scale: 1, rotation: 25 },
    { x: 90, y: 93, color: '#FF9F4D', scale: 1.1, rotation: -15 },
    { x: 15, y: 94, color: '#4D9FFF', scale: 0.9, rotation: 35 },
    { x: 25, y: 90, color: '#9F4DFF', scale: 1.2, rotation: -25 },
    { x: 35, y: 92, color: '#FF4D9F', scale: 1, rotation: 20 },
    { x: 45, y: 88, color: '#4DFFA6', scale: 1.1, rotation: -40 },
    { x: 55, y: 91, color: '#FFA64D', scale: 0.8, rotation: 30 },
    { x: 65, y: 87, color: '#A64DFF', scale: 1.3, rotation: -35 }
  ];

  const [positions, setPositions] = useState(butterflies);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setPositions(prevPositions => 
        prevPositions.map(butterfly => {
          const distanceToTarget = Math.hypot(
            butterfly.x - butterfly.targetX,
            butterfly.y - butterfly.targetY
          );

          if (distanceToTarget < 1) {
            // When setting a new target, determine direction based on target position
            const newTargetX = Math.random() * 80 + 10;
            const newDirection = newTargetX > butterfly.x ? 1 : -1;
            
            return {
              ...butterfly,
              targetX: newTargetX,
              targetY: Math.random() * 70 + 10, // Keep butterflies above the flowers
              direction: newDirection
            };
          }

          const dx = (butterfly.targetX - butterfly.x) * 0.02;
          const dy = (butterfly.targetY - butterfly.y) * 0.02;

          return {
            ...butterfly,
            x: butterfly.x + dx,
            y: butterfly.y + dy
          };
        })
      );
    }, 50);

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#4CAF50] flex items-center justify-center overflow-hidden relative">
      {/* Grass texture */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582560475093-ba66accbc424?q=80&w=1920&auto=format&fit=crop')] bg-cover opacity-30" />
      
      <div className="w-full max-w-4xl h-[600px] relative">
        {/* Butterflies */}
        {positions.map((butterfly, index) => (
          <div
            key={`butterfly-${index}`}
            className="absolute transition-all duration-[50ms] ease-linear"
            style={{
              left: `${butterfly.x}%`,
              top: `${butterfly.y}%`,
              transform: `translate(-50%, -50%)`
            }}
          >
            <Butterfly
              color={butterfly.color}
              subColor={butterfly.subColor}
              scale={butterfly.scale}
              direction={butterfly.direction}
            />
          </div>
        ))}

        {/* Flowers */}
        {flowers.map((flower, index) => (
          <div
            key={`flower-${index}`}
            className="absolute"
            style={{
              left: `${flower.x}%`,
              top: `${flower.y}%`,
              transform: `translate(-50%, -50%) rotate(${flower.rotation}deg)`
            }}
          >
            <Flower color={flower.color} scale={flower.scale} />
          </div>
        ))}
      </div>

      <a
        href="https://bsky.app/profile/beets.irish"
        className="absolute bottom-5 right-5 bg-[#4099FF] text-white px-4 py-2 rounded-md hover:bg-[#5aa9ff] transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        @beets.irish
      </a>
    </div>
  );
}

export default App;