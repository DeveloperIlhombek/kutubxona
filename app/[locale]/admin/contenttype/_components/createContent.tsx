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
import { createContentType } from '@/lib/books/content_type'
import { Loader2, PlusSquareIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

function CreateContentTypeDialog({
	trigger,
	onSuccess,
}: {
	trigger: React.ReactNode
	onSuccess?: () => void
}) {
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		article: false,
		dissertation: false,
		literature: false,
		monographs: false,
	})

	const handleCheckboxChange = (field: keyof typeof formData) => {
		setFormData(prev => ({
			...prev,
			[field]: !prev[field],
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!formData.name.trim()) {
			toast.error('Iltimos, Resurs turi nomini kiriting')
			return
		}

		try {
			setLoading(true)
			const response = await createContentType({
				name: formData.name.trim(),
				article: formData.article,
				dissertation: formData.dissertation,
				literature: formData.literature,
				monographs: formData.monographs,
			})

			if (response?.isSuccess) {
				toast.success(`${formData.name} Resurs turi muvaffaqiyatli qo'shildi`)
				if (onSuccess) onSuccess()
				handleReset()
				setOpen(false)
			} else {
				throw new Error(
					response?.errorMessages?.join(', ') ||
						"Resurs turini qo'shishda xatolik"
				)
			}
		} catch (error) {
			toast.error(`Resurs turini qo'shishda xatolik: ${error}`)
		} finally {
			setLoading(false)
		}
	}

	const handleReset = () => {
		setFormData({
			name: '',
			article: false,
			dissertation: false,
			literature: false,
			monographs: false,
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='max-w-md z-999999 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200/60 dark:border-slate-700/60 shadow-2xl backdrop-blur-sm'>
				<DialogHeader className='space-y-3 pb-6 border-b border-slate-200/50 dark:border-slate-700/50'>
					<DialogTitle className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
						Yangi resurs turi qo&apos;shish
					</DialogTitle>
					<DialogDescription className='text-slate-600 dark:text-slate-400 text-base leading-relaxed'>
						Tizimga yangi resurs turini qo&apos;shish uchun quyidagi
						ma&apos;lumotlarni kiriting.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='space-y-4'>
						<div className='space-y-2'>
							<label className='text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2'>
								Resurs turi nomi
								<span className='text-red-500'>*</span>
							</label>
							<div className='relative group'>
								<input
									value={formData.name}
									onChange={e =>
										setFormData({ ...formData, name: e.target.value })
									}
									className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-300 dark:group-hover:border-indigo-600 shadow-sm hover:shadow-md text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500'
									placeholder='Resurs turi nomini kiriting...'
									required
									disabled={loading}
								/>
							</div>
						</div>

						<div className='space-y-2'>
							<label className='text-sm font-semibold text-slate-700 dark:text-slate-300'>
								Resurs turlari
							</label>
							<div className='grid grid-cols-2 gap-4'>
								<label className='flex items-center space-x-2'>
									<input
										type='checkbox'
										checked={formData.article}
										onChange={() => handleCheckboxChange('article')}
										className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600 rounded'
									/>
									<span className='text-gray-700 dark:text-gray-300'>
										Maqola
									</span>
								</label>

								<label className='flex items-center space-x-2'>
									<input
										type='checkbox'
										checked={formData.dissertation}
										onChange={() => handleCheckboxChange('dissertation')}
										className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600 rounded'
									/>
									<span className='text-gray-700 dark:text-gray-300'>
										Dissertatsiya
									</span>
								</label>

								<label className='flex items-center space-x-2'>
									<input
										type='checkbox'
										checked={formData.literature}
										onChange={() => handleCheckboxChange('literature')}
										className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600 rounded'
									/>
									<span className='text-gray-700 dark:text-gray-300'>
										{' '}
										Adabiyot
									</span>
								</label>

								<label className='flex items-center space-x-2'>
									<input
										type='checkbox'
										checked={formData.monographs}
										onChange={() => handleCheckboxChange('monographs')}
										className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-600 rounded'
									/>
									<span className='text-gray-700 dark:text-gray-300'>
										Monografiya
									</span>
								</label>
							</div>
						</div>
					</div>

					<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50'>
						<div className='flex-1'>
							{formData.name && (
								<div className='bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3'>
									<p className='text-sm font-medium text-indigo-900 dark:text-indigo-300'>
										Qo&apos;shiladigan resurs turi:
									</p>
									<p className='text-indigo-700 dark:text-indigo-400 font-semibold mt-1'>
										{formData.name}
									</p>
								</div>
							)}
						</div>

						<div className='flex gap-3'>
							<Button
								type='button'
								variant='outline'
								onClick={handleReset}
								disabled={loading}
								className='px-4 py-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-200 rounded-lg font-medium'
							>
								Tozalash
							</Button>
							<Button
								type='submit'
								disabled={loading || !formData.name.trim()}
								className='min-w-[140px] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 text-white rounded-lg font-medium px-6 py-2'
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
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default CreateContentTypeDialog
