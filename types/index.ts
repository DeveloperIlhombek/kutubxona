import { ReactNode } from 'react'

export interface ChildProps {
	children: ReactNode
}

export interface IUserResponce {
	isSuccess: boolean
	result: IUserResult
	statusCode: number
	errorMessages: string[]
}
export interface IUserResult {
	items: IUser[]
	pageNumber: number
	pageSize: number
	totalCount: number
	totalPages: number
}

export interface IUser {
	id: string
	firstName: string
	lastName: string
	thirdName: string | null
	email: string
	hemisId: string | null
	phone: string
	userPhotoId: string | null
	role: number
	buildingId: string | null
	facultyId: string | null
	course: string | null
	group: string | null
	isActive: boolean
	userPhoto: IUserPhoto
	faculty: IFaculty | null
	building: string | null
	studentStatusCode: string | null
}

interface IFaculty {
	id: string
	name: string
	code: number
}
export interface IUserPhoto {
	id: string
	size: number
	mimeType: string
	extension: string
	filename: string
	updatedAt: string
	createdAt: string
	fileUrl: string
	originFileUrl: string
}
