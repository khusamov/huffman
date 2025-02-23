import type {IHuffmanTreeNode} from '../interfaces/IHuffmanTreeNode'
import type {TMapCodes} from '../types/TMapCodes'
import {IBinarySequence} from '../interfaces/IBinarySequence'
import {appendBitToBinarySequence} from '../functions/appendBitToBinarySequence'

/**
 * Функция для вычисления кодов Хаффмана
 * @param node
 * @param code
 * @param codes
 */
export function calculateHuffmanCodes(
	node: IHuffmanTreeNode,
	code: IBinarySequence = {buffer: new ArrayBuffer(0), length: 0},
	codes: TMapCodes = new Map<IHuffmanTreeNode, IBinarySequence>
): TMapCodes {
	if (node !== null) {
		if (node.frequency) {
			codes.set(node, code)
		}
		if (node.child0 && node.child1) {
			calculateHuffmanCodes(node.child0, appendBitToBinarySequence(code, 0), codes)
			calculateHuffmanCodes(node.child1, appendBitToBinarySequence(code, 1), codes)
		}
	}
	return codes
}