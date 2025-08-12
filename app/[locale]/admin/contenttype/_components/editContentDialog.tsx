'use client'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { getContentTypeById, updateContent } from '@/lib/books/content_type'
import { Loader2, PencilIcon, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function EditContentDialog({
	contentId,
	open,
	onOpenChange,
	onSuccess,
}: {
	contentId: string
	open: boolean
	onOpenChange: (open: boolean) => void
	onSuccess: () => void
}) {
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		literature: false,
		article: false,
		dissertation: false,
		monographs: false,
	})

	useEffect(() => {
		if (open && contentId) {
			const loadContentType = async () => {
				try {
					setLoading(true)
					const response = await getContentTypeById(contentId)

					console.log('API Response:', response) // Debug uchun

					if (response?.isSuccess && response.result) {
						setFormData({
							name: response.result.name || '',
							literature: response.result.literature || false,
							article: response.result.article || false,
							dissertation: response.result.dissertation || false,
							monographs: response.result.monographs || false,
						})
					}
				} catch (error) {
					toast.error(`Failed to load content type data: ${error}`)
				} finally {
					setLoading(false)
				}
			}
			loadContentType()
		}
	}, [open, contentId])

	const handleCheckboxChange = (field: keyof typeof formData) => {
		setFormData(prev => ({
			...prev,
			[field]: !prev[field],
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			setLoading(true)
			const response = await updateContent(contentId, formData)
			if (response?.isSuccess) {
				toast.success('Content type updated successfully')
				onOpenChange(false)
				onSuccess()
			} else {
				toast.error(response?.error || 'Failed to update content type')
			}
		} catch (error) {
			toast.error(`Failed to update content type: ${error}`)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='max-w-md bg-gradient-to-br from-slate-50 to-gray-100 border border-slate-200/60 shadow-2xl backdrop-blur-sm'>
				<DialogHeader className='space-y-3 pb-6 border-b border-slate-200/50'>
					<DialogTitle className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2'>
						<PencilIcon className='w-6 h-6 text-indigo-600' />
						Kontent turini tahrirlash
					</DialogTitle>
				</DialogHeader>

				{loading ? (
					<div className='flex flex-col items-center justify-center py-12 space-y-4'>
						<div className='relative'>
							<Loader2 className='w-10 h-10 text-indigo-600 animate-spin' />
							<div className='absolute inset-0 w-10 h-10 border-4 border-indigo-200 border-t-transparent rounded-full animate-spin animation-delay-150'></div>
						</div>
						<p className='text-slate-600 font-medium animate-pulse'>
							Ma&apos;lumotlar yuklanmoqda...
						</p>
					</div>
				) : (
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div className='space-y-4'>
							<div className='space-y-2'>
								<label className='text-sm font-semibold text-slate-700 flex items-center gap-2'>
									Kontent turi nomi
									<span className='text-red-500'>*</span>
								</label>
								<div className='relative group'>
									<input
										value={formData.name}
										onChange={e =>
											setFormData({ ...formData, name: e.target.value })
										}
										className='w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-300 shadow-sm hover:shadow-md text-slate-900 placeholder-slate-400'
										placeholder='Kontent turi nomini kiriting...'
										required
									/>
								</div>
							</div>

							<div className='space-y-2'>
								<label className='text-sm font-semibold text-slate-700'>
									Kontent turlari
								</label>
								<div className='grid grid-cols-2 gap-4'>
									<label className='flex items-center space-x-2'>
										<input
											type='checkbox'
											checked={formData.literature}
											onChange={() => handleCheckboxChange('literature')}
											className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded'
										/>
										<span>Adabiyot</span>
									</label>

									<label className='flex items-center space-x-2'>
										<input
											type='checkbox'
											checked={formData.article}
											onChange={() => handleCheckboxChange('article')}
											className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded'
										/>
										<span>Maqola</span>
									</label>

									<label className='flex items-center space-x-2'>
										<input
											type='checkbox'
											checked={formData.dissertation}
											onChange={() => handleCheckboxChange('dissertation')}
											className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded'
										/>
										<span>Dissertatsiya</span>
									</label>

									<label className='flex items-center space-x-2'>
										<input
											type='checkbox'
											checked={formData.monographs}
											onChange={() => handleCheckboxChange('monographs')}
											className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded'
										/>
										<span>Monografiya</span>
									</label>
								</div>
							</div>
						</div>

						<div className='flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-200/50'>
							<Button
								type='button'
								variant='outline'
								onClick={() => onOpenChange(false)}
								className='px-6 py-2.5 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 rounded-lg font-medium'
								disabled={loading}
							>
								Bekor qilish
							</Button>
							<Button
								type='submit'
								disabled={loading}
								className='px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 rounded-lg font-medium min-w-[140px]'
							>
								{loading ? (
									<>
										<Loader2 className='w-4 h-4 mr-2 animate-spin' />
										Saqlanmoqda...
									</>
								) : (
									<>
										<Save className='w-4 h-4 mr-2' />
										O&apos;zgarishlarni saqlash
									</>
								)}
							</Button>
						</div>
					</form>
				)}
			</DialogContent>
		</Dialog>
	)
}
