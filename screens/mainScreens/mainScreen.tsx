import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NAV_DATA, SCREEN_OPTIONS } from "../../lib/navData";
import { useEffect } from "react";
import {
  registerForPushNotifications,
  scheduleDailyNotifications,
} from "../../lib/notifications";

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  useEffect(() => {
    const configureNotifications = async () => {
      try {
        await registerForPushNotifications();
        await scheduleDailyNotifications();
      } catch (error) {
        console.error("Failed to configure notifications:", error);
      }
    };

    void configureNotifications();
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
