import axios from 'axios';
import { IExpense } from '../types';

const BASE_URL =
  '';
const DB_NAME = '';

export const fetchAllExpenses = async (): Promise<{
  isError: Boolean;
  expenses: IExpense[] | null;
}> => {
  try {
    console.log('Fetching expenses');
    const response = await axios.get(BASE_URL + '/' + DB_NAME);
    const expenses = [] as IExpense[];
    for (let key in response.data) {
      expenses.push({
        id: key,
        name: response.data[key].name,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description,
      });
    }
    return { isError: false, expenses: expenses };
  } catch (error) {
    console.error(error);
    return { isError: true, expenses: null };
  }
};

export const postNewExpense = async (
  expense: IExpense
): Promise<{
  isError: Boolean;
  id: string | null;
}> => {
  try {
    const payload = { ...expense, id: null };
    const response = await axios.post(BASE_URL + '/' + DB_NAME, payload);
    if (response.status !== 200) throw new Error(response.data || response.statusText)
    return { isError: false, id: response.data.name };
  } catch (error) {
    console.error(error);
    return { isError: true, id: null };
  }
};

export const modifyExistingExpense = async (
  id: string,
  expenseData: IExpense
): Promise<{ isError: boolean; data: any }> => {
  try {
    const payload = { ...expenseData, id: null };
    const response = await axios.put(
      BASE_URL + '/rn-expenses/' + id + '.json',
      payload
    );
    return { isError: false, data: response.data };
  } catch (error) {
    console.error(error);
    return { isError: true, data: null };
  }
};

export const deleteExpense = async (
  id: string
): Promise<{ isError: boolean; data: any }> => {
  try {
    const response = await axios.delete(BASE_URL + '/rn-expenses/' + id + '.json');
    return { isError: false, data: response.data };
  } catch (error) {
    console.error(error);
    return { isError: true, data: null };
  }
};
