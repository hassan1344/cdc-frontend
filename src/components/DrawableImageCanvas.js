import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

const DrawableImageCanvas = forwardRef(({ imageSrc, width = 938, height = 384 }, ref) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const base64DataRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);
  const [isErasing, setIsErasing] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width, height });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = imageSrc;
  
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height); // 🧠 draw background
      context.lineCap = 'round';
      setCtx(context);
    };
  }, [imageSrc]);

  // Resize canvas on container size change
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { offsetWidth } = containerRef.current;
        const aspectRatio = height / width;
        setCanvasSize({
          width: offsetWidth,
          height: offsetWidth * aspectRatio,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);

  const getRelativePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    if (!ctx) return;
    const { x, y } = getRelativePos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !ctx) return;
    const { x, y } = getRelativePos(e);

    ctx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
    ctx.strokeStyle = isErasing ? 'rgba(0,0,0,1)' : 'red';
    ctx.lineWidth = isErasing ? 10 : 2;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
    base64DataRef.current = canvasRef.current.toDataURL('image/png');
  };

  const clearCanvas = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    base64DataRef.current = canvasRef.current.toDataURL('image/png');
  };

  const toggleEraser = () => {
    setIsErasing((prev) => !prev);
  };

  const getBase64Image = () => {
    base64DataRef.current = canvasRef.current.toDataURL('image/png');
    return base64DataRef.current;
  };

  // ✅ Expose triggerExport to parent
  useImperativeHandle(ref, () => ({
    triggerExport: () => {
      return canvasRef.current?.toDataURL('image/png');
    }
  }));

  return (
    <div className="w-full flex flex-col items-center">
      <div
        ref={containerRef}
        className="relative w-full"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          aspectRatio: `${width} / ${height}`,
        }}
      >
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          style={{
            width: '100%',
            height: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
            cursor: 'crosshair',
          }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>

      <div className="flex flex-wrap gap-4 mt-6 justify-center">
        <button
          onClick={clearCanvas}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Drawing
        </button>
        <button
          onClick={toggleEraser}
          className={`px-4 py-2 rounded ${
            isErasing ? 'bg-gray-700' : 'bg-yellow-500'
          } text-white hover:opacity-90`}
        >
          {isErasing ? 'Eraser On' : 'Eraser Off'}
        </button>
      </div>
    </div>
  );
});

export default DrawableImageCanvas;
