import {test, expect} from 'vitest'
import {setArrayBufferBit} from './setArrayBufferBit.ts'
import {bin2dec, dec2bin} from './dec2bin.ts'

const testByteArray = [
	'00000000',
	'00000000',
	'00000000',
	'00000000',
]
const testArrayBuffer = (
	testByteArray.reduce(
		(result, value, index) => {
			new Uint8Array(result)[index] = bin2dec(value)
			return result
		},
		new ArrayBuffer(testByteArray.length)
	)
)

test('setArrayBufferBit', () => {
	setArrayBufferBit(17, 1, testArrayBuffer)

	const view = new Uint8Array(testArrayBuffer)
	const newByteArray = Array.from(view).map(item => dec2bin(item))

	expect(newByteArray).toStrictEqual([
		'00000000',
		'00000000',
		'01000000',
		'00000000',
	])
})