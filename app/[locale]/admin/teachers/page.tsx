'use client'
import { LoaderOne } from '@/components/shared/loader'
import { getAllTeachers } from '@/lib/users/teachers'
import { IUser, IUserResult } from '@/types'
import { BadgeCheck, BadgeX } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Badge from '../../components/ui/badge/Badge'
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from '../../components/ui/table'
import Pagination from '../_components/pagination'

function TeachersPage() {
	const [loading, setLoading] = useState(false)
	const [allAdmins, setallAdmins] = useState<IUser[]>([])
	const [alladminResponse, setAlladminResponse] = useState<IUserResult>()
	const [pageNumber, setPageNumber] = useState(0)
	const [pageSize, setPageSize] = useState(10)

	useEffect(() => {
		const fetchAllSuperAdmin = async () => {
			try {
				setLoading(true)
				const response = await getAllTeachers({
					pageNumber,
					pageSize,
				})
				setallAdmins(response.result.items)
				setAlladminResponse(response.result)
			} catch (error) {
				toast(`Guruhlarni yuklashda xatolik: ${error}`)
			} finally {
				setLoading(false)
			}
		}
		fetchAllSuperAdmin()
	}, [pageNumber, pageSize])

	const handlePageChange = (newPage: number, newPageSize?: number) => {
		if (newPageSize && newPageSize !== pageSize) {
			setPageSize(newPageSize)
		}
		setPageNumber(newPage)
	}
	if (loading) {
		return (
			<div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-white dark:bg-black '>
				<LoaderOne />
			</div>
		)
	}
	if (alladminResponse?.totalCount === 0) {
		return (
			<div className='text-3xl text-gray-600 text-center font-bold '>
				Foydalanuvchilar mavjud emas !!!
			</div>
		)
	}

	return (
		<div>
			<div className='overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]'>
				<div className='max-w-full overflow-x-auto'>
					<div className='min-w-[1102px]'>
						<Table>
							{/* Table Header */}
							<TableHeader className='border-b border-gray-100 dark:border-white/[0.05]'>
								<TableRow>
									<TableCell
										isHeader
										className='px-5 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200'
									>
										Rasm
									</TableCell>
									<TableCell
										isHeader
										className='px-5 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200'
									>
										Ism
									</TableCell>
									<TableCell
										isHeader
										className='px-5 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200'
									>
										Familiya
									</TableCell>
									<TableCell
										isHeader
										className='px-5 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200'
									>
										Fakultet
									</TableCell>
									<TableCell
										isHeader
										className='px-5 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200'
									>
										Guruh
									</TableCell>
									<TableCell
										isHeader
										className='px-5 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200'
									>
										Kurs
									</TableCell>
									<TableCell
										isHeader
										className='px-5 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200'
									>
										Email
									</TableCell>
									<TableCell
										isHeader
										className='px-5 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200'
									>
										Telefon
									</TableCell>
									<TableCell
										isHeader
										className='px-5 py-3 font-medium text-gray-700 text-start text-theme-xs dark:text-gray-200'
									>
										Faol
									</TableCell>
								</TableRow>
							</TableHeader>

							{/* Table Body */}
							<TableBody className='divide-y divide-gray-100 dark:divide-white/[0.05]'>
								{allAdmins.map(item => (
									<TableRow key={item.id}>
										<TableCell className='px-5 py-4 sm:px-6 text-start'>
											<div className='flex items-center gap-3'>
												<div className='w-10 h-10 overflow-hidden rounded-full'>
													<Image
														width={40}
														height={40}
														src={'/images/user/user-01.jpg'}
														alt={item.firstName}
													/>
												</div>
											</div>
										</TableCell>
										<TableCell className='px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-200'>
											{item.firstName}
										</TableCell>
										<TableCell className='px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-200'>
											{item.lastName}
										</TableCell>
										<TableCell className='px-4 py-3 text-gray-700 text-theme-sm dark:text-gray-200'>
											{item.faculty}
										</TableCell>

										<TableCell className='px-4 py-3 text-gray-700 text-theme-sm dark:text-gray-200'>
											{item.group}
										</TableCell>
										<TableCell className='px-4 py-3 text-gray-700 text-theme-sm dark:text-gray-200'>
											{item.course}
										</TableCell>
										<TableCell className='px-4 py-3 text-gray-700 text-theme-sm dark:text-gray-200'>
											{item.email}
										</TableCell>
										<TableCell className='px-4 py-3 text-gray-700 text-theme-sm dark:text-gray-200'>
											{item.phone}
										</TableCell>
										<TableCell className='px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-200'>
											<Badge
												size='md'
												color={item.isActive ? 'success' : 'error'}
											>
												{item.isActive ? <BadgeCheck /> : <BadgeX />}
											</Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>

			{alladminResponse && (
				<Pagination
					currentPage={pageNumber}
					totalPages={alladminResponse.totalPages}
					totalItems={alladminResponse.totalCount}
					pageSize={pageSize}
					onPageChange={handlePageChange}
				/>
			)}
		</div>
	)
}

export default TeachersPage
