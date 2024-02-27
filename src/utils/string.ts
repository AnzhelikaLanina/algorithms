import {delay, swapElements} from "./utils";
import {ElementStates} from "../types/element-states";
import {TStringElement} from "../types/string";

export const reverseLettersFunction = async (
    value: string,
    setLetters: Function
) => {
    const array: TStringElement[] = value.split("").map((item: string) => {
        return {
            item,
            state: ElementStates.Default,
        };
    })
    setLetters(array);
    const middle = Math.floor(array.length / 2);
    let start: number = 0;
    let end = array.length - 1;
    while (start < middle) {
        array[start].state = ElementStates.Changing;
        array[end].state = ElementStates.Changing;
        setLetters([...array]);
        await delay(1000);
        array[start].state = ElementStates.Modified;
        array[end].state = ElementStates.Modified;
        swapElements(array, start, end);
        setLetters([...array]);
        start++;
        end--;
    }
    if (array.length % 2 !== 0) {
        await delay(1000);
        array[middle].state = ElementStates.Modified;
    }
    return array;
}