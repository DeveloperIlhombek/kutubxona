const API_URL = 'https://e-libraryrest.samdu.uz'

export interface GetUserParams {
	pageSize: number
	pageNumber: number
	search?: string
	userCardId?: string
	hemisId?: string
	email?: string
	phone?: string
	facultyId?: string
	course?: string
	group?: string
	isActive?: boolean
	createBy?: string
	updateBy?: string
}
export const getAllTeachers = async (params: GetUserParams) => {
	try {
		// Query parametrlarini yaratish
		const queryParams = new URLSearchParams()

		// Asosiy pagination parametrlari
		queryParams.append('pageSize', params.pageSize.toString())
		queryParams.append('pageNumber', params.pageNumber.toString())

		// Filter parametrlarni qo'shish (faqat berilganlar)
		if (params.search) queryParams.append('search', params.search)
		if (params.userCardId) queryParams.append('userCardId', params.userCardId)
		if (params.hemisId) queryParams.append('hemisId', params.hemisId)
		if (params.email) queryParams.append('email', params.email)
		if (params.phone) queryParams.append('phone', params.phone)
		if (params.facultyId) queryParams.append('facultyId', params.facultyId)
		if (params.course) queryParams.append('course', params.course)
		if (params.group) queryParams.append('group', params.group)
		if (params.isActive !== undefined)
			queryParams.append('isActive', params.isActive.toString())
		if (params.createBy) queryParams.append('createBy', params.createBy)
		if (params.updateBy) queryParams.append('updateBy', params.updateBy)

		const response = await fetch(
			`${API_URL}/api/user/getallteachers?${queryParams}`,
			{
				method: 'GET',
				headers: {
					Accept: '*/*',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		)

		if (!response.ok) {
			throw new Error(`API error: ${response.status} - ${response.statusText}`)
		}

		const data = await response.json()
		console.log('API javobi:', data)
		return data
	} catch (error) {
		console.error('Error fetching admins:', error)
		return null
	}
}
