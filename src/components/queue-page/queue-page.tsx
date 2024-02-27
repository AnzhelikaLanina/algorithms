import React, {ChangeEvent, useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Queue} from "../../utils/queue";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/utils";
import {TQueueElement} from "../../types/queue";

const maxLength:number = 7;
const queue = new Queue<string>(maxLength);

export const QueuePage: React.FC = () => {
    const [disabledPush, setDisabledPush] = useState<boolean>(false);
    const [disabledClear, setDisabledClear] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [isLoaderPush, setIsLoaderPush] = useState<boolean>(false);
    const [isLoaderClear, setIsLoaderClear] = useState<boolean>(false);

    const initialArray: TQueueElement[] = Array.from(
        { length: maxLength },
        () => ({
            item: "",
            state: ElementStates.Default,
            head: false,
            tail: false,
        })
    );

    const [queueArray, setQueueArray] = useState<TQueueElement[]>(initialArray);

    useEffect(() => {
        setDisabledPush(true);
        setDisabledClear(true);
    }, [])

    useEffect(() => {
        !value ? setDisabledPush(true) : setDisabledPush(false);
        if(queue.isFull()) {
            setDisabledPush(true);
        }
    }, [value])

    useEffect(() => {
        if (queueArray.some((item) => {
            return item.item !== "";
        })) {
            setDisabledClear(false);
        } else {
            setDisabledClear(true);
        }
    }, [queueArray])

    const pushItem = async () => {
        setIsLoaderPush(true);
        setDisabledClear(true);
        queue.enqueue(value);
        queueArray[queue.getHead()].head = true;
        if (queue.getTail() > 0) {
            queueArray[queue.getTail() - 1].tail = false;
        }
        queueArray[queue.getTail()].item = value;
        queueArray[queue.getTail()].state = ElementStates.Changing;
        queueArray[queue.getTail()].tail = true;
        setValue('');
        await delay(500);
        queueArray[queue.getTail()].state = ElementStates.Default;
        setQueueArray([...queueArray]);
        setIsLoaderPush(false);
    }

    const clearQueueArray = async () => {
        setIsLoaderClear(true);
        setDisabledPush(true);
        await delay(500);
        queue.clearQueue();
        setQueueArray([...initialArray]);
        setIsLoaderClear(false);
    }

    const deleteItem = async () => {
        if (queue.getHead() === queue.getTail()) {
            queueArray[queue.getHead()].state = ElementStates.Changing;
            setQueueArray([...queueArray]);
            await delay(500);
            queueArray[queue.getHead()].state = ElementStates.Default;
            await clearQueueArray();
        } else {
            setIsLoaderClear(true);
            setDisabledPush(true);
            setQueueArray([...queueArray]);
            queue.dequeue();
            queueArray[queue.getHead() - 1].state = ElementStates.Changing;
            await delay(500);
            queueArray[queue.getHead() - 1].state = ElementStates.Default;
            if (queue.getHead() > 0) {
                queueArray[queue.getHead() - 1].head = false;
                queueArray[queue.getHead() - 1].item = "";
            }
            queueArray[queue.getHead()].head = true;
            setQueueArray([...queueArray]);
            setIsLoaderClear(false);
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

  return (
    <SolutionLayout title="Очередь">
        <div className={styles.main}>
            <div className={styles.box}>
                <div className={styles.container}>
                    <Input
                        isLimitText={true}
                        maxLength={4}
                        placeholder={'Введите значение'}
                        onChange={onChange}
                        value={value}
                        data-test="input-queue"
                    />
                    <Button
                        text={'Добавить'}
                        disabled={disabledPush}
                        onClick={pushItem}
                        isLoader={isLoaderPush}
                        data-test="button-add-queue"
                    />
                    <Button
                        text={'Удалить'}
                        disabled={disabledClear}
                        onClick={deleteItem}
                        isLoader={isLoaderClear}
                        data-test="button-delete-queue"
                    />
                </div>
                <Button
                    text={'Очистить'}
                    disabled={disabledClear}
                    onClick={clearQueueArray}
                    isLoader={isLoaderClear}
                    data-test="button-reset-queue"
                />
            </div>
            <div className={styles.circles}>
                {queueArray.map((item, index) => (
                    <Circle
                        key={index}
                        state={item.state}
                        letter={String(item.item)}
                        index={index}
                        head={item.head ? "head" : ""}
                        tail={item.tail ? "tail" : ""}
                    />
                ))}
            </div>
        </div>
    </SolutionLayout>
  );
};
