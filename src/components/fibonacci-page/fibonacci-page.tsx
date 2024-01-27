import React, {ChangeEvent, useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {delay} from "../../utils/utils";

export const FibonacciPage: React.FC = () => {
  const [numbers, setNumbers] = useState<number[] | null>([]);
  const [value, setValue] = useState<number>(0);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    !value ? setDisabled(true) : setDisabled(false);
  }, [value]);

  const calculateFib = (n: number, memo: Record<number, number>={}): number => {
    if (n in memo) {
      return memo[n];
    }
    if (n < 2) {
      return 1;
    }
    memo[n] = calculateFib(n-1, memo) + calculateFib(n-2, memo);
    return memo[n];
  }

  const createFibArray = async (n: number, func: Function) => {
    const array: number[] = [];

    for (let i= 0; i <= n; i++) {
      array.push(calculateFib(i));
      func([...array]);
      await delay(500);
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valueNumber = Number(e.target.value);
    if (valueNumber > 0 && valueNumber < 20) {
      setValue(valueNumber);
    } else {
      setDisabled(true)
    }
  }

  const onClick = async () => {
    setIsLoader(true);
    await createFibArray(value, setNumbers);
    setIsLoader(false);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.main}>
        <div className={styles.container}>
          <Input
              isLimitText={true}
              max={19}
              type ={'number'}
              onChange={onChange}
          />
          <div className={styles.box}>
            <Button
                text={'Рассчитать'}
                extraClass={styles.button}
                isLoader={isLoader}
                onClick={onClick}
                disabled={disabled}
            />
          </div>
        </div>
        <div className={styles.numbers}>
          {numbers?.map((number, index) => (
              <Circle
                  letter={String(number)}
                  key={index}
                  index={index}
              />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
