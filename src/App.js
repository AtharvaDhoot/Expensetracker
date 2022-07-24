import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [records, setRecords] = useState([]);

  const [recordType, setRecordType] = useState("expense");
  const [moneyDesc, setMoneyDesc] = useState("");
  const [amount, setAmount] = useState();

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let incomeSum = 0;
    let expenseSum = 0;
    for (let i = 0; i < records.length; i++) {
      const element = records[i];
      if (element.recordType === "expense") expenseSum += element.amount;
      if (element.recordType === "income") incomeSum += element.amount;
    }

    setTotalExpense(expenseSum);
    setTotalIncome(incomeSum);
    setBalance(incomeSum - expenseSum);
  }, [records]);

  const handleAddRecord = (e) => {
    e.preventDefault();
    console.log(moneyDesc, amount, recordType);

    if (amount <= 0) {
      setAmount("");
      setMoneyDesc("");
      return alert("Enter valid amount!");
    }

    const recordObj = {
      amount,
      desc: moneyDesc,
      recordType,
    };

    setRecords([...records, recordObj]);

    setAmount("");
    setMoneyDesc("");
  };

  return (
    <div className="container">
      <div className="header">
        Money <span className="text-orange">Manager</span>{" "}
      </div>
      <div className="budget-header">
        Balance: <span id="budget-text">{balance}</span>
      </div>
      <div className="total-income-expense">
        <div className="income-text-div">
          <p>Income</p>
          <p id="total-income-text">{totalIncome}</p>
        </div>
        <div className="expense-text-div">
          <p>Expense</p>
          <p id="total-expense-text">{totalExpense}</p>
        </div>
      </div>
      <form className="form" action="#" onSubmit={handleAddRecord}>
        <div className="money-type">
          <label htmlFor="radio-expense">
            <input
              type="radio"
              name="money-type-radio"
              id="radio-expense"
              checked={recordType === "expense"}
              onChange={(e) => setRecordType(e.target.value)}
              value="expense"
            />
            Expense
          </label>
          <label htmlFor="radio-income">
            <input
              type="radio"
              name="money-type-radio"
              id="radio-income"
              value="income"
              checked={recordType === "income"}
              onChange={(e) => setRecordType(e.target.value)}
            />
            Income
          </label>
        </div>
        <input
          type="text"
          placeholder="Description"
          name="money-desc-text"
          id="money-desc-text"
          value={moneyDesc}
          onChange={(e) => setMoneyDesc(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          name="amount"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        <input
          type="submit"
          name="submit-record"
          id="add-money-record"
          value="Add"
        />{" "}
        <input
          type="reset"
          name="reset-record"
          id="reset-money-record"
          value="Reset"
        />
      </form>

      <div className="records-container">
        <div className="income-records-list-parent">
          <p className="heading">Incomes</p>
          <ul className="income-records-list">
            {records.length
              ? records
                  .filter((recordObj) => recordObj.recordType === "income")
                  .map((recordObj, index) => (
                    <li className="record-card" key={index}>
                      <span id="record-card-desc">{recordObj.desc}</span>
                      <span id="record-card-amount">{recordObj.amount}</span>
                    </li>
                  ))
              : ""}
          </ul>
        </div>

        <div className="expense-records-list-parent">
          <p className="heading">Expenses</p>
          <ul className="expense-records-list">
            {records.length
              ? records
                  .filter((recordObj) => recordObj.recordType === "expense")
                  .map((recordObj, index) => (
                    <li className="record-card" key={index}>
                      <span id="record-card-desc">{recordObj.desc}</span>
                      <span id="record-card-amount">{recordObj.amount}</span>
                    </li>
                  ))
              : ""}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
