import {ElementStates} from "./element-states";

export type TItemArray<T> = {
    item: T;
    state: ElementStates;
};

export type TStringElement = TItemArray<string | null>;