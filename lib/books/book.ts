const API_URL = 'https://e-libraryrest.samdu.uz'

export const getAllBooks = async ({
	pageSize,
	pageNumber,
	category,
}: {
	pageSize: number
	pageNumber: number
	category: number
}) => {
	try {
		const response = await fetch(
			`${API_URL}/api/Book?Category=${category}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
		console.error('Error fetching buildings:', error)
		return null
	}
}
