import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return <ExpenseItem {...itemData.item} />;
}
function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
