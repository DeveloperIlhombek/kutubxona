export interface IDebitorResult {
	items: IDebitor[]
	pageNumber: number
	pageSize: number
	totalCount: number
	totalPages: number
}
export interface IDebitor {
	id: string
	userCard: {
		id: string
		user: {
			id: string
			firstName: string
			lastName: string
			email: string
			phone: string
			facultyId: string | null
			group: string | null
			course: number | null
		}
	}
	bookId: string
	bookCard: {
		id: string
		book: {
			id: string
			title: string
			invertoryNumber: string
		}
	}
	bookingDate: Date
	pickupDate: Date
	returnDate: null
	isReturn: false
}
