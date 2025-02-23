import {test, expect} from 'vitest'
import {getArrayBufferBit} from './getArrayBufferBit'
import {bin2dec} from './dec2bin'

const testByteArray = [
	'01101010',
	'11010011',
	'01001110',
	'11100010',
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

test('getArrayBufferBit', () => {
	expect(getArrayBufferBit(0, testArrayBuffer)).toBe(0)
	expect(getArrayBufferBit(1, testArrayBuffer)).toBe(1)
})