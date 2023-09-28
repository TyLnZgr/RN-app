import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function fetchExpenses() {
      setIsFetching(true);
      try {
        const expenses = await getExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch Expenses");
      }
      setIsFetching(false);
    }
    fetchExpenses();
  }, []);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date > date7daysAgo && expense.date <= today;
  });

  if (isFetching) {
    return <Loading />;
  }
  if (error && !isFetching) {
    return <Error message={error} />;
  }
  return (
    <ExpensesOutput
      periodName="Last 7 Days"
      expenses={recentExpenses}
      fallbackText="No Expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
