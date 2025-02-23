import {getArrayBufferBit} from './getArrayBufferBit'
import {setArrayBufferBit} from './setArrayBufferBit'

/**
 * Получить последовательность битов из исходного массива байтов.
 * @param sequenceOffset Смещение, с которого следует найти искомую последовательность битов.
 * @param sequenceLength Длина последовательности битов.
 * @param sourceBuffer Исходный массив, откуда требуется извлечь последовательность битов.
 * @returns Массив байтов с искомыми битами.
 */
export function getBinarySequence(sequenceOffset: number, sequenceLength: number, sourceBuffer: ArrayBuffer): ArrayBuffer {
	const destinationArray = new ArrayBuffer(Math.ceil(sequenceLength / 8))
	for (let sourceBitOffset = sequenceOffset, destinationBitOffset = 0; destinationBitOffset < sequenceLength; sourceBitOffset++, destinationBitOffset++) {
		const value = getArrayBufferBit(sourceBitOffset, sourceBuffer)
		setArrayBufferBit(destinationBitOffset, value, destinationArray)
	}
	return destinationArray
}