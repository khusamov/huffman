/**
 * Метод resize() является нестандартной функцией, которая не входит в спецификацию JavaScript
 * и не поддерживается стандартными API ArrayBuffer.
 * Создание полифила на resize(), если его нет.
 */
if (!ArrayBuffer.prototype.resize) {
	ArrayBuffer.prototype.resize = function(newSize: number) {
		const oldData = new Uint8Array(this)
		const newBuffer = new ArrayBuffer(newSize)
		const newData = new Uint8Array(newBuffer)

		for (let i = 0; i < Math.min(oldData.length, newData.length); i++) {
			newData[i] = oldData[i]
		}

		return newBuffer
	}
	console.warn('Внимание, был создан метод ArrayBuffer.prototype.resize()')
}

/**
 *
 * @param target Внимание, размер и содержимое этого буфера изменяется.
 * @param source
 */
export function appendArrayBuffer(target: ArrayBuffer, source: ArrayBuffer): void {
	// Расширяем целевой буфер до нужного размера
	target.resize(target.byteLength + source.byteLength)

	// Копируем данные из источника в конец расширенного буфера
	const view = new Uint8Array(target)
	view.set(new Uint8Array(source), target.byteLength)
}