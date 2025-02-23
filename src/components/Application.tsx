import React, {ChangeEvent, useEffect, useState} from 'react'
import {calculateBinarySequenceFrequency} from '../huffman/calculateBinarySequenceFrequency'
import {FrequencyTable} from './FrequencyTable'
import {IBinarySequenceFrequencyTable} from '../interfaces/IBinarySequenceFrequencyTable'
import {ProgressBar} from './ProgressBar'

let bitDepthDefault = 8

// Состояние компонента в цикле не обновляется. Приходится применять хитрый хак (делать нулевую задержку через обещание).
// https://dev.to/bytebodger/updating-react-state-inside-loops-2dbf
const nullDelayPromise = () => new Promise(resolve => setTimeout(resolve, 0))

export const Application = () => {
	const [gen, setGen] = useState<Generator<IBinarySequenceFrequencyTable|number>|null>(null)
	const [progress, setProgress] = useState(0)
	const [file, setFile] = useState<File|null>(null)
	const [bitDepth, setBitDepth] = useState(bitDepthDefault)
	const [binarySequenceFrequency, setBinarySequenceFrequency] = useState<IBinarySequenceFrequencyTable|null>(null)
	const onUploadButtonChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const uploadButtonElement = event.target
		if (uploadButtonElement.files && uploadButtonElement.files[0]) {
			const file = uploadButtonElement.files[0]
			setFile(file)
			const gen = calculateBinarySequenceFrequency(bitDepth, await file.arrayBuffer())
			setGen(gen)
		}
	}

	useEffect(() => {
		(async () => {
			if (gen) {
				for (const result of gen) {
					if (typeof result === 'number') {
						setProgress(result)
						await nullDelayPromise()
					} else {
						setBinarySequenceFrequency(result)
					}
				}
			}
		})()
	}, [gen])

	const onBitDepthChange = (event: ChangeEvent<HTMLInputElement>) => {
		const bitDepthElement = event.target
		if (bitDepthElement) {
			setBitDepth(Number(bitDepthElement.value))
		}
	}
	return (
		<div>
			<p>Bit Depth: <input type="text" onChange={onBitDepthChange} value={bitDepth}/></p>
			<p><input type="file" onChange={onUploadButtonChange}/></p>
			{
				progress > 0 && progress < 100 && (
					<div>
						<ProgressBar value={progress}/>
					</div>
				)
			}
			{
				file && (
					<div>
						<div><b>{file.name}</b></div>
						<div><b>Размер, байты: {file.size}</b></div>
					</div>
				)
			}
			{
				binarySequenceFrequency
				&& <FrequencyTable binarySequenceFrequency={binarySequenceFrequency}/>
			}
		</div>
	)
}