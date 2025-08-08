const API_URL = 'https://e-libraryrest.samdu.uz'
import { IUser } from '@/types'

export const getUserById = async (id: string) => {
	try {
		const response = await fetch(`${API_URL}/api/user/${id}`, {
			method: 'GET',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})

		if (!response.ok) {
			throw new Error('Failed to fetch user')
		}

		const data = await response.json()
		return {
			isSuccess: true,
			result: data,
		}
	} catch (error) {
		console.error('Error fetching user:', error)
		return {
			isSuccess: false,
			result: {} as IUser,
		}
	}
}
