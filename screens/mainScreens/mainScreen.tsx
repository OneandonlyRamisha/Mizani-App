import { View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NAV_DATA, SCREEN_OPTIONS } from "../../lib/navData";
import { GLOBAL_STYLES } from "../../lib/globalStyles";
import { useEffect } from "react";
import {
  registerForPushNotifications,
  scheduleDailyNotifications,
} from "../../lib/notifications";

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  useEffect(() => {
    // Notifications logic
    (async () => {
      await registerForPushNotifications();
      await scheduleDailyNotifications();
    })();
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={SCREEN_OPTIONS}>
        {NAV_DATA.map((data) => (
          <Tab.Screen
            key={data.name}
            name={data.name}
            component={data.component}
            options={data.options}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
