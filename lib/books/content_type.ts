const API_URL = 'https://e-libraryrest.samdu.uz'

type ContentTypeprops = {
	pageSize: number
	pageNumber: number
}

export const getContentType = async ({
	pageSize,
	pageNumber,
}: ContentTypeprops) => {
	try {
		const response = await fetch(
			`${API_URL}/api/contenttype?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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

export const deleteContent = async (contentId: string) => {
	try {
		const response = await fetch(`${API_URL}/api/contenttype/${contentId}`, {
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

export const updateContent = async (
	id: string,
	data: {
		name: string
		literature: boolean
		article: boolean
		dissertation: boolean
		monographs: boolean
	}
) => {
	try {
		const response = await fetch(`${API_URL}/api/contenttype/${id}`, {
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

export const getContentTypeById = async (contentId: string) => {
	try {
		const response = await fetch(`${API_URL}/api/contenttype/${contentId}`, {
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

export const createContentType = async (data: {
	name: string
	article: boolean
	dissertation: boolean
	literature: boolean
	monographs: boolean
}) => {
	try {
		const response = await fetch(`${API_URL}/api/contenttype`, {
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
