import {test, expect} from 'vitest'
import {bin2dec} from '../functions/dec2bin'
import {reduceGenerator} from '../functions/reduceGenerator'
import {calculateBinarySequenceFrequency} from './calculateBinarySequenceFrequency'
import {createHuffmanTree} from './createHuffmanTree'
import {inspect} from 'util'

const bitDepth = 8

const testByteArray = [
	'01101010',
	'11010011',
	'01001110',
	'11100010',
]
const testArrayBuffer = (
	testByteArray.reduce(
		(result, value, index) => {
			new Uint8Array(result)[index] = bin2dec(value)
			return result
		},
		new ArrayBuffer(testByteArray.length)
	)
)

test('createHuffmanTree', () => {
	const binarySequenceFrequency = reduceGenerator(calculateBinarySequenceFrequency(bitDepth, testArrayBuffer))
	if (typeof binarySequenceFrequency !== 'number') {
		const huffmanTree = createHuffmanTree(binarySequenceFrequency.frequencyTable)

		//console.log(JSON.stringify(huffmanTree))
		console.log(inspect(huffmanTree, {depth: 4}))

		expect(huffmanTree.frequency?.value).toBe(0)

	}
})