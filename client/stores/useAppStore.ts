import create from "zustand";

interface AppStore {
	isLoginModalOpen: boolean;
	isRegisterModalOpen: boolean;
	
	toggleLoginModal: () => void;
	toggleRegisterModal: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
	isLoginModalOpen: false,
	isRegisterModalOpen: false,
	toggleLoginModal: () => set({ isLoginModalOpen: !get().isLoginModalOpen }),
	toggleRegisterModal: () => set({ isRegisterModalOpen: !get().isRegisterModalOpen }),
}));
