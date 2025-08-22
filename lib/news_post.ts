const API_URL = 'https://e-libraryrest.samdu.uz'

export const getNews = async ({
	pageSize,
	pageNumber,
}: {
	pageSize: number
	pageNumber: number
}) => {
	try {
		const response = await fetch(
			`${API_URL}/api/news?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
		return await response.json()
	} catch (error) {
		console.error('Error fetching Journal:', error)
		return null
	}
}
// export const getJournalById = async (id: string) => {
// 	try {
// 		const response = await fetch(`${API_URL}/api/journal/${id}`, {
// 			method: 'GET',
// 			headers: {
// 				Accept: '*/*',
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${localStorage.getItem('token')}`,
// 			},
// 		})
// 		if (!response.ok) {
// 			throw new Error(`API error: ${response.status} - ${response.statusText}`)
// 		}
// 		return await response.json()
// 	} catch (error) {
// 		console.error('Error fetching Journal by id:', error)
// 		return null
// 	}
// }

// export const createJournal = async (body: object) => {
// 	try {
// 		const response = await fetch(`${API_URL}/api/journal`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Accept: '*/*',
// 				Authorization: `Bearer ${localStorage.getItem('token')}`,
// 			},
// 			body: JSON.stringify(body),
// 		})

// 		if (!response.ok) {
// 			const errorData = await response.json().catch(() => null)
// 			throw new Error(
// 				`API error: ${response.status} - ${response.statusText}. ${
// 					errorData?.message || ''
// 				}`
// 			)
// 		}

// 		return await response.json()
// 	} catch (error) {
// 		console.error('Error creating Journal:', error)
// 		throw error
// 	}
// }

// export const updateJournal = async (id: string, body: object) => {
// 	try {
// 		const response = await fetch(`${API_URL}/api/journal/${id}`, {
// 			method: 'PUT',
// 			headers: {
// 				Accept: '*/*',
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${localStorage.getItem('token')}`,
// 			},
// 			body: JSON.stringify(body),
// 		})
// 		if (!response.ok) {
// 			throw new Error(`API error: ${response.status} - ${response.statusText}`)
// 		}
// 		return await response.json()
// 	} catch (error) {
// 		console.error('Error updating Journal:', error)
// 		return null
// 	}
// }

// export const deleteJournal = async (id: string) => {
// 	try {
// 		const response = await fetch(`${API_URL}/api/journal/${id}`, {
// 			method: 'DELETE',
// 			headers: {
// 				Accept: '*/*',
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${localStorage.getItem('token')}`,
// 			},
// 		})
// 		if (!response.ok) {
// 			throw new Error(`API error: ${response.status} - ${response.statusText}`)
// 		}
// 		return await response.json()
// 	} catch (error) {
// 		console.error('Error deleting Journal:', error)
// 		return null
// 	}
// }
//Upload journal images

// export const uploadImage = async (file: File): Promise<string> => {
// 	try {
// 		const formData = new FormData()
// 		formData.append('file', file)

// 		const response = await fetch(`${API_URL}/api/journal/uploadjournalcover`, {
// 			method: 'POST',
// 			headers: {
// 				Authorization: `Bearer ${localStorage.getItem('token')}`,
// 			},
// 			body: formData,
// 		})

// 		if (!response.ok) {
// 			throw new Error('Rasm yuklashda xatolik')
// 		}

// 		const result = await response.json()
// 		return result.result.id
// 	} catch (error) {
// 		console.error('Rasm yuklashda xatolik:', error)
// 		throw error
// 	}
// }
