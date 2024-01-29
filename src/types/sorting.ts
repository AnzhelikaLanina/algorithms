import {ElementStates} from "./element-states";

export interface IElement {
    number: number | string;
    state: ElementStates;
}