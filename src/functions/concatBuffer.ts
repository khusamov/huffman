export function concatBuffer(buffer1: ArrayBuffer, buffer2: ArrayBuffer): ArrayBuffer {
	const combinedSize = buffer1.byteLength + buffer2.byteLength
	const resultBuffer = new ArrayBuffer(combinedSize)
	const view = new Uint8Array(resultBuffer)
	view.set(new Uint8Array(buffer1), 0)
	view.set(new Uint8Array(buffer2), buffer1.byteLength)
	return resultBuffer
}