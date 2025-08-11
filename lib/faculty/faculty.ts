const API_URL = 'https://e-libraryrest.samdu.uz'

export const getFaculties = async ({
	pageSize,
	pageNumber,
}: {
	pageSize: number
	pageNumber: number
}) => {
	try {
		const response = await fetch(
			`${API_URL}/api/faculty?pageNumber=${pageNumber}&pageSize=${pageSize}`,

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
		console.log(data.result)

		return data
	} catch (error) {
		console.error('Error fetching tests:', error)
		return null
	}
}

// Fakultetlarni hemis bo'yicha olish
export const getfacultiesbyhemis = async () => {
	try {
		const response = await fetch(
			`${API_URL}/api/faculty/getfacultiesbyhemis`,

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
		console.log(data.result)

		return data
	} catch (error) {
		console.error('Error fetching tests:', error)
		return null
	}
}

export const addFaculty = async (facultyData: {
	code: number
	name: string
}) => {
	try {
		const response = await fetch(`${API_URL}/api/faculty`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(facultyData),
		})

		if (!response.ok) {
			throw new Error(`API error: ${response.status} - ${response.statusText}`)
		}

		return await response.json()
	} catch (error) {
		console.error('Error adding faculty:', error)
		throw error
	}
}

// Get faculty by ID
export const getFacultyById = async (id: string) => {
	try {
		const response = await fetch(`${API_URL}/api/faculty/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})

		if (!response.ok) {
			throw new Error(`API error: ${response.status}`)
		}

		return await response.json()
	} catch (error) {
		console.error('Error fetching faculty:', error)
		throw error
	}
}

// Update faculty
export const updateFaculty = async (
	id: string,
	facultyData: { code: number; name: string }
) => {
	try {
		const response = await fetch(`${API_URL}/api/faculty/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(facultyData),
		})

		if (!response.ok) {
			throw new Error(`API error: ${response.status}`)
		}

		return await response.json()
	} catch (error) {
		console.error('Error updating faculty:', error)
		throw error
	}
}

// Delete faculty
export const deleteFaculty = async (id: string) => {
	try {
		const response = await fetch(`${API_URL}/api/faculty/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})

		if (!response.ok) {
			throw new Error(`API error: ${response.status}`)
		}

		return await response.json()
	} catch (error) {
		console.error('Error deleting faculty:', error)
		throw error
	}
}
