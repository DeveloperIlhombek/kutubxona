/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBookResult {
	items: IBook[]
	pageNumber: number
	pageSize: number
	totalCount: number
	totalPages: number
}

export interface IBook {
	id: string
	unilibId: string | null
	book_Price: number
	book_Copy_Count: number
	isbn: string
	udk: string
	title: string
	description: string
	publisher: string
	publish_Date: number
	page_Count: number
	openness: string | null
	coverImageId: string
	book_fileId: string
	category: number
	contentTypeId: string
	languageId: string
	countryId: string
	fieldId: string
	journalId: string | null
	createdBy: string
	createdAt: string
	lastUpdatedBy: string
	lastUpdatedAt: string
	bookCards: any[]
	bookTags: any[]
	bookAuthors: any[]
	contentType: any | null
	country: any | null
	language: any | null
	journal: any | null
	field: any | null
	coverImage: ICoverImage
	book_File: IBookFile
}

export interface ICoverImage {
	id: string
	size: number
	mimeType: string
	extension: string
	filename: string
	updatedAt: string
	createdAt: string
	fileUrl: string
	originFileUrl: string
}

export interface IBookFile {
	id: string
	size: number
	mimeType: string
	extension: string
	filename: string
	updatedAt: string
	createdAt: string
	fileUrl: string
	originFileUrl: string
	journal?: null
	news?: null
	post?: null
	user?: null
}
