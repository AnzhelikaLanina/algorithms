import {ElementStates} from "../types/element-states";
import {Direction} from "../types/direction";
import {IElement} from "../types/sorting";
import {delay, swapElements} from "./utils";

export const sortBubbleFunction = async (
    direction: Direction,
    array: IElement[],
    setArray: Function
) => {
    for (let i= 0; i < array.length; i++) {
        for (let j= 0; j < array.length - 1 - i; j++) {
            array[j].state = ElementStates.Changing;
            if (array[j + 1]) array[j + 1].state = ElementStates.Changing;
            setArray([...array]);
            await delay(1000);
            if (direction === Direction.Descending ?
                array[j].number < array[j+1].number
                : array[j].number > array[j + 1].number)
            {
                swapElements(array, j, j+1);
            }
            array[j].state = ElementStates.Default;
            if (array[j + 1]) array[j + 1].state = ElementStates.Default;
            setArray([...array]);
        }
        array[array.length - i - 1].state = ElementStates.Modified;
        setArray([...array]);
    }
    return array;
}

export const sortSelectionFunction = async (
    direction: Direction,
    array: IElement[],
    setArray: Function
) => {
    for (let i = 0; i < array.length; i++) {
        let maxInd = i;
        array[maxInd].state = ElementStates.Changing;
        for (let j = i; j < array.length; j++) {
            array[j].state = ElementStates.Changing;
            setArray([...array]);
            await delay(1000);
            if ((direction === Direction.Descending ?
                array[j].number : array[maxInd].number) > (direction === Direction.Descending ?
                array[maxInd].number : array[j].number)) {
                maxInd = j;
                array[j].state = ElementStates.Changing;
                array[maxInd].state = i === maxInd ? ElementStates.Changing : ElementStates.Default;
            }
            if (j !== maxInd) {
                array[j].state = ElementStates.Default;
            }
            setArray([...array]);
        }

        swapElements(array, maxInd, i);
        array[maxInd].state = ElementStates.Default;
        array[i].state = ElementStates.Modified;
        setArray([...array]);
    }
    return array;
}