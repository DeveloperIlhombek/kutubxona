const API_URL = 'https://e-libraryrest.samdu.uz'

export const getDebitors = async ({
	pageSize,
	pageNumber,
}: {
	pageSize: number
	pageNumber: number
}) => {
	try {
		const response = await fetch(
			`${API_URL}/api/user/debtors?pageNumber=${pageNumber}&pageSize=${pageSize}`,

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

// Get faculty by ID
// export const getFacultyById = async (id: string) => {
// 	try {
// 		const response = await fetch(`${API_URL}/api/faculty/${id}`, {
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Authorization: `Bearer ${localStorage.getItem('token')}`,
// 			},
// 		})

// 		if (!response.ok) {
// 			throw new Error(`API error: ${response.status}`)
// 		}

// 		return await response.json()
// 	} catch (error) {
// 		console.error('Error fetching faculty:', error)
// 		throw error
// 	}
// }
