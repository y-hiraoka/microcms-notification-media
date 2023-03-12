import { useCallback, useEffect, useState } from "react";
import { requestNotificationPermission } from "@/firebase";

export function useNotification() {
  const [permission, setPermission] = useState<
    NotificationPermission | "not-supported"
  >("default");

  const revalidate = useCallback(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    } else {
      setPermission("not-supported");
    }
  }, []);

  // SSR 時に Notification を参照するのを回避するための useEffect
  useEffect(() => {
    revalidate();
  }, [revalidate]);

  const [isRequesting, setIsRequesting] = useState(false);

  const requestPermission = useCallback(() => {
    setIsRequesting(true);
    requestNotificationPermission()
      .then(() => revalidate())
      .finally(() => setIsRequesting(false));
  }, [revalidate]);

  return { permission, requestPermission, isRequesting };
}
