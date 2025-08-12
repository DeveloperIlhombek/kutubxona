const API_URL = 'https://e-libraryrest.samdu.uz'
type getAllLanguagesProps = {
	pageSize: number
	pageNumber: number
}
export const getAllLanguages = async ({
	pageSize,
	pageNumber,
}: getAllLanguagesProps) => {
	try {
		const responce = await fetch(
			`${API_URL}/api/language?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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

export const createLanguage = async (data: { name: string; code: string }) => {
	try {
		const response = await fetch(`${API_URL}/api/language`, {
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

export const getLanguageById = async (languageId: string) => {
	try {
		const response = await fetch(`${API_URL}/api/language/${languageId}`, {
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
		console.error('Error fetching language by ID:', error)
		return null
	}
}

export const updateLanguage = async (
	languageId: string,
	data: { name: string; code: string }
) => {
	try {
		const response = await fetch(`${API_URL}/api/language/${languageId}`, {
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
		console.error('Error updating language:', error)
		return null
	}
}

export const deleteLanguage = async (languageId: string) => {
	try {
		const response = await fetch(`${API_URL}/api/language/${languageId}`, {
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
		console.error('Error deleting language:', error)
		return null
	}
}
