type SparklineProps = {
  values: number[];
  className?: string;
  strokeClassName?: string;
};

export function Sparkline({
  values,
  className = "h-10 w-full",
  strokeClassName = "stroke-primary",
}: SparklineProps) {
  if (values.length < 2) {
    return <div className={className} aria-hidden />;
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const width = 100;
  const height = 32;
  const step = width / (values.length - 1);

  const points = values.map((value, index) => {
    const x = index * step;
    const y = height - ((value - min) / range) * (height - 4) - 2;
    return { x, y };
  });

  const path = points.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const prev = points[index - 1];
    const cx = (prev.x + point.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${point.y}, ${point.x} ${point.y}`;
  }, "");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d={path}
        fill="none"
        className={strokeClassName}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
