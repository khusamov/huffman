import {dec2bin} from './dec2bin'

export function buffer2bin(buffer: ArrayBuffer): string {
	return buffer2binArray(buffer).join(' ')
}

export function buffer2binArray(buffer: ArrayBuffer): string[] {
	const view = new Uint8Array(buffer)
	return Array.from(view).map(item => dec2bin(item))
}