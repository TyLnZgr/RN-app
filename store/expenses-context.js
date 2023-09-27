import { createContext, useReducer } from "react";
const initialState = [
  {
    id: "e1",
    desc: "A pair of shooes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    desc: "Laptop",
    amount: 220.0,
    date: new Date("2021-2-19"),
  },
  {
    id: "e3",
    desc: "Computer",
    amount: 3.99,
    date: new Date("2021-4-19"),
  },
  {
    id: "e4",
    desc: "A book",
    amount: 22.19,
    date: new Date("2021-12-01"),
  },
  {
    id: "e5",
    desc: "A book",
    amount: 22.19,
    date: new Date("2021-12-01"),
  },
  {
    id: "e6",
    desc: "A book",
    amount: 22.19,
    date: new Date("2021-12-01"),
  },
  {
    id: "e7",
    desc: "A book",
    amount: 22.19,
    date: new Date("2021-12-01"),
  },
  {
    id: "e8",
    desc: "A book",
    amount: 22.19,
    date: new Date("2021-12-01"),
  },
];
export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ desc, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { desc, amount, date }) => {},
});
const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};
const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, initialState);
  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  };
  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
