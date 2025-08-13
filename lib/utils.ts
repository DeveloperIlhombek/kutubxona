const API_URL = 'https://e-libraryrest.samdu.uz'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getLanguagePrefix = (pathname: string) => {
	const segments = pathname.split('/')
	if (segments.length > 1 && ['uz', 'en', 'ru'].includes(segments[1])) {
		return `/${segments[1]}`
	}
	return ''
}

// pages/api/file/downloadimagefile/[fileid]/[quality].ts
export const downloadImage = ({
	id,
	quality,
}: {
	id: string | null
	quality: 'low' | 'middle' | 'original'
}) => {
	return `${API_URL}/api/file/downloadimagefile/${id}/${quality}`
}
