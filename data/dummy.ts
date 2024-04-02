import { IExpense } from '../types'

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    name: 'Apple Macbook',
    date: new Date('2020-12-1'),
    amount: 92000,
    description: 'One of the best investment you can have.'
  },
  {
    id: 'e2',
    name: 'Apple iPhone 15',
    date: new Date('2023-09-23'),
    amount: 79000,
    description: 'Best phone I ever owned'
  },
  {
    id: 'e3',
    name: 'A pair of shoes',
    date: new Date('2024-03-1'),
    amount: 3000,
    description: 'A necessary thing to own'
  },
  {
    id: 'e4',
    name: 'Cloths from Decathlon',
    date: new Date('2024-03-10'),
    amount: 3000,
    description: 'A necessary thing to own'
  },
  {
    id: 'e5',
    name: 'Dinner at BBQ',
    date: new Date('2024-04-01'),
    amount: 5000,
    description: 'Really good BBQ meal'
  },
  {
    id: 'e6',
    name: 'Brunch at Mapro Garden',
    date: new Date('2024-04-02'),
    amount: 1500,
    description: 'One of the best sandwich you can eat'
  },
  {
    id: 'e7',
    name: 'Laptop repairing',
    date: new Date('2024-03-31'),
    amount: 1200,
    description: 'DC power adapter replacement'
  },
  {
    id: 'e8',
    name: 'Grocery shopping',
    date: new Date('2024-03-29'),
    amount: 600,
    description: 'Face wash and moisture riser cream'
  },
  {
    id: 'e9',
    name: 'Fuel',
    date: new Date('2024-03-27'),
    amount: 2000,
    description: 'Fuel expenses for car and scooter'
  },
  {
    id: 'e10',
    name: 'Milk',
    date: new Date('2024-04-02'),
    amount: 72,
    description: 'Milk for coffee'
  },
] as IExpense[]

export default DUMMY_EXPENSES