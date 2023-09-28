import axios from "axios";
const URL = "https://react-native-app-de60c-default-rtdb.firebaseio.com";
export async function storeExpense(expenseData) {
  const response = await axios.post(URL + "/expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export async function getExpenses() {
  const response = await axios.get(URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(URL + `/expenses/${id}.json`, expenseData);
}

export function deletedExpense(id) {
  return axios.delete(URL + `/expenses/${id}.json`);
}
