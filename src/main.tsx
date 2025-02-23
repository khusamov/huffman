import {createRoot} from 'react-dom/client'
import React from 'react'
import {Application} from './components/Application'

console.log('Алгоритм сжатия Хаффмана')

const appElement = document.getElementById('app')

if (appElement) {
	const root = createRoot(appElement)
	root.render(<Application/>)
}