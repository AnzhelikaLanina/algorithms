import React, {ChangeEvent, useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from './stack-page.module.css';
import {Circle} from "../ui/circle/circle";
import {Stack} from '../../utils/stack';
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/utils";
import {TStackElement} from "../../types/stack";

export const StackPage: React.FC = () => {
    const [disabledPush, setDisabledPush] = useState<boolean>(false);
    const [disabledDel, setDisabledDel] = useState<boolean>(false);
    const [disabledClear, setDisabledClear] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [stackArray, setStackArray] = useState<TStackElement[]>([]);
    const [isLoaderPush, setIsLoaderPush] = useState<boolean>(false);
    const [isLoaderDel, setIsLoaderDel] = useState<boolean>(false);
    const [isLoaderClear, setIsLoaderClear] = useState<boolean>(false);
    const stack = new Stack<string>();

    useEffect(() => {
        setDisabledPush(true);
        setDisabledDel(true);
        setDisabledClear(true);
    }, [])

    useEffect(() => {
        !value ? setDisabledPush(true) : setDisabledPush(false);
    }, [value])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const pushItem = async () => {
        setIsLoaderPush(true);
        setDisabledDel(true);
        setDisabledClear(true);
        stack.push(value);
        stackArray.push({
            item: value,
            state: ElementStates.Changing
        });
        setStackArray([...stackArray]);
        setValue('');
        await delay(500);
        stackArray[stackArray.length - 1].state = ElementStates.Default;
        setStackArray([...stackArray]);
        setIsLoaderPush(false);
        setDisabledDel(false);
        setDisabledClear(false);
    }

    const deleteItem = async () => {
        setIsLoaderDel(true);
        setDisabledPush(true);
        setDisabledClear(true);
        stack.pop();
        stackArray[stackArray.length - 1].state = ElementStates.Changing;
        setStackArray([...stackArray]);
        await delay(500);
        stackArray.pop();
        setStackArray([...stackArray]);
        setIsLoaderDel(false);
        setDisabledPush(false);
        setDisabledClear(false);
    }

    const clearStackArray = async () => {
        setIsLoaderClear(true);
        setDisabledPush(true);
        setDisabledDel(true);
        await delay(500);
        stack.clearStack();
        setStackArray([]);
        setIsLoaderClear(false);
        setDisabledPush(true);
        setDisabledDel(true);
        setDisabledClear(true);
    }

  return (
    <SolutionLayout title="Стек">
        <div className={styles.main}>
            <div className={styles.box}>
                <div className={styles.container}>
                    <Input
                        isLimitText={true}
                        maxLength={4}
                        value={value}
                        onChange={onChange}
                    />
                    <Button
                        text={'Добавить'}
                        disabled={disabledPush}
                        onClick={pushItem}
                        isLoader={isLoaderPush}
                    />
                    <Button
                        text={'Удалить'}
                        disabled={disabledDel}
                        onClick={deleteItem}
                        isLoader={isLoaderDel}
                    />
                </div>
                <Button
                    text={'Очистить'}
                    disabled={disabledClear}
                    onClick={clearStackArray}
                    isLoader={isLoaderClear}
                />
            </div>
            <div className={styles.circles}>
                {stackArray?.map((item, index) => (
                    <Circle
                        key={index}
                        state={item.state}
                        letter={String(item.item)}
                        index={index}
                        head={index === stackArray.length - 1 ? "top" : ""}
                    />
                ))}
            </div>
        </div>
    </SolutionLayout>
  );
};
