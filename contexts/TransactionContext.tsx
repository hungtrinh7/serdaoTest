import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
} from "react";
import { storeData, storeDataObject } from "../lib/async-storage";

type TransactionContextInterface = {
  transactions: Transaction[];
  addTransaction: (amount: string, beneficiary: Beneficiary) => void;
  balance: Number;
  setTransactions: (value: Array<Transaction>) => void;
  setBalance: (value: number) => void;
};

const TransactionContext = createContext<TransactionContextInterface>({
  transactions: [],
  addTransaction: () => {},
  balance: 1000,
  setTransactions: () => {},
  setBalance: () => {},
});

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }: PropsWithChildren) => {
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const [balance, setBalance] = useState(1000);

  const addTransaction = (amount: string, beneficiary: Beneficiary) => {
    const amountFloat = parseFloat(amount);

    if (balance < amountFloat) {
      alert(`You don't have enough money!`);
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      dateCreated: new Date(),
      amount: amountFloat,
      beneficiary,
    };

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);

    setBalance((prevBalance) => {
      const newBalance = prevBalance - amountFloat;
      storeData(newBalance.toString(), "balance");

      return prevBalance - amountFloat;
    });
  };

  useEffect(() => {
    storeDataObject(transactions, "transactions");
  }, [transactions]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        balance,
        setTransactions,
        setBalance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
