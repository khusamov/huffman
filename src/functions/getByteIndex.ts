/**
 * Вычислить смещение байта, в котором ищется бит со смещением bitIndex.
 * @param bitIndex Смещение бита в массиве байтов.
 * @returns Смещение байта.
 */
export function getByteIndex(bitIndex: number) {
	return Math.floor(bitIndex / 8)
}