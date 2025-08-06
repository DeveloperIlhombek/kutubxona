'use client'
import { LoaderOne } from '@/components/shared/loader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getUserById } from '@/lib/users/userId'
import { IUser } from '@/types'
import {
	ActivitySquare,
	AlertCircle,
	BookMarked,
	BookOpen,
	CheckCircle,
	CreditCard,
	GraduationCap,
	Hash,
	Mail,
	Phone,
	User,
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '../ui/badge'

type UserIDpageProps = {
	userid: string
}

const UserIDpage: React.FC<UserIDpageProps> = ({ userid }) => {
	const [user, setUser] = useState<IUser | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				setLoading(true)
				// Bu yerda sizning getUserById API funksiyangizni chaqiring
				const response = await getUserById(userid)
				if (response.isSuccess) {
					setUser(response.result.result)
					console.log(response.result)
				} else {
					toast.error("Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi")
				}
			} catch (error) {
				toast.error(`Xatolik: ${error}`)
			} finally {
				setLoading(false)
			}
		}

		if (userid) {
			fetchUser()
		}
	}, [userid])

	if (loading) {
		return (
			<div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-white dark:bg-black'>
				<LoaderOne />
			</div>
		)
	}

	if (!user) {
		return (
			<div className='text-3xl text-gray-600 text-center font-bold'>
				Foydalanuvchi topilmadi !!!
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			{/* Hero Section */}
			<div className='flex items-center justify-center p-0 m-0 w-full h-[250px] backdrop-blur-md bg-gradient-to-r from-blue-600 via-sky-700 to-blue-600 relative'>
				<div className='absolute inset-0 bg-black/20'></div>
				<div className='relative z-10 text-center text-white'>
					<div className='w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-white shadow-lg'>
						<Image
							width={96}
							height={96}
							src={'/images/user/user-01.jpg'}
							alt={`${user.firstName} ${user.lastName}`}
							className='w-full h-full object-cover'
						/>
					</div>
					<h1 className='text-3xl font-bold mb-2'>
						{user.firstName} {user.lastName}
					</h1>
					<p className='text-lg opacity-90'>
						{user.faculty?.name} {user.group}
					</p>
				</div>
			</div>

			{/* Content Section */}
			<div className='max-w-7xl mt-6 mx-auto px-4 sm:px-6 lg:px-8 relative z-20'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* Left Column */}
					<div className='lg:col-span-2 space-y-6'>
						{/* Umumiy ma'lumotlar */}
						<Card className='shadow-lg'>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<User className='w-5 h-5' />
									Umumiy malumotlar
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div className='space-y-4'>
										<div className='flex items-center gap-3'>
											<div className='w-12 h-12 overflow-hidden rounded-full'>
												<Image
													width={48}
													height={48}
													src={'/images/user/user-01.jpg'}
													alt={`${user.firstName} ${user.lastName}`}
													className='w-full h-full object-cover'
												/>
											</div>
											<div>
												<p className='font-semibold text-lg'>
													{user.firstName} {user.lastName}
												</p>
												{user.thirdName && (
													<p className='text-gray-600 dark:text-gray-400'>
														{user.thirdName}
													</p>
												)}
											</div>
										</div>
									</div>

									<div className='space-y-3'>
										<div className='flex items-center gap-2'>
											<GraduationCap className='w-4 h-4 text-blue-600' />
											<span className='text-sm font-medium'>Fakultet:</span>
											<span className='text-sm'>{user.faculty?.name}</span>
										</div>

										<div className='flex items-center gap-2'>
											<User className='w-4 h-4 text-green-600' />
											<span className='text-sm font-medium'>Guruh:</span>
											<span className='text-sm'>
												{user.group || "Ma'lumot yo'q"}
											</span>
										</div>

										<div className='flex items-center gap-2'>
											<Hash className='w-4 h-4 text-purple-600' />
											<span className='text-sm font-medium'>Hemis ID:</span>
											<span className='text-sm font-mono'>
												{user.hemisId || "Ma'lumot yo'q"}
											</span>
										</div>

										<div className='flex items-center gap-2'>
											<ActivitySquare className='w-4 h-4 text-orange-600' />
											<span className='text-sm font-medium'>Faol:</span>
											<span className='text-sm'>
												<Badge
													variant={user.isActive ? 'secondary' : 'destructive'}
													className={`${
														user.isActive
															? 'bg-green-200 text-green-800'
															: 'bg-red-200 text-red-800'
													}`}
												>
													{user.isActive ? 'Faol' : 'Nofaol'}
												</Badge>
											</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Books Section */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{/* Allowed Books */}
							<Card className='shadow-lg'>
								<CardHeader>
									<CardTitle className='flex items-center gap-2'>
										<BookOpen className='w-5 h-5' />
										Ruxsat etilgan kitoblar
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-center py-8 text-gray-500 dark:text-gray-400'>
										<BookOpen className='w-12 h-12 mx-auto mb-3 opacity-50' />
										<p>Malumot yoq</p>
									</div>
								</CardContent>
							</Card>

							{/* Rented Books */}
							<Card className='shadow-lg'>
								<CardHeader>
									<CardTitle className='flex items-center gap-2'>
										<BookMarked className='w-5 h-5' />
										Ijaraga olingan kitoblar
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-center py-8 text-gray-500 dark:text-gray-400'>
										<BookMarked className='w-12 h-12 mx-auto mb-3 opacity-50' />
										<p>Malumot yoq</p>
									</div>
								</CardContent>
							</Card>

							{/* Not Returned Books */}
							<Card className='shadow-lg'>
								<CardHeader>
									<CardTitle className='flex items-center gap-2'>
										<AlertCircle className='w-5 h-5 text-red-500' />
										Qaytarilmagan kitoblar
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-center py-8 text-gray-500 dark:text-gray-400'>
										<AlertCircle className='w-12 h-12 mx-auto mb-3 opacity-50' />
										<p>Malumot yoq</p>
									</div>
								</CardContent>
							</Card>

							{/* Returned Books */}
							<Card className='shadow-lg'>
								<CardHeader>
									<CardTitle className='flex items-center gap-2'>
										<CheckCircle className='w-5 h-5 text-green-500' />
										Qaytarilgan kitoblar
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className='text-center py-8 text-gray-500 dark:text-gray-400'>
										<CheckCircle className='w-12 h-12 mx-auto mb-3 opacity-50' />
										<p>Malumot yoq</p>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Right Column */}
					<div className='space-y-6'>
						{/* Aloqa */}
						<Card className='shadow-lg'>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<Mail className='w-5 h-5' />
									Aloqa
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'>
									<Phone className='w-5 h-5 text-blue-600' />
									<div>
										<p className='text-sm font-medium'>Telefon</p>
										<p className='text-sm text-gray-600 dark:text-gray-300'>
											{user.phone}
										</p>
									</div>
								</div>

								<div className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'>
									<Mail className='w-5 h-5 text-green-600' />
									<div>
										<p className='text-sm font-medium'>Email</p>
										<p className='text-sm text-gray-600 dark:text-gray-300'>
											{user.email}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Karta ma'lumoti */}
						<Card className='shadow-lg'>
							<CardHeader>
								<CardTitle className='flex items-center gap-2'>
									<CreditCard className='w-5 h-5' />
									Karta malumoti
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='text-center py-8 text-gray-500 dark:text-gray-400'>
									<CreditCard className='w-12 h-12 mx-auto mb-3 opacity-50' />
									<p>Malumot yoq</p>
								</div>
							</CardContent>
						</Card>

						{/* Status */}
						<Card className='shadow-lg'>
							<CardHeader>
								<CardTitle>Status</CardTitle>
							</CardHeader>
							<CardContent>
								<Badge
									variant={user.isActive ? 'default' : 'destructive'}
									className='w-full justify-center py-2'
								>
									{user.isActive ? 'Faol' : 'Nofaol'}
								</Badge>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserIDpage
