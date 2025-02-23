import {setBit} from './setBit.ts'

/**
 * Внимание, эта функция работает только с одним байтом (то есть byte < 256).
 * И функция не работает с отрицательными числами.
 */
export function dec2bin(dec: number): string {
	let result = dec.toString(2)
	if (result.length % 8) {
		const spaceCount = 8 - result.length % 8
		result = Array(spaceCount).fill('0').join('') + result
	}
	return result;
}

export function bin2dec(bin: string): number {
	if (bin.length !== 8) {
		throw new Error('В байте ожидается ровно 8 бит')
	}

	return (
		Array.from(bin)
			.reduce<number>(
				(result, value, index) => setBit(index, Number(value) as 0 | 1, result),
				0
			)
	)
}