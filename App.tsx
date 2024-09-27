import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/HomeScreen";
import Transaction from "./app/TransactionScreen";
import { TransactionProvider } from "./contexts/TransactionContext";
import Beneficiary from "./app/BeneficiaryScreen";
import { BeneficiaryProvider } from "./contexts/beneficiaryContext";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TransactionProvider>
      <BeneficiaryProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Transaction" component={Transaction} />
            <Stack.Screen name="Beneficiary" component={Beneficiary} />
          </Stack.Navigator>
        </NavigationContainer>
      </BeneficiaryProvider>
    </TransactionProvider>
  );
};

export default App;
