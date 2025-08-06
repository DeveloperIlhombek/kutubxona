const API_URL = 'https://e-libraryrest.samdu.uz'

export const getAllsuperadmins = async ({
	pageSize,
	pageNumber,
}: {
	pageSize: number
	pageNumber: number
}) => {
	try {
		const response = await fetch(
			`${API_URL}/api/user/getallsuperadmins?pageSize=${pageSize}&pageNumber=${pageNumber}`,

			{
				method: 'GET', // agar cookie'lar kerak bo'lsa
				headers: {
					Accept: '*/*',
					'Content-Type': 'application/json',
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNDVoMDk4YmI4cmViZXJid3I0dnZiODk0NSIsImp0aSI6IjAyMTFjYjQ1LTViNWQtNDQ3NC05NmExLWE1YzJkMzc3Zjk5MiIsImlhdCI6IjE3NTQ0NTQ1NzciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjA4ZGJhZGQxLTZmM2QtNDY2Ni04YjFmLTM4OTQ2MjUxYmVkOCIsIkNhcGFjaXRpZXMiOiI2NCw3NSw3NCw3Myw3Miw3MSw3MCw2OSw2OCw2Nyw2Niw2NSw3Niw2Myw2Miw2MSw2MCw1OSw1OCw1Nyw1Niw1NSw1NCw1Myw4Nyw5OCw5Nyw5Niw5NSw5NCw5Myw5Miw5MSw5MCw4OSw4OCw1Miw4Niw4NSw4NCw4Myw4Miw4MSw4MCw3OSw3OCw3NywxNCwyNSwyNCwyMywyMiwyMSwyMCwxOSwxOCwxNywxNiwxNSwyNiwxMywxMiwxMSwxMCw5LDcsNiw1LDQsMywyLDQwLDUxLDUwLDQ5LDQ4LDQ3LDQ2LDQ1LDQ0LDQzLDQyLDQxLDEsMzksMzgsMzcsMzYsMzUsMzQsMzAsMjksMjgsMjciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiZXhwIjoxNzU0NTQwOTc3LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvIn0.f-bpEWzyhteLncJIzqn1jXo04vDper155wwXwpMmVIE`,
				},
			}
		)

		if (!response.ok) {
			throw new Error(`API error: ${response.status} - ${response.statusText}`)
		}

		const data = await response.json()

		//console.log('Fetched superadmins:', data.result)

		return data
	} catch (error) {
		console.error('Error fetching tests:', error)
		return null
	}
}
