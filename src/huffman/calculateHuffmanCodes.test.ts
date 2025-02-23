import {test, expect} from 'vitest'
import {reduceGenerator} from '../functions/reduceGenerator'
import {calculateBinarySequenceFrequency} from './calculateBinarySequenceFrequency'
import {createHuffmanTree} from './createHuffmanTree'
import {calculateHuffmanCodes} from './calculateHuffmanCodes'
import {buffer2bin} from '../functions/buffer2bin'
import {IHuffmanTreeNode} from '../interfaces/IHuffmanTreeNode'
import {binarySequence2BinaryView} from '../functions/binarySequence2BinaryView'

const bitDepth = 8

// const testArrayBuffer = new TextEncoder().encode('aaaaaaaaaaaaaaabbbbbbbvvvvvvggggggddddd').buffer as ArrayBuffer
// const testArrayBuffer = new TextEncoder().encode('na_dvore_trava,_na_trave_drova').buffer as ArrayBuffer
const testArrayBuffer = new TextEncoder().encode('kol_okolo_kolokola').buffer as ArrayBuffer

// const testByteArray = [
// 	'11111000',
// 	'11111100',
// 	'11111111',
// 	'11111000',
// 	'11111100',
// 	'11111111',
// 	'11111000',
// 	'11111100',
// 	'11111111',
// 	'11111000',
// 	'11111100',
// 	'11111111',
// 	'01111011',
// 	'01101011',
// 	'01101011',
// 	'01101010',
// 	'11010011',
// 	'01001110',
// 	'11100010',
// 	'01001110',
// 	'11100010',
// 	'11100010',
// 	'11100010',
// 	'11100010',
// ]
// const testArrayBuffer = (
// 	testByteArray.reduce(
// 		(result, value, index) => {
// 			new Uint8Array(result)[index] = bin2dec(value)
// 			return result
// 		},
// 		new ArrayBuffer(testByteArray.length)
// 	)
// )

test('calculateHuffmanCodes', () => {
	const binarySequenceFrequency = reduceGenerator(calculateBinarySequenceFrequency(bitDepth, testArrayBuffer))
	if (typeof binarySequenceFrequency !== 'number') {
		const huffmanTree = createHuffmanTree(binarySequenceFrequency.frequencyTable)
		const codeHuffmanMap = calculateHuffmanCodes(huffmanTree)

		console.log(preorderTraversal(huffmanTree).map(item => item.frequency ? new TextDecoder().decode(item.frequency?.sequence.buffer) : ''))

		console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -')

		for (
			const item
				of Array
					.from(codeHuffmanMap)
					.filter(item => item[0].isLeaf)
					.map(
						item => {
							return (
								new TextDecoder().decode(item[0].frequency.sequence.buffer)
								+ ' '
								+ buffer2bin(item[0].frequency.sequence.buffer)
								+ ':'
								+ item[0].frequency.value
								+ ' > '
								+ binarySequence2BinaryView(item[1])
							)
						}
					)
			) {
			console.log(item)
		}
		console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -')

		console.log(`var nodes = new vis.DataSet([`)
		for (
			const item
				of Array
					.from(codeHuffmanMap)
					.map(
						item => {
							const id = new TextDecoder().decode(item[0].frequency.sequence.buffer)
							const value = item[0].frequency.value
							return `{id: '${id}', label: '${value} (${id})'},`
						}
					)
			) {
			console.log(item)
		}
		console.log(']);')
		console.log('// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -')

		console.log('var edges = new vis.DataSet([')
		function printHuffmanTreeLinks(node: IHuffmanTreeNode) {
			if (node.child0) {
				const from = new TextDecoder().decode(node.frequency.sequence.buffer)
				const to = new TextDecoder().decode(node.child0.frequency.sequence.buffer)
				const label = 0
				console.log(`{from: '${from}', to: '${to}', label: '${label}'},`)
				printHuffmanTreeLinks(node.child0)
			}
			if (node.child1) {
				const from = new TextDecoder().decode(node.frequency.sequence.buffer)
				const to = new TextDecoder().decode(node.child1.frequency.sequence.buffer)
				const label = 1
				console.log(`{from: '${from}', to: '${to}', label: '${label}'},`)
				printHuffmanTreeLinks(node.child1)
			}
		}
		printHuffmanTreeLinks(huffmanTree)
		console.log(']);')
		console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -')

		expect(codeHuffmanMap).toBe(0)

	}
})

function preorderTraversal(node: IHuffmanTreeNode, result: IHuffmanTreeNode[] = []): IHuffmanTreeNode[] {
	result.push(node)

	if (node.child0) preorderTraversal(node.child0, result)
	if (node.child1) preorderTraversal(node.child1, result)

	return result
}