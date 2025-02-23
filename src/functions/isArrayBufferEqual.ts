export function isArrayBufferEqual(buffer1: ArrayBuffer, buffer2: ArrayBuffer): boolean {
	return new Uint8Array(buffer1).toString() === new Uint8Array(buffer2).toString()
}