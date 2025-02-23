import {IBinarySequence} from '../interfaces/IBinarySequence'
import {setArrayBufferBit} from './setArrayBufferBit'
import {getArrayBufferBit} from './getArrayBufferBit'
import {resizeArrayBuffer} from './resizeArrayBuffer'
import {binarySequence2BinaryView} from './binarySequence2BinaryView'

/**
 * В конец битовой последовательности target добавить битовую последовательность source.
 * @param target Внимание, длина и содержимое этой битовой последовательности будет изменена.
 * @param source
 */
export function appendBinarySequence(target: IBinarySequence, source: IBinarySequence): void {
	const resultLength = target.length + source.length
	const targetTailLength = target.length % 8
	const targetFreeTailLength = 8 - targetTailLength

	const part1Length = targetTailLength
	const part2Length = source.length - targetFreeTailLength


	console.log(
		'target',
		binarySequence2BinaryView(target),
		`(${target.length})`
	)

	console.log(
		'source',
		binarySequence2BinaryView(source),
		`(${source.length})`
	)


	for (let offset = 0; offset < part1Length; offset++) {
		setArrayBufferBit(target.length + offset, getArrayBufferBit(offset, source.buffer), target.buffer)
	}



	target.buffer = resizeArrayBuffer(target.buffer, Math.ceil(part2Length / 8))

	for (let offset = 0; offset < part2Length; offset++) {
		setArrayBufferBit(target.length + part1Length + offset, getArrayBufferBit(part1Length + offset, source.buffer), target.buffer)
	}

	target.length = resultLength


	console.log(
		'target',
		binarySequence2BinaryView(target)
	)
	console.log('- - - - - - - - - - - - - - - - -')

}