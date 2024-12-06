export function formatDuration(totalSeconds: number): string {
    // totalSeconds = 72

    const minutes: number = Math.floor(totalSeconds / 60); // Menor inteiro possível da divisão por 60
    // minutes = 1
    const seconds: number = Math.floor(totalSeconds % 60); // Retorna a sobra da divisão por 60
    // seconds = 12

    const formattedMinutes: string = minutes.toString().padStart(2, '0');
    // formattedMinutes = 01
    const formattedSeconds: string = seconds.toString().padStart(2, '0');
    // formattedSeconds = 12

    return `${formattedMinutes}:${formattedSeconds}`; // 01:12
}