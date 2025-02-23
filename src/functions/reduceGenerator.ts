export function reduceGenerator<T>(generator: Generator<T>): T {
	let result

	for (const item of generator) {
		result = item
	}

	if (!result) {
		throw new Error('Генератор не должен быть пустым')
	}

	return result
}