import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavorites = create(
  persist(
    (set, get) => ({
      items: ({}),
      toggle: (photo) => {
        const items = { ...get().items };
        if (items[photo.id]) {
          delete items[photo.id];
        } else {
          items[photo.id] = photo;
        }
        set({ items });
      },
      clear: () => set({ items: {} }),
    }),
    { name: "pinterest-clone-favorites" }
  )
);
