import React, { useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useTransactions } from "../contexts/TransactionContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/interfaces/Navigation";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  const { transactions, balance, setTransactions, setBalance } =
    useTransactions();

  useEffect(() => {
    const removeValue = async () => {
      try {
        await AsyncStorage.removeItem("transactions");
        await AsyncStorage.removeItem("balance");
        await AsyncStorage.removeItem("beneficiaries");
      } catch (e) {
        // remove error
      }
    };
    // removeValue();

    const getData = async () => {
      const jsonTransactions = await AsyncStorage.getItem("transactions");
      const transactionsStorage =
        jsonTransactions != null ? JSON.parse(jsonTransactions) : null;
      setTransactions(transactionsStorage ?? transactions);

      const getBalanceFromStorage = await AsyncStorage.getItem("balance");
      const balanceStorage =
        getBalanceFromStorage != null
          ? parseFloat(getBalanceFromStorage)
          : 1000;
      setBalance(balanceStorage);
    };
    getData();
  }, []);

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Transaction ID: {item.id.toString()}</Text>
      <Text style={styles.itemText}>Amount: ${item.amount.toFixed(2)}</Text>
      {item.beneficiary && (
        <>
          <Text style={styles.itemText}>
            To: {item.beneficiary.lastname + " " + item.beneficiary.firstname}
          </Text>
          <Text style={styles.itemText}>IBAN: {item.beneficiary.iban}</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>
        Current Balance: ${balance.toFixed(2)}
      </Text>
      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate("TransactionScreen")}
      />
      <Button
        title="Add Beneficiary"
        onPress={() => navigation.navigate("BeneficiaryScreen")}
      />
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
    width: "100%",
  },
});

export default HomeScreen;
