export default function NoiseOverlay({
  opacity = 0.06,
  className = "",
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      className={`grain ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
