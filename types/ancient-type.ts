import { IBookFile } from './book_type'

export interface AncientItem {
	id: string
	work_name: string
	arab_name: string
	ancientCategoryId: string
	author: string
	calligrapher: string
	subject: string
	language: string
	date_write: string
	status: string
	size: string
	place_saved: string
	description: string
	inventor_id: string
	coverImageId: string | null
	coverImage: string | null
	book_File: IBookFile
}

export interface AncientResult {
	items: AncientItem[]
	pageNumber: number
	pageSize: number
	totalCount: number
	totalPages: number
}

export interface AncientResponse {
	isSuccess: boolean
	result: AncientResult
	statusCode: number
	errorMessages: string[]
}
