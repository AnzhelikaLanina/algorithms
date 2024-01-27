interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
    clearStack: () => void;
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item);
    }

    pop = (): void => {
        this.container.pop();
    }

    peak = (): T | null => {
        return this.container[this.container.length-1]
    }
    getSize = () => this.container.length;

    clearStack = () => {
        this.container = [];
    }
}