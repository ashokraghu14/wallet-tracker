export default function validateWallets(values){
  let errors = {};
  if (!values.date) {
    errors.date = "Date is required";
  }
  if (!values.description) {
    errors.description = "description is required";
  }
  if (!values.income) {
    errors.income = "Income is required";
  }
  if (!values.amount) {
    errors.amount = "amount is required";
  }
  return errors;
}
