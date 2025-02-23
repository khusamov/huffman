import {test, expect} from 'vitest'
import {getByteIndex} from './getByteIndex.ts'

test('getByteIndex', () => {
	const byteBitArray = new Array(8).fill(0).map((_, index) => index)
	const byteTestArray = new Array(4).fill(0).map((_, index) => byteBitArray.map(value => value + (index * 8)))

	for (const byteBitArray of byteTestArray) {
		const byteIndex = byteTestArray.indexOf(byteBitArray)

		for (const bitIndex of byteBitArray) {
			expect(getByteIndex(bitIndex), `getByteIndex(${bitIndex})`).toBe(byteIndex)
		}
	}
})