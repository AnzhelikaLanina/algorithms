export class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;
    constructor(value: T, next?: LinkedListNode<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

interface ILinkedList<T> {
    append: (element: T) => void;
    prepend: (element: T) => void;
    addByIndex: (element: T, position: number) => void;
    deleteByIndex : (position: number) => void;
    getSize: () => number;
    deleteTail: () => void;
    deleteHead: () => void;
}

export class LinkedList<T> implements ILinkedList<T>{
    private head: LinkedListNode<T> | null;
    private tail: LinkedListNode<T> | null;
    private size: number;
    constructor(initialState?: T[]) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        initialState?.forEach((element) => {
            this.addByIndex(element, 0);
        });
    }

    addByIndex = (element: T, index: number) => {
        if(index < 0 || index > this.size){
            throw new Error('Enter a valid index');
        } else {
            const node = new LinkedListNode(element);

            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                let curr = this.head;
                let currIndex = 0;
                let prev = this.head;

                while (currIndex < index) {
                    if (curr) {
                        currIndex++;
                        prev = curr;
                        curr = curr.next;
                    }
                }

                node.next = curr;
                if (prev) {
                    prev.next = node;
                }
            }

            this.size++;
        }
    };

    deleteByIndex  = (index: number) => {
        if (index < 0 || index > this.size) {
            return null;
        }
        let current = this.head;

        if (index === 0 && current) {
            this.head = current.next;
        } else {
            let previous = null;
            let currentIndex = 0;

            while (currentIndex < index && current) {
                previous = current;
                current = current.next;
                currentIndex++;
            }

            if (previous && current) {
                previous.next = current.next;
            }
        }
        this.size--;
        return current ? current.value : null;
    };

    append = (element: T) => {
        const node = new LinkedListNode(element);
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            this.size++;

            return this;
        }
        this.tail.next = node;
        this.tail = node;
        this.size++;
    }

    prepend = (element: T) => {
        let node = new LinkedListNode(element);

        if (!this.head) {
            this.head = node;
        }
        node.next = this.head;
        this.head = node;
        this.size++;
    }

    deleteTail = () => {
        if(this.tail === null || this.size === 0) {
            return null;
        }
        let currentNode = this.head;
        let prev = null;
        let currentIndex = 0;
        while (currentIndex < this.size - 1 && currentNode) {
            prev = currentNode;
            currentNode = currentNode.next;
            currentIndex++;
        }
        if (prev && currentNode) prev.next = currentNode.next;
        this.size--;

    }

    deleteHead = () => {
        let current = this.head;
        if(this.head === null) {
            return null;
        }
        if (this.head.next) {
            this.head = current!.next;
        } else {
            this.head = null;
            this.tail = null;
        }
        this.size--;
    }

    getSize = () => {
        return this.size;
    }
}