'use client'
import UserIDpage from '@/components/user/UserIDpage'
import { useParams } from 'next/navigation'

export default function UserDetailPage() {
	//const pathname = usePathname()
	//const userid = pathname.split('/')[4]
	const { userId } = useParams<{ userId: string }>()

	return <UserIDpage userid={userId} />
}
