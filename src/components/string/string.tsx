import React, {ChangeEvent, useEffect, useState} from "react";
import styles from './string.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {reverseLettersFunction} from "../../utils/string";
import {TStringElement} from "../../types/string";

export const StringComponent: React.FC = () => {
    const [letters, setLetters] = useState<TStringElement[]>([]);
    const [value, setValue] = useState('');
    const [isLoader, setIsLoader] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => {
        !value ? setDisabled(true) : setDisabled(false);
    }, [value]);

    const splitWord = async (value: string) => {
        setIsLoader(true);
        await reverseLettersFunction(value, setLetters);
        setIsLoader(false);
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

  return (
    <SolutionLayout title="Строка">
        <div className={styles.main}>
            <div className={styles.container}>
                <Input
                    isLimitText={true}
                    maxLength={11}
                    type = {"text"}
                    onChange={onChange}
                    data-test="input-string"
                />
                <div className={styles.button}>
                    <Button
                        text={'Развернуть'}
                        onClick={() => splitWord(value)}
                        isLoader={isLoader}
                        disabled={disabled}
                        data-test="button-string"
                    />
                </div>
            </div>
            <div className={styles.letters}>
                {letters?.map((item, index) => (
                    <Circle
                        letter={String(item.item)}
                        key={index}
                        state={item.state}
                    />
                ))}
            </div>
        </div>
    </SolutionLayout>
  );
};
