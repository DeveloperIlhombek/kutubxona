const API_URL = 'https://e-libraryrest.samdu.uz'
type getAllFieldsProps = {
	pageSize: number
	pageNumber: number
}
export const getAllFields = async ({
	pageSize,
	pageNumber,
}: getAllFieldsProps) => {
	try {
		const responce = await fetch(
			`${API_URL}/api/field?pageNumber=${pageNumber}&pageSize=${pageSize}`,
			{
				method: 'GET',
				headers: {
					Accept: '*/*',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		)

		if (!responce.ok) {
			throw new Error(`API error: ${responce.status} - ${responce.statusText}`)
		}
		const data = await responce.json()
		return data
	} catch (error) {
		console.error('Error fetching countries:', error)
		return null
	}
}

export const createFields = async (data: { name: string }) => {
	try {
		const response = await fetch(`${API_URL}/api/field`, {
			method: 'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(data),
		})
		if (!response.ok) {
			throw new Error(`API error: ${response.status} - ${response.statusText}`)
		}
		return await response.json()
	} catch (error) {
		console.error('Error updating country:', error)
		return null
	}
}

export const getFieldsbyId = async (countryId: string) => {
	try {
		const response = await fetch(`${API_URL}/api/field/${countryId}`, {
			method: 'GET',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})

		if (!response.ok) {
			throw new Error(`API error: ${response.status} - ${response.statusText}`)
		}
		return await response.json()
	} catch (error) {
		console.error('Error fetching country by ID:', error)
		return null
	}
}
export const updateFields = async (
	countryId: string,
	data: { name: string }
) => {
	try {
		const response = await fetch(`${API_URL}/api/field/${countryId}`, {
			method: 'PUT',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(data),
		})

		if (!response.ok) {
			throw new Error(`API error: ${response.status} - ${response.statusText}`)
		}
		return await response.json()
	} catch (error) {
		console.error('Error updating country:', error)
		return null
	}
}
export const deleteFields = async (countryId: string) => {
	try {
		const response = await fetch(`${API_URL}/api/field/${countryId}`, {
			method: 'DELETE',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})

		if (!response.ok) {
			throw new Error(`API error: ${response.status} - ${response.statusText}`)
		}
		return await response.json()
	} catch (error) {
		console.error('Error deleting country:', error)
		return null
	}
}
