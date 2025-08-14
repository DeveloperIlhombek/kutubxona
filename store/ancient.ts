import {
	createAncient,
	deleteAncient,
	getAncient,
	getAncientById,
	updateAncient,
} from '@/lib/ancient/ancient'
import { AncientItem } from '@/types/ancient-type'
import { create } from 'zustand'

interface IAncientState {
	ancient: AncientItem[]
	currentAncient: AncientItem | null
	loading: boolean
	error: string | null
	pageNumber: number
	pageSize: number
	totalCount: number
	totalPages: number
	fetchAncient: (pageNumber: number, pageSize: number) => Promise<void>
	fetchAncientById: (id: string) => Promise<void>
	createNewAncient: (data: Omit<AncientItem, 'id'>) => Promise<boolean>
	updateExistingAncient: (
		id: string,
		data: Partial<AncientItem>
	) => Promise<boolean>
	deleteExistingAncient: (id: string) => Promise<boolean>
	setPageNumber: (page: number) => void
	setPageSize: (size: number) => void
}

export const useAncientStore = create<IAncientState>((set, get) => ({
	ancient: [],
	currentAncient: null,
	loading: false,
	error: null,
	pageNumber: 0,
	pageSize: 10,
	totalCount: 0,
	totalPages: 0,

	// Fetch all ancient items with pagination
	fetchAncient: async (pageNumber = 0, pageSize = 10) => {
		set({ loading: true, error: null })
		try {
			const response = await getAncient({ pageNumber, pageSize })
			if (response) {
				set({
					ancient: response.result.items,
					totalCount: response.result.totalCount,
					totalPages: response.result.totalPages,
					pageNumber,
					pageSize,
					loading: false,
				})
			}
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Noma'lum xatolik",
				loading: false,
			})
		}
	},

	// Fetch single ancient by ID
	fetchAncientById: async (id: string) => {
		set({ loading: true, error: null })
		try {
			const response = await getAncientById(id)
			if (response) {
				set({
					currentAncient: response.result,
					loading: false,
				})
			}
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Noma'lum xatolik",
				loading: false,
			})
		}
	},

	// Create new ancient
	createNewAncient: async data => {
		set({ loading: true, error: null })
		try {
			const response = await createAncient(data)
			if (response?.isSuccess) {
				await get().fetchAncient(get().pageNumber, get().pageSize)
				return true
			}
			return false
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Noma'lum xatolik",
				loading: false,
			})
			return false
		} finally {
			set({ loading: false })
		}
	},

	// Update existing ancient
	updateExistingAncient: async (id, data) => {
		set({ loading: true, error: null })
		try {
			const response = await updateAncient(id, data)
			if (response?.isSuccess) {
				await get().fetchAncient(get().pageNumber, get().pageSize)
				return true
			}
			return false
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Noma'lum xatolik",
				loading: false,
			})
			return false
		} finally {
			set({ loading: false })
		}
	},

	// Delete ancient
	deleteExistingAncient: async id => {
		set({ loading: true, error: null })
		try {
			const response = await deleteAncient(id)
			if (response?.isSuccess) {
				await get().fetchAncient(get().pageNumber, get().pageSize)
				return true
			}
			return false
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Noma'lum xatolik",
				loading: false,
			})
			return false
		} finally {
			set({ loading: false })
		}
	},

	// Pagination controls
	setPageNumber: page => set({ pageNumber: page }),
	setPageSize: size => set({ pageSize: size }),
}))
