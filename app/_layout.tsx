import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import TransactionScreen from "./TransactionScreen";
import { TransactionProvider } from "../contexts/TransactionContext";
import BeneficiaryScreen from "./BeneficiaryScreen";

import { BeneficiaryProvider } from "@/contexts/beneficiaryContext";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <TransactionProvider>
      <BeneficiaryProvider>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            name="TransactionScreen"
            component={TransactionScreen}
          />
          <Stack.Screen
            name="BeneficiaryScreen"
            component={BeneficiaryScreen}
          />
        </Stack.Navigator>
      </BeneficiaryProvider>
    </TransactionProvider>
  );
}
