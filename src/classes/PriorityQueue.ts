export interface PriorityQueueOptions<T> {
	items?: T[]
	comparator?: (a: T, b: T) => number
}

export class PriorityQueue<T> {
	private readonly items: T[] = []
	private readonly comparator: (a: T, b: T) => number = (a: T, b: T) => (a as number) - (b as number)

	public constructor({comparator, items}: PriorityQueueOptions<T> = {}) {
		if (items) {
			this.items = items
		}
		if (comparator) {
			this.comparator = comparator
		}
	}

	public enqueue(...item: T[]) {
		this.items.push(...item)
		this.sort()
	}

	public dequeue() {
		if (!this.isEmpty()) {
			return this.items.shift()
		}
	}

	public isEmpty() {
		return this.items.length === 0
	}

	public sort() {
		this.items.sort(this.comparator)
	}

	public length() {
		return this.items.length
	}
}