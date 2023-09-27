//Components
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
//React Native Components
import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpensesOutput({ expenses, periodName, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText} </Text>;
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={periodName} expenses={expenses} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 19,
    textAlign: "center",
    marginTop: 32,
  },
});
