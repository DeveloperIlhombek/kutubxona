'use client'
import { LoaderOne } from '@/components/shared/loader'
import { Button } from '@/components/ui/button'
import { getFaculties } from '@/lib/faculty/faculty'
import { IFacultyResult } from '@/types'
import { PencilIcon, PlusSquareIcon, Trash2, University } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from '../../components/ui/table'
import Pagination from '../_components/pagination'
import { EditFacultyDialog } from './_components/EditFacultyDialog'
import CreateFaculty from './_components/createfaculty'
import { DeleteFacultyDialog } from './_components/deleteFaculty'

function Faculties() {
	const [loading, setLoading] = useState(false)
	const [faculty, setFaculty] = useState<IFacultyResult>()
	const [pageNumber, setPageNumber] = useState(0)
	const [pageSize, setPageSize] = useState(10)
	const [editDialog, setEditDialog] = useState({
		open: false,
		facultyId: '',
	})
	const [deleteDialog, setDeleteDialog] = useState({
		open: false,
		facultyId: '',
		facultyName: '',
	})

	useEffect(() => {
		fetchFaculties()
	}, [pageNumber, pageSize])

	const fetchFaculties = async () => {
		try {
			setLoading(true)
			const response = await getFaculties({ pageNumber, pageSize })
			setFaculty(response?.result)
		} catch (error) {
			toast(`Fakultetlarni yuklashda xatolik: ${error}`)
		} finally {
			setLoading(false)
		}
	}

	const handlePageChange = (newPage: number, newPageSize?: number) => {
		if (newPageSize && newPageSize !== pageSize) {
			setPageSize(newPageSize)
		}
		setPageNumber(newPage)
	}

	const handleFacultyAdded = () => {
		fetchFaculties()
	}

	const handleEditClick = (facultyId: string) => {
		setEditDialog({
			open: true,
			facultyId,
		})
	}

	const handleDeleteClick = (facultyId: string, facultyName: string) => {
		setDeleteDialog({
			open: true,
			facultyId,
			facultyName,
		})
	}

	const handleFacultyUpdated = () => {
		setEditDialog({ ...editDialog, open: false })
		fetchFaculties()
	}

	const handleFacultyDeleted = () => {
		setDeleteDialog({ ...deleteDialog, open: false })
		fetchFaculties()
	}

	if (loading) {
		return (
			<div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-white dark:bg-black '>
				<LoaderOne />
			</div>
		)
	}

	if (faculty?.totalCount === 0) {
		return (
			<div className='text-3xl text-gray-600 text-center font-bold '>
				Fakultetlar mavjud emas !
			</div>
		)
	}

	return (
		<div>
			{/* Header Section bg */}
			<div className='flex items-center justify-between p-0 m-0 w-full h-[150px] backdrop-blur-md bg-gradient-to-r from-blue-600 via-sky-700 to-blue-600 relative'>
				<div className='absolute inset-0 bg-black/20'></div>
				<div className='flex items-center gap-2 z-10 text-white ml-8'>
					<University className='w-10 h-10' />
					<h1 className='text-3xl font-bold'>Fakultetlar</h1>
				</div>
				<div className='z-10 mr-8'>
					<CreateFaculty
						trigger={
							<Button className='w-fit h-10' variant='destructive'>
								Yaratish <PlusSquareIcon className='w-4 h-4 ml-2' />
							</Button>
						}
						onFacultyAdded={handleFacultyAdded}
					/>
				</div>
			</div>

			{/* Content section*/}
			<div className='overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]'>
				<div className='max-w-full overflow-x-auto'>
					<div className='min-w-[1102px]'>
						<Table>
							{/* Table Header */}
							<TableHeader className='border-b border-gray-100 dark:border-white/[0.05]'>
								<TableRow>
									<TableCell
										isHeader
										className='px-5 py-3 font-medium text-gray-700 text-start text-md dark:text-gray-200'
									>
										Fakultetlar
									</TableCell>
									<TableCell
										isHeader
										className='px-5 py-3 font-medium text-gray-700 text-start text-md dark:text-gray-200'
									>
										Kod
									</TableCell>
								</TableRow>
							</TableHeader>

							{/* Table Body */}
							<TableBody className='divide-y divide-gray-100 dark:divide-white/[0.05]'>
								{faculty?.items.map(item => (
									<TableRow key={item.id}>
										<TableCell className='px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-200'>
											{item.name}
										</TableCell>
										<TableCell className='px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-200'>
											{item.code}
										</TableCell>
										<TableCell className='px-4 py-3 text-end text-theme-sm dark:text-gray-200'>
											<button
												onClick={() => handleEditClick(item.id)}
												className='p-1 rounded hover:bg-blue-50 transition-colors'
											>
												<PencilIcon className='w-4 h-4 text-blue-400 hover:text-blue-600 hover:scale-125 transition-transform' />
											</button>
										</TableCell>
										<TableCell className='px-4 py-3 text-end text-theme-sm dark:text-gray-200'>
											<button
												onClick={() => handleDeleteClick(item.id, item.name)}
												className='p-1 rounded hover:bg-red-50 transition-colors'
											>
												<Trash2 className='w-4 h-4 text-red-400 hover:text-red-600 hover:scale-125 transition-transform' />
											</button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>

			{/* Edit Faculty Dialog */}
			<EditFacultyDialog
				facultyId={editDialog.facultyId}
				open={editDialog.open}
				onOpenChange={open => setEditDialog({ ...editDialog, open })}
				onSuccess={handleFacultyUpdated}
			/>

			{/* Delete Faculty Dialog */}
			<DeleteFacultyDialog
				facultyId={deleteDialog.facultyId}
				facultyName={deleteDialog.facultyName}
				open={deleteDialog.open}
				onOpenChange={open => setDeleteDialog({ ...deleteDialog, open })}
				onSuccess={handleFacultyDeleted}
			/>

			{faculty && (
				<Pagination
					currentPage={pageNumber}
					totalPages={faculty.totalPages}
					totalItems={faculty.totalCount}
					pageSize={pageSize}
					onPageChange={handlePageChange}
				/>
			)}
		</div>
	)
}

export default Faculties
