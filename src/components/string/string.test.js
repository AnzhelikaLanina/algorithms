import {reverseLettersFunction} from '../../utils/string';
import {ElementStates} from "../../types/element-states";

const arrayResultOdd = [
    { item: 'о', state: ElementStates.Modified },
    { item: 'в', state: ElementStates.Modified },
    { item: 'о', state: ElementStates.Modified },
    { item: 'л', state: ElementStates.Modified },
    { item: 'с', state: ElementStates.Modified },
]

const arrayResultEven = [
    { item: 'а', state: ElementStates.Modified },
    { item: 'к', state: ElementStates.Modified },
    { item: 'о', state: ElementStates.Modified },
    { item: 'р', state: ElementStates.Modified },
    { item: 'т', state: ElementStates.Modified },
    { item: 'с', state: ElementStates.Modified },
]

const arrayResultOneElement = [
    { item: 'с', state: ElementStates.Modified },
]

const arrayEmptyResult = [
    { item: ' ', state: ElementStates.Modified },
]

describe('Проверка алгоритма на корретный разворот строки', () => {
    it('Корректно разворачивает строку с чётным количеством символов', async () => {
        expect(await reverseLettersFunction('строка', () => {})).toEqual(arrayResultEven);
    });

    it('Корректно разворачивает строку с нечётным количеством символов', async () => {
        expect(await reverseLettersFunction('слово', () => {})).toEqual(arrayResultOdd);
    });

    it('Корректно разворачивает строку с одним символом', async () => {
        expect(await reverseLettersFunction('с',() => {})).toEqual(arrayResultOneElement);
    });

    it('Корректно разворачивает пустую строку', async() => {
       expect(await reverseLettersFunction(' ',() => {})).toEqual(arrayEmptyResult);
    });
})