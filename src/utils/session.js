import { persistWorkerState } from "./persistence";

const sessionStorageKey = "gigshieldSession";

export function saveSession(sessionData) {
  const enriched = {
    role: sessionData?.role || "worker",
    authToken: sessionData?.authToken || "",
    ...sessionData,
  };

  persistWorkerState(sessionStorageKey, enriched, () => {
    localStorage.setItem(sessionStorageKey, JSON.stringify(enriched));
  });
}

export function getSession() {
  const rawSession = localStorage.getItem(sessionStorageKey);
  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession);
  } catch {
    return null;
  }
}

export function isSessionActive() {
  const session = getSession();
  return Boolean(session?.isAuthenticated);
}

export function clearSession() {
  localStorage.removeItem(sessionStorageKey);
}

export function getSessionRole() {
  return getSession()?.role || "worker";
}

export function hasRole(requiredRole) {
  const role = getSessionRole();
  if (requiredRole === "admin") {
    return role === "admin";
  }

  return true;
}

export function getAuthToken() {
  return getSession()?.authToken || "";
}
