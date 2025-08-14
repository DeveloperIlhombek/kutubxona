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
	inventor_id: string
	coverImageId: string | null
	coverImage: string | null
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
