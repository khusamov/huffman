import {test, expect} from 'vitest'
import {bin2dec} from './dec2bin.ts'

test('bin2dec', () => {
	expect(bin2dec('00000010')).toBe(2)
	expect(bin2dec('00000011')).toBe(3)
	expect(bin2dec('00000100')).toBe(4)
})