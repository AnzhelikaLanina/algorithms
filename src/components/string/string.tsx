import React, {ChangeEvent, useEffect, useState} from "react";
import styles from './string.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {delay} from "../../utils/utils";
import {ElementStates} from "../../types/element-states";

export const StringComponent: React.FC = () => {
    const [letters, setLetters] = useState<string[] | null>(null);
    const [value, setValue] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => {
        !value ? setDisabled(true) : setDisabled(false);
    }, [value]);

    const reverseLetters = async (array: string[]) => {
        const middle = Math.floor(array.length / 2);
        const end = array.length - 1;
        setCurrentIndex(0);
        for (let i = 0; i < middle; i++) {
            await delay(1000);
            [array[i], array[end - i]] = [array[end - i], array[i]];
            setCurrentIndex((i) => i + 1);
            setLetters(array);
        }
        setIsLoader(false);
    }

    const splitWord = (value: string) => {
        setIsLoader(true);
        const array = value.split('');
        setLetters(array);
        void reverseLetters(array);
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

   const changeCircleColor = (
        index: number,
        currentIndex: number,
        array: Array<string | number>
    ) => {
        const length = array.length - 1;
        if (currentIndex < index || currentIndex > length - index) {
            return ElementStates.Modified;
        }
        if (currentIndex === index || currentIndex === length - index) {
            return ElementStates.Changing;
        }
        return ElementStates.Default;
    };

  return (
    <SolutionLayout title="Строка">
        <div className={styles.main}>
            <div className={styles.container}>
                <Input
                    isLimitText={true}
                    maxLength={11}
                    type = {"text"}
                    onChange={onChange}
                />
                <div className={styles.button}>
                    <Button
                        text={'Развернуть'}
                        onClick={() => splitWord(value)}
                        isLoader={isLoader}
                        disabled={disabled}
                    />
                </div>
            </div>
            <div className={styles.letters}>
                {letters?.map((item, index) => (
                    <Circle
                        letter={item}
                        key={index}
                        state={changeCircleColor(currentIndex, index, letters)}
                    />
                ))}
            </div>
        </div>
    </SolutionLayout>
  );
};
