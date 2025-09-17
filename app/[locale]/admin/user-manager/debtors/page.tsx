'use client'
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from '@/app/[locale]/components/ui/table'
import Filter, { FilterOption, FilterValues } from '@/components/shared/filters'
import { Button } from '@/components/ui/button'
import { getFaculties } from '@/lib/faculty/faculty'
import { getDebitors, GetDebitorsParams } from '@/lib/users/debitors'
import { getLanguagePrefix } from '@/lib/utils'
import { IFaculty } from '@/types'
import { IDebitor, IDebitorResult } from '@/types/debitors-type'
import {
	AlertCircle,
	CheckCircle2,
	FileSpreadsheet,
	FilterIcon,
	Sparkles,
	TrendingUp,
	Users,
	XCircleIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Pagination from '../../_components/pagination'

function DebitorsPage() {
	const [loading, setLoading] = useState(false)
	const [exportLoading, setExportLoading] = useState(false)
	const [debitorsResponse, setDebitorsResponse] = useState<IDebitorResult>()
	const [debtors, setDebtors] = useState<IDebitor[]>([])
	const [pageNumber, setPageNumber] = useState(0)
	const [pageSize, setPageSize] = useState(10)
	const [filters, setFilters] = useState<FilterValues>({})
	const [error, setError] = useState<string | null>(null)
	const [faculties, setFaculties] = useState<IFaculty[]>([])
	const [facultiesLoading, setFacultiesLoading] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		fetchDebitors()
		fetchFaculties()
	}, [pageNumber, pageSize, filters])

	const fetchDebitors = async () => {
		try {
			setLoading(true)
			setError(null)

			// API parametrlarini tayyorlash
			const params: GetDebitorsParams = {
				pageNumber,
				pageSize,
			}

			// Filterlarni API parametrlariga qo'shish
			Object.entries(filters).forEach(([key, value]) => {
				if (value !== undefined && value !== null && value !== '') {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					params[key] = value
				}
			})

			const response = await getDebitors(params)

			if (response?.isSuccess) {
				setDebitorsResponse(response.result)
				setDebtors(response.result.items || [])
			} else {
				throw new Error(response?.message || "Ma'lumotlarni yuklashda xatolik")
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Noma'lum xatolik yuz berdi"
			setError(errorMessage)
			toast.error(`Qarzdorlarni yuklashda xatolik: ${errorMessage}`)
		} finally {
			setTimeout(() => setLoading(false), 800)
		}
	}

	// Facultetlarni olish funksiyasi
	const fetchFaculties = async () => {
		try {
			setFacultiesLoading(true)
			const response = await getFaculties({
				pageSize: 100, //Katta son berildi, BArchasini olishim uchun
				pageNumber: 0,
			})
			if (response && response.result) {
				setFaculties(response.result.items)
			}
		} catch (error) {
			console.error('Facultetlarni yuklashda xatolik:', error)
			toast.error("Facultetlar ro'yxati yuklanmadi")
		} finally {
			setFacultiesLoading(false)
		}
	}

	const handleFilterChange = (newFilters: FilterValues) => {
		// Sahifani boshiga qaytish va yangi filterlarni qo'llash
		setPageNumber(0)
		setFilters(newFilters)
	}

	const handlePageChange = (newPage: number, newPageSize?: number) => {
		if (newPageSize && newPageSize !== pageSize) {
			setPageSize(newPageSize)
			setPageNumber(0) // Page size o'zgarganda sahifani boshiga qaytish
		} else {
			setPageNumber(newPage)
		}
	}

	// Ma'lumotlarni CSV formatiga o'tkazish
	const convertToCSV = (debtors: IDebitor[]): string => {
		const headers = [
			'Foydalanuchi ID',
			'Foydalanuvchi ismi',
			'Fakultet',
			'Guruh',
			'Kurs',
			'Kitob nomi',
			'Kitob ID',
			'Berilgan Vaqti',
			'Qaytarish Vaqti',
			'Qaytarilganmi',
		]

		const rows = debtors.map(debtor => {
			return [
				debtor.id,
				debtor.userCard?.user?.firstName +
					' ' +
					debtor.userCard.user.lastName || '',
				debtor.userCard?.user.facultyId || '',
				debtor.userCard?.user?.group || '',
				debtor.userCard?.user?.course || '',
				debtor.bookCard?.book?.title || '',
				debtor.bookCard?.book?.id || '',
				new Date(debtor.bookingDate).toLocaleDateString('uz-UZ'),
				new Date(debtor.pickupDate).toLocaleDateString('uz-UZ'),
				debtor.isReturn ? 'Ha' : "Yo'q",
			]
		})

		return [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
	}
	// CSV faylni yuklab olish
	const downloadCSV = (csvContent: string, filename: string) => {
		// UTF-8 BOM qo'shish Excel uchun
		const BOM = '\uFEFF'
		const blob = new Blob([BOM + csvContent], {
			type: 'text/csv;charset=utf-8',
		})
		const link = document.createElement('a')
		const url = URL.createObjectURL(blob)

		link.setAttribute('href', url)
		link.setAttribute('download', filename)
		link.style.visibility = 'hidden'

		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		URL.revokeObjectURL(url)
	}

	// Excel faylga export qilish funksiyasi
	const exportToExcel = async () => {
		try {
			setExportLoading(true)

			// Barcha debitorlarni sahifalab yuklab olish
			const allDebtors = await fetchAllDebitors(filters)

			if (allDebtors.length === 0) {
				toast.info("Eksport qilish uchun ma'lumot mavjud emas")
				return
			}

			// CSV formatiga o'tkazish
			const csvContent = convertToCSV(allDebtors)

			// CSV faylni yuklab olish
			downloadCSV(
				csvContent,
				`qarzdorlar_${new Date().toISOString().split('T')[0]}.csv`
			)

			toast.success(
				`${allDebtors.length} ta yozuv Excel fayl sifatida yuklab olindi`
			)
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Export qilishda xatolik'
			toast.error(`Eksport qilishda xatolik: ${errorMessage}`)
		} finally {
			setExportLoading(false)
		}
	}

	// Barcha debitorlarni sahifalab yuklab olish (cheklov bo'lsa)
	const fetchAllDebitors = async (
		filters: FilterValues
	): Promise<IDebitor[]> => {
		let allDebitors: IDebitor[] = []
		let page = 0
		const size = 500 // API maksimal pageSize bo'lsa, shuni qo'llang
		let totalPages = 1

		do {
			const params: GetDebitorsParams = {
				pageNumber: page,
				pageSize: size,
			}
			Object.entries(filters).forEach(([key, value]) => {
				if (value !== undefined && value !== null && value !== '') {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					params[key] = value
				}
			})

			const response = await getDebitors(params)
			if (response?.isSuccess) {
				const result = response.result
				allDebitors = allDebitors.concat(result.items || [])
				totalPages = result.totalPages
			} else {
				throw new Error(response?.message || "Ma'lumotlarni yuklashda xatolik")
			}
			page++
		} while (page < totalPages)

		return allDebitors
	}

	// Facultetlarni filter optionlariga aylantirish
	const facultyOptions = faculties.map(faculty => ({
		value: faculty.id,
		label: faculty.name,
	}))

	const debtorFilterOptions: FilterOption[] = [
		{
			key: 'user_search',
			label: 'Foydalanuvchi ismi',
			type: 'text',
		},
		{
			key: 'book_title',
			label: 'Kitob Nomi',
			type: 'text',
		},
		{
			key: 'email',
			label: 'Email',
			type: 'text',
		},
		{
			key: 'hemisId',
			label: 'HEMIS ID',
			type: 'text',
		},
		{
			key: 'facultyId',
			label: 'Fakultet',
			type: 'select',
			options: facultiesLoading
				? [{ value: 'loading', label: 'Yuklanmoqda...' }]
				: facultyOptions.length > 0
				? facultyOptions
				: [{ value: '', label: 'Facultetlar mavjud emas' }],
		},
		{
			key: 'course',
			label: 'Kurs',
			type: 'select',
			options: [
				{ value: '5', label: 'Magister 1' },
				{ value: '6', label: 'Magister 2' },
				{ value: '11', label: '1-kurs' },
				{ value: '12', label: '2-kurs' },
				{ value: '13', label: '3-kurs' },
				{ value: '14', label: '4-kurs' },
				{ value: '15', label: '5-kurs' },
			],
		},
		{
			key: 'group',
			label: 'Guruh',
			type: 'text',
		},

		{
			key: 'isReturn',
			label: 'Kitob Qaytarilganmi',
			type: 'boolean',
		},
	]

	// Kechikish kunlarini hisoblash
	const calculateOverdueDays = (pickupDate: string, isReturn: boolean) => {
		if (isReturn) return 0
		const pickup = new Date(pickupDate)
		const current = new Date()
		const diffTime = current.getTime() - pickup.getTime()
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
		return Math.max(0, diffDays)
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
							Qarzdorlar ro&apos;yxati yuklanmoqda...
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
			<div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900'>
				{/* Hero Section */}
				<div className='w-full h-[20vh] bg-gradient-to-r from-red-600 via-orange-600 to-red-800 dark:from-red-700 dark:via-orange-700 dark:to-red-900 flex items-center justify-center relative overflow-hidden'>
					<div className='absolute inset-0'>
						<div className='absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float'></div>
						<div className='absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float-delayed'></div>
					</div>
					<div className='relative z-10 text-center'>
						<div className='flex items-center justify-center mb-4'>
							<AlertCircle className='w-8 h-8 text-white mr-3' />
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
							<AlertCircle className='w-10 h-10 text-red-500 dark:text-red-400' />
						</div>
						<h3 className='text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-3'>
							Xatolik yuz berdi
						</h3>
						<p className='text-slate-500 dark:text-slate-400 mb-6'>{error}</p>
						<Button
							onClick={() => fetchDebitors()}
							className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
						>
							Qayta urinish
						</Button>
					</div>
				</div>
			</div>
		)
	}

	if (debitorsResponse?.totalCount === 0 && Object.keys(filters).length === 0) {
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
							Qarzdorlar ro&apos;yxati
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
							Qarzdorlar mavjud emas
						</h3>
						<p className='text-slate-500 dark:text-slate-400 mb-6'>
							Hozircha tizimda qarzdorlar ro&apos;yxati bo&apos;sh
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
						<Users className='w-8 h-8 text-white mr-3' />
						<Sparkles className='w-8 h-8 text-white animate-pulse' />
					</div>
					<h1 className='text-4xl font-bold text-white drop-shadow-lg'>
						Qarzdorlar ro&apos;yxati
					</h1>
					<p className='text-white/80 mt-2 text-lg'>
						Tizimdagi qarzdorlar boshqaruvi
					</p>
				</div>
			</div>

			{/* Content section*/}
			<div className='p-6 -mt-8 relative z-10'>
				{/* Statistics, Filter and Export Buttons */}
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
										Jami qarzdorlar soni
									</h3>
									<p className='text-slate-600 dark:text-slate-400'>
										Tizimda ro&apos;yxatdan o&apos;tgan
									</p>
								</div>
								<div className='text-right'>
									<p className='text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
										{debitorsResponse?.totalCount || 0}
									</p>
									<p className='text-sm text-slate-500 dark:text-slate-400'>
										nafar
									</p>
								</div>
							</div>

							{/* Filter and Export Buttons */}
							<div className='flex flex-col sm:flex-row gap-3'>
								<Filter
									filterOptions={debtorFilterOptions}
									onFilterChange={handleFilterChange}
									initialFilters={filters}
									triggerButton={
										<Button className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105'>
											<FilterIcon className='mr-2 h-5 w-5' />
											Filter
										</Button>
									}
								/>

								<Button
									onClick={exportToExcel}
									disabled={
										exportLoading || (debitorsResponse?.totalCount || 0) === 0
									}
									className='bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100'
								>
									{exportLoading ? (
										<div className='flex items-center'>
											<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
											Yuklanmoqda...
										</div>
									) : (
										<div className='flex items-center'>
											<FileSpreadsheet className='mr-2 h-5 w-5' />
											Excel ga yuklab olish
										</div>
									)}
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Results info */}
				{Object.keys(filters).length > 0 && (
					<div className='mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200 dark:border-blue-800 rounded-lg p-4 animate-fade-in'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-3'>
								<div className='w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-full flex items-center justify-center'>
									<FilterIcon className='w-4 h-4 text-blue-600 dark:text-blue-400' />
								</div>
								<div>
									<p className='text-blue-700 dark:text-blue-300 font-medium'>
										<span className='font-bold'>
											{debitorsResponse?.totalCount || 0} ta natija
										</span>{' '}
										topildi
									</p>
									<p className='text-blue-600 dark:text-blue-400 text-sm'>
										Faol filterlar: {Object.keys(filters).length} ta
									</p>
								</div>
							</div>
							<Button
								onClick={() => setFilters({})}
								variant='outline'
								size='sm'
								className='border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50'
							>
								Filterlarni tozalash
							</Button>
						</div>
					</div>
				)}

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
											className='px-2 py-2 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											#
										</TableCell>
										<TableCell
											isHeader
											className='px-2 py-2 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											Kitob nomi
										</TableCell>
										<TableCell
											isHeader
											className='px-2 py-2 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											Foydalanuvchi
										</TableCell>
										<TableCell
											isHeader
											className='px-2 py-2 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											Berilgan vaqti
										</TableCell>
										<TableCell
											isHeader
											className='px-2 py-2 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											Qaytarish vaqti
										</TableCell>
										<TableCell
											isHeader
											className='px-2 py-2 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											Holat
										</TableCell>
									</TableRow>
								</TableHeader>

								{/* Table Body */}
								<TableBody className='divide-y divide-slate-200/50 dark:divide-slate-700/50'>
									{debtors?.map((item, index) => {
										const overdueDays = calculateOverdueDays(
											item.pickupDate instanceof Date
												? item.pickupDate.toISOString()
												: item.pickupDate,
											item.isReturn
										)
										const isOverdue = overdueDays > 0

										return (
											<TableRow
												key={item.id}
												className={`group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-950/50 dark:hover:to-purple-950/50 transition-all duration-300 animate-table-row ${
													isOverdue && !item.isReturn
														? 'bg-red-50/30 dark:bg-red-950/20'
														: ''
												}`}
											>
												<TableCell className='px-2 py-2 text-slate-700 dark:text-slate-300 font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300'>
													{pageNumber * pageSize + index + 1}
												</TableCell>
												<TableCell className='px-2 py-2 w-1/2'>
													<div className='flex items-center gap-3'>
														<div>
															<p className='font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-colors duration-300 line-clamp-1'>
																{item.bookCard?.book?.title}
															</p>
														</div>
													</div>
												</TableCell>
												<TableCell className='px-2 py-2'>
													<Link
														href={
															`${getLanguagePrefix(
																pathname
															)}/admin/user-manager/students/${
																item.userCard?.user?.id
															}` || '#'
														}
														className='flex items-center gap-3 hover:bg-gradient-to-r hover:from-slate-50 hover:to-indigo-50 dark:hover:from-slate-800 dark:hover:to-indigo-950 p-2 rounded-lg transition-all duration-200'
													>
														<div>
															<p className=' text-slate-800 dark:text-slate-200 group-hover:text-indigo-800 dark:group-hover:text-indigo-300'>
																{item.userCard?.user?.firstName}{' '}
																{item.userCard?.user?.lastName}
															</p>
														</div>
													</Link>
												</TableCell>
												<TableCell className='px-2 py-2'>
													<div className='flex items-center gap-2'>
														<span className='text-sm text-slate-700 dark:text-slate-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300'>
															{new Date(item.bookingDate).toLocaleDateString(
																'uz-UZ'
															)}
														</span>
													</div>
												</TableCell>
												<TableCell className='px-2 py-2'>
													<div className='flex items-center gap-2'>
														<span className='text-sm text-slate-700 dark:text-slate-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300'>
															{new Date(item.pickupDate).toLocaleDateString(
																'uz-UZ'
															)}
														</span>
													</div>
												</TableCell>
												<TableCell className='px-2 py-2'>
													{item.isReturn ? (
														<CheckCircle2 className='w-5 h-5 text-green-600 dark:text-green-400' />
													) : (
														<XCircleIcon className='w-5 h-5 text-red-600 dark:text-red-400' />
													)}
												</TableCell>
											</TableRow>
										)
									})}
								</TableBody>
							</Table>
						</div>
					</div>
				</div>

				{/* Pagination */}
				{debitorsResponse && (
					<div className='mt-6 animate-slide-in-up'>
						<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg border border-slate-200/60 dark:border-slate-700/60 p-4'>
							<Pagination
								currentPage={pageNumber}
								totalPages={debitorsResponse.totalPages}
								totalItems={debitorsResponse.totalCount}
								pageSize={pageSize}
								onPageChange={handlePageChange}
							/>
						</div>
					</div>
				)}
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

				@keyframes fade-in {
					from {
						opacity: 0;
					}
					to {
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

				.animate-table-row {
					animation: table-row 0.6s ease-out forwards;
					opacity: 0;
				}

				.animate-fade-in {
					animation: fade-in 0.5s ease-out;
				}

				.line-clamp-1 {
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			`}</style>
		</div>
	)
}

export default DebitorsPage
