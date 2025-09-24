import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { CalendarTriggerInput } from "expo-notifications";

// Ask for permission
export async function registerForPushNotifications() {
  if (!Device.isDevice) return;

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    console.warn("Notification permission not granted");
    return;
  }
}

// Schedule both daily notifications
export async function scheduleDailyNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "⚔️ Rise and Conquer",
      body: "New day, new battles. Attack your habits!",
    },
    trigger: {
      hour: 8,
      minute: 0,
      repeats: true,
      type: "calendar",
    } as CalendarTriggerInput, // ✅ cast trigger
  });

  // Evening reminder if habits left
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "⏳ 3 Hour Left!",
      body: "You still have habits to complete today.",
    },
    trigger: {
      hour: 21,
      minute: 0,
      repeats: true,
      type: "calendar",
    } as CalendarTriggerInput, // ✅ cast trigger
  });
}
