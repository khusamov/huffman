import {getBinarySequence} from '../functions/getBinarySequence'
import {isArrayBufferEqual} from '../functions/isArrayBufferEqual'
import {IBinarySequenceFrequencyTable} from '../interfaces/IBinarySequenceFrequencyTable'
import {ISequenceFrequency} from '../interfaces/ISequenceFrequency'

export function *calculateBinarySequenceFrequency(sequenceLength: number, sourceBuffer: ArrayBuffer): Generator<IBinarySequenceFrequencyTable|number> {
	const result: ISequenceFrequency[] = []

	const sourceArrayBinaryLength = sourceBuffer.byteLength * 8 // Длина исходного массива в битах.
	const sequenceCount = Math.floor(sourceArrayBinaryLength / sequenceLength) // Количество битовых последовательностей.

	let prevProgress = 0
	for (let sequenceIndex = 0; sequenceIndex < sequenceCount; sequenceIndex++) {
		const sequenceOffset = sequenceIndex * sequenceLength
		const sequenceBuffer = getBinarySequence(sequenceOffset, sequenceLength, sourceBuffer)
		const sequenceFrequency = result.find(info => isArrayBufferEqual(info.sequence.buffer, sequenceBuffer))
		if (sequenceFrequency) {
			sequenceFrequency.value++
		} else {
			result.push({
				sequence: {
					buffer: sequenceBuffer,
					length: sequenceLength
				},
				value: 1
			})
		}
		const progress = Math.round((sequenceIndex / sequenceCount) * 100)
		if (progress !== prevProgress) {
			yield progress
			prevProgress = progress
		}

	}

	const tailLength = sourceArrayBinaryLength % sequenceLength // Остаток бит в хвосте.
	const tailBuffer = getBinarySequence(sequenceLength * sequenceCount, tailLength, sourceBuffer)

	yield {
		frequencyTable: result,
		tail: {
			buffer: tailBuffer,
			length: tailLength
		}
	}
}