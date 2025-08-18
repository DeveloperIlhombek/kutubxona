const API_URL = 'https://e-libraryrest.samdu.uz'

type ContentTypeprops = {
	pageSize: number
	pageNumber: number
}

export const getInstitution = async ({
	pageSize,
	pageNumber,
}: ContentTypeprops) => {
	try {
		const response = await fetch(
			`${API_URL}/api/institution?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
		return data
	} catch (error) {
		console.error('Error fetching countries:', error)
		return null
	}
}

export const deleteInstitution = async (id: string) => {
	try {
		const response = await fetch(`${API_URL}/api/institution/${id}`, {
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
		console.error('Error deleting institution:', error)
		return null
	}
}

export const updateInstitution = async (
	institutionId: string,
	name: string
) => {
	try {
		const response = await fetch(
			`${API_URL}/api/institution/${institutionId}?name=${name}`,
			{
				method: 'PUT',
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
		return data
	} catch (error) {
		console.error('Error updating country:', error)
		return null
	}
}

export const getInstitutionId = async (id: string) => {
	try {
		const response = await fetch(`${API_URL}/api/institution/${id}`, {
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
		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error fetching country by ID:', error)
		throw error
	}
}

export const createInstitution = async ({ name }: { name: string }) => {
	try {
		const response = await fetch(`${API_URL}/api/institution?name=${name}`, {
			method: 'POST',
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
		console.error('Error updating institution:', error)
		return null
	}
}
