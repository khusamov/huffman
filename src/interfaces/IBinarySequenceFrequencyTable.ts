import {ISequenceFrequency} from './ISequenceFrequency'
import {IBinarySequence} from './IBinarySequence'

export interface IBinarySequenceFrequencyTable {
	frequencyTable: ISequenceFrequency[]

	/**
	 * Остатки бит, количество которых меньше длины символа.
	 */
	tail: IBinarySequence
}