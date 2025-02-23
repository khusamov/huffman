import React from 'react'
import {IBinarySequenceFrequencyTable} from '../interfaces/IBinarySequenceFrequencyTable'
import {sortBySequence} from '../interfaces/ISequenceFrequency'
import {arrayBuffer2BinaryView} from '../functions/arrayBuffer2BinaryView'

interface IFrequencyTableProps {
	binarySequenceFrequency: IBinarySequenceFrequencyTable
}

const FrequencyTableHead = () => (
	<thead>
		<tr>
			<th>Последовательность</th>
			<th>Частота</th>
		</tr>
	</thead>
)

export const FrequencyTable = ({binarySequenceFrequency}: IFrequencyTableProps) => {
	if (!binarySequenceFrequency.frequencyTable.length) {
		return null
	}

	const tailBinaryView = (
		arrayBuffer2BinaryView(binarySequenceFrequency.tail.buffer)
			.substring(0, binarySequenceFrequency.tail.length)
	)

	// console.log(
	// 	'Контроль - Размер исходного файлай в байтах:',
	// 	(
	// 		binarySequenceFrequency.frequencyTable.reduce(
	// 			(result, frequency) => result + frequency.sequence.length * frequency.value,
	// 			0
	// 		)
	// 		+ binarySequenceFrequency.tail.length
	// 	) / 8
	// )

	return (
		<div>
			{
				tailBinaryView && (
					<div>
						Tail: {tailBinaryView}
					</div>
				)
			}
			<table>
				<FrequencyTableHead/>
				<tbody>
				{
					binarySequenceFrequency.frequencyTable.sort(sortBySequence).map((item, index) => {
						return (
							<tr key={index}>
								<td>
									{
										arrayBuffer2BinaryView(item.sequence.buffer)
											.substring(0, item.sequence.length)
									}
								</td>
								<td>{item.value}</td>
							</tr>
						)
					})
				}
				</tbody>
			</table>
		</div>
	)
}