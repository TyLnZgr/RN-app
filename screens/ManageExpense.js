import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

function ManageExpense({ route, navigation }) {
  const expenseCTX = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
  const deleteExpense = () => {
    expenseCTX.deleteExpense(editedExpenseId);
    navigation.goBack();
  };
  const cancelHandle = () => {
    navigation.goBack();
  };
  const confirmHandle = () => {
    if (isEditing) {
      expenseCTX.updateExpense(editedExpenseId, {
        desc: "adasd",
        amount: 22.22,
        date: new Date("2022-05-20"),
      });
    } else {
      expenseCTX.addExpense({
        desc: "adasd",
        amount: 22.22,
        date: new Date("2022-05-20"),
      });
    }
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={cancelHandle} style={styles.button}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandle}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
