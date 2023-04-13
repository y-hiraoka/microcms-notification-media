import { firebaseApp } from "@/firebase";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useCallback, useRef, useSyncExternalStore } from "react";

export function useFirestoreDocSubscription<Snapshot>(
  path: string,
  ...pathSegments: string[]
): Snapshot | undefined {
  const storeRef = useRef<Snapshot>();

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const firestore = getFirestore(firebaseApp);
      return onSnapshot(doc(firestore, path, ...pathSegments), (snapshot) => {
        storeRef.current = snapshot.data() as Snapshot;
        onStoreChange();
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [path, ...pathSegments]
  );

  return useSyncExternalStore<Snapshot | undefined>(
    subscribe,
    () => storeRef.current,
    () => undefined
  );
}
