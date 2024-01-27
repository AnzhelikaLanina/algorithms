import React, {ChangeEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list-page.module.css';
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {LinkedList} from '../../utils/list';
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/utils";
import {TListElement} from "../../types/list";

export const ListPage: React.FC = () => {
    const startArray = [2, 34, 8, 1];
    const list = new LinkedList<string | number>(startArray);
    const initArr: TListElement[] = startArray.map((item, index, array) => ({
        item: String(item),
        state: ElementStates.Default,
        head: index === 0,
        tail: index === array.length - 1,
        isAdded: false,
        isRemoved: false,
        newCircle: null,
    }));

    const [value, setValue] = useState<string>('');
    const [index, setIndex] = useState<number>(0);
    const [array, setArray] = useState<Array<TListElement>>(initArr);
    const [isLoaderPushHead, setIsLoaderPushHead] = useState<boolean>(false);
    const [isLoaderPushTail, setIsLoaderPushTail] = useState<boolean>(false);
    const [isLoaderDeleteHead, setIsLoaderDeleteHead] = useState<boolean>(false);
    const [isLoaderDeleteTail, setIsLoaderDeleteTail] = useState<boolean>(false);
    const [isLoaderPushIndexElement, setIsLoaderPushIndexElement] = useState<boolean>(false);
    const [isLoaderDeleteIndexElement, setIsLoaderDeleteIndexElement] = useState<boolean>(false);

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
        setIndex(+e.target.value);
    }

    const pushHead = async () => {
        setIsLoaderPushHead(true);
        list.prepend(value);
        if (list.getSize() > 1) {
            array[0] = {
                ...array[0],
                isAdded: true,
                head: false,
                newCircle: { item: value },
                state: ElementStates.Changing,
            };
        } else {
            array[0] = {
                item: value,
                isAdded: true,
                head: true,
                newCircle: null,
                state: ElementStates.Changing,
            };
        }
        setArray([...array]);
        await delay(500);
        if (list.getSize() > 1) {
            array[0] = {
                ...array[0],
                isAdded: false,
                head: false,
                newCircle: null,
                state: ElementStates.Default,
            };
        } else {
            array[0] = {
                item: value,
                isAdded: false,
                head: true,
                tail: true,
                newCircle: null,
                state: ElementStates.Default,
            };
        }
        setArray([...array]);
        await delay(500);
        if (list.getSize() > 1) {
            array.unshift({ item: value, state: ElementStates.Modified });
            setArray([...array]);
            await delay(500);
        }
        array[0] = {
            ...array[0],
            state: ElementStates.Default,
            head: true,
        };
        setArray([...array]);
        setValue("");
        setIsLoaderPushHead(false);
    }

    const pushTail = async () => {
        setIsLoaderPushTail(true);
        list.append(value);
        if (list.getSize() > 0) {
            array[array.length - 1] = {
                ...array[array.length - 1],
                tail: false,
                isAdded: true,
                newCircle: { item: value },
                state: ElementStates.Changing,
            };
        } else {
            array[0] = {
                item: value,
                head: true,
                tail: true,
                isAdded: true,
                newCircle: null,
                state: ElementStates.Changing,
            };
        }
        setArray([...array]);
        await delay(500);
        if (list.getSize() > 0) {
            array[array.length - 1] = {
                ...array[array.length - 1],
                tail: false,
                isAdded: false,
                newCircle: null,
                state: ElementStates.Default,
            };
        } else {
            array[0] = {
                item: value,
                head: true,
                tail: true,
                isAdded: false,
                newCircle: null,
                state: ElementStates.Default,
            };
        }
        setArray([...array]);
        await delay(500);
        if (list.getSize() > 0) {
            array.push({ item: value, state: ElementStates.Modified });
            setArray([...array]);
            await delay(500);
        }
        array[array.length - 1] = {
            ...array[array.length - 1],
            tail: true,
            state: ElementStates.Default,
        };
        array[array.length - 2] = {
            ...array[array.length - 2],
            tail: false,
        };
        setArray([...array]);
        setValue("");
        setIsLoaderPushTail(false);
    }

    const deleteHead = async () => {
        setIsLoaderDeleteHead(true);
        list.deleteHead();
        if (list.getSize() > 0) {
            array[0] = {
                ...array[0],
                head: false,
                state: ElementStates.Changing,
                item: "",
                isRemoved: true,
                newCircle: { item: array[0].item },
            };
        } else {
            array[0] = {
                ...array[0],
                head: false,
                tail: false,
                state: ElementStates.Changing,
                item: "",
                isRemoved: true,
                newCircle: { item: array[0].item },
            };
        }
        setArray([...array]);
        await delay(500);
        array[0].state = ElementStates.Modified;
        array.shift();
        setArray([...array]);
        await delay(500);
        if (list.getSize() > 0) {
            array[0] = {
                ...array[0],
                state: ElementStates.Default,
                head: true,
            };
            setArray([...array]);
        }
        setValue("");
        setIsLoaderDeleteHead(false);
    }

    const deleteTail = async () => {
        setIsLoaderDeleteTail(true);
        list.deleteTail();
        array[array.length - 1] = {
            ...array[array.length - 1],
            tail: false,
            state: ElementStates.Changing,
            item: "",
            isRemoved: true,
            newCircle: { item: array[array.length - 1].item },
        };
        setArray([...array]);
        await delay(500);
        if (list.getSize() > 0) {
            array.pop();
            array[array.length - 1].state = ElementStates.Modified;
            setArray([...array]);
            await delay(500);
            array[array.length - 1].state = ElementStates.Default;
            array[array.length - 1].tail = true;
        } else {
            array.pop();
        }
        setArray([...array]);
        setValue("");
        setIsLoaderDeleteTail(false);
    }

    const insertAtIndex = async () => {
        setIsLoaderPushIndexElement(true);
        list.addByIndex(value, index);
        for (let i = 0; i <= index; i++) {
            array[i] = {
                ...array[i],
                state: ElementStates.Changing,
                isAdded: true,
                newCircle: { item: value },
            };
            if (i > 0) {
                array[i - 1] = {
                    ...array[i - 1],
                    state: ElementStates.Changing,
                    isAdded: false,
                    newCircle: null,
                };
            }
            setArray([...array]);
            await delay(500);
        }
        array[index] = {
            ...array[index!],
            isAdded: false,
            newCircle: null,
        };
        array.splice(index, 0, {
            item: value,
            state: ElementStates.Modified,
        });
        setArray([...array]);
        await delay(500);
        array.forEach((item) => (item.state = ElementStates.Default));
        setArray([...array]);
        array[1].head = false;
        array[0].head = true;
        setArray([...array]);
        setValue("");
        setIndex(0);
        setIsLoaderPushIndexElement(false);
    }

    const deleteAtIndex = async () => {
        setIsLoaderDeleteIndexElement(true);
        list.deleteByIndex(index);
        for (let i = 0; i <= index; i++) {
            array[i].state = ElementStates.Changing;
            setArray([...array]);
            await delay(500);
        }
        array[index] = {
            ...array[index],
            item: "",
            isRemoved: true,
            newCircle: { item: array[index].item },
        };
        setArray([...array]);
        await delay(500);
        array.splice(index, 1);
        setArray([...array]);
        await delay(500);
        array.forEach((item) => (item.state = ElementStates.Default));
        setArray([...array]);
        array[array.length - 1].tail = true;
        array[0].head = true;
        setArray([...array]);
        setValue("");
        setIndex(0);
        setIsLoaderDeleteIndexElement(false);
    }

  return (
    <SolutionLayout title="Связный список">
        <div className={styles.main}>
          <div className={styles.container}>
              <div className={styles.box}>
                  <Input
                      isLimitText={true}
                      maxLength={4}
                      placeholder={'Введите значение'}
                      value={value}
                      onChange={onChangeValue}
                  />
                  <Button
                      extraClass={styles.button__value}
                      text={'Добавить в head'}
                      onClick={pushHead}
                      isLoader={isLoaderPushHead}
                      disabled={isLoaderPushTail ||
                          isLoaderDeleteHead ||
                          isLoaderDeleteTail ||
                          isLoaderPushIndexElement ||
                          isLoaderDeleteIndexElement}
                  />
                  <Button
                      extraClass={styles.button__value}
                      text={'Добавить в tail'}
                      onClick={pushTail}
                      isLoader={isLoaderPushTail}
                      disabled={isLoaderPushHead ||
                          isLoaderDeleteHead ||
                          isLoaderDeleteTail ||
                          isLoaderPushIndexElement ||
                          isLoaderDeleteIndexElement}
                  />
                  <Button
                      extraClass={styles.button__value}
                      text={'Удалить из head'}
                      onClick={deleteHead}
                      isLoader={isLoaderDeleteHead}
                      disabled={isLoaderPushHead ||
                          isLoaderPushTail ||
                          isLoaderDeleteTail ||
                          isLoaderPushIndexElement ||
                          isLoaderDeleteIndexElement}
                  />
                  <Button
                      extraClass={styles.button__value}
                      text={'Удалить из tail'}
                      onClick={deleteTail}
                      isLoader={isLoaderDeleteTail}
                      disabled={isLoaderPushHead ||
                          isLoaderPushTail ||
                          isLoaderDeleteHead ||
                          isLoaderPushIndexElement ||
                          isLoaderDeleteIndexElement}
                  />
              </div>
              <div className={styles.box}>
                  <Input
                      placeholder={'Введите индекс'}
                      value={index}
                      onChange={onChangeIndex}
                  />
                  <Button
                      text={'Добавить по индексу'}
                      extraClass={styles.button__index}
                      onClick={insertAtIndex}
                      isLoader={isLoaderPushIndexElement}
                      disabled={isLoaderPushHead ||
                          isLoaderPushTail ||
                          isLoaderDeleteHead ||
                          isLoaderDeleteTail ||
                          isLoaderDeleteIndexElement}
                  />
                  <Button
                      text={'Удалить по индексу'}
                      extraClass={styles.button__index}
                      onClick={deleteAtIndex}
                      isLoader={isLoaderDeleteIndexElement}
                      disabled={isLoaderPushHead ||
                          isLoaderPushTail ||
                          isLoaderDeleteHead ||
                          isLoaderDeleteTail ||
                          isLoaderPushIndexElement}
                  />
              </div>
          </div>
          <div className={styles.circles}>
              {array?.map((item, index) => (
                  <div className={styles.circle} key={index}>
                    <Circle
                        key={index}
                        state={item.state}
                        letter={String(item.item)}
                        index={index}
                        head={item.head ? "head" : ""}
                        tail={item.tail ? "tail" : ""}
                    />
                      {index < array.length - 1 && (
                        <ArrowIcon
                            fill={item.state === ElementStates.Changing ? "#d252e1" : "#0032ff"}
                        />
                      )}
                      {item.isAdded && item.newCircle?.item !== undefined && (
                          <Circle
                              isSmall={true}
                              state={ElementStates.Changing}
                              letter={String(item.newCircle.item)}
                              extraClass={styles.circle__head}
                          />
                      )}
                      {item.isRemoved && item.newCircle?.item !== null && (
                          <Circle
                              isSmall={true}
                              state={ElementStates.Changing}
                              letter={String(item.newCircle?.item)}
                              extraClass={styles.circle__tail}
                          />
                      )}
                  </div>
              ))}
          </div>
        </div>
    </SolutionLayout>
  );
};
