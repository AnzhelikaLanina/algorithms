import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import styles from './sorting-page.module.css';
import {Button} from "../ui/button/button";
import {Direction} from "../../types/direction";
import {Column} from "../ui/column/column";
import {ElementStates} from "../../types/element-states";
import {IElement} from "../../types/sorting";
import {sortBubbleFunction, sortSelectionFunction} from "../../utils/sorting";

export const SortingPage: React.FC = () => {
    const [method, setMethod] = useState("selection");
    const [array, setArray] = useState<IElement[]>([]);
    const [isLoaderAsc, setIsLoaderAsc] = useState<boolean>(false);
    const [isLoaderDes, setIsLoaderDes] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    const loader = (direction: Direction, loaderBoolean: boolean) => {
        direction === Direction.Descending ? setIsLoaderDes(loaderBoolean) : setIsLoaderAsc(loaderBoolean);
    }

    const createRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const createRandomArr = () => {
        const array = [];
        const max = 100;
        const length = createRandomNumber(3,17);
        while (array.length < length) {
            array.push({
                number: Math.floor(Math.random() * max),
                state: ElementStates.Default
            });
        }
        setArray(array);
        return array;
    }

    useEffect(() => {
        createRandomArr();
    }, [])

    const sortBubble = async (direction: Direction) => {
        setDisabled(true);
        loader(direction, true);
        await sortBubbleFunction(direction, array, setArray);
        loader(direction, false);
        setDisabled(false);
    }

    const sortSelection = async (direction: Direction) => {
        setDisabled(true);
        loader(direction, true);
        await sortSelectionFunction(direction, array, setArray);
        loader(direction, false);
        setDisabled(false);
    }

  return (
    <SolutionLayout title="Сортировка массива">
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.radioInputs}>
              <RadioInput
                  label={'Выбор'}
                  onClick={() => setMethod("selection")}
                  checked={method === "selection"}
                  onChange={()=>{}}
              />
              <RadioInput
                  label={'Пузырёк'}
                  onClick={() => setMethod("bubble")}
                  checked={method === "bubble"}
                  onChange={()=>{}}
              />
            </div>
            <div className={styles.buttons}>
              <Button
                  text={'По возрастанию'}
                  extraClass={styles.button}
                  isLoader={isLoaderAsc}
                  disabled={disabled}
                  onClick={method === "selection"
                      ? () => sortSelection(Direction.Ascending)
                      : () => sortBubble(Direction.Ascending)}
              />
              <Button
                  text={'По убыванию'}
                  extraClass={styles.button}
                  isLoader={isLoaderDes}
                  disabled={disabled}
                  onClick={method === "selection"
                      ? () => sortSelection(Direction.Descending)
                      : () => sortBubble(Direction.Descending)}
              />
            </div>
            <Button
                text={'Новый массив'}
                extraClass={styles.button}
                onClick={createRandomArr}
                disabled={disabled}
            />
          </div>
          <div className={styles.columns}>
              {array.map((element: IElement, index) => (
                  <div key={index} className={styles.resultItem}>
                      <Column
                          index={Number(element.number)}
                          state={element.state}
                      />
                  </div>
              ))}
          </div>
        </div>
    </SolutionLayout>
  );
};
