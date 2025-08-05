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
