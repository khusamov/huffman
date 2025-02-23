import {ISequenceFrequency} from '../interfaces/ISequenceFrequency'
import {IHuffmanTreeNode} from '../interfaces/IHuffmanTreeNode'
import {HuffmanTreeNode} from '../classes/HuffmanTreeNode'
import {createSequenceFrequencyPriorityQueue} from './createSequenceFrequencyPriorityQueue'
import {concatBinarySequence} from '../functions/concatBinarySequence'

export function createHuffmanTree(frequencyTable: ISequenceFrequency[]): IHuffmanTreeNode {
	if (frequencyTable.length === 0) {
		throw new Error('Таблица частот не должна быть пустой')
	}

	const priorityQueue = createSequenceFrequencyPriorityQueue()
	priorityQueue.enqueue(...frequencyTable.map(frequency => new HuffmanTreeNode(frequency)))

	while (priorityQueue.length() > 1) {
		const child0 = priorityQueue.dequeue()
		const child1 = priorityQueue.dequeue()
		if (child0 && child1) {
			const parentFrequency = {
				value: child0.frequency.value + child1.frequency.value,
				sequence: concatBinarySequence(child0.frequency.sequence, child1.frequency.sequence)
			}
			const parent = new HuffmanTreeNode(parentFrequency, child0, child1)
			priorityQueue.enqueue(parent)
		}
	}

	const root = priorityQueue.dequeue()

	if (!root) {
		throw new Error('Очередь пустая')
	}

	return root
}