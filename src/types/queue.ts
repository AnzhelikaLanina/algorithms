import {ElementStates} from "./element-states";

export interface IElement {
    item: string | null;
    state: ElementStates;
}

export type TQueueElement = IElement & {
    head: boolean;
    tail: boolean;
};