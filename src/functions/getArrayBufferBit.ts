import {TBit} from '../types/TBit'
import {getByteIndex} from './getByteIndex'
import {getBit} from './getBit'

/**
 * Получить значение бита из исходного массива байтов по его индексу.
 * @param bitIndex Индекс бита.
 * @param sourceArray Исходный массив байтов.
 * @exception {RangeError}
 */
export function getArrayBufferBit(bitIndex: number, sourceArray: ArrayBuffer): TBit {
	const sourceArrayView = new Uint8Array(sourceArray)
	const byteIndex = getByteIndex(bitIndex)

	if (byteIndex >= sourceArrayView.length) {
		throw new RangeError('Значение bitIndex выходит за пределы массива sourceArray')
	}

	const byte = sourceArrayView[byteIndex]
	const bitLocalIndex = bitIndex % 8
	return getBit(bitLocalIndex, byte)
}