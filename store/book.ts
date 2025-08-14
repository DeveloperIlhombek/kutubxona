import { getAllBooks } from '@/lib/books/book'
import { IBook } from '@/types/book_type'
import { create } from 'zustand'

// Kitob kategoriyalari
export const BOOK_CATEGORIES = {
	literature: 1,
	monographs: 2,
	dissertation: 3,
	article: 4,
} as const

// Store uchun typelar
interface BookState {
	books: IBook[]
	loading: boolean
	error: string | null
	pageNumber: number
	pageSize: number
	totalCount: number
	totalPages: number
	currentCategory: number
	pageSizeOptions: number[]
	fetchBooks: (
		category: number,
		pageNumber?: number,
		pageSize?: number
	) => Promise<void>
	setCategory: (category: number) => void
	nextPage: () => void
	prevPage: () => void
	setPage: (page: number) => void
	setPageSize: (size: number) => void
}

// Asosiy store
export const useBookStore = create<BookState>((set, get) => ({
	books: [],
	loading: false,
	error: null,
	pageNumber: 0,
	pageSize: 10,
	totalCount: 0,
	totalPages: 0,
	pageSizeOptions: [10, 20, 50, 100],
	currentCategory: BOOK_CATEGORIES.literature,

	// Kitoblarni yuklash funksiyasi
	fetchBooks: async (category, pageNumber = 0, pageSize = 10) => {
		set({ loading: true, error: null })
		try {
			const response = await getAllBooks({
				category,
				pageNumber,
				pageSize,
			})

			if (response) {
				set({
					books: response.result.items,
					totalCount: response.result.totalCount,
					totalPages: response.result.totalPages,
					pageNumber,
					pageSize,
					currentCategory: category,
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

	// Kategoriyani o'zgartirish
	setCategory: category => {
		set({ currentCategory: category })
		get().fetchBooks(category)
	},

	// Keyingi sahifaga o'tish
	nextPage: () => {
		const { pageNumber, totalPages, currentCategory, pageSize } = get()
		if (pageNumber < totalPages) {
			const nextPage = pageNumber + 1
			set({ pageNumber: nextPage })
			get().fetchBooks(currentCategory, nextPage, pageSize)
		}
	},

	// Oldingi sahifaga qaytish
	prevPage: () => {
		const { pageNumber, currentCategory, pageSize } = get()
		if (pageNumber > 1) {
			const prevPage = pageNumber - 1
			set({ pageNumber: prevPage })
			get().fetchBooks(currentCategory, prevPage, pageSize)
		}
	},
	// Sahifani o'rnatish
	setPage: page => {
		set({ pageNumber: page })
	},
	// Sahifa hajmini o'zgartirish
	setPageSize: size => {
		set({ pageSize: size, pageNumber: 1 }) // Sahifa hajmi o'zgarganda 1-sahifaga qaytamiz
		get().fetchBooks(get().currentCategory, 1, size)
	},
}))
