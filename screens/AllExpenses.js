import { useContext } from "react";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      periodName="Total"
      expenses={expensesCtx.expenses}
      fallbackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;
