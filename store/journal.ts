import {
	createJournal,
	deleteJournal,
	getJournal,
	getJournalById,
	updateJournal,
} from '@/lib/journal/journal'
import { IJournal } from '@/types/journals-type'
import { toast } from 'sonner'
import { create } from 'zustand'

interface IJournalState {
	journal: IJournal[]
	currentjournal: IJournal | null
	loading: boolean
	error: string | null
	pageNumber: number
	pageSize: number
	totalCount: number
	totalPages: number
	fetchJournals: (pageNumber: number, pageSize: number) => Promise<void>
	fetchJournalId: (id: string) => Promise<void>
	createJournal: (data: object) => Promise<boolean>
	updateJournal: (id: string, data: Partial<IJournal>) => Promise<boolean>
	deletejournal: (id: string) => Promise<boolean>
	setPageNumber: (page: number) => void
	setPageSize: (size: number) => void
}

export const useJournalStore = create<IJournalState>((set, get) => ({
	journal: [],
	currentjournal: null,
	loading: false,
	error: null,
	pageNumber: 0,
	pageSize: 10,
	totalCount: 0,
	totalPages: 0,

	// Fetch all Journals items with pagination
	fetchJournals: async (pageNumber = 0, pageSize = 10) => {
		set({ loading: true, error: null })
		try {
			const response = await getJournal({ pageNumber, pageSize })
			if (response) {
				set({
					journal: response.result.items,
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

	// Fetch single Journals by ID
	fetchJournalId: async (id: string) => {
		set({ loading: true, error: null })
		try {
			const response = await getJournalById(id)
			if (response) {
				set({
					currentjournal: response.result,
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

	// Create new Journals
	createJournal: async (data: object) => {
		set({ loading: true, error: null })
		try {
			const response = await createJournal(data)
			if (response?.isSuccess) {
				await get().fetchJournals(get().pageNumber, get().pageSize)
				return true
			}
			return false
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Noma'lum xatolik"
			set({ error: errorMessage, loading: false })
			toast.error(errorMessage)
			return false
		} finally {
			set({ loading: false })
		}
	},

	// Update existing Journals
	updateJournal: async (id, data) => {
		set({ loading: true, error: null })
		try {
			const response = await updateJournal(id, data)
			if (response?.isSuccess) {
				// Yangilangan ma'lumotlarni qayta fetch qilish
				await get().fetchJournalId(id)
				await get().fetchJournals(get().pageNumber, get().pageSize)
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

	// Delete Journals
	deletejournal: async id => {
		set({ loading: true, error: null })
		try {
			const response = await deleteJournal(id)
			if (response?.isSuccess) {
				await get().fetchJournals(get().pageNumber, get().pageSize)
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
