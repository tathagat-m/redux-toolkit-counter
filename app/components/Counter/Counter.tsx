"use client";

/* Core */
import { useState } from "react";

/* Instruments */
import { useSelector, selectCount, useDispatch, decrement, increment, incrementByAmount, incrementIfOddAsync } from "@/lib/redux";
import styles from "./counter.module.css";

export const Counter = (): JSX.Element => {
  const count: number = useSelector(selectCount);
  
  //initialize dispatch
  const dispatch = useDispatch();

  // Create a state named incrementAmount
  const [incrementAmount, setIncrementAmount] = useState<number>(0);

  //Function to handle incrementAmount change
  // @param event - The event object for the change event
  // @returns void
  const handleIncrementAmountChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = event.target.value;
    //check for number
    if (isNaN(Number(value))) {
      return;
    }
    setIncrementAmount(Number(event.target.value));
  }

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => {
            // dispatch event to decrease count by 1
            dispatch(decrement());
          }}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => {
            // dispatch event to increment count by 1
            dispatch(increment());
          }}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input className={styles.textbox} value={incrementAmount} onChange={handleIncrementAmountChange} aria-label="Set increment amount" />
        <button
          className={styles.button}
          onClick={() => {
            // dispatch event to add incrementAmount to count
            dispatch(incrementByAmount(incrementAmount));
            //Resetting Increment Amount
            setIncrementAmount(0);
          }}
        >
          Add Amount
        </button>
        <button
          className={styles.button}
          onClick={async () => {
            // dispatch event to add incrementAmount only if count is odd
            await dispatch(incrementIfOddAsync(incrementAmount));
            if(incrementAmount % 2 === 0) {
              alert("Amount Entered is not Odd");
            }
            setIncrementAmount(0);
          }}
        >
          Add If Odd
        </button>
      </div>
    </div>
  );
};
