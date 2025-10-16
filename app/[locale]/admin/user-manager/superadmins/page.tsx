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
import { getAllsuperadmins, GetUserParams } from '@/lib/users/superadmin'
import { downloadImage, getLanguagePrefix } from '@/lib/utils'
import { IFaculty, IUser, IUserResult } from '@/types'
import {
	BadgeCheck,
	BadgeX,
	Download,
	Eye,
	FilterIcon,
	Sparkles,
	TrendingUp,
	UserIcon,
	Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Pagination from '../../_components/pagination'

function SuperAdminPage() {
	const [loading, setLoading] = useState(false)
	const [exportLoading, setExportLoading] = useState(false)
	const [facultiesLoading, setFacultiesLoading] = useState(false)
	const [users, setUsers] = useState<IUser[]>([])
	const [userResponse, setUserResponse] = useState<IUserResult>()
	const [faculties, setFaculties] = useState<IFaculty[]>([])
	const [pageNumber, setPageNumber] = useState(0)
	const [pageSize, setPageSize] = useState(10)
	const [filters, setFilters] = useState<FilterValues>({})
	const pathname = usePathname()

	useEffect(() => {
		fetchAllAdmins()
		fetchFaculties()
	}, [pageNumber, pageSize, filters])

	// Facultetlarni olish funksiyasi
	const fetchFaculties = async () => {
		try {
			setFacultiesLoading(true)
			const response = await getFaculties({
				pageSize: 100,
				pageNumber: 0,
			})

			if (response && response.result) {
				setFaculties(response.result.items || [])
			}
		} catch (error) {
			console.error('Facultetlarni yuklashda xatolik:', error)
			toast.error("Superadminlar ro'yxati yuklanmadi")
		} finally {
			setFacultiesLoading(false)
		}
	}

	const fetchAllAdmins = async () => {
		try {
			setLoading(true)

			// API parametrlarini tayyorlash
			const params: GetUserParams = {
				pageNumber,
				pageSize,
			}

			// Filterlarni API parametrlariga qo'shish
			Object.entries(filters).forEach(([key, value]) => {
				if (value !== undefined && value !== null && value !== '') {
					// Boolean qiymatlarni to'g'ri formatga o'tkazish
					if (key === 'isActive') {
						params[key] = value === 'true' || value === true
					}
					// Boshqa qiymatlarni to'g'ridan-to'g'ri o'tkazish
					else {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						params[key] = value
					}
				}
			})

			const response = await getAllsuperadmins(params)
			if (response && response.result) {
				setUsers(response.result.items)
				setUserResponse(response.result)
			} else {
				throw new Error("Ma'lumotlarni yuklashda xatolik")
			}
		} catch (error) {
			toast.error(`SuperAdminlarni yuklashda xatolik: ${error}`)
		} finally {
			setLoading(false)
		}
	}

	const handlePageChange = (newPage: number, newPageSize?: number) => {
		if (newPageSize && newPageSize !== pageSize) {
			setPageSize(newPageSize)
			setPageNumber(0)
		} else {
			setPageNumber(newPage)
		}
	}

	const handleFilterChange = (newFilters: FilterValues) => {
		setPageNumber(0)
		setFilters(newFilters)
	}

	// Excel faylga export qilish funksiyasi
	const exportToExcel = async () => {
		try {
			setExportLoading(true)

			// Barcha adminlarni sahifalab yuklab olish
			const allAdmins = await fetchAllAdminsWithFilters(filters)

			if (allAdmins.length === 0) {
				toast.info("Eksport qilish uchun ma'lumot mavjud emas")
				return
			}

			// CSV formatiga o'tkazish
			const csvContent = convertToCSV(allAdmins)

			// CSV faylni yuklab olish
			downloadCSV(
				csvContent,
				`superadminlar_${new Date().toISOString().split('T')[0]}.csv`
			)

			toast.success(
				`${allAdmins.length} ta yozuv Excel fayl sifatida yuklab olindi`
			)
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Export qilishda xatolik'
			toast.error(`Eksport qilishda xatolik: ${errorMessage}`)
		} finally {
			setExportLoading(false)
		}
	}

	// Barcha adminlarni sahifalab yuklab olish
	const fetchAllAdminsWithFilters = async (
		filters: FilterValues
	): Promise<IUser[]> => {
		let allAdmins: IUser[] = []
		let page = 0
		const size = 500
		let totalPages = 1

		do {
			const params: GetUserParams = {
				pageNumber: page,
				pageSize: size,
			}

			// Filterlarni API parametrlariga qo'shish
			Object.entries(filters).forEach(([key, value]) => {
				if (value !== undefined && value !== null && value !== '') {
					// Boolean qiymatlarni to'g'ri formatga o'tkazish
					if (key === 'isActive') {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						params[key] = value === 'true' || value === true
					}
					// Boshqa qiymatlarni to'g'ridan-to'g'ri o'tkazish
					else {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						params[key] = value
					}
				}
			})

			const response = await getAllsuperadmins(params)
			if (response && response.result) {
				const result = response.result
				allAdmins = allAdmins.concat(result.items || [])
				totalPages = result.totalPages
			} else {
				throw new Error("Ma'lumotlarni yuklashda xatolik")
			}
			page++
		} while (page < totalPages)

		return allAdmins
	}

	// Ma'lumotlarni CSV formatiga o'tkazish
	const convertToCSV = (users: IUser[]): string => {
		const headers = [
			'ID',
			'Ism',
			'Familiya',
			'Otasining ismi',
			'Email',
			'HEMIS ID',
			'Telefon',
			'Fakultet',
			'Kurs',
			'Guruh',
			'Faol',
			'Roli',
		]

		const rows = users.map(user => [
			user.id,
			user.firstName,
			user.lastName,
			user.thirdName || '',
			user.email,
			user.hemisId || '',
			user.phone || '',
			user.faculty?.name || '',
			user.course || '',
			user.group || '',
			user.isActive ? 'Ha' : "Yo'q",
			user.role.toString(),
		])

		return [headers.join(','), ...rows.map(row => row.join(','))].join('\n')
	}

	// CSV faylni yuklab olish
	const downloadCSV = (csvContent: string, filename: string) => {
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

	const lan = getLanguagePrefix(pathname)

	// Facultetlarni filter optionlariga aylantirish
	const facultyOptions = faculties.map(faculty => ({
		value: faculty.id,
		label: faculty.name,
	}))

	const userFilterOptions: FilterOption[] = [
		{
			key: 'search',
			label: 'Foydalanuvchi ismi',
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
			key: 'isActive',
			label: 'Faol',
			type: 'boolean',
		},
	]

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
							SuperAdminlar ro&apos;yxati yuklanmoqda...
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

	if (userResponse?.totalCount === 0 && Object.keys(filters).length === 0) {
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
							SuperAdminlar ro&apos;yxati
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
							Foydalanuvchilar mavjud emas
						</h3>
						<p className='text-slate-500 dark:text-slate-400'>
							Hozircha tizimda Superadminlar ro&apos;yxati bo&apos;sh
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
						Superadminlar ro&apos;yxati
					</h1>
					<p className='text-white/80 mt-2 text-lg'>
						Tizim foydalanuvchilari boshqaruvi
					</p>
				</div>
			</div>

			{/* Main Content */}
			<div className='w-full p-6 -mt-8 relative z-10'>
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
										Jami Superadminlar soni
									</h3>
									<p className='text-slate-600 dark:text-slate-400'>
										Tizimda ro&apos;yxatdan o&apos;tgan
									</p>
								</div>
								<div className='text-right'>
									<p className='text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
										{userResponse?.totalCount || 0}
									</p>
									<p className='text-sm text-slate-500 dark:text-slate-400'>
										nafar
									</p>
								</div>
							</div>

							{/* Filter and Export Buttons */}
							<div className='flex flex-col sm:flex-row gap-3'>
								<Filter
									filterOptions={userFilterOptions}
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
										exportLoading || (userResponse?.totalCount || 0) === 0
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
											<Download className='mr-2 h-5 w-5' />
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
					<div className='mb-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 animate-fade-in'>
						<p className='text-blue-700 dark:text-blue-300 text-sm'>
							<span className='font-medium'>
								{userResponse?.totalCount || 0} ta natija
							</span>{' '}
							topildi.
							<button
								onClick={() => setFilters({})}
								className='ml-2 text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200'
							>
								Filterlarni tozalash
							</button>
						</p>
					</div>
				)}

				{/* Table Container */}
				<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 overflow-hidden animate-slide-in-up'>
					<div className='overflow-x-auto'>
						<div className='min-w-[1132px]'>
							<Table>
								<TableHeader className='bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-b border-indigo-200/50 dark:border-indigo-800/50'>
									<TableRow>
										<TableCell
											isHeader
											className='px-4 py-4  font-semibold text-slate-700 dark:text-slate-400 text-start text-sm'
										>
											Rasm
										</TableCell>
										<TableCell
											isHeader
											className='px-2 py-4  font-semibold text-slate-700 dark:text-slate-400 text-start text-sm'
										>
											Ism
										</TableCell>
										<TableCell
											isHeader
											className='px-2  py-4  font-semibold text-slate-700 dark:text-slate-400 text-start text-sm'
										>
											Familiya
										</TableCell>
										<TableCell
											isHeader
											className='px-2 py-4  font-semibold text-slate-700 dark:text-slate-400 text-start text-sm'
										>
											Fakultet
										</TableCell>
										<TableCell
											isHeader
											className='px-2 py-4  font-semibold text-slate-700 dark:text-slate-400 text-start text-sm'
										>
											Guruh
										</TableCell>
										<TableCell
											isHeader
											className='px-2 py-4  font-semibold text-slate-700 dark:text-slate-400 text-start text-sm'
										>
											Kurs
										</TableCell>
										<TableCell
											isHeader
											className='px-2 py-4  font-semibold text-slate-700 dark:text-slate-400 text-start text-sm'
										>
											Email
										</TableCell>
										<TableCell
											isHeader
											className='px-2 py-4  font-semibold text-slate-700 dark:text-slate-400 text-start text-sm'
										>
											Telefon
										</TableCell>
										<TableCell
											isHeader
											className='px-2 py-4  font-semibold text-slate-700 dark:text-slate-400 text-start text-sm'
										>
											Faol
										</TableCell>
										<TableCell
											isHeader
											className='px-4 py-4 font-semibold text-slate-700 dark:text-slate-400 text-center w-full text-sm'
										>
											<div className='flex justify-end w-full'>
												Ko&apos;rish
											</div>
										</TableCell>
									</TableRow>
								</TableHeader>

								<TableBody className='divide-y divide-slate-200/50 dark:divide-slate-700/50'>
									{users.map(item => (
										<TableRow
											key={item.id}
											className={`group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-950/50 dark:hover:to-purple-950/50 transition-all duration-300 animate-table-row`}
										>
											<TableCell className='px-4 py-4'>
												<div className='flex items-center gap-3'>
													{item.userPhotoId ? (
														<Image
															src={downloadImage({
																id: item.userPhotoId,
																quality: 'low',
															})}
															alt={item.firstName}
															width={400}
															height={300}
														/>
													) : (
														<UserIcon className='w-full h-full text-gray-500' />
													)}
												</div>
											</TableCell>
											<TableCell className='px-2 py-4 text-sm text-slate-700  dark:text-slate-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300 text-start'>
												{item.firstName}
											</TableCell>
											<TableCell className='px-2 py-4 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300 text-gray-700 text-start text-sm dark:text-gray-300'>
												{item.lastName}
											</TableCell>
											<TableCell className='px-2 py-4 text-sm text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 text-start'>
												{item.faculty?.name || '-'}
											</TableCell>
											<TableCell className='px-2 py-4 text-sm text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 text-start'>
												{item.group || '-'}
											</TableCell>
											<TableCell className='px-2 py-4 text-sm text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 text-start'>
												{item.course || '-'}
											</TableCell>
											<TableCell className='px-2 py-4 text-sm text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 text-start'>
												<div
													className='max-w-[200px] truncate'
													title={item.email}
												>
													{item.email || '-'}
												</div>
											</TableCell>
											<TableCell className='px-2 py-4 text-sm text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 text-start'>
												{item.phone || '-'}
											</TableCell>
											<TableCell className='px-2 py-4 text-sm text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 text-start'>
												<div className='flex items-center'>
													{item.isActive ? (
														<BadgeCheck className='w-4 h-4 text-emerald-600 dark:text-emerald-400' />
													) : (
														<BadgeX className='w-4 h-4 text-red-600 dark:text-red-400' />
													)}
												</div>
											</TableCell>
											<TableCell className='px-4 py-4 text-gray-700  text-theme-sm dark:text-gray-200 '>
												<Link
													href={`${lan}/admin/user-manager/admins/${item.id}`}
												>
													<Eye className='w-5 h-5 text-center ml-auto' />
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
				{userResponse && (
					<div className='mt-6 animate-slide-in-up'>
						<Pagination
							currentPage={pageNumber}
							totalPages={userResponse.totalPages}
							totalItems={userResponse.totalCount}
							pageSize={pageSize}
							onPageChange={handlePageChange}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default SuperAdminPage
