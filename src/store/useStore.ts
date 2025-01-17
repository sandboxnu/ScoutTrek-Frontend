import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import appStore, { AppStore } from './appStore';
import authStore, { AuthStore } from './authStore';
import eventStore, { EventStore } from './eventStore';

type Store = EventStore & AuthStore & AppStore;

export interface StoreSet {
  (
    partial:
      | Store
      | Partial<Store>
      | ((state: Store) => Store | Partial<Store>),
    replace?: boolean | undefined
  ): void;
}

export interface StoreGet {
  (): Store;
}

const useStore = create<Store>()(
  devtools(
    persist(
      (set, get) => ({
        ...eventStore(set, get),
        ...authStore(set, get),
        ...appStore(set, get),
      }),

      {
        name: 'ScoutTrek-Store',
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);

export default useStore;
