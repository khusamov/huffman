import {ISequenceFrequency} from './ISequenceFrequency'

export interface IHuffmanTreeNode {
	frequency: ISequenceFrequency
	child0: IHuffmanTreeNode | undefined
	child1: IHuffmanTreeNode | undefined
	isLeaf: boolean
}