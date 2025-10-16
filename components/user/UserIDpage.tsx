'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getUserById } from '@/lib/users/userId'
import { downloadImage } from '@/lib/utils'
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
	Sparkles,
	User,
	Users,
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

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
				setTimeout(() => setLoading(false), 800)
			}
		}

		if (userid) {
			fetchUser()
		}
	}, [userid])

	if (loading) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900'>
				{/* Loading Hero Section */}
				<div className='w-full h-[20vh] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-700 dark:via-purple-700 dark:to-indigo-900 flex items-center justify-center relative overflow-hidden'>
					<div className='absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 animate-pulse'></div>
					<div className='relative z-10 text-center'>
						<div className='w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center animate-spin'>
							<Sparkles className='w-8 h-8 text-white' />
						</div>
						<h1 className='text-3xl font-bold text-white drop-shadow-lg'>
							Foydalanuvchi ma&apos;lumotlari yuklanmoqda...
						</h1>
					</div>
				</div>

				{/* Loading Content */}
				<div className='p-6 -mt-8 relative z-10'>
					<div className='max-w-7xl mx-auto'>
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
							{/* Loading Cards */}
							{[...Array(6)].map((_, index) => (
								<div
									key={index}
									className='bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 p-6 animate-pulse'
									style={{
										animationDelay: `${index * 150}ms`,
									}}
								>
									<div className='space-y-4'>
										<div className='h-6 bg-slate-200 dark:bg-slate-700 rounded-lg'></div>
										<div className='h-12 bg-slate-200 dark:bg-slate-700 rounded-lg'></div>
										<div className='flex justify-between items-center'>
											<div className='h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded'></div>
											<div className='h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded'></div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (!user) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900'>
				{/* Hero Section */}
				<div className='w-full h-[20vh] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-700 dark:via-purple-700 dark:to-indigo-900 flex items-center justify-center relative overflow-hidden'>
					<div className='absolute inset-0'>
						<div className='absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float'></div>
						<div className='absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float-delayed'></div>
					</div>
					<div className='relative z-10 text-center'>
						<div className='flex items-center justify-center mb-4'>
							<Users className='w-8 h-8 text-white mr-3' />
							<Sparkles className='w-8 h-8 text-white animate-pulse' />
						</div>
						<h1 className='text-3xl font-bold text-white drop-shadow-lg'>
							Foydalanuvchi ma&apos;lumotlari
						</h1>
					</div>
				</div>

				{/* Empty State */}
				<div className='flex items-center justify-center p-12 -mt-8 relative z-10'>
					<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 p-12 text-center max-w-md'>
						<div className='w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center'>
							<Users className='w-10 h-10 text-slate-400 dark:text-slate-500' />
						</div>
						<h3 className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3'>
							Foydalanuvchi topilmadi
						</h3>
						<p className='text-slate-500 dark:text-slate-400'>
							Ushbu ID bilan foydalanuvchi mavjud emas
						</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900'>
			{/* Hero Section */}
			<div className='w-full h-[25vh] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-700 dark:via-purple-700 dark:to-indigo-900 flex items-center justify-center relative overflow-hidden'>
				{/* Animated background elements */}
				<div className='absolute inset-0'>
					<div className='absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float'></div>
					<div className='absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float-delayed'></div>
					<div className='absolute bottom-10 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float'></div>
					<div className='absolute bottom-20 right-1/3 w-14 h-14 bg-white/10 rounded-full animate-float-delayed'></div>
				</div>

				{/* Gradient overlay */}
				<div className='absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20'></div>

				{/* Content */}
				<div className='relative z-10 text-center animate-fade-in-up'>
					<div className='w-32 h-32 mx-auto mb-1 overflow-hidden rounded-full border-4 border-white/30 shadow-2xl ring-4 ring-white/20 '>
						{user.userPhotoId && user.userPhotoId !== '' ? (
							<Image
								width={96}
								height={96}
								src={downloadImage({
									id: user.userPhotoId,
									quality: 'low',
								})}
								alt={`${user.firstName}`}
								className='w-full h-full object-cover hover:scale-105'
							/>
						) : (
							<User className='w-full h-full text-white/50 bg-white/10' />
						)}
					</div>

					<h1 className='text-4xl font-bold text-white drop-shadow-lg mb-0'>
						{user.firstName} {user.lastName}
					</h1>
					<p className='text-white/80 text-lg'>
						{user.faculty?.name} • {user.group || "Guruh ko'rsatilmagan"}
					</p>
				</div>
			</div>

			{/* Content Section */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10'>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* Left Column */}
					<div className='lg:col-span-2 space-y-6'>
						{/* Umumiy ma'lumotlar */}
						<Card className='group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/60 dark:border-slate-700/60 shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-in-up'>
							<div className='absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
							<CardHeader className='relative z-10'>
								<CardTitle className='text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2'>
									<User className='w-6 h-6 text-indigo-600' />
									Umumiy ma&apos;lumotlar
								</CardTitle>
							</CardHeader>
							<CardContent className='relative z-10'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
									<div className='space-y-4'>
										<div className='flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-950 rounded-xl border border-slate-200 dark:border-slate-700'>
											<div className='w-12 h-12 overflow-hidden rounded-full ring-2 ring-indigo-200 dark:ring-indigo-800'>
												<Image
													width={48}
													height={48}
													src={'/images/user/user-01.jpg'}
													alt={`${user.firstName} ${user.lastName}`}
													className='w-full h-full object-cover'
												/>
											</div>
											<div>
												<p className='font-semibold text-lg text-slate-800 dark:text-slate-200'>
													{user.firstName} {user.lastName}
												</p>
												{user.thirdName && (
													<p className='text-slate-600 dark:text-slate-400'>
														{user.thirdName}
													</p>
												)}
											</div>
										</div>
									</div>

									<div className='space-y-3'>
										<div className='flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-950 rounded-lg border border-slate-200 dark:border-slate-700'>
											<GraduationCap className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
											<div>
												<span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
													Fakultet:
												</span>
												<p className='text-sm text-slate-600 dark:text-slate-400'>
													{user.faculty?.name}
												</p>
											</div>
										</div>

										<div className='flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-emerald-50 dark:from-slate-800 dark:to-emerald-950 rounded-lg border border-slate-200 dark:border-slate-700'>
											<User className='w-5 h-5 text-emerald-600 dark:text-emerald-400' />
											<div>
												<span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
													Guruh:
												</span>
												<p className='text-sm text-slate-600 dark:text-slate-400'>
													{user.group || "Ma'lumot yo'q"}
												</p>
											</div>
										</div>

										<div className='flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-purple-50 dark:from-slate-800 dark:to-purple-950 rounded-lg border border-slate-200 dark:border-slate-700'>
											<Hash className='w-5 h-5 text-purple-600 dark:text-purple-400' />
											<div>
												<span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
													Hemis ID:
												</span>
												<p className='text-sm font-mono text-slate-600 dark:text-slate-400'>
													{user.hemisId || "Ma'lumot yo'q"}
												</p>
											</div>
										</div>

										<div className='flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-orange-50 dark:from-slate-800 dark:to-orange-950 rounded-lg border border-slate-200 dark:border-slate-700'>
											<ActivitySquare className='w-5 h-5 text-orange-600 dark:text-orange-400' />
											<div className='flex items-center gap-2'>
												<span className='text-sm font-medium text-slate-700 dark:text-slate-300'>
													Faol:
												</span>
												{user.isActive ? (
													<div className='flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800'>
														<CheckCircle className='w-4 h-4 text-emerald-600 dark:text-emerald-400' />
														<span className='text-sm font-medium text-emerald-700 dark:text-emerald-300'>
															Faol
														</span>
													</div>
												) : (
													<div className='flex items-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 px-3 py-1.5 rounded-full border border-red-200 dark:border-red-800'>
														<AlertCircle className='w-4 h-4 text-red-600 dark:text-red-400' />
														<span className='text-sm font-medium text-red-700 dark:text-red-300'>
															Nofaol
														</span>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Books Section */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{/* Allowed Books */}
							<Card className='group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/60 dark:border-slate-700/60 shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-in-up'>
								<div className='absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
								<CardHeader className='relative z-10'>
									<CardTitle className='text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2'>
										<BookOpen className='w-5 h-5 text-indigo-600' />
										Ruxsat etilgan kitoblar
									</CardTitle>
								</CardHeader>
								<CardContent className='relative z-10'>
									<div className='text-center py-8 text-slate-500 dark:text-slate-400'>
										<BookOpen className='w-12 h-12 mx-auto mb-3 opacity-50' />
										<p>Ma&apos;lumot yo&apos;q</p>
									</div>
								</CardContent>
							</Card>

							{/* Rented Books */}
							<Card className='group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/60 dark:border-slate-700/60 shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-in-up'>
								<div className='absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
								<CardHeader className='relative z-10'>
									<CardTitle className='text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-2'>
										<BookMarked className='w-5 h-5 text-emerald-600' />
										Ijaraga olingan kitoblar
									</CardTitle>
								</CardHeader>
								<CardContent className='relative z-10'>
									<div className='text-center py-8 text-slate-500 dark:text-slate-400'>
										<BookMarked className='w-12 h-12 mx-auto mb-3 opacity-50' />
										<p>Ma&apos;lumot yo&apos;q</p>
									</div>
								</CardContent>
							</Card>

							{/* Not Returned Books */}
							<Card className='group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/60 dark:border-slate-700/60 shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-in-up'>
								<div className='absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
								<CardHeader className='relative z-10'>
									<CardTitle className='text-lg font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-2'>
										<AlertCircle className='w-5 h-5 text-red-600' />
										Qaytarilmagan kitoblar
									</CardTitle>
								</CardHeader>
								<CardContent className='relative z-10'>
									<div className='text-center py-8 text-slate-500 dark:text-slate-400'>
										<AlertCircle className='w-12 h-12 mx-auto mb-3 opacity-50' />
										<p>Ma&apos;lumot yo&apos;q</p>
									</div>
								</CardContent>
							</Card>

							{/* Returned Books */}
							<Card className='group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/60 dark:border-slate-700/60 shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-in-up'>
								<div className='absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
								<CardHeader className='relative z-10'>
									<CardTitle className='text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-2'>
										<CheckCircle className='w-5 h-5 text-emerald-600' />
										Qaytarilgan kitoblar
									</CardTitle>
								</CardHeader>
								<CardContent className='relative z-10'>
									<div className='text-center py-8 text-slate-500 dark:text-slate-400'>
										<CheckCircle className='w-12 h-12 mx-auto mb-3 opacity-50' />
										<p>Ma&apos;lumot yo&apos;q</p>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Right Column */}
					<div className='space-y-6'>
						{/* Aloqa */}
						<Card className='group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/60 dark:border-slate-700/60 shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-in-up'>
							<div className='absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
							<CardHeader className='relative z-10'>
								<CardTitle className='text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2'>
									<Mail className='w-6 h-6 text-indigo-600' />
									Aloqa ma&apos;lumotlari
								</CardTitle>
							</CardHeader>
							<CardContent className='relative z-10 space-y-4'>
								<div className='flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-950 rounded-xl border border-slate-200 dark:border-slate-700 group-hover:border-indigo-300 dark:group-hover:border-indigo-700 transition-colors duration-300'>
									<div className='w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center'>
										<Phone className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
									</div>
									<div>
										<p className='text-sm font-medium text-slate-700 dark:text-slate-300'>
											Telefon
										</p>
										<p className='text-sm text-slate-600 dark:text-slate-400 font-mono'>
											{user.phone || "Ma'lumot yo'q"}
										</p>
									</div>
								</div>

								<div className='flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-emerald-50 dark:from-slate-800 dark:to-emerald-950 rounded-xl border border-slate-200 dark:border-slate-700 group-hover:border-emerald-300 dark:group-hover:border-emerald-700 transition-colors duration-300'>
									<div className='w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-full flex items-center justify-center'>
										<Mail className='w-5 h-5 text-emerald-600 dark:text-emerald-400' />
									</div>
									<div>
										<p className='text-sm font-medium text-slate-700 dark:text-slate-300'>
											Email
										</p>
										<p className='text-sm text-slate-600 dark:text-slate-400 break-all'>
											{user.email}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Karta ma'lumoti */}
						<Card className='group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/60 dark:border-slate-700/60 shadow-xl hover:shadow-2xl transition-all duration-500 animate-slide-in-up'>
							<div className='absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
							<CardHeader className='relative z-10'>
								<CardTitle className='text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2'>
									<CreditCard className='w-6 h-6 text-purple-600' />
									Karta ma&apos;lumoti
								</CardTitle>
							</CardHeader>
							<CardContent className='relative z-10'>
								<div className='text-center py-2 text-slate-500 dark:text-slate-400'>
									<div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full flex items-center justify-center'>
										<CreditCard className='w-8 h-8 text-purple-600 dark:text-purple-400 opacity-50' />
									</div>
									<p>Ma&apos;lumot yo&apos;q</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			{/* Custom Styles */}
			<style jsx>{`
				@keyframes float {
					0%,
					100% {
						transform: translateY(0px) rotate(0deg);
					}
					50% {
						transform: translateY(-20px) rotate(180deg);
					}
				}

				@keyframes float-delayed {
					0%,
					100% {
						transform: translateY(0px) rotate(0deg);
					}
					50% {
						transform: translateY(-15px) rotate(-180deg);
					}
				}

				@keyframes fade-in-up {
					from {
						opacity: 0;
						transform: translateY(30px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes slide-in-up {
					from {
						opacity: 0;
						transform: translateY(50px) scale(0.95);
					}
					to {
						opacity: 1;
						transform: translateY(0) scale(1);
					}
				}

				.animate-float {
					animation: float 6s ease-in-out infinite;
				}

				.animate-float-delayed {
					animation: float-delayed 8s ease-in-out infinite;
				}

				.animate-fade-in-up {
					animation: fade-in-up 1s ease-out;
				}

				.animate-slide-in-up {
					animation: slide-in-up 0.8s ease-out forwards;
					opacity: 0;
				}
			`}</style>
		</div>
	)
}

export default UserIDpage
