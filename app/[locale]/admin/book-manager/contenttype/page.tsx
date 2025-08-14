'use client'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getContentType } from '@/lib/books/content_type'
import { IContentType, IContenttypeResult } from '@/types'
import {
	BadgeCheck,
	BadgeX,
	BookA,
	Edit,
	Globe,
	MoreHorizontal,
	PlusSquare,
	Sparkles,
	Trash2,
	TrendingUp,
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
import CreateContentTypeDialog from './_components/createContent'
import { DeleteContentDialog } from './_components/deleteContentDialog'
import { EditContentDialog } from './_components/editContentDialog'

function ContentTypepage() {
	const [loading, setLoading] = useState(false)
	const [content, setContent] = useState<IContentType[]>([])
	const [contentResult, setContentResult] = useState<IContenttypeResult>()
	const [pageSize, setPageSize] = useState(10)
	const [pageNumber, setPageNumber] = useState(0)
	const [editingContentType, setEditingContentType] =
		useState<IContentType | null>(null)
	const [deletingContentType, setDeletingContentType] = useState<{
		id: string
		name: string
	} | null>(null)

	const fetchContentType = async () => {
		try {
			setLoading(true)
			const response = await getContentType({ pageNumber, pageSize })
			if (response?.result) {
				setContent(response.result.items)
				setContentResult(response.result)
			}
		} catch (error) {
			toast.error(`Content turlarini yuklashda xatolik: ${error}`)
		} finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		fetchContentType()
	}, [pageNumber, pageSize])

	const handlePageChange = (newPage: number, newPageSize?: number) => {
		if (newPageSize && newPageSize !== pageSize) {
			setPageSize(newPageSize)
		}
		setPageNumber(newPage)
	}

	const handleContentAdded = () => {
		fetchContentType()
	}
	const handleEditSuccess = () => {
		fetchContentType()
		setEditingContentType(null)
	}
	const handleDeleteSuccess = () => {
		fetchContentType()
		setDeletingContentType(null)
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
							Content turlari yuklanmoqda...
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

	if (contentResult?.totalCount === 0) {
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
							<BookA className='w-8 h-8 text-white mr-3' />
							<Sparkles className='w-8 h-8 text-white animate-pulse' />
						</div>
						<h1 className='text-3xl font-bold text-white drop-shadow-lg'>
							Resurs turlari
						</h1>
					</div>
				</div>

				{/* Empty State */}
				<div className='flex items-center justify-center p-12 -mt-8 relative z-10'>
					<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 p-12 text-center max-w-md'>
						<div className='w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-full flex items-center justify-center'>
							<BookA className='w-10 h-10 text-slate-400 dark:text-slate-500' />
						</div>
						<h3 className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3'>
							Resurs turlari yaratilmagan
						</h3>
						<p className='text-slate-500 dark:text-slate-400 mb-6'>
							Hozircha tizimda resurs turlari bo&apos;sh
						</p>
						<CreateContentTypeDialog
							trigger={
								<Button className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105'>
									<PlusSquare className='w-4 h-4 mr-2' />
									Birinchi Resurs turini yarating
								</Button>
							}
							onSuccess={handleContentAdded}
						/>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900'>
			{/* Hero Section */}
			<div className='w-full h-[20vh] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-700 dark:via-purple-700 dark:to-indigo-900 flex items-center justify-center relative overflow-hidden'>
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
						Resurs turlari
					</h1>
					<p className='text-white/80 mt-2 text-lg'>Tizimdagi resurs turlari</p>
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
										Jami resurs turlari soni
									</h3>
									<p className='text-slate-600 dark:text-slate-400'>
										Tizimda ro&apos;yxat olingan
									</p>
								</div>
							</div>
							<div className='flex items-center gap-4'>
								<div className='text-right'>
									<p className='text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
										{contentResult?.totalCount || 0}
									</p>
									<p className='text-sm text-slate-500 dark:text-slate-400'>
										resurs
									</p>
								</div>
								<CreateContentTypeDialog
									trigger={
										<Button className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105'>
											<PlusSquare className='w-4 h-4 mr-2' />
											Yaratish
										</Button>
									}
									onSuccess={handleContentAdded}
								/>
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
											className='pl-1 pr-6 py-4 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											Resurs turi
										</TableCell>

										<TableCell
											isHeader
											className='px-6 py-4 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											Turlar
										</TableCell>
										<TableCell
											isHeader
											className='px-6 py-4 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											Tahrirlash
										</TableCell>
										<TableCell
											isHeader
											className='px-6 py-4 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-start text-sm'
										>
											O&apos;chirish
										</TableCell>
									</TableRow>
								</TableHeader>

								{/* Table Body */}
								<TableBody className='divide-y divide-slate-200/50 dark:divide-slate-700/50'>
									{content.map((item, index) => (
										<TableRow
											key={item.id}
											className={`group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-950/50 dark:hover:to-purple-950/50 transition-all duration-300 animate-table-row`}
										>
											<TableCell className='px-4 py-4 text-slate-700 dark:text-slate-300 font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300'>
												{pageNumber * pageSize + index + 1}
											</TableCell>
											<TableCell className='px-1 py-4'>
												<div className='flex items-center gap-3'>
													<div>
														<p className='font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-colors duration-300'>
															{item.name}
														</p>
													</div>
												</div>
											</TableCell>

											<TableCell className='px-6 py-4'>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															variant='outline'
															size='sm'
															className='flex items-center gap-2 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950 dark:hover:to-purple-950 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 transform hover:scale-105'
														>
															<MoreHorizontal className='w-4 h-4' />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent
														align='end'
														className='w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl'
													>
														<DropdownMenuItem>
															<div className='flex items-center justify-between w-full'>
																<p className='text-gray-700 font-semibold dark:text-gray-400'>
																	Literature
																</p>
																{item.literature ? (
																	<BadgeCheck className='text-green-500 ml-auto' />
																) : (
																	<BadgeX className='text-red-500 ml-auto' />
																)}
															</div>
														</DropdownMenuItem>
														<DropdownMenuItem>
															<div className='flex items-center justify-between w-full'>
																<p className='text-gray-700 font-semibold dark:text-gray-400'>
																	Article
																</p>
																{item.article ? (
																	<BadgeCheck className='text-green-500 ml-auto' />
																) : (
																	<BadgeX className='text-red-500 ml-auto' />
																)}
															</div>
														</DropdownMenuItem>
														<DropdownMenuItem>
															<div className='flex items-center justify-between w-full'>
																<p className='text-gray-700 font-semibold dark:text-gray-400'>
																	Dissertation
																</p>
																{item.dissertation ? (
																	<BadgeCheck className='text-green-500 ml-auto' />
																) : (
																	<BadgeX className='text-red-500 ml-auto' />
																)}
															</div>
														</DropdownMenuItem>
														<DropdownMenuItem>
															<div className='flex items-center justify-between w-full'>
																<p className='text-gray-700 font-semibold dark:text-gray-400'>
																	Monographs
																</p>
																{item.monographs ? (
																	<BadgeCheck className='text-green-500 ml-auto' />
																) : (
																	<BadgeX className='text-red-500 ml-auto' />
																)}
															</div>
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
											<TableCell className='px-6 py-4'>
												<div className='flex items-center gap-3'>
													<div>
														<p className='font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-colors duration-300'>
															<Button
																onClick={() =>
																	setEditingContentType({
																		id: item.id,
																		name: item.name,
																		article: true,
																		dissertation: true,
																		literature: false,
																		monographs: true,
																	})
																}
																className='flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 cursor-pointer'
															>
																<Edit className='w-4 h-4 text-indigo-600 dark:text-indigo-400' />
															</Button>
														</p>
													</div>
												</div>
											</TableCell>
											<TableCell className='px-6 py-4'>
												<div className='flex items-center gap-3'>
													<div>
														<p className='font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-colors duration-300'>
															<Button
																onClick={() =>
																	setDeletingContentType({
																		id: item.id,
																		name: item.name,
																	})
																}
																className='flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 cursor-pointer'
															>
																<Trash2 className='w-4 h-4' />
															</Button>
														</p>
													</div>
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
				{contentResult && (
					<div className='mt-6 animate-slide-in-up'>
						<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg border border-slate-200/60 dark:border-slate-700/60 p-4'>
							<Pagination
								currentPage={pageNumber}
								totalPages={contentResult.totalPages}
								totalItems={contentResult.totalCount}
								pageSize={pageSize}
								onPageChange={handlePageChange}
							/>
						</div>
					</div>
				)}
			</div>
			{/* Edit Country Dialog */}
			{editingContentType && (
				<EditContentDialog
					contentId={editingContentType.id}
					open={!!editingContentType}
					onOpenChange={open => !open && setEditingContentType(null)}
					onSuccess={handleEditSuccess}
				/>
			)}

			{/* Delete Country Dialog */}
			{deletingContentType && (
				<DeleteContentDialog
					id={deletingContentType.id}
					contentname={deletingContentType.name}
					open={!!deletingContentType}
					onOpenChange={open => !open && setDeletingContentType(null)}
					onSuccess={handleDeleteSuccess}
				/>
			)}
		</div>
	)
}

export default ContentTypepage
