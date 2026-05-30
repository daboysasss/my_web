import React, { useEffect, useRef } from 'react';

/**
 * GridGlows - A component that renders a canvas overlaying the background grid.
 * It spawns light streaks (glares) moving strictly along the grid lines from one edge of the screen
 * to the opposite edge, fading in and out smoothly at the start and end of their journey.
 */
const GridGlows = ({
  gridSize = 40,
  color = '#e29fdf',
  spawnRate = 0.01, // Default lower spawn rate
  minSpeed = 2.0,   // Slower movement speed
  maxSpeed = 3.5,
  minLength = 300,  // Longer length for full-line traverses looks very premium
  maxLength = 600,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let streaks = [];

    // Resize canvas to cover the whole viewport
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Helper to calculate the time interval [tStart, tEnd] during which a streak covers a target coordinate.
    // Adds a visual padding/buffer (e.g. 100px) to prevent streaks from getting too close to each other.
    const getOccupationInterval = (s, targetCoord) => {
      const distLead = (targetCoord - s.pos) * s.direction;
      const tStart = distLead / s.speed;
      const tEnd = (distLead + s.length + 100) / s.speed;
      return [Math.max(0, tStart), tEnd];
    };

    // Predicts if two streaks will intersect during their future/current lifetime.
    const willIntersect = (s1, s2) => {
      if (s1.dir === s2.dir) {
        // If they are on the same line, they overlap
        return s1.coord === s2.coord;
      }

      // One horizontal, one vertical
      const sh = s1.dir === 'h' ? s1 : s2;
      const sv = s1.dir === 'h' ? s2 : s1;

      // The intersection point is (sv.coord, sh.coord)
      const [hStart, hEnd] = getOccupationInterval(sh, sv.coord);
      const [vStart, vEnd] = getOccupationInterval(sv, sh.coord);

      // If one of the streaks has already passed the intersection point, they won't meet.
      if (hStart > hEnd || vStart > vEnd) {
        return false;
      }

      // Check if their occupation intervals overlap
      const overlapStart = Math.max(hStart, vStart);
      const overlapEnd = Math.min(hEnd, vEnd);

      return overlapStart <= overlapEnd;
    };

    // Spawns a new streak traveling along a random grid line from edge to edge without intersections
    const spawnStreak = () => {
      const isHorizontal = Math.random() > 0.5;
      const width = canvas.width;
      const height = canvas.height;

      const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
      const length = minLength + Math.random() * (maxLength - minLength);

      // Harmonious deep purple palette matching the Aceternity grid lines (rgba(147, 51, 234, 0.15))
      const colors = [
        '#9333ea',   // Deep purple (exact hue of the background grid)
        '#8b5cf6',   // Slightly brighter violet-purple
        '#7c3aed'    // Violet/indigo
      ];
      const selectedColor = colors[Math.floor(Math.random() * colors.length)];

      const maxAttempts = 15;
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        let proposedStreak;

        if (isHorizontal) {
          // Find row indexes aligning with the grid lines
          const rowsCount = Math.floor(height / gridSize);
          if (rowsCount <= 0) return;
          const row = Math.floor(Math.random() * rowsCount);
          const y = row * gridSize;

          const direction = Math.random() > 0.5 ? 1 : -1;
          let startX;
          let totalDist = width + length;
          
          if (direction === 1) {
            // Moving Left -> Right, start off-screen
            startX = -length;
          } else {
            // Moving Right -> Left, start off-screen on the right
            startX = width;
          }

          proposedStreak = {
            dir: 'h',
            coord: y,
            pos: startX,
            direction,
            speed,
            length,
            totalDist,
            distTraveled: 0,
            color: selectedColor,
          };
        } else {
          // Find column indexes aligning with the grid lines
          const colsCount = Math.floor(width / gridSize);
          if (colsCount <= 0) return;
          const col = Math.floor(Math.random() * colsCount);
          const x = col * gridSize;

          const direction = Math.random() > 0.5 ? 1 : -1;
          let startY;
          let totalDist = height + length;
          
          if (direction === 1) {
            // Moving Top -> Bottom, start off-screen
            startY = -length;
          } else {
            // Moving Bottom -> Top, start off-screen on the bottom
            startY = height;
          }

          proposedStreak = {
            dir: 'v',
            coord: x,
            pos: startY,
            direction,
            speed,
            length,
            totalDist,
            distTraveled: 0,
            color: selectedColor,
          };
        }

        // Check if proposedStreak intersects with any existing active streaks
        const hasCollision = streaks.some(existingStreak => willIntersect(proposedStreak, existingStreak));
        if (!hasCollision) {
          streaks.push(proposedStreak);
          break; // Successfully found a line and spawned without collision!
        }
      }
    };

    // Helper function to translate CSS colors / Hex into RGB strings for alpha handling
    const hexToRgb = (hexColor) => {
      const cleanHex = hexColor.trim().toLowerCase();
      
      if (cleanHex.startsWith('rgb')) {
        const match = cleanHex.match(/\d+/g);
        if (match && match.length >= 3) {
          return `${match[0]}, ${match[1]}, ${match[2]}`;
        }
      }

      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      const fullHex = cleanHex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
      
      if (result) {
        return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
      }

      // Named color fallbacks
      const palette = {
        magenta: '255, 0, 255',
        purple: '147, 51, 234',
        violet: '238, 130, 238',
        white: '255, 255, 255',
      };

      return palette[cleanHex] || '147, 51, 234';
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Check if we should spawn a new streak (max 8 active streaks at a time for less clutter)
      if (Math.random() < spawnRate && streaks.length < 8) {
        spawnStreak();
      }

      // Process and render active streaks
      streaks = streaks.filter((streak) => {
        streak.pos += streak.speed * streak.direction;
        streak.distTraveled += streak.speed;

        // Discard if traveled beyond total distance limit
        if (streak.distTraveled >= streak.totalDist) {
          return false;
        }

        // Calculate opacity based on progress (smooth fade-in and fade-out at screen edges)
        const progress = streak.distTraveled / streak.totalDist;
        let opacity = 1;
        
        if (progress < 0.15) {
          // Smooth fade in at the beginning of the screen
          opacity = Math.sin((progress / 0.15) * Math.PI / 2);
        } else if (progress > 0.85) {
          // Smooth fade out at the end of the screen
          opacity = Math.sin(((1 - progress) / 0.15) * Math.PI / 2);
        }

        // Soft intensity peak: we scale maximum opacity to 0.45 so it is subtle and blends with grid
        const maxStreakOpacity = opacity * 0.45;

        // Draw slightly wider lines (2.5px) for a soft glowing bloom
        ctx.lineWidth = 2.5;
        const rgb = hexToRgb(streak.color);

        if (streak.dir === 'h') {
          const y = streak.coord;
          const xLeading = streak.pos;
          const xTrailing = streak.pos - streak.length * streak.direction;

          const grad = ctx.createLinearGradient(xTrailing, y, xLeading, y);
          
          // Symmetric gradient: smooth fade-in and fade-out at both ends
          grad.addColorStop(0, `rgba(${rgb}, 0)`);
          grad.addColorStop(0.25, `rgba(${rgb}, ${maxStreakOpacity * 0.5})`);
          grad.addColorStop(0.5, `rgba(${rgb}, ${maxStreakOpacity})`);
          grad.addColorStop(0.75, `rgba(${rgb}, ${maxStreakOpacity * 0.5})`);
          grad.addColorStop(1, `rgba(${rgb}, 0)`);

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(xTrailing, y);
          ctx.lineTo(xLeading, y);
          ctx.stroke();
        } else {
          const x = streak.coord;
          const yLeading = streak.pos;
          const yTrailing = streak.pos - streak.length * streak.direction;

          const grad = ctx.createLinearGradient(x, yTrailing, x, yLeading);

          // Symmetric gradient: smooth fade-in and fade-out at both ends
          grad.addColorStop(0, `rgba(${rgb}, 0)`);
          grad.addColorStop(0.25, `rgba(${rgb}, ${maxStreakOpacity * 0.5})`);
          grad.addColorStop(0.5, `rgba(${rgb}, ${maxStreakOpacity})`);
          grad.addColorStop(0.75, `rgba(${rgb}, ${maxStreakOpacity * 0.5})`);
          grad.addColorStop(1, `rgba(${rgb}, 0)`);

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(x, yTrailing);
          ctx.lineTo(x, yLeading);
          ctx.stroke();
        }

        return true;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gridSize, color, spawnRate, minSpeed, maxSpeed, minLength, maxLength]);

  return <canvas ref={canvasRef} className="grid-glares" />;
};

export default GridGlows;
