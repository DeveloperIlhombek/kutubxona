'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

type PaginationProps = {
	currentPage: number
	totalPages: number
	totalItems: number
	pageSize: number
	onPageChange: (page: number, pageSize?: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	totalItems,
	pageSize,
	onPageChange,
}) => {
	const [rowsPerPage, setRowsPerPage] = useState(pageSize)

	useEffect(() => {
		if (rowsPerPage !== pageSize) {
			onPageChange(0, rowsPerPage) // PageSize o'zgarganda 0-pagega qaytamiz
		}
	}, [rowsPerPage])

	// Agar faqat 1 ta page bo'lsa, paginationni ko'rsatma
	if (totalPages <= 1) {
		return null
	}

	const pageNumbers = []
	const maxVisiblePages = 5 // Ko'rinadigan maksimal page soni

	// Page raqamlarini hisoblash
	let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
	const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

	// Agar kerakli page soni chiqmasa, startPageni qayta hisoblaymiz
	if (endPage - startPage + 1 < maxVisiblePages) {
		startPage = Math.max(1, endPage - maxVisiblePages + 1)
	}

	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i)
	}

	const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setRowsPerPage(Number(e.target.value))
	}

	// Itemlarni ko'rsatish (0-based index uchun)
	const startItem = currentPage * pageSize + 1
	const endItem = Math.min((currentPage + 1) * pageSize, totalItems)

	return (
		<div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-6'>
			<div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
				<span>Qatorlar soni:</span>
				<select
					value={rowsPerPage}
					onChange={handleRowsPerPageChange}
					className='rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800'
				>
					{[10, 20, 50, 100].map(size => (
						<option key={size} value={size}>
							{size}
						</option>
					))}
				</select>
				<span>
					Ko&apos;rsatilmoqda {startItem}-{endItem} dan {totalItems}
				</span>
			</div>

			<div className='flex items-center gap-1'>
				{/* Previous tugmasi */}
				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 0} // 0-pageda disable qilamiz
					className='flex h-8 items-center justify-center rounded border border-gray-300 bg-white px-2.5 text-sm text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]'
				>
					<ChevronLeft className='h-4 w-4' />
					<span className='sr-only sm:not-sr-only sm:ml-1'>Oldingi</span>
				</button>

				{/* Boshidagi page va ellipsis */}
				{startPage > 1 && (
					<>
						<button
							onClick={() => onPageChange(0)}
							className={`flex h-8 w-8 items-center justify-center rounded text-sm font-medium ${
								0 === currentPage
									? 'bg-brand-500 text-white'
									: 'text-gray-700 hover:bg-blue-500/[0.08] hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500'
							}`}
						>
							1
						</button>
						{startPage > 2 && <span className='px-1'>...</span>}
					</>
				)}

				{/* Asosiy page raqamlari */}
				{pageNumbers.map(page => (
					<button
						key={page}
						onClick={() => onPageChange(page - 1)} // 1-based to 0-based conversion
						className={`flex h-8 w-8 items-center justify-center rounded text-sm font-medium ${
							page - 1 === currentPage
								? 'bg-brand-500 text-white'
								: 'text-gray-700 hover:bg-blue-500/[0.08] hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500'
						}`}
					>
						{page}
					</button>
				))}

				{/* Oxiridagi page va ellipsis */}
				{endPage < totalPages && (
					<>
						{endPage < totalPages - 1 && <span className='px-1'>...</span>}
						<button
							onClick={() => onPageChange(totalPages - 1)} // 0-based conversion
							className={`flex h-8 w-8 items-center justify-center rounded text-sm font-medium ${
								totalPages - 1 === currentPage
									? 'bg-brand-500 text-white'
									: 'text-gray-700 hover:bg-blue-500/[0.08] hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500'
							}`}
						>
							{totalPages}
						</button>
					</>
				)}

				{/* Next tugmasi */}
				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages - 1} // Oxirgi pageda disable qilamiz
					className='flex h-8 items-center justify-center rounded border border-gray-300 bg-white px-2.5 text-sm text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]'
				>
					<span className='sr-only sm:not-sr-only sm:mr-1'>Keyingi</span>
					<ChevronRight className='h-4 w-4' />
				</button>
			</div>
		</div>
	)
}

export default Pagination
