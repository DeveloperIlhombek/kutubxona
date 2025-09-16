const API_URL = 'https://e-libraryrest.samdu.uz'

// lib/users/debitors.ts faylida
export interface GetDebitorsParams {
	pageNumber: number
	pageSize: number
	user_search?: string
	email?: string
	hemisId?: string
	facultyId?: string
	course?: number
	group?: string
	role?: number
	buildingId?: string
	book_title?: string
	inventorNum?: string
	category?: number
	contentTypeId?: string
	languageId?: string
	countryId?: string
	fieldId?: string
	isReturn?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDebitors = async (params: GetDebitorsParams): Promise<any> => {
	try {
		// Query parametrlarni yaratish
		const queryParams = new URLSearchParams()

		// Asosiy pagination parametrlari
		queryParams.append('pageSize', params.pageSize.toString())
		queryParams.append('pageNumber', params.pageNumber.toString())

		// Filter parametrlarni qo'shish (faqat berilganlar)
		if (params.user_search)
			queryParams.append('user_search', params.user_search)
		if (params.email) queryParams.append('email', params.email)
		if (params.hemisId) queryParams.append('hemisId', params.hemisId)
		if (params.facultyId) queryParams.append('facultyId', params.facultyId)
		if (params.course) queryParams.append('course', params.course.toString())
		if (params.group) queryParams.append('group', params.group)
		if (params.role) queryParams.append('role', params.role.toString())
		if (params.buildingId) queryParams.append('buildingId', params.buildingId)
		if (params.book_title) queryParams.append('book_title', params.book_title)
		if (params.inventorNum)
			queryParams.append('inventorNum', params.inventorNum)
		if (params.category)
			queryParams.append('category', params.category.toString())
		if (params.contentTypeId)
			queryParams.append('contentTypeId', params.contentTypeId)
		if (params.languageId) queryParams.append('languageId', params.languageId)
		if (params.countryId) queryParams.append('countryId', params.countryId)
		if (params.fieldId) queryParams.append('fieldId', params.fieldId)
		if (params.isReturn !== undefined)
			queryParams.append('isReturn', params.isReturn.toString())

		const response = await fetch(`${API_URL}/api/user/debtors?${queryParams}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		return await response.json()
	} catch (error) {
		console.error('Error fetching debtors:', error)
		throw error
	}
}
