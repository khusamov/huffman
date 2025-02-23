import {TBit} from '../types/TBit'

export function getBit(index: number, byte: number): TBit {
	return (byte & 1 << (7 - index)) ? 1 : 0
}