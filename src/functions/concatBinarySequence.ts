import {IBinarySequence} from '../interfaces/IBinarySequence'
import {getArrayBufferBit} from './getArrayBufferBit'
import {setArrayBufferBit} from './setArrayBufferBit'

export function concatBinarySequence(sequence1: IBinarySequence, sequence2: IBinarySequence): IBinarySequence {
	const resultSequenceLength = sequence1.length + sequence2.length
	const resultBufferLength = Math.ceil(resultSequenceLength / 8)
	const resultBuffer = new ArrayBuffer(resultBufferLength)
	for (let offset = 0; offset < sequence1.length; offset++) {
		const value = getArrayBufferBit(offset, sequence1.buffer)
		setArrayBufferBit(offset, value, resultBuffer)
	}
	for (let offset = 0; offset < sequence2.length; offset++) {
		const value = getArrayBufferBit(offset, sequence1.buffer)
		setArrayBufferBit(offset + sequence1.length, value, resultBuffer)
	}
	return {
		buffer: resultBuffer,
		length: resultSequenceLength
	}
}