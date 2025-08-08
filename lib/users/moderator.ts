const API_URL = 'https://e-libraryrest.samdu.uz'
export const getAllModerator = async ({
	pageSize,
	pageNumber,
}: {
	pageSize: number
	pageNumber: number
}) => {
	try {
		const response = await fetch(
			`${API_URL}/api/user/getallmoderators?pageSize=${pageSize}&pageNumber=${pageNumber}`,

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
		//console.log(data.result)

		return data
	} catch (error) {
		console.error('Error fetching tests:', error)
		return null
	}
}
