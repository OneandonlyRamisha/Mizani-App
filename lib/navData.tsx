import CalendarScreen from "../screens/mainScreens/calendarScreen";
import DashboardScreen from "../screens/mainScreens/dashboardScreen";
import MilestoneScreen from "../screens/mainScreens/milestoneScreen";
import StatsScreen from "../screens/mainScreens/statsScreen";
import { TouchableOpacity, View } from "react-native";
import { GLOBAL_STYLES } from "./globalStyles";
import { AntDesign } from "@expo/vector-icons";

export const NAV_DATA = [
  {
    name: "Dashboard",
    component: DashboardScreen,
    options: {
      tabBarIcon: ({ color }: { color: string }) => (
        <AntDesign name="home" size={24} color={color} />
      ),
    },
  },
  {
    name: "Stats",
    component: StatsScreen,
    options: {
      tabBarIcon: ({ color }: { color: string }) => (
        <AntDesign name="barschart" size={24} color={color} />
      ),
    },
  },
  {
    name: "Milestones",
    component: MilestoneScreen,
    options: {
      tabBarIcon: ({ color }: { color: string }) => (
        <AntDesign name="staro" size={24} color={color} />
      ),
    },
  },
  {
    name: "Calendar",
    component: CalendarScreen,
    options: {
      tabBarIcon: ({ color }: { color: string }) => (
        <AntDesign name="calendar" size={24} color={color} />
      ),
    },
  },
];

export const SCREEN_OPTIONS = {
  headerTitle: () => null,
  headerBackground: () => (
    <View style={{ flex: 1, backgroundColor: GLOBAL_STYLES.bg }} />
  ),
  headerStatusBarHeight: 0,
  tabBarStyle: {
    height: 100,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarItemStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarLabel: () => null,

  tabBarButton: (props: any) => (
    <TouchableOpacity
      {...props}
      style={[
        props.style,
        {
          flex: 1,

          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    />
  ),
  tabBarBackground: () => (
    <View
      style={{
        flex: 1,
        backgroundColor: GLOBAL_STYLES.secondaryBg,
      }}
    />
  ),
  tabBarActiveTintColor: GLOBAL_STYLES.accentColor,
};
