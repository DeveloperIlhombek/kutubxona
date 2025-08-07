import { LoginResponse } from '@/types'

const API_URL = 'https://e-libraryrest.samdu.uz'
export const loginwithemail = async (data: {
	login: string
	password: string
}): Promise<LoginResponse> => {
	try {
		const response = await fetch(`${API_URL}/api/user/loginwithemail`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: '*/*',
			},
			body: JSON.stringify(data),
		})

		if (!response.ok) {
			throw new Error('Login failed')
		}
		const result = await response.json()

		if (result.accessToken) {
			localStorage.setItem('token', result.accessToken)
		}

		return result
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Login request failed'
		)
	}
}
