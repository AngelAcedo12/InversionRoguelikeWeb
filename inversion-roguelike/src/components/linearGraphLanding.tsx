import React from "react";

export default function LinearGraphLanding() {
  const [points, setPoints] = React.useState<number[]>([]);

  const createRandomPoints = () => {
    let newPoints = [];
    for (let i = 0; i < 200; i++) {
      newPoints.push(Math.floor(Math.random() * 300));
    }

    setPoints(newPoints);
  };
  React.useEffect(() => {
    createRandomPoints();
  }, []);

  return (
    <div className="animate-fade mt-4 w-full">
      <svg className="w-[100dvw]" height={400}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: "blue", stopOpacity: 1 }} />
            <stop
              offset="100%"
              style={{ stopColor: "transparent", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="blue"
          strokeWidth="2"
          points={points
            .map((point, index) => `${index * 50},${point}`)
            .join(" ")}
        />
        <polygon
          fill="url(#gradient)"
          stroke="none"
          points={`0,300 ${points
            .map((point, index) => `${index * 50},${point}`)
            .join(" ")} ${points.length * 50 - 50},300`}
        />
      </svg>
    </div>
  );
  <style></style>;
}
