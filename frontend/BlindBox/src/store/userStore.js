import { create } from 'zustand';
import { persist } from 'zustand/middleware';




export const useUserStore = create(
    persist(
        (set,get) => ({
            userInfo: null,
            setUserInfo: (user) => {
                const prev = get().userInfo || {};
                set({ userInfo: { ...prev,...user } });
            },
            clearUserInfo: () => set({ userInfo: null }),
        }),
        {
            name: 'user-storage', // 存储在 localStorage 中的 key
        }
    )
);
