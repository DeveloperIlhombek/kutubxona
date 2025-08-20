'use client'
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from '@/app/[locale]/components/ui/table'
import { Button } from '@/components/ui/button'
import { getLanguagePrefix } from '@/lib/utils'
import { useJournalStore } from '@/store/journal'
import { Globe, PlusSquare, Sparkles, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Pagination from '../../_components/pagination'

function JournalPage() {
	const pathname = usePathname()
	const {
		journal,
		loading,
		error,
		pageNumber,
		pageSize,
		totalCount,
		totalPages,
		setPageNumber,
		setPageSize,
		fetchJournals,
	} = useJournalStore()

	// const [deletingAncient, setDeletingAncient] = useState<{
	// 	id: string
	// 	work_name: string
	// } | null>(null)

	useEffect(() => {
		fetchJournals(pageNumber, pageSize)
	}, [pageNumber, pageSize])

	const handlePageChange = (newPage: number, newPageSize?: number) => {
		if (newPageSize && newPageSize !== pageSize) {
			setPageSize(newPageSize)
		}
		setPageNumber(newPage)
	}

	// const handleDelete = async () => {
	// 	if (deletingAncient) {
	// 		const success = await deleteExistingAncient(deletingAncient.id)
	// 		if (success) {
	// 			setDeletingAncient(null)
	// 		}
	// 	}
	// }
	const lang = getLanguagePrefix(pathname)
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
							Jurnallar ro&apos;yxati yuklanmoqda...
						</h1>
					</div>
				</div>

				{/* Loading Content */}
				<div className='p-6 -mt-8 relative z-10'>
					<div className='bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 p-6 animate-pulse'>
						<div className='space-y-4'>
							{[...Array(5)].map((_, index) => (
								<div key={index} className='flex items-center space-x-4'>
									<div className='w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full'></div>
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
			<div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900 flex items-center justify-center'>
				Error
			</div>
		)
	}
	if (totalCount === 0) {
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
							<Globe className='w-8 h-8 text-white mr-3' />
							<Sparkles className='w-8 h-8 text-white animate-pulse' />
						</div>
						<h1 className='text-3xl font-bold text-white drop-shadow-lg'>
							Jurnallar ro&apos;yxati
						</h1>
					</div>
				</div>

				{/* Empty State */}
				<div className='flex items-center justify-center p-12 -mt-8 relative z-10'>
					<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 p-12 text-center max-w-md'>
						<div className='w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center'>
							<Globe className='w-10 h-10 text-slate-400 dark:text-slate-500' />
						</div>
						<h3 className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3'>
							Jurnallar mavjud emas
						</h3>
						<p className='text-slate-500 dark:text-slate-400 mb-6'>
							Hozircha tizimda Jurnallar ro&apos;yxati bo&apos;sh
						</p>
						<Link href='/ancient/create'>
							<Button className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105'>
								<PlusSquare className='w-4 h-4 mr-2' />
								Birinchi jurnalni qo&apo;shish
							</Button>
						</Link>
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
						<Globe className='w-8 h-8 text-white mr-3' />
						<Sparkles className='w-8 h-8 text-white animate-pulse' />
					</div>
					<h1 className='text-4xl font-bold text-white drop-shadow-lg'>
						Jurnallar ro&apos;yxati
					</h1>
					<p className='text-white/80 mt-2 text-lg'>
						Tizim Jurnallar boshqaruvi
					</p>
				</div>
			</div>

			{/* Main Content */}
			<div className='p-6 -mt-8 relative z-10'>
				{/* Statistics and Add Button */}
				<div className='mb-6 animate-slide-in-up'>
					<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 p-6'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-4'>
								<div className='w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center'>
									<TrendingUp className='w-6 h-6 text-indigo-600 dark:text-indigo-400' />
								</div>
								<div>
									<h3 className='text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
										Jami jurnallar soni
									</h3>
									<p className='text-slate-600 dark:text-slate-400'>
										Tizimda ro&apos;yxatdan o&apos;tgan
									</p>
								</div>
							</div>
							<div className='flex items-center gap-4'>
								<div className='text-right'>
									<p className='text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
										{totalCount || 0}
									</p>
									<p className='text-sm text-slate-500 dark:text-slate-400'>
										Jurnallar
									</p>
								</div>
								<Link href='/ancient/create'>
									<Button className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105'>
										<PlusSquare className='w-4 h-4 mr-2' />
										Yaratish
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Table Container */}
				<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 overflow-hidden animate-slide-in-up'>
					<div className='max-w-full overflow-x-auto'>
						<div className='min-w-[800px]'>
							<Table>
								{/* Table Header */}
								<TableHeader className='bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-b border-indigo-200/50 dark:border-indigo-800/50'>
									<TableRow>
										<TableCell
											isHeader
											className='px-4 py-4 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											#
										</TableCell>
										<TableCell
											isHeader
											className='px-6 py-4 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											Jurnal nomi
										</TableCell>
									</TableRow>
								</TableHeader>

								{/* Table Body */}
								<TableBody className='divide-y divide-slate-200/50 dark:divide-slate-700/50'>
									{journal.map((item, index) => (
										<TableRow key={item.id}>
											<TableCell className='px-4 py-4 text-slate-700 dark:text-slate-300 font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300 w-12'>
												{pageNumber * pageSize + index + 1}
											</TableCell>

											<TableCell className='px-6 py-4'>
												<Link
													href={`${lang}/admin/journal-manager/journals/${item.id}`}
												>
													<div className=' text-slate-800 dark:text-slate-200 group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-colors duration-300'>
														{item.name}
													</div>
												</Link>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				</div>

				{/* Pagination */}
				{journal && (
					<div className='mt-6 animate-slide-in-up'>
						<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg border border-slate-200/60 dark:border-slate-700/60 p-4'>
							<Pagination
								currentPage={pageNumber}
								totalPages={totalPages}
								totalItems={totalCount}
								pageSize={pageSize}
								onPageChange={handlePageChange}
							/>
						</div>
					</div>
				)}
			</div>

			{/* Delete Country Dialog */}
			{/* <DeleteAncientDialog
				open={!!deletingAncient}
				onOpenChange={open => !open && setDeletingAncient(null)}
				coutryId={deletingAncient?.id || ''}
				coutryName={deletingAncient?.work_name || ''}
				onSuccess={handleDelete}
			/> */}

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

				@keyframes table-row {
					from {
						opacity: 0;
						transform: translateX(-20px);
					}
					to {
						opacity: 1;
						transform: translateX(0);
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

				.animate-table-row {
					animation: table-row 0.6s ease-out forwards;
					opacity: 0;
				}
			`}</style>
		</div>
	)
}

export default JournalPage
