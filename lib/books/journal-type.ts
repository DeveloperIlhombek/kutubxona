const API_URL = 'https://e-libraryrest.samdu.uz'

type ContentTypeprops = {
	pageSize: number
	pageNumber: number
}

export const getJournalType = async ({
	pageSize,
	pageNumber,
}: ContentTypeprops) => {
	try {
		const response = await fetch(
			`${API_URL}/api/journaltype?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
		console.error('Error fetching journal:', error)
		return null
	}
}

export const deleteJournalType = async (id: string) => {
	try {
		const response = await fetch(`${API_URL}/api/journaltype/${id}`, {
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
		console.error('Error deleting journal:', error)
		return null
	}
}

export const updateJournalType = async (
	institutionId: string,
	name: string
) => {
	try {
		const response = await fetch(
			`${API_URL}/api/journaltype/${institutionId}?name=${name}`,
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
		console.error('Error updating journal:', error)
		return null
	}
}

export const getJournalTypeId = async (id: string) => {
	try {
		const response = await fetch(`${API_URL}/api/journaltype/${id}`, {
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
		console.error('Error fetching journal by ID:', error)
		throw error
	}
}

export const createJournalType = async ({ name }: { name: string }) => {
	try {
		const response = await fetch(`${API_URL}/api/journaltype?name=${name}`, {
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
		console.error('Error updating journal:', error)
		return null
	}
}
