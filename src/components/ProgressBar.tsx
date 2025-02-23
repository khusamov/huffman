import React, {CSSProperties} from 'react'

interface IProgressBar {
	value: number
}

export const ProgressBar = ({value}: IProgressBar) => {

	const style: CSSProperties = {
		width: `${value}%`,
		backgroundColor: 'silver',
		textAlign: 'center',
		whiteSpace: 'nowrap',
		overflow: 'hidden'
	}

	return (
		<div style={{border: '1px solid black', width: 200}}>
			<div style={style}>
				{value} %
			</div>
		</div>
	)
}