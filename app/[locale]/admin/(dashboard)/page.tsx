'use client'

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { getDashboard } from '@/lib/dashboard'
import { useAuthStore } from '@/store/auth'
import { IDashboard } from '@/types'
import { BookOpen, Building2, Sparkles, TrendingUp, Users2 } from 'lucide-react'
import { useEffect, useState } from 'react'

function DashboardPage() {
	const [dashboardData, setDashboardData] = useState<IDashboard>()
	const [isLoading, setIsLoading] = useState(true)
	const { user } = useAuthStore()

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				setIsLoading(true)
				const response = await getDashboard()
				setDashboardData(response?.result)
			} catch (error) {
				console.error('Error fetching dashboard data:', error)
			} finally {
				// Add a small delay to show the loading animation
				setTimeout(() => setIsLoading(false), 800)
			}
		}
		fetchDashboardData()
	}, [])

	if (isLoading) {
		return (
			<div className='min-w-full min-h-screen bg-gradient-to-br from-slate-50 to-gray-100'>
				{/* Loading Hero Section */}
				<div className='w-full h-[25vh] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 flex items-center justify-center relative overflow-hidden'>
					<div className='absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 animate-pulse'></div>
					<div className='relative z-10 text-center'>
						<div className='w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center animate-spin'>
							<Sparkles className='w-8 h-8 text-white' />
						</div>
						<div className='h-8 w-64 bg-white/20 rounded-lg animate-pulse'></div>
					</div>
				</div>

				{/* Loading Cards */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6'>
					{[...Array(4)].map((_, index) => (
						<div
							key={index}
							className='bg-white rounded-xl shadow-lg border border-slate-200/60 p-6 animate-pulse'
							style={{
								animationDelay: `${index * 150}ms`,
							}}
						>
							<div className='space-y-4'>
								<div className='h-6 bg-slate-200 rounded-lg'></div>
								<div className='h-12 bg-slate-200 rounded-lg'></div>
								<div className='flex justify-between items-center'>
									<div className='h-4 w-20 bg-slate-200 rounded'></div>
									<div className='h-4 w-16 bg-slate-200 rounded'></div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	}

	return (
		<div className='min-w-full min-h-screen bg-gradient-to-br from-slate-50 to-gray-100'>
			{/* Hero Section */}
			<div className='w-full h-[25vh] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 flex items-center justify-center relative overflow-hidden'>
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
					<div className='flex items-center justify-center mb-4'>
						<Sparkles className='w-8 h-8 text-white mr-3 animate-pulse' />
						<BookOpen className='w-8 h-8 text-white animate-bounce' />
					</div>
					<h1 className='text-4xl font-bold text-white drop-shadow-lg'>
						{user
							? `Xush kelibsiz, ${user.firstName} ${user.lastName}!`
							: 'Xush kelibsiz!'}
					</h1>
					<p className='text-white/80 mt-2 text-lg'>
						Kutubxona boshqaruv tizimi
					</p>
				</div>
			</div>

			{/* Dashboard Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 -mt-8 relative z-10'>
				{/* Main Statistics Card */}
				<Card className='group bg-gradient-to-br from-white to-slate-50 border border-slate-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-slide-in-up'>
					<div className='absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
					<CardHeader className='relative z-10  pb-3'>
						<CardTitle className='text-lg flex-col justify-center font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2'>
							<BookOpen className='w-5 h-5 text-indigo-600' />
							<h3>Tizimdagi umumiy kitoblar soni</h3>
						</CardTitle>
					</CardHeader>
					<CardContent className='relative z-10 py-6'>
						<div className='text-center'>
							<p className='text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-number-count'>
								{dashboardData?.booksCount || 0}
							</p>
							<div className='w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-3'></div>
						</div>
					</CardContent>
					<CardFooter className='relative z-10 flex flex-row items-center justify-between pt-4 border-t border-slate-200/50'>
						<p className='text-sm font-medium text-slate-600'>
							Foydalanuvchilar soni:
						</p>
						<div className='flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-1.5 rounded-full border border-emerald-200'>
							<Users2 className='w-4 h-4 mr-2 text-emerald-600' />
							<span className='text-lg font-bold text-emerald-700'>
								{dashboardData?.usersCount || 0} nafar
							</span>
						</div>
					</CardFooter>
				</Card>

				{/* Building Cards */}
				{dashboardData?.widgets.slice(0, -1).map((widget, index) => (
					<Card
						key={widget.id}
						className='group bg-gradient-to-br from-white to-slate-50 border border-slate-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-slide-in-up'
						style={{
							animationDelay: `${(index + 1) * 150}ms`,
						}}
					>
						<div className='absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
						<CardHeader className='relative z-10 pb-3'>
							<CardTitle className='text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2'>
								<Building2 className='w-5 h-5 text-indigo-600' />
								{widget.buildingName}
							</CardTitle>
						</CardHeader>
						<CardContent className='relative z-10 py-6'>
							<div className='text-center space-y-3'>
								<p className='text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-number-count'>
									{widget.bookCountByBuilding}
								</p>
								<div className='w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto'></div>
								<p className='text-sm font-medium text-slate-600 bg-gradient-to-r from-slate-50 to-indigo-50 px-3 py-1 rounded-full border border-slate-200'>
									Binodagi kitoblar soni
								</p>
							</div>
						</CardContent>
						<CardFooter className='relative z-10 flex flex-row items-center justify-between pt-4 border-t border-slate-200/50'>
							<p className='text-sm font-medium text-slate-600 flex items-center gap-1'>
								<TrendingUp className='w-4 h-4' />
								Kirganlar soni:
							</p>
							<div className='flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-1.5 rounded-full border border-emerald-200'>
								<Users2 className='w-4 h-4 mr-2 text-emerald-600' />
								<span className='text-lg font-bold text-emerald-700'>
									{widget.attedanceByBuilding} nafar
								</span>
							</div>
						</CardFooter>
					</Card>
				))}
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
						transform: translateY(50px) scale(0.9);
					}
					to {
						opacity: 1;
						transform: translateY(0) scale(1);
					}
				}

				@keyframes number-count {
					from {
						transform: scale(0.5);
						opacity: 0;
					}
					to {
						transform: scale(1);
						opacity: 1;
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

				.animate-number-count {
					animation: number-count 1s ease-out 0.5s forwards;
				}
			`}</style>
		</div>
	)
}

export default DashboardPage
