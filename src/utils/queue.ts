interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
    isEmpty: () => boolean;
    clearQueue: () => void;
    getHead: () => number;
    getTail: () => number;
    getLength: () => number;
}

export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    isEmpty = () => this.length === 0;

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        this.container[this.tail] = item;
        this.tail++;
        this.length++;
    }

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }

        if (this.head === this.size) {
            this.head = 0;
        }

        this.container[this.head] = null;
        this.head++;
        this.length--;
    }

    peak = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        return this.container[this.head % this.size] || null;
    }

    clearQueue = () => {
        this.container = [];
        this.tail = 0;
        this.head = 0;
        this.length = 0;
    }
    getHead = () => this.head;
    getTail = () => this.tail - 1;
    getLength = () => this.length;

}