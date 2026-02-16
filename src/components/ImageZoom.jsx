import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import styles from "./ImageZoom.module.css";

const ImageZoom = ({ imageUrl }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.5, 5));
  const handleZoomOut = () => {
    setScale((s) => {
      const newScale = Math.max(s - 0.5, 1);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
      return newScale;
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || scale === 1) return;

    const deltaX = e.movementX / scale;
    const deltaY = e.movementY / scale;

    setPosition((prev) => {
      const newX = prev.x + deltaX;
      const newY = prev.y + deltaY;

      const ratio = (scale - 1) / (2 * scale);
      const limitX = containerRef.current.clientWidth * ratio;
      const limitY = containerRef.current.clientHeight * ratio;

      return {
        x: Math.max(-limitX, Math.min(newX, limitX)),
        y: Math.max(-limitY, Math.min(newY, limitY)),
      };
    });
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      style={{ overflow: "hidden", position: "relative" }}
    >
      <div className={styles.buttons}>
        <button className={styles.btn} onClick={handleZoomIn}>
          <Plus />
        </button>
        <button className={styles.btn} onClick={handleZoomOut}>
          <Minus />
        </button>
      </div>

      <img
        ref={imageRef}
        src={imageUrl}
        alt="zoomable"
        className={styles.image}
        draggable={false}
        onMouseDown={() => setIsDragging(true)}
        style={{
          cursor: isDragging ? "grabbing" : scale > 1 ? "grab" : "default",
          transition: isDragging ? "none" : "transform 0.2s ease-out",
          transform: `translate(${position.x * scale}px, ${position.y * scale}px) scale(${scale})`,
        }}
      />
    </div>
  );
};

export default ImageZoom;
