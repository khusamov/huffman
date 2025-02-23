import {TBit} from '../types/TBit'

/**
 * Установить бит в байте в нужное значение.
 * @param index Индекс бита. Отсчитывается с начала байта (слева). Начинается с нуля.
 * @param value Значение бита (0 или 1).
 * @param byte Байт, в котором нужно поменять значение бита.
 * @returns {number} Измененный байт.
 */
export function setBit(index: number, value: TBit, byte: number): number {
	return byte | value << (7 - index)
}