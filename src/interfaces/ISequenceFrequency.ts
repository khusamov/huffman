import {IBinarySequence, isBinarySequence} from './IBinarySequence'

export interface ISequenceFrequency {
	/**
	 * Последовательность для которой считается частота.
	 */
	sequence: IBinarySequence

	/**
	 * Частота. Количество вхождений последователности в исходный массив битов.
	 */
	value: number
}

export const createNulledSequenceFrequency = (): ISequenceFrequency => (
	{
		sequence: {
			buffer: new ArrayBuffer,
			length: 0
		},
		value: 0
	}
)

export function isSequenceFrequency(object: any): object is ISequenceFrequency {
	return (
		'sequence' in object
		&& 'value' in object
		&& isBinarySequence(object.sequence)
		&& typeof object.value === 'number'
	)
}

/**
 * Сортировка по возрастанию (ascending order).
 * @param a
 * @param b
 */
export const sortByFrequency = (a: ISequenceFrequency, b: ISequenceFrequency) => {
	return a.value - b.value
}

const arrayBufferToString = (buffer: ArrayBuffer) => new Uint8Array(buffer).toString()

export const sortBySequence = (a: ISequenceFrequency, b: ISequenceFrequency) => {
	if (arrayBufferToString(a.sequence.buffer) > arrayBufferToString(b.sequence.buffer)) return 1
	if (arrayBufferToString(a.sequence.buffer) < arrayBufferToString(b.sequence.buffer)) return -1
	return 0
}