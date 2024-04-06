// ExpenseContext.tsx
import { createContext, useContext, useReducer, FC, ReactNode } from 'react';

import { IExpense } from '../types';

interface UserDetails {
  email: string;
  expiresIn: string | number;
  idToken: string;
  refreshToken: string;
}

interface State {
  expenses: IExpense[];
  userDetails: UserDetails | null;
}

type Action =
  | { type: 'ADD_EXPENSE'; payload: IExpense }
  | { type: 'REMOVE_EXPENSE'; payload: string }
  | { type: 'MODIFY_EXPENSE'; payload: IExpense }
  | { type: 'SET_EXPENSES'; payload: IExpense[] }
  | { type: 'SET_USER_DETAILS'; payload: UserDetails }
  | { type: 'LOG_OUT' };

const initialState: State = {
  expenses: [],
  userDetails: null,
};

const ExpenseContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const expenseReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case 'REMOVE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case 'MODIFY_EXPENSE':
      const oldStateExpenses = [...state.expenses];
      const index = oldStateExpenses.findIndex(
        (item) => item.id === action.payload.id
      );
      oldStateExpenses[index] = {
        ...oldStateExpenses[index],
        ...action.payload,
      };
      return {
        ...state,
        expenses: oldStateExpenses,
      };
    case 'SET_EXPENSES':
      return {
        ...state,
        expenses: action.payload,
      };
    case 'SET_USER_DETAILS':
      return {
        ...state,
        userDetails: action.payload,
      };
    case 'LOG_OUT':
      return {
        ...state,
        userDetails: null,
      };

    default:
      return state;
  }
};

interface IProps {
  children: ReactNode;
}

export const ExpenseProvider = (props: IProps) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);
