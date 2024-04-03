import { StyleSheet, View } from 'react-native';
import COLORS from '../styles/colors';
import Input from './Input';
import { useEffect, useState } from 'react';
import { IExpense } from '../types';
import GenericButton from './GenericButton';

interface IProps {
  expenseData?: IExpense | null;
  mode: 'edit' | 'new';
  onSubmit: (data: IExpense) => void;
  onCancel: () => void;
}

const ExpenseForm = (props: IProps) => {
  const [inputs, setInputs] = useState({
    amount: { value: '', isValid: true },
    date: { value: '', isValid: true },
    name: { value: '', isValid: true },
    description: { value: '', isValid: true },
  });

  useEffect(() => {
    if (props.expenseData) {
      setInputs({
        amount: { value: props.expenseData.amount.toString(), isValid: true },
        date: { value: formatDate(props.expenseData.date), isValid: true },
        name: { value: props.expenseData.name, isValid: true },
        description: {
          value: props.expenseData.description || '',
          isValid: true,
        },
      });
    }
  }, []);

  const submitHandler = () => {
    if (props.mode === 'edit' && !props.expenseData) return;

    const isNameValid = inputs.name.value.trim().length > 0;
    const isAmountValid = parseFloat(inputs.amount.value) > 0;
    const isDateValid =
      new Date(inputs.date.value).toString() !== 'Invalid Date';
    
    if (!isNameValid) {
      setInputs((oldState) => ({
        ...oldState,
        name: { value: oldState.name.value, isValid: false },
      }));
    }

    if (!isAmountValid) {
      setInputs((oldState) => ({
        ...oldState,
        amount: { value: oldState.amount.value, isValid: false },
      }));
    }

    if (!isDateValid) {
      setInputs((oldState) => ({
        ...oldState,
        date: { value: oldState.date.value, isValid: false },
      }));
    }

    if (!(isNameValid && isAmountValid && isDateValid)) return;

    const expense: IExpense = {
      id:
        props.mode === 'new'
          ? Date.now().toString()
          : props?.expenseData?.id || '',
      name: inputs.name.value,
      amount: parseFloat(inputs.amount.value),
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    props.onSubmit(expense);
  };

  const inputChangeHandler = (
    type: 'amount' | 'name' | 'description' | 'date',
    value: string
  ) => {
    setInputs((oldState) => {
      const modifiedInput = oldState[type];
      modifiedInput.value = value;
      modifiedInput.isValid = true;
      return {
        ...oldState,
        modifiedInput,
      };
    });
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const buttonTitle = props.mode === 'edit' ? 'Save' : 'Add';

  return (
    <View style={styles.container}>
      <Input
        inputProps={{ value: inputs.name.value }}
        label='Name'
        isValid={inputs.name.isValid}
        onChange={inputChangeHandler.bind(this, 'name')}
      />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Input
          label='Amount'
          isValid={inputs.amount.isValid}
          containerStyle={{ flex: 1 }}
          inputProps={{
            keyboardType: 'decimal-pad',
            placeholder: '99.99',
            value: inputs.amount.value,
          }}
          onChange={inputChangeHandler.bind(this, 'amount')}
        />
        <Input
          label='Date'
          isValid={inputs.date.isValid}
          containerStyle={{ flex: 1 }}
          inputProps={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            value: inputs.date.value,
          }}
          onChange={inputChangeHandler.bind(this, 'date')}
        />
      </View>
      <Input
        label='Description'
        isValid={inputs.description.isValid}
        inputProps={{
          multiline: true,
          value: inputs.description.value,
        }}
        inputStyle={{
          textAlignVertical: 'top',
          minHeight: 80,
          paddingTop: 10,
          paddingBottom: 10,
        }}
        onChange={inputChangeHandler.bind(this, 'description')}
      />
      <View style={styles.buttonsWrapper}>
        <GenericButton
          style={{ flex: 1 }}
          onPress={props.onCancel}
          title='Cancel'
          type='outlined'
        />
        <GenericButton
          style={{ flex: 1 }}
          onPress={submitHandler}
          title={buttonTitle}
          type='primary'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  label: {
    color: COLORS.text500,
    fontSize: 12,
  },
  input: {
    backgroundColor: COLORS.bg300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: COLORS.text700,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 40,
  },
});

export default ExpenseForm;
