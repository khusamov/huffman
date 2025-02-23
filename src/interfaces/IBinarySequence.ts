export interface IBinarySequence {
	buffer: ArrayBuffer

	/**
	 * Длина последовательности битов.
	 */
	length: number
}

export const isBinarySequence = (object: any): object is IBinarySequence => {
	return (
		'buffer' in object
		&& 'length' in object
		&& object.buffer instanceof ArrayBuffer
		&& typeof object.length === 'number'
	)
}