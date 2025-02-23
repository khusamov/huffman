export function resizeArrayBuffer(sourceBuffer: ArrayBuffer, newByteLength: number): ArrayBuffer {
	const resultBuffer = new ArrayBuffer(newByteLength)

	const resultBufferView = new Uint8Array(resultBuffer)
	const sourceBufferView = new Uint8Array(sourceBuffer)

	for (let i = 0; i < Math.min(sourceBufferView.length, resultBufferView.length); i++) {
		resultBufferView[i] = sourceBufferView[i]
	}

	return resultBuffer
}