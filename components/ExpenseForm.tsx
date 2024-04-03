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
    amount: '',
    date: '',
    name: '',
    description: '',
  });

  useEffect(() => {
    if (props.expenseData) {
      setInputs({
        amount: props.expenseData.amount.toString(),
        date: formatDate(props.expenseData.date),
        name: props.expenseData.name,
        description: props.expenseData.description || '',
      });
    }
  }, []);

  const submitHandler = () => {
    if (props.mode === 'edit' && !props.expenseData) return;
    
    const expense: IExpense = {
      id: props.mode === 'new' ? Date.now().toString() : props.expenseData.id,
      name: inputs.name,
      amount: parseFloat(inputs.amount),
      date: new Date(inputs.date),
      description: inputs.description
    }
    props.onSubmit(expense)
  };

  const inputChangeHandler = (type: string, value: string) => {
    setInputs((oldValue) => ({ ...oldValue, [type]: value }));
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const buttonTitle = props.mode === 'edit' ? 'Save' : 'Add';

  return (
    <View style={styles.container}>
      <Input
        inputProps={{ value: inputs.name }}
        label='Name'
        onChange={inputChangeHandler.bind(this, 'name')}
      />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Input
          label='Amount'
          containerStyle={{ flex: 1 }}
          inputProps={{
            keyboardType: 'decimal-pad',
            placeholder: '99.99',
            value: inputs.amount,
          }}
          onChange={inputChangeHandler.bind(this, 'amount')}
        />
        <Input
          label='Date'
          containerStyle={{ flex: 1 }}
          inputProps={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            value: inputs.date,
          }}
          onChange={inputChangeHandler.bind(this, 'date')}
        />
      </View>
      <Input
        label='Description'
        inputProps={{
          multiline: true,
          value: inputs.description,
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
