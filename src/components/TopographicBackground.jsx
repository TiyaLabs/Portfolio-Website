import { useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../App';
import { createNoise3D } from 'simplex-noise';

const TopographicBackground = () => {
  const canvasRef = useRef(null);
  const { portfolioTheme, isDarkMode } = useContext(ThemeContext);
  
  // Use refs for theme values so we don't have to restart the animation loop
  const themeRef = useRef(portfolioTheme);
  const darkRef = useRef(isDarkMode);

  useEffect(() => {
    themeRef.current = portfolioTheme;
    darkRef.current = isDarkMode;
  }, [portfolioTheme, isDarkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    const noise3D = createNoise3D();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Marching Squares configuration
    // Decrease cell size for much higher resolution (smoother curves, less jagged)
    const cellSize = 12; 
    const cols = Math.floor(window.innerWidth / cellSize);
    const rows = Math.floor(window.innerHeight / cellSize);
    const field = new Array(cols + 1).fill(0).map(() => new Array(rows + 1).fill(0));

    // Linear interpolation
    const getT = (v1, v2, t) => (t - v1) / (v2 - v1);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const pTheme = themeRef.current;
      const pDark = darkRef.current;

      // Determine dynamic color
      let strokeColor = 'rgba(148, 163, 184, 0.2)'; 
      if (pTheme === 'ds') {
        strokeColor = pDark ? 'rgba(96, 165, 250, 0.3)' : 'rgba(37, 99, 235, 0.2)'; 
      } else if (pTheme === 'gd') {
        strokeColor = pDark ? 'rgba(234, 179, 8, 0.3)' : 'rgba(234, 88, 12, 0.2)'; 
      }

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.5;
      ctx.lineJoin = 'round'; // helps smooth corners

      const cellW = canvas.width / cols;
      const cellH = canvas.height / rows;

      // Calculate scalar field using Simplex Noise
      // Using world coordinates (x, y) so noise scale is independent of resolution
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * cellW;
          const y = j * cellH;
          // Scale down the multiplier to make the blobs wider and more majestic
          field[i][j] = noise3D(x * 0.0015, y * 0.0015, time);
        }
      }

      // Draw 6 topographic layers (thresholds) for more dense lines
      const thresholds = [-0.6, -0.35, -0.1, 0.15, 0.4, 0.65];

      thresholds.forEach(thresh => {
        ctx.beginPath();
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const aVal = field[i][j];
            const bVal = field[i+1][j];
            const cVal = field[i+1][j+1];
            const dVal = field[i][j+1];

            let state = 0;
            if (aVal > thresh) state |= 8;
            if (bVal > thresh) state |= 4;
            if (cVal > thresh) state |= 2;
            if (dVal > thresh) state |= 1;

            if (state === 0 || state === 15) continue;

            const x0 = i * cellW;
            const y0 = j * cellH;
            
            // Interpolate exact positions for perfectly smooth curves
            const topX = x0 + cellW * getT(aVal, bVal, thresh);
            const topY = y0;
            
            const rightX = x0 + cellW;
            const rightY = y0 + cellH * getT(bVal, cVal, thresh);
            
            const botX = x0 + cellW * getT(dVal, cVal, thresh);
            const botY = y0 + cellH;
            
            const leftX = x0;
            const leftY = y0 + cellH * getT(aVal, dVal, thresh);

            // A: top, B: right, C: bottom, D: left
            switch (state) {
              case 1: ctx.moveTo(leftX, leftY); ctx.lineTo(botX, botY); break;
              case 2: ctx.moveTo(botX, botY); ctx.lineTo(rightX, rightY); break;
              case 3: ctx.moveTo(leftX, leftY); ctx.lineTo(rightX, rightY); break;
              case 4: ctx.moveTo(topX, topY); ctx.lineTo(rightX, rightY); break;
              case 5: 
                ctx.moveTo(topX, topY); ctx.lineTo(leftX, leftY);
                ctx.moveTo(botX, botY); ctx.lineTo(rightX, rightY);
                break;
              case 6: ctx.moveTo(topX, topY); ctx.lineTo(botX, botY); break;
              case 7: ctx.moveTo(topX, topY); ctx.lineTo(leftX, leftY); break;
              case 8: ctx.moveTo(leftX, leftY); ctx.lineTo(topX, topY); break;
              case 9: ctx.moveTo(topX, topY); ctx.lineTo(botX, botY); break;
              case 10:
                ctx.moveTo(leftX, leftY); ctx.lineTo(botX, botY);
                ctx.moveTo(topX, topY); ctx.lineTo(rightX, rightY);
                break;
              case 11: ctx.moveTo(topX, topY); ctx.lineTo(rightX, rightY); break;
              case 12: ctx.moveTo(leftX, leftY); ctx.lineTo(rightX, rightY); break;
              case 13: ctx.moveTo(botX, botY); ctx.lineTo(rightX, rightY); break;
              case 14: ctx.moveTo(leftX, leftY); ctx.lineTo(botX, botY); break;
              default: break;
            }
          }
        }
        ctx.stroke();
      });

      // Slowed down from 0.003 to 0.001 for a much more elegant, slow-moving fluid
      time += 0.001; 
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array prevents restart!

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{ opacity: 1 }}
    />
  );
};

export default TopographicBackground;
