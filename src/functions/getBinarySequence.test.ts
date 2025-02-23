import {test, expect} from 'vitest'
import {getBinarySequence} from './getBinarySequence'
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

test('getBinarySequence', () => {
	const resultBuffer = getBinarySequence(2, 10, testArrayBuffer)
	const viewResultBuffer = new Uint8Array(resultBuffer)
	expect(viewResultBuffer[0]).toBe(bin2dec('10101011'))
	expect(viewResultBuffer[1]).toBe(bin2dec('01000000'))
})