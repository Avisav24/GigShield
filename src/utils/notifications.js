const subscribers = new Set();

export function subscribeNotifications(callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

export function pushNotification(notification) {
  const payload = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type: notification?.type || "info",
    title: notification?.title || "Update",
    message: notification?.message || "",
    createdAt: new Date().toISOString(),
  };

  subscribers.forEach((callback) => callback(payload));
}
