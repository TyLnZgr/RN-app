import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deletedExpense } from "../util/http";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";

function ManageExpense({ route, navigation }) {
  const [isSubmmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState();
  const expenseCTX = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const selectedExpense = expenseCTX.expenses.find(
    (expense) => expense.id === editedExpenseId
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
  const deleteExpense = async () => {
    setIsSubmiting(true);
    try {
      await deletedExpense(editedExpenseId);
      expenseCTX.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("could not delete expense- please try again later");
      setIsSubmiting(false);
    }
  };
  const cancelHandle = () => {
    navigation.goBack();
  };
  const confirmHandle = async (expenseData) => {
    setIsSubmiting(true);
    try {
      if (isEditing) {
        expenseCTX.updateExpense(editedExpenseId, expenseData);
        updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseCTX.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("could not update data - please try again later");
      setIsSubmiting(false);
    }
  };
  if (isSubmmiting) {
    return <Loading />;
  }

  if (error && !isFetching) {
    return <Error message={error} />;
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandle}
        submitBtnLbl={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandle}
        editingValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpense}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
