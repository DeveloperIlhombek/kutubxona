const API_URL = 'https://e-libraryrest.samdu.uz'
const yourAuthToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNDVoMDk4YmI4cmViZXJid3I0dnZiODk0NSIsImp0aSI6ImE1YmFkNDA4LWRjNDgtNGE3OS1iZjZiLTY5ZDFkY2U3MmY3YSIsImlhdCI6IjE3NTQ1NDY5NDgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjA4ZGJhZGQxLTZmM2QtNDY2Ni04YjFmLTM4OTQ2MjUxYmVkOCIsIkNhcGFjaXRpZXMiOiI2NCw3NSw3NCw3Myw3Miw3MSw3MCw2OSw2OCw2Nyw2Niw2NSw3Niw2Myw2Miw2MSw2MCw1OSw1OCw1Nyw1Niw1NSw1NCw1Myw4Nyw5OCw5Nyw5Niw5NSw5NCw5Myw5Miw5MSw5MCw4OSw4OCw1Miw4Niw4NSw4NCw4Myw4Miw4MSw4MCw3OSw3OCw3NywxNCwyNSwyNCwyMywyMiwyMSwyMCwxOSwxOCwxNywxNiwxNSwyNiwxMywxMiwxMSwxMCw5LDcsNiw1LDQsMywyLDQwLDUxLDUwLDQ5LDQ4LDQ3LDQ2LDQ1LDQ0LDQzLDQyLDQxLDEsMzksMzgsMzcsMzYsMzUsMzQsMzAsMjksMjgsMjciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzU0NjMzMzQ4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvIn0.TChadPu-_13x5JfY7FAtSVlATqv5cdzuQUCvWVenaZw'
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
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNDVoMDk4YmI4cmViZXJid3I0dnZiODk0NSIsImp0aSI6ImE1YmFkNDA4LWRjNDgtNGE3OS1iZjZiLTY5ZDFkY2U3MmY3YSIsImlhdCI6IjE3NTQ1NDY5NDgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjA4ZGJhZGQxLTZmM2QtNDY2Ni04YjFmLTM4OTQ2MjUxYmVkOCIsIkNhcGFjaXRpZXMiOiI2NCw3NSw3NCw3Myw3Miw3MSw3MCw2OSw2OCw2Nyw2Niw2NSw3Niw2Myw2Miw2MSw2MCw1OSw1OCw1Nyw1Niw1NSw1NCw1Myw4Nyw5OCw5Nyw5Niw5NSw5NCw5Myw5Miw5MSw5MCw4OSw4OCw1Miw4Niw4NSw4NCw4Myw4Miw4MSw4MCw3OSw3OCw3NywxNCwyNSwyNCwyMywyMiwyMSwyMCwxOSwxOCwxNywxNiwxNSwyNiwxMywxMiwxMSwxMCw5LDcsNiw1LDQsMywyLDQwLDUxLDUwLDQ5LDQ4LDQ3LDQ2LDQ1LDQ0LDQzLDQyLDQxLDEsMzksMzgsMzcsMzYsMzUsMzQsMzAsMjksMjgsMjciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzU0NjMzMzQ4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvIn0.TChadPu-_13x5JfY7FAtSVlATqv5cdzuQUCvWVenaZw`,
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
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNDVoMDk4YmI4cmViZXJid3I0dnZiODk0NSIsImp0aSI6ImE1YmFkNDA4LWRjNDgtNGE3OS1iZjZiLTY5ZDFkY2U3MmY3YSIsImlhdCI6IjE3NTQ1NDY5NDgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjA4ZGJhZGQxLTZmM2QtNDY2Ni04YjFmLTM4OTQ2MjUxYmVkOCIsIkNhcGFjaXRpZXMiOiI2NCw3NSw3NCw3Myw3Miw3MSw3MCw2OSw2OCw2Nyw2Niw2NSw3Niw2Myw2Miw2MSw2MCw1OSw1OCw1Nyw1Niw1NSw1NCw1Myw4Nyw5OCw5Nyw5Niw5NSw5NCw5Myw5Miw5MSw5MCw4OSw4OCw1Miw4Niw4NSw4NCw4Myw4Miw4MSw4MCw3OSw3OCw3NywxNCwyNSwyNCwyMywyMiwyMSwyMCwxOSwxOCwxNywxNiwxNSwyNiwxMywxMiwxMSwxMCw5LDcsNiw1LDQsMywyLDQwLDUxLDUwLDQ5LDQ4LDQ3LDQ2LDQ1LDQ0LDQzLDQyLDQxLDEsMzksMzgsMzcsMzYsMzUsMzQsMzAsMjksMjgsMjciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzU0NjMzMzQ4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvIn0.TChadPu-_13x5JfY7FAtSVlATqv5cdzuQUCvWVenaZw`,
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
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNDVoMDk4YmI4cmViZXJid3I0dnZiODk0NSIsImp0aSI6ImE1YmFkNDA4LWRjNDgtNGE3OS1iZjZiLTY5ZDFkY2U3MmY3YSIsImlhdCI6IjE3NTQ1NDY5NDgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjA4ZGJhZGQxLTZmM2QtNDY2Ni04YjFmLTM4OTQ2MjUxYmVkOCIsIkNhcGFjaXRpZXMiOiI2NCw3NSw3NCw3Myw3Miw3MSw3MCw2OSw2OCw2Nyw2Niw2NSw3Niw2Myw2Miw2MSw2MCw1OSw1OCw1Nyw1Niw1NSw1NCw1Myw4Nyw5OCw5Nyw5Niw5NSw5NCw5Myw5Miw5MSw5MCw4OSw4OCw1Miw4Niw4NSw4NCw4Myw4Miw4MSw4MCw3OSw3OCw3NywxNCwyNSwyNCwyMywyMiwyMSwyMCwxOSwxOCwxNywxNiwxNSwyNiwxMywxMiwxMSwxMCw5LDcsNiw1LDQsMywyLDQwLDUxLDUwLDQ5LDQ4LDQ3LDQ2LDQ1LDQ0LDQzLDQyLDQxLDEsMzksMzgsMzcsMzYsMzUsMzQsMzAsMjksMjgsMjciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzU0NjMzMzQ4LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvIn0.TChadPu-_13x5JfY7FAtSVlATqv5cdzuQUCvWVenaZw`,
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
				Authorization: `Bearer ${yourAuthToken}`,
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
				Authorization: `Bearer ${yourAuthToken}`,
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
				Authorization: `Bearer ${yourAuthToken}`,
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
