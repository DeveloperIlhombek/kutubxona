// store/auth.ts
import { create } from 'zustand'

interface AuthState {
	user: {
		firstName: string
		lastName: string
	} | null
	token: string | null
	login: (
		userData: { firstName: string; lastName: string },
		token: string
	) => void
	logout: () => void
}

export const useAuthStore = create<AuthState>(set => ({
	user: null,
	token: null,
	login: (userData, token) => set({ user: userData, token }),
	logout: () => set({ user: null, token: null }),
}))
