import React, { useState, useEffect, useRef } from 'react';

/**
 * Standard Siemens HMI Responsive Viewport Container
 * Designed specifically for 1920x1080 (FHD) Industrial Displays, TV Dashboards & Touch IPCs.
 * 
 * Auto-scales the native SimaticML coordinate system (1276 x 673) to sharp 1920x1080 FHD
 * preserving exact pixel alignment, typography, button hitboxes, and aspect ratios.
 */
export const HMIViewport = ({ 
  nativeWidth = 1276, 
  nativeHeight = 673, 
  backgroundColor = '#1a1f2c', 
  children 
}) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Exact uniform scaling to fit FHD 1920x1080 or full browser window
      const scaleX = windowWidth / nativeWidth;
      const scaleY = windowHeight / nativeHeight;
      const fitScale = Math.min(scaleX, scaleY);

      setScale(fitScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [nativeWidth, nativeHeight]);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div
        style={{
          width: `${nativeWidth}px`,
          height: `${nativeHeight}px`,
          position: 'relative',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.1s ease-out',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default HMIViewport;
