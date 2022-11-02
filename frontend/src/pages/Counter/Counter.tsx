import React from 'react';
// import './App.css';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { StyledButton } from '../../styles/Counter/CounterStyle';
import { countActions } from '../../features/counter/counter-slice';

const Counter = () => {
  const dispatch = useAppDispatch();
  const clickNum = useAppSelector((state) => state.counter.clicks);

  const KLICK: number = 2;

  const onIncrement = (klick: number) => {
    dispatch(countActions.addCount(klick));
  };

  const onDecrement = (klick: number) => {
    dispatch(countActions.minusCount(klick));
  };

  const onFetchAdd = () => {
    dispatch(countActions.fetchAdd());
  };

  return (
    <div>
      <StyledButton onClick={() => onFetchAdd()}>Increment after 1 second</StyledButton>{' '}
      <StyledButton onClick={() => onIncrement(KLICK)}>+ Increment</StyledButton>{' '}
      <StyledButton onClick={() => onDecrement(KLICK)}>- Decrement</StyledButton>
      <hr />
      <div>Clicked: {clickNum} times</div>
    </div>
  );
};

export default Counter
