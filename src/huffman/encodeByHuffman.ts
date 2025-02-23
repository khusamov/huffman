import {TMapCodes} from '../types/TMapCodes'
import {getBinarySequence} from '../functions/getBinarySequence'
import {compareArrayBuffers} from '../functions/compareArrayBuffers'
import {appendBinarySequence} from '../functions/appendBinarySequence'
import {IBinarySequence} from '../interfaces/IBinarySequence'

/**
 * Закодировать (сжать) данные файла кодом Хаффмана.
 * @param dataBuffer
 * @param symbolLength
 * @param HuffmanCodeMap
 */
export function encodeByHuffman(dataBuffer: ArrayBuffer, symbolLength: number, HuffmanCodeMap: TMapCodes) {
	const huffmanCodeLeafArray = (
		Array.from(HuffmanCodeMap)
			.filter(item => item[0].isLeaf)
			.map(item => {
				return {
					sequence: item[0].frequency.sequence, // Исходный символ.
					codeSequence: item[1] // Соответствующий ему код Хаффмана.
				}
			})
	)

	const dataView = new Uint8Array(dataBuffer)

	// Количество целых символов исходного файла.
	const wholeSymbolNumber = Math.floor(dataView.length * 8 / symbolLength)

	const targetSequence: IBinarySequence = {
		buffer: new ArrayBuffer,
		length: 0
	}

	for(let symbolSequenceOffset = 0; symbolSequenceOffset / symbolLength < wholeSymbolNumber ; symbolSequenceOffset += symbolLength) {
		const symbolBuffer = getBinarySequence(symbolSequenceOffset, symbolLength, dataBuffer)
		const foundHuffmanCode = huffmanCodeLeafArray.find(item => compareArrayBuffers(item.sequence.buffer, symbolBuffer))
		if (!foundHuffmanCode) {
			throw new Error('Не найден код Хаффмана')
		}

		appendBinarySequence(targetSequence, foundHuffmanCode.codeSequence)
	}

	return targetSequence
}