import {ElementStates} from "./element-states";

export type TItem<T> = {
    item: T;
    state: ElementStates;
};

export type TListElement = TItem<string> & {
    head?: boolean;
    tail?: boolean;
    isAdded?: boolean;
    isRemoved?: boolean;
    newCircle?: {
        item: string;
    } | null;
};