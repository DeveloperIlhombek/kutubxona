// types/news.ts
export interface INewsImage {
	id: string
	size: number
	mimeType: string
	extension: string
	filename: string
	updatedAt: Date
	createdAt: Date
	fileUrl: string
	originFileUrl: string
}

export interface INews {
	id: string
	title: string
	coverImage: INewsImage
	coverImageId: string
	createdAt: Date
	createdBy: string
	updatedAt: Date
	updatedBy: string
}

export interface INewsResult {
	items: INews[]
	pageNumber: number
	pageSize: number
	totalCount: number
	totalPages: number
}
