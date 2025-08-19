export interface IInstitutionResult {
	items: IInstitution[]
	pageNumber: number
	pageSize: number
	totalPages: number
	totalCount: number
}

export interface IInstitution {
	id: string
	name: string
}

// Journal types============

export interface IJournalResult {
	items: IJournal[]
	pageNumber: number
	pageSize: number
	totalPages: number
	totalCount: number
}
export interface IJournal {
	id: string
	name: string
	issn: string
	imageId: string
	image: IImagejournal
	fieldId: string
	journalTypeId: string
	countryId: string
	institutionId: string
	journalType: {
		id: string
		name: string
	}
	institution: {
		id: string
		name: string
	}
}

interface IImagejournal {
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
