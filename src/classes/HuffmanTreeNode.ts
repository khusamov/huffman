import {IHuffmanTreeNode} from '../interfaces/IHuffmanTreeNode'
import {ISequenceFrequency} from '../interfaces/ISequenceFrequency'

export class HuffmanTreeNode implements IHuffmanTreeNode {
	public child0: IHuffmanTreeNode | undefined
	public child1: IHuffmanTreeNode | undefined

	public frequency: ISequenceFrequency

	public constructor(frequency: ISequenceFrequency, child0?: IHuffmanTreeNode, child1?: IHuffmanTreeNode) {
		this.frequency = frequency
		this.child0 = child0
		this.child1 = child1
	}

	public get isLeaf(): boolean {
		return this.child0 === undefined && this.child1 === undefined
	}
}