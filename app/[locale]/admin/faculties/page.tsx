'use client'
import { Button } from '@/components/ui/button'
import { getFaculties } from '@/lib/faculty/faculty'
import { IFaculty, IFacultyResult } from '@/types'
import {
	Globe,
	PencilIcon,
	PlusSquare,
	PlusSquareIcon,
	Sparkles,
	Trash2,
	University,
	UniversityIcon,
} from 'lucide-react'
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
	const [facultyResponse, setFacultyResponse] = useState<IFacultyResult>()
	const [faculty, setFaculty] = useState<IFaculty>()
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
			setFacultyResponse(response?.result)
			setFaculty(response?.result.items)
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
			<div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900'>
				{/* Loading Hero Section */}
				<div className='w-full h-[20vh] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-700 dark:via-purple-700 dark:to-indigo-900 flex items-center justify-center relative overflow-hidden'>
					<div className='absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 animate-pulse'></div>
					<div className='relative z-10 text-center'>
						<div className='w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center animate-spin'>
							<Sparkles className='w-8 h-8 text-white' />
						</div>
						<h1 className='text-3xl font-bold text-white drop-shadow-lg'>
							Fakultetlar ro&apos;yxati yuklanmoqda...
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

	if (facultyResponse?.totalCount === 0) {
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
							Fakultetlar ro&apos;yxati
						</h1>
					</div>
				</div>

				{/* Empty State */}
				<div className='flex items-center justify-center p-12 -mt-8 relative z-10'>
					<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 p-12 text-center max-w-md'>
						<div className='w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center'>
							<UniversityIcon className='w-10 h-10 text-slate-400 dark:text-slate-500' />
						</div>
						<h3 className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3'>
							Fakultetlar mavjud emas
						</h3>
						<p className='text-slate-500 dark:text-slate-400 mb-6'>
							Hozircha tizimda fakultetlar ro&apos;yxati bo&apos;sh
						</p>
						<CreateFaculty
							trigger={
								<Button className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105'>
									<PlusSquare className='w-4 h-4 mr-2' />
									Birinchi fakultetni qo&apos;shish
								</Button>
							}
							onFacultyAdded={handleFacultyAdded}
						/>
					</div>
				</div>
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
								{facultyResponse?.items.map(item => (
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

			{facultyResponse && (
				<Pagination
					currentPage={pageNumber}
					totalPages={facultyResponse.totalPages}
					totalItems={facultyResponse.totalCount}
					pageSize={pageSize}
					onPageChange={handlePageChange}
				/>
			)}
		</div>
	)
}

export default Faculties
