import {PriorityQueue} from '../classes/PriorityQueue'
import {IHuffmanTreeNode} from '../interfaces/IHuffmanTreeNode'

export function createSequenceFrequencyPriorityQueue(): PriorityQueue<IHuffmanTreeNode> {
	return (
		new PriorityQueue<IHuffmanTreeNode>({
			comparator: (a, b) => (
				(a.frequency ? a.frequency.value : 0)
				- (b.frequency ? b.frequency.value : 0)
			)
		})
	)
}