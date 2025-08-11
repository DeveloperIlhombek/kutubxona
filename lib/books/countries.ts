const API_URL = 'https://e-libraryrest.samdu.uz'
type getAllcountriesProps = {
	pageSize: number
	pageNumber: number
}
export const getAllCountries = async ({
	pageSize,
	pageNumber,
}: getAllcountriesProps) => {
	try {
		const responce = await fetch(
			`${API_URL}/api/country?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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

export const getCountryById = async (countryId: string) => {
	try {
		const response = await fetch(`${API_URL}/api/country/${countryId}`, {
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
export const updateCountry = async (
	countryId: string,
	data: { name: string; code: string }
) => {
	try {
		const response = await fetch(`${API_URL}/api/country/${countryId}`, {
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
export const deleteCountry = async (countryId: string) => {
	try {
		const response = await fetch(`${API_URL}/api/country/${countryId}`, {
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
