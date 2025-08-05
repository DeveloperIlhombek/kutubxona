'use client'
import { getAlladmins } from '@/lib/users/admin'
import { IUser } from '@/types'
import { BadgeCheck, BadgeX } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Badge from '../../components/ui/badge/Badge'
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from '../../components/ui/table'
import Pagination from '../_components/pagination'

function AdminPage() {
	const [loading, setLoading] = useState(false)
	const [alladmin, setAlladmin] = useState<IUser[]>([])
	useEffect(() => {
		const fetchAllGroup = async () => {
			try {
				setLoading(true)
				const response = await getAlladmins()
				setAlladmin(response.result.items)
			} catch (error) {
				alert(`Guruhlarni yuklashda xatolik: ${error}`)
			} finally {
				setLoading(false)
			}
		}
		fetchAllGroup()
	}, [])

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
								{alladmin.map(item => (
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
			<Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
		</div>
	)
}

export default AdminPage
