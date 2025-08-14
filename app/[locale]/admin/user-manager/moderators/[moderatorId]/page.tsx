'use client'
import UserIDpage from '@/components/user/UserIDpage'
import { usePathname } from 'next/navigation'

export default function UserDetailPage() {
	const pathname = usePathname()
	const userid = pathname.split('/')[4] // Extracting userId from the URL

	return <UserIDpage userid={userid} />
}
