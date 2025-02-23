import {IBinarySequence} from '../interfaces/IBinarySequence'
import {dec2bin} from './dec2bin'

export function binarySequence2BinaryView(sequence: IBinarySequence): string {
	const view = new Uint8Array(sequence.buffer)
	const tailLength = sequence.buffer.byteLength * 8 - sequence.length
	return (
		view.reduce(
			(result, value, index) => {

				return (
					index === sequence.buffer.byteLength - 1
						? result + dec2bin(value).substring(0, 8 - tailLength)
						: result + dec2bin(value)
				)
			},
			''
		)
	)
}