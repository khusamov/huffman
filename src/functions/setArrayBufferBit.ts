import {setBit} from './setBit.ts'
import {getByteIndex} from './getByteIndex.ts'
import {TBit} from '../types/TBit'

/**
 * Установка бита в нужно значение в массиве байтов.
 * Внимание, функция меняет содержимое arrayBuffer.
 * @param bitIndex Смещение бита от начала массива. Начинается с нуля.
 * @param value Значение бита.
 * @param arrayBuffer Массив, где требуется изменить бит.
 */
export function setArrayBufferBit(bitIndex: number, value: TBit, arrayBuffer: ArrayBuffer): void {
	const view = new Uint8Array(arrayBuffer)

	const byteIndex = getByteIndex(bitIndex)
	const bitLocalIndex = bitIndex % 8
	const byte = view[byteIndex]

	view[byteIndex] = setBit(bitLocalIndex, value, byte)
}