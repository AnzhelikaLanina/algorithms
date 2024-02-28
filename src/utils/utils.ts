import {TStringElement} from "../types/string";
import {IElement} from "../types/sorting";

export const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const swapElements = (array: TStringElement[] | IElement[], firstIndex: number, secondIndex: number) => {
    const tmp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = tmp;
}