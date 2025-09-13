'use client'
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from '@/app/[locale]/components/ui/table'
import { Button } from '@/components/ui/button'
import { downloadImage } from '@/lib/utils'
import { BOOK_CATEGORIES, useBookStore } from '@/store/book'
import { BookOpen, Building2, Search, Sparkles, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { BooksPagination } from './_components/books-pagination'

export default function BooksPage() {
	// Store dan kerakli narsalarni olamiz
	const {
		books,
		loading,
		error,
		currentCategory,
		totalCount,
		fetchBooks,
		setCategory,
	} = useBookStore()

	// Komponent yuklanganda kitoblarni yuklab olamiz
	useEffect(() => {
		fetchBooks(currentCategory)
	}, [])

	// Kategoriya nomlarini olish
	const getCategoryName = (category: number) => {
		switch (category) {
			case BOOK_CATEGORIES.literature:
				return 'Badiiy adabiyot'
			case BOOK_CATEGORIES.monographs:
				return 'Monografiyalar'
			case BOOK_CATEGORIES.dissertation:
				return 'Dissertatsiyalar'
			case BOOK_CATEGORIES.article:
				return 'Maqolalar'
			default:
				return 'Kitoblar'
		}
	}

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
							Kitoblar yuklanmoqda...
						</h1>
					</div>
				</div>

				{/* Loading Content */}
				<div className='p-6 -mt-8 relative z-10'>
					<div className='bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 p-6 animate-pulse'>
						<div className='space-y-4'>
							{[...Array(5)].map((_, index) => (
								<div key={index} className='flex items-center space-x-4'>
									<div className='w-16 h-20 bg-slate-200 dark:bg-slate-700 rounded'></div>
									<div className='flex-1 space-y-2'>
										<div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4'></div>
										<div className='h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2'></div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900'>
				{/* Hero Section */}
				<div className='w-full h-[20vh] bg-gradient-to-r from-red-600 via-orange-600 to-red-800 dark:from-red-700 dark:via-orange-700 dark:to-red-900 flex items-center justify-center relative overflow-hidden'>
					<div className='absolute inset-0'>
						<div className='absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float'></div>
						<div className='absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float-delayed'></div>
					</div>
					<div className='relative z-10 text-center'>
						<div className='flex items-center justify-center mb-4'>
							<BookOpen className='w-8 h-8 text-white mr-3' />
							<Sparkles className='w-8 h-8 text-white animate-pulse' />
						</div>
						<h1 className='text-3xl font-bold text-white drop-shadow-lg'>
							Xatolik yuz berdi
						</h1>
					</div>
				</div>

				{/* Error State */}
				<div className='flex items-center justify-center p-12 -mt-8 relative z-10'>
					<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 p-12 text-center max-w-md'>
						<div className='w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 rounded-full flex items-center justify-center'>
							<BookOpen className='w-10 h-10 text-red-500 dark:text-red-400' />
						</div>
						<h3 className='text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-3'>
							Xatolik yuz berdi
						</h3>
						<p className='text-slate-500 dark:text-slate-400 mb-6'>{error}</p>
						<Button
							onClick={() => fetchBooks(currentCategory)}
							className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
						>
							Qayta urinish
						</Button>
					</div>
				</div>
			</div>
		)
	}

	if (books.length === 0) {
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
							<BookOpen className='w-8 h-8 text-white mr-3' />
							<Sparkles className='w-8 h-8 text-white animate-pulse' />
						</div>
						<h1 className='text-3xl font-bold text-white drop-shadow-lg'>
							{getCategoryName(currentCategory)}
						</h1>
					</div>
				</div>

				{/* Empty State */}
				<div className='flex items-center justify-center p-12 -mt-8 relative z-10'>
					<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 p-12 text-center max-w-md'>
						<div className='w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center'>
							<BookOpen className='w-10 h-10 text-slate-400 dark:text-slate-500' />
						</div>
						<h3 className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3'>
							Kitoblar topilmadi
						</h3>
						<p className='text-slate-500 dark:text-slate-400'>
							Ushbu kategoriyada hozircha kitoblar mavjud emas
						</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900'>
			{/* Hero Section */}
			<div className='w-full h-[20vh] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-700 dark:via-purple-700 dark:to-indigo-900 flex items-center justify-center relative overflow-hidden'>
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
						<BookOpen className='w-8 h-8 text-white mr-3' />
						<Sparkles className='w-8 h-8 text-white animate-pulse' />
					</div>
					<h1 className='text-4xl font-bold text-white drop-shadow-lg'>
						Kutubxona Kitoblari
					</h1>
					<p className='text-white/80 mt-2 text-lg'>
						{getCategoryName(currentCategory)} bo&apos;limi
					</p>
				</div>
			</div>

			{/* Main Content */}
			<div className='p-6 -mt-8 relative z-10'>
				{/* Statistics and Categories */}
				<div className='mb-6 animate-slide-in-up'>
					<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 p-6'>
						<div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6'>
							{/* Statistics */}
							<div className='flex items-center gap-4'>
								<div className='w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center'>
									<TrendingUp className='w-6 h-6 text-indigo-600 dark:text-indigo-400' />
								</div>
								<div>
									<h3 className='text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
										Jami kitoblar soni
									</h3>
								</div>
								<div className='text-right'>
									<p className='text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
										{totalCount || 0}
									</p>
									<p className='text-sm text-slate-500 dark:text-slate-400'>
										dona
									</p>
								</div>
							</div>

							{/* Categories */}
							<div className='flex flex-wrap gap-2'>
								<Button
									onClick={() => setCategory(BOOK_CATEGORIES.literature)}
									variant={
										currentCategory === BOOK_CATEGORIES.literature
											? 'default'
											: 'outline'
									}
									className={`transition-all duration-200 ${
										currentCategory === BOOK_CATEGORIES.literature
											? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg'
											: 'border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950 dark:hover:to-purple-950'
									}`}
								>
									<BookOpen className='w-4 h-4 mr-2' />
									Badiiy adabiyot
								</Button>
								<Button
									onClick={() => setCategory(BOOK_CATEGORIES.monographs)}
									variant={
										currentCategory === BOOK_CATEGORIES.monographs
											? 'default'
											: 'outline'
									}
									className={`transition-all duration-200 ${
										currentCategory === BOOK_CATEGORIES.monographs
											? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg'
											: 'border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950 dark:hover:to-purple-950'
									}`}
								>
									<Building2 className='w-4 h-4 mr-2' />
									Monografiyalar
								</Button>
								<Button
									onClick={() => setCategory(BOOK_CATEGORIES.dissertation)}
									variant={
										currentCategory === BOOK_CATEGORIES.dissertation
											? 'default'
											: 'outline'
									}
									className={`transition-all duration-200 ${
										currentCategory === BOOK_CATEGORIES.dissertation
											? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg'
											: 'border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950 dark:hover:to-purple-950'
									}`}
								>
									<Search className='w-4 h-4 mr-2' />
									Dissertatsiyalar
								</Button>
								<Button
									onClick={() => setCategory(BOOK_CATEGORIES.article)}
									variant={
										currentCategory === BOOK_CATEGORIES.article
											? 'default'
											: 'outline'
									}
									className={`transition-all duration-200 ${
										currentCategory === BOOK_CATEGORIES.article
											? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg'
											: 'border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950 dark:hover:to-purple-950'
									}`}
								>
									<BookOpen className='w-4 h-4 mr-2' />
									Maqolalar
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Table Container */}
				<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 overflow-hidden animate-slide-in-up'>
					<div className='max-w-full overflow-x-auto'>
						<div className='min-w-[1000px]'>
							<Table>
								{/* Table Header */}
								<TableHeader className='bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-b border-indigo-200/50 dark:border-indigo-800/50'>
									<TableRow>
										<TableCell
											isHeader
											className='px-6 py-4 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm w-24'
										>
											Rasm
										</TableCell>
										<TableCell
											isHeader
											className='px-6 py-4 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											Kitob nomi
										</TableCell>
										<TableCell
											isHeader
											className='px-6 py-4 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											Soni
										</TableCell>
										<TableCell
											isHeader
											className='px-6 py-4 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											Narxi
										</TableCell>
										<TableCell
											isHeader
											className='px-6 py-4 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											Nashriyot
										</TableCell>
										<TableCell
											isHeader
											className='px-6 py-4 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											Nashr yili
										</TableCell>
									</TableRow>
								</TableHeader>

								{/* Table Body */}
								<TableBody className='divide-y divide-slate-200/50 dark:divide-slate-700/50'>
									{books.map(book => (
										<TableRow
											key={book.id}
											className='group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-950/50 dark:hover:to-purple-950/50 transition-all duration-300 cursor-pointer'
										>
											<TableCell className='px-6 py-4'>
												<div className='w-16 h-20 overflow-hidden rounded-lg shadow-md ring-2 ring-slate-200 dark:ring-slate-700 group-hover:ring-indigo-300 dark:group-hover:ring-indigo-600 transition-all duration-300'>
													<Image
														src={downloadImage({
															id: book.coverImage.id,
															quality: 'low',
														})}
														alt={book.title}
														width={64}
														height={80}
														className='w-full h-full object-cover'
													/>
												</div>
											</TableCell>
											<TableCell className='px-6 py-4'>
												<Link href={`/books/${book.id}`} className='block'>
													<div className='font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-colors duration-300 line-clamp-2'>
														{book.title}
													</div>
													{book.description && (
														<p className='text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-1'>
															{book.description}
														</p>
													)}
												</Link>
											</TableCell>
											<TableCell className='px-6 py-4'>
												<div className='text-sm font-mono font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300'>
													{book.book_Copy_Count}
												</div>
											</TableCell>
											<TableCell className='px-6 py-4'>
												<div className='text-sm font-mono font-bold text-slate-700 dark:text-slate-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300'>
													{book.book_Price.toLocaleString()}
												</div>
											</TableCell>
											<TableCell className='px-6 py-4'>
												<div className='text-sm text-slate-700 dark:text-slate-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300'>
													{book.publisher}
												</div>
											</TableCell>
											<TableCell className='px-6 py-4'>
												<div className='text-sm font-mono text-slate-700 dark:text-slate-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300'>
													{book.publish_Date}
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				</div>

				{/* Pagination */}
				<div className='mt-6 animate-slide-in-up'>
					<BooksPagination />
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

				.line-clamp-1 {
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.line-clamp-2 {
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			`}</style>
		</div>
	)
}
