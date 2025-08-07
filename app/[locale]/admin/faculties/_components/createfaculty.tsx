'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	addFaculty,
	getFaculties,
	getfacultiesbyhemis,
} from '@/lib/faculty/faculty'
//import { IFacultyResult } from '@/types'
import { CheckCheckIcon, Loader2, PlusSquareIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Faculty {
	id: string
	name: string
	code: number
}

function CreateFaculty({
	trigger,
	onFacultyAdded,
}: {
	trigger: React.ReactNode
	onFacultyAdded?: () => void
}) {
	const [loading, setLoading] = useState(false)
	const [hemisFaculties, setHemisFaculties] = useState<Faculty[]>([])
	const [existingFaculties, setExistingFaculties] = useState<Faculty[]>([])
	const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)

				// Fetch both HEMIS faculties and existing faculties in parallel
				const [hemisResponse, existingResponse] = await Promise.all([
					getfacultiesbyhemis(),
					getFaculties({ pageNumber: 0, pageSize: 1000 }),
				])

				if (hemisResponse?.isSuccess) {
					setHemisFaculties(hemisResponse.result)
				}

				if (existingResponse?.result?.items) {
					setExistingFaculties(existingResponse.result.items)
				}
			} catch (error) {
				toast.error(`Ma'lumotlarni yuklashda xatolik: ${error}`)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	const handleAddFaculty = async () => {
		if (!selectedFaculty) return

		try {
			setLoading(true)
			await addFaculty({
				code: selectedFaculty.code,
				name: selectedFaculty.name,
			})
			toast.success(
				`${selectedFaculty.name} fakulteti muvaffaqiyatli qo'shildi`
			)
			if (onFacultyAdded) onFacultyAdded()
			setSelectedFaculty(null)
		} catch (error) {
			toast.error(`Fakultet qo'shishda xatolik: ${error}`)
		} finally {
			setLoading(false)
		}
	}

	// Check if a faculty already exists in our system
	const isFacultyExisting = (facultyCode: number) => {
		return existingFaculties.some(f => f.code === facultyCode)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='max-h-[95vh] overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100 border border-slate-200/60 shadow-2xl backdrop-blur-sm'>
				<DialogHeader className='space-y-3 pb-4 border-b border-slate-200/50'>
					<DialogTitle className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
						Yangi fakultet qo&apos;shish
					</DialogTitle>
					<DialogDescription className='text-slate-600 text-base leading-relaxed'>
						HEMIS tizimidagi barcha fakultetlar ro&apos;yxati. Faqat yangi
						fakultetlarni qo&apos;shish mumkin.
					</DialogDescription>
				</DialogHeader>

				{loading ? (
					<div className='flex flex-col items-center justify-center py-10 space-y-2'>
						<div className='relative'>
							<Loader2 className='w-10 h-10 text-indigo-600 animate-spin' />
							<div className='absolute inset-0 w-10 h-10 border-4 border-indigo-200 border-t-transparent rounded-full animate-spin animation-delay-150'></div>
						</div>
						<p className='text-slate-600 font-medium animate-pulse'>
							Yuklanmoqda...
						</p>
					</div>
				) : (
					<div className='space-y-6'>
						{hemisFaculties.length > 0 ? (
							<>
								<div className='max-h-96 overflow-y-auto pr-2 custom-scrollbar'>
									<div className='space-y-2'>
										{hemisFaculties.map((faculty, index) => {
											const isExisting = isFacultyExisting(faculty.code)
											const isSelected = selectedFaculty?.code === faculty.code

											return (
												<div
													key={faculty.code}
													className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ease-out transform hover:scale-[1.02] ${
														isExisting
															? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 cursor-not-allowed opacity-75'
															: isSelected
															? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-300 shadow-lg ring-2 ring-indigo-200 cursor-pointer'
															: 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md cursor-pointer hover:bg-gradient-to-r hover:from-slate-50 hover:to-indigo-50'
													}`}
													onClick={() =>
														!isExisting && setSelectedFaculty(faculty)
													}
													style={{
														animationDelay: `${index * 50}ms`,
														animation: 'slideInUp 0.5s ease-out forwards',
													}}
												>
													<div className='p-4 relative'>
														<div className='flex items-center justify-between'>
															<div className='flex-1 min-w-0'>
																<h3
																	className={`font-semibold text-sm leading-tight transition-colors duration-200 ${
																		isExisting
																			? 'text-emerald-800'
																			: isSelected
																			? 'text-indigo-900'
																			: 'text-slate-900 group-hover:text-indigo-800'
																	}`}
																>
																	{faculty.name}
																</h3>
																<p
																	className={`text-sm mt-1 transition-colors duration-200 ${
																		isExisting
																			? 'text-emerald-600'
																			: isSelected
																			? 'text-indigo-600'
																			: 'text-slate-500 group-hover:text-indigo-600'
																	}`}
																>
																	Kod:{' '}
																	<span className='font-mono font-medium'>
																		{faculty.code}
																	</span>
																</p>
															</div>

															{isExisting && (
																<div className='flex items-center space-x-2 ml-4'>
																	<div className='flex items-center bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-medium'>
																		<CheckCheckIcon className='w-4 h-4 mr-1' />
																		Qo&apos;shilgan
																	</div>
																</div>
															)}
														</div>

														{/* Subtle hover effect overlay */}
														{!isExisting && (
															<div className='absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none'></div>
														)}
													</div>
												</div>
											)
										})}
									</div>
								</div>

								<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-200/50'>
									<div className='flex-1'>
										{selectedFaculty &&
											!isFacultyExisting(selectedFaculty.code) && (
												<div className='bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-3'>
													<p className='text-sm font-medium text-indigo-900'>
														Tanlangan fakultet:
													</p>
													<p className='text-indigo-700 font-semibold mt-1'>
														{selectedFaculty.name}
													</p>
												</div>
											)}
									</div>

									<Button
										variant='secondary'
										onClick={handleAddFaculty}
										disabled={
											!selectedFaculty ||
											isFacultyExisting(selectedFaculty.code) ||
											loading
										}
										className='min-w-[140px] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100'
									>
										{loading ? (
											<>
												<Loader2 className='w-4 h-4 mr-2 animate-spin' />
												Qo&apos;shilmoqda...
											</>
										) : (
											<>
												Qo&apos;shish
												<PlusSquareIcon className='w-4 h-4 ml-2' />
											</>
										)}
									</Button>
								</div>
							</>
						) : (
							<div className='text-center py-12'>
								<div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center'>
									<PlusSquareIcon className='w-8 h-8 text-slate-400' />
								</div>
								<p className='text-slate-500 text-lg font-medium'>
									HEMIS tizimidan fakultetlar ro&apos;yxati topilmadi
								</p>
								<p className='text-slate-400 text-sm mt-2'>
									Iltimos, keyinroq qayta urinib ko&apos;ring
								</p>
							</div>
						)}
					</div>
				)}

				{/* Custom styles for scrollbar and animations */}
				<style jsx>{`
					.custom-scrollbar::-webkit-scrollbar {
						width: 6px;
					}
					.custom-scrollbar::-webkit-scrollbar-track {
						background: #f1f5f9;
						border-radius: 3px;
					}
					.custom-scrollbar::-webkit-scrollbar-thumb {
						background: linear-gradient(to bottom, #6366f1, #8b5cf6);
						border-radius: 3px;
					}
					.custom-scrollbar::-webkit-scrollbar-thumb:hover {
						background: linear-gradient(to bottom, #4f46e5, #7c3aed);
					}

					@keyframes slideInUp {
						from {
							opacity: 0;
							transform: translateY(20px);
						}
						to {
							opacity: 1;
							transform: translateY(0);
						}
					}

					.animation-delay-150 {
						animation-delay: 150ms;
					}
				`}</style>
			</DialogContent>
		</Dialog>
	)
}

export default CreateFaculty
