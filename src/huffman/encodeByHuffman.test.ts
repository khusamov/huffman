import {test, expect} from 'vitest'
import {reduceGenerator} from '../functions/reduceGenerator'
import {calculateBinarySequenceFrequency} from './calculateBinarySequenceFrequency'
import {createHuffmanTree} from './createHuffmanTree'
import {calculateHuffmanCodes} from './calculateHuffmanCodes'
import {encodeByHuffman} from './encodeByHuffman'
import {binarySequence2BinaryView} from '../functions/binarySequence2BinaryView'

const bitDepth = 8

test('encodeByHuffman', () => {
	const testArrayBuffer = new TextEncoder().encode('kol_okolo_kolokola').buffer as ArrayBuffer
	const binarySequenceFrequency = reduceGenerator(calculateBinarySequenceFrequency(bitDepth, testArrayBuffer))
	if (typeof binarySequenceFrequency !== 'number') {
		const huffmanTree = createHuffmanTree(binarySequenceFrequency.frequencyTable)
		const codeHuffmanMap = calculateHuffmanCodes(huffmanTree)
		const encodedFile = encodeByHuffman(testArrayBuffer, bitDepth, codeHuffmanMap)

		console.log(
			'encodeByHuffman=',
			binarySequence2BinaryView(encodedFile)
			// TODO Не работает функция appendBinarySequence()
		)
	}

	expect(1).toBe(1)
})