import {IBinarySequence} from '../interfaces/IBinarySequence'
import {setArrayBufferBit} from './setArrayBufferBit'
import {TBit} from '../types/TBit'

export function appendBitToBinarySequence(sequence: IBinarySequence, value: TBit): IBinarySequence {
	const offset = sequence.length
	const buffer = (
		sequence.length % 8 === 0
			? new ArrayBuffer(sequence.buffer.byteLength + 1)
			: sequence.buffer.slice()
	)

	setArrayBufferBit(offset, value, buffer)

	return {
		buffer,
		length: sequence.length + 1
	}
}