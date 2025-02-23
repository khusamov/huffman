import {dec2bin} from './dec2bin'

export function arrayBuffer2BinaryView(buffer: ArrayBuffer): string {
	const view = new Uint8Array(buffer)
	return (
		view.reduce(
			(result, value) => result + dec2bin(value),
			''
		)
	)
}