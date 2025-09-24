export const API_URL = 'https://e-libraryrest.samdu.uz'
export interface StudentCreateDTO {
	studentCreateDTO: {
		firstName: string
		lastName: string
		email: string
		password: string
		phone?: string
		hemisId?: number
		facultyId?: string
		course?: number // Number tipida bo'lishi kerak
		group?: string
		userPhotoId?: string
	}
}
interface IBaseUser {
	firstName: string
	lastName: string
	password: string
	email: string
	phone: string
	userPhotoId: string | null
}

interface IStudent extends IBaseUser {
	hemisId: number
	facultyId: string
	course: number
	group: string
}

interface ITeacher extends IBaseUser {
	hemisId: number
	facultyId: string
}

interface IAdmin extends IBaseUser {
	buildingId: string | null
}

interface IModerator extends IBaseUser {
	buildingId: string | null
}

interface IEmployee extends IBaseUser {
	buildingId: string | null
}

interface IGuest extends IBaseUser {
	info: string
}

export type ICreateUser =
	| IStudent
	| ITeacher
	| IAdmin
	| IModerator
	| IEmployee
	| IGuest

//Student yaratish

export const createSuperAdmin = async (data: IStudent) => {
	try {
		const response = await fetch(`${API_URL}/api/user/createstudent`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(data),
		})
		return await response.json()
	} catch (error) {
		console.error('Error creating student:', error)
		return null
	}
}
export const createStudent = async (data: StudentCreateDTO) => {
	try {
		const response = await fetch(`${API_URL}/api/user/createstudent`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(data),
		})

		//console.log(response.json())
		return await response.json()
	} catch (error) {
		console.error('Error creating student:', error)
		return null
	}
}

// Teacher yaratish

export const createTeacher = async (data: ITeacher) => {
	try {
		const response = await fetch(`${API_URL}/api/user/createteacher`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(data),
		})
		return await response.json()
	} catch (error) {
		console.error('Error creating teacher:', error)
		return null
	}
}

// Admin yaratish
export const createAdmin = async (data: IAdmin) => {
	try {
		const response = await fetch(`${API_URL}/api/user/createadmin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(data),
		})
		return await response.json()
	} catch (error) {
		console.error('Error creating admin:', error)
		return null
	}
}

// Guest yaratish
export const createGuest = async (data: IGuest) => {
	try {
		const response = await fetch(`${API_URL}/api/user/createguest`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(data),
		})
		return await response.json()
	} catch (error) {
		console.error('Error creating Guest:', error)
		return null
	}
}

// Moderator yaratish
export const createModerator = async (data: IModerator) => {
	try {
		const response = await fetch(`${API_URL}/api/user/createmoderator`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(data),
		})
		return await response.json()
	} catch (error) {
		console.error('Error creating moderator:', error)
		return null
	}
}

// IEmployee yaratish
export const createEmployee = async (data: IEmployee) => {
	try {
		const response = await fetch(`${API_URL}/api/user/createemployee`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(data),
		})
		return await response.json()
	} catch (error) {
		console.error('Error creating createemployee:', error)
		return null
	}
}

//upload user photo
