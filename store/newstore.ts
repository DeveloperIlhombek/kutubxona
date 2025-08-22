// store/newsStore.ts
import { getNews } from '@/lib/news_post'
import { INews } from '@/types/news-types'
import { create } from 'zustand'

interface INewsState {
	news: INews[]
	//currentNews: INews | null
	loading: boolean
	error: string | null
	pageNumber: number
	pageSize: number
	totalCount: number
	totalPages: number
	fetchNews: (pageNumber: number, pageSize: number) => Promise<void>
	setPageNumber: (page: number) => void
	setPageSize: (size: number) => void
	//setCurrentNews: (news: INews | null) => void
}

export const useNewsStore = create<INewsState>((set, get) => ({
	news: [],
	currentNews: null,
	loading: false,
	error: null,
	pageNumber: 0,
	pageSize: 10,
	totalCount: 0,
	totalPages: 0,

	fetchNews: async (pageNumber: number, pageSize: number) => {
		set({ loading: true, error: null })

		try {
			const response = await getNews({ pageNumber, pageSize })
			if (response) {
				set({
					news: response.result.items,
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

	setPageNumber: (page: number) => {
		set({ pageNumber: page })
	},

	setPageSize: (size: number) => {
		set({ pageSize: size })
	},

	// setCurrentNews: (news: INews | null) => {
	// 	set({ currentNews: news })
	// },
}))
