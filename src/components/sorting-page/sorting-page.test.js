import {sortSelectionFunction, sortBubbleFunction} from "../../utils/sorting";
import {ElementStates} from "../../types/element-states";
import {Direction} from "../../types/direction";

const arrayEmpty = [];
const arrayInitialOneElement = [
    { number: 1, state: ElementStates.Default }
];
const arrayResultOneElement = [
    { number: 1, state: ElementStates.Modified }
];
const arrayInitial = [
    { number: 1, state: ElementStates.Default },
    { number: 7, state: ElementStates.Default },
    { number: 4, state: ElementStates.Default },
    { number: 0, state: ElementStates.Default },
];
const arrayResultAsc = [
    { number: 0, state: ElementStates.Modified },
    { number: 1, state: ElementStates.Modified },
    { number: 4, state: ElementStates.Modified },
    { number: 7, state: ElementStates.Modified },
];
const arrayResultDesc = [
    { number: 7, state: ElementStates.Modified },
    { number: 4, state: ElementStates.Modified },
    { number: 1, state: ElementStates.Modified },
    { number: 0, state: ElementStates.Modified },
];

describe('Проверка алгоритма сортировки выбором', () => {
    it('Корректно сортирует выбором пустой массив', async () => {
        expect(await sortSelectionFunction(Direction.Ascending, arrayEmpty, () => {})).toEqual(arrayEmpty);
    });

    it('Корректно сортирует выбором пустой массив', async () => {
        expect(await sortSelectionFunction(Direction.Descending, arrayEmpty, () => {})).toEqual(arrayEmpty);
    });

    it('Корректно сортирует выбором массив из одного элемента', async () => {
        expect(await sortSelectionFunction(Direction.Ascending, arrayInitialOneElement, () => {})).toEqual(arrayResultOneElement);
    });

    it('Корректно сортирует выбором массив из одного элемента', async() => {
        expect(await sortSelectionFunction(Direction.Descending, arrayInitialOneElement, () => {})).toEqual(arrayResultOneElement);
    });

    it('Корректно сортирует выбором массив из нескольких элементов по возрастанию', async() => {
        expect(await sortSelectionFunction(Direction.Ascending, arrayInitial, () => {})).toEqual(arrayResultAsc);
    }, 100000);

    it('Корректно сортирует выбором массив из нескольких элементов по убыванию', async () => {
        expect(await sortSelectionFunction(Direction.Descending, arrayInitial, () => {})).toEqual(arrayResultDesc);
    }, 100000);
})

describe('Проверка алгоритма сортировки пузырьком', () => {
    it('Корректно сортирует пузырьком пустой массив', async () => {
        expect(await sortBubbleFunction(Direction.Ascending, arrayEmpty, () => {})).toEqual(arrayEmpty);
    });

    it('Корректно сортирует пузырьком пустой массив', async () => {
        expect(await sortBubbleFunction(Direction.Descending, arrayEmpty, () => {})).toEqual(arrayEmpty);
    });

    it('Корректно сортирует пузырьком массив из одного элемента', async () => {
        expect(await sortBubbleFunction(Direction.Ascending, arrayInitialOneElement, () => {})).toEqual(arrayResultOneElement);
    });

    it('Корректно сортирует пузырьком массив из одного элемента', async () => {
        expect(await sortBubbleFunction(Direction.Descending, arrayInitialOneElement, () => {})).toEqual(arrayResultOneElement);
    });

    it('Корректно сортирует пузырьком массив из нескольких элементов по возрастанию', async () => {
        expect(await sortBubbleFunction(Direction.Ascending, arrayInitial, () => {})).toEqual(arrayResultAsc);
    }, 100000);

    it('Корректно сортирует пузырьком массив из нескольких элементов по убыванию', async () => {
        expect(await sortBubbleFunction(Direction.Descending, arrayInitial, () => {})).toEqual(arrayResultDesc);
    }, 100000);
})