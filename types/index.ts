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
	info: string | null
}

export interface IUserPhoto {
	id?: string
	size?: number
	mimeType?: string
	extension?: string
	filename: string
	updatedAt?: string
	createdAt?: string
	fileUrl?: string
	originFileUrl?: string
}
//================= Faculte Interface =================
export interface IFacultyResult {
	result: IFaculty[]
	pageNumber: number
	pageSize: number
	totalCount: number
	totalPages: number
}
export interface IFaculty {
	id: string
	name: string
	code: number
}

//================= Dashboard =================
export interface IDashboardWidget {
	id: string
	title: string
	buildingName: string
	buildingId: string
	bookCountByBuilding: number
	attedanceByBuilding: number | null
}

export interface IDashboard {
	widgets: IDashboardWidget[]
	booksCount: number
	usersCount: number
}
export interface IDashboardResponse {
	isSuccess: boolean
	result: IDashboard
	statusCode: number
	errorMessages: string[]
}

export interface LoginResponse {
	isSuccess: boolean
	result: {
		accessToken: string
		user: Partial<IUser>
	}
	statusCode: number
	errorMessages: string[]
}

//================= Country Interface =================
export interface ICountry {
	id: string
	name: string
	code: string
}
export interface ICountryResult {
	items: ICountry[]
	pageNumber: number
	pageSize: number
	totalCount: number
	totalPages: number
}
export interface ICountryResponse {
	isSuccess: boolean
	result: ICountryResult
	statusCode: number
	errorMessages: string[]
}

//===============Content Type interface====================

export interface IContenttypeResult {
	items: IContentType[]
	pageNumber: number
	pageSize: number
	totalCount: number
	totalPages: number
}

export interface IContentType {
	id: string
	name: string
	literature: boolean
	article: boolean
	dissertation: boolean
	monographs: boolean
}
//============Building Type interfaces=====================

export interface IBuildingResult {
	items: IBuilding[]
	pageNumber: number
	pageSize: number
	totalCount: number
	totalPages: number
}

export interface IBuilding {
	id: string
	name: string
	location: string
}
