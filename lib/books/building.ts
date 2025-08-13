const API_URL = 'https://e-libraryrest.samdu.uz'
type getAllbuildingProps = {
	pageSize: number
	pageNumber: number
}
export const getAllBuildings = async ({
	pageSize,
	pageNumber,
}: getAllbuildingProps) => {
	try {
		const responce = await fetch(
			`${API_URL}/api/building?pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
		console.error('Error fetching buildings:', error)
		return null
	}
}

export const createBuilding = async (data: {
	location: string
	name: string
}) => {
	try {
		const response = await fetch(`${API_URL}/api/building`, {
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
		console.error('Error updating building:', error)
		return null
	}
}

export const getbuildingById = async (buildingId: string) => {
	try {
		const response = await fetch(`${API_URL}/api/building/${buildingId}`, {
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
		console.error('Error fetching building by ID:', error)
		return null
	}
}
export const updateBuilding = async (
	buildingId: string,
	data: { name: string; location: string }
) => {
	try {
		const response = await fetch(`${API_URL}/api/building/${buildingId}`, {
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
		const res = await response.json()
		return res
	} catch (error) {
		console.error('Error updating building:', error)
		return null
	}
}
export const deleteBuilding = async (buildingId: string) => {
	try {
		const response = await fetch(`${API_URL}/api/building/${buildingId}`, {
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
		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error deleting building:', error)
		return null
	}
}
