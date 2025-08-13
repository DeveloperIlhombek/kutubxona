'use client'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useBookStore } from '@/store/book'
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from 'lucide-react'

export function BooksPagination() {
	const {
		pageNumber,
		totalPages,
		totalCount,
		loading,
		fetchBooks,
		currentCategory,
		pageSize,
		pageSizeOptions,
		setPage,
		setPageSize,
	} = useBookStore()

	// Sahifani o'zgartirish funksiyasi
	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages && newPage !== pageNumber) {
			setPage(newPage)
			fetchBooks(currentCategory, newPage, pageSize)
		}
	}

	const handlePageSizeChange = (newSize: string) => {
		setPageSize(Number(newSize))
	}

	// Pagination tugmalarini generatsiya qilish
	const renderPageNumbers = () => {
		const pages = []
		const maxVisiblePages = 5 // Ko'rinadigan maksimal sahifalar soni

		const startPage = Math.max(1, pageNumber - Math.floor(maxVisiblePages / 2))
		const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

		// Birinchi sahifaga o'tish
		if (pageNumber > Math.floor(maxVisiblePages / 2) + 1) {
			pages.push(
				<Button
					key='first'
					variant='outline'
					size='sm'
					onClick={() => handlePageChange(1)}
					disabled={loading || pageNumber === 1}
					className='border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950 dark:hover:to-purple-950 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200'
				>
					<ChevronsLeft className='h-4 w-4' />
				</Button>
			)
		}

		// Oldingi sahifa
		pages.push(
			<Button
				key='prev'
				variant='outline'
				size='sm'
				onClick={() => handlePageChange(pageNumber - 1)}
				disabled={loading || pageNumber === 1}
				className='border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950 dark:hover:to-purple-950 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200'
			>
				<ChevronLeft className='h-4 w-4' />
			</Button>
		)

		// Agar boshlang'ich sahifa 1dan katta bo'lsa, "..." qo'shamiz
		if (startPage > 1) {
			pages.push(
				<span
					key='start-ellipsis'
					className='px-3 py-2 text-slate-500 dark:text-slate-400'
				>
					...
				</span>
			)
		}

		// Sahifa raqamlari
		for (let i = startPage; i <= endPage; i++) {
			pages.push(
				<Button
					key={i}
					variant={i === pageNumber ? 'default' : 'outline'}
					size='sm'
					onClick={() => handlePageChange(i)}
					disabled={loading}
					className={
						i === pageNumber
							? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg border-0'
							: 'border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950 dark:hover:to-purple-950 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200'
					}
				>
					{i}
				</Button>
			)
		}

		// Agar oxirgi sahifa umumiy sahifalardan kichik bo'lsa, "..." qo'shamiz
		if (endPage < totalPages) {
			pages.push(
				<span
					key='end-ellipsis'
					className='px-3 py-2 text-slate-500 dark:text-slate-400'
				>
					...
				</span>
			)
		}

		// Keyingi sahifa
		pages.push(
			<Button
				key='next'
				variant='outline'
				size='sm'
				onClick={() => handlePageChange(pageNumber + 1)}
				disabled={loading || pageNumber === totalPages}
				className='border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950 dark:hover:to-purple-950 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200'
			>
				<ChevronRight className='h-4 w-4' />
			</Button>
		)

		// Oxirgi sahifaga o'tish
		if (pageNumber < totalPages - Math.floor(maxVisiblePages / 2)) {
			pages.push(
				<Button
					key='last'
					variant='outline'
					size='sm'
					onClick={() => handlePageChange(totalPages)}
					disabled={loading || pageNumber === totalPages}
					className='border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950 dark:hover:to-purple-950 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200'
				>
					<ChevronsRight className='h-4 w-4' />
				</Button>
			)
		}

		return pages
	}

	// Sahifa ma'lumotlarini hisoblash
	const startItem = (pageNumber - 1) * pageSize + 1
	const endItem = Math.min(pageNumber * pageSize, totalCount)

	return (
		<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg border border-slate-200/60 dark:border-slate-700/60 p-6'>
			<div className='flex flex-col lg:flex-row items-center justify-between gap-6'>
				{/* Ma'lumotlar va sahifa hajmi */}
				<div className='flex flex-col sm:flex-row items-center gap-4'>
					{/* Sahifa ma'lumotlari */}
					<div className='text-sm text-slate-600 dark:text-slate-400'>
						<span className='font-medium text-slate-800 dark:text-slate-200'>
							{startItem}-{endItem}
						</span>{' '}
						dan{' '}
						<span className='font-medium text-slate-800 dark:text-slate-200'>
							{totalCount}
						</span>{' '}
						gacha ko&apos;rsatilmoqda
					</div>

					{/* Sahifa hajmini tanlash */}
					<div className='flex items-center gap-2'>
						<span className='text-sm text-slate-600 dark:text-slate-400'>
							Sahifada:
						</span>
						<Select
							value={pageSize.toString()}
							onValueChange={handlePageSizeChange}
							disabled={loading}
						>
							<SelectTrigger className='w-20 h-8 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 focus:ring-indigo-500 dark:focus:ring-indigo-400'>
								<SelectValue placeholder={pageSize} />
							</SelectTrigger>
							<SelectContent className='bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl'>
								{pageSizeOptions.map(size => (
									<SelectItem
										key={size}
										value={size.toString()}
										className='hover:bg-indigo-50 dark:hover:bg-indigo-950 focus:bg-indigo-50 dark:focus:bg-indigo-950'
									>
										{size}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Pagination tugmalari */}
				<div className='flex items-center gap-1'>{renderPageNumbers()}</div>

				{/* Sahifa ma'lumotlari */}
				<div className='text-sm text-slate-600 dark:text-slate-400 font-medium'>
					<span className='bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold'>
						{pageNumber}
					</span>{' '}
					/{' '}
					<span className='bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold'>
						{totalPages}
					</span>{' '}
					sahifa
				</div>
			</div>
		</div>
	)
}
