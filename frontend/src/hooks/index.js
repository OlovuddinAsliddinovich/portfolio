export function secondsToMinutes(seconds) {
  const hours = Math.floor(seconds / 3600); // To'liq soatlar
  const minutes = Math.floor((seconds % 3600) / 60); // Qolgan sekundlardan daqiqalar
  const remainingSeconds = seconds % 60; // Qolgan sekundlar

  // Formatted output
  return hours > 0 ? `${hours} soat ${minutes}` : `${minutes}:${remainingSeconds.toFixed()}`;
}
