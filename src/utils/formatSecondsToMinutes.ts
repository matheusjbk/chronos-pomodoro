export function formatSecondsToMinutes(durationInSeconds: number) {
  const minutes = String(Math.floor(durationInSeconds / 60)).padStart(2, '0');
  const seconds = String(Math.floor(durationInSeconds % 60)).padStart(2, '0');
  return `${minutes}:${seconds}`;
}
