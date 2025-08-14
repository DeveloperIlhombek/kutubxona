'use client'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { getCountryById, updateCountry } from '@/lib/books/countries'
import { Loader2, PencilIcon, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function EditCountryDialog({
	countryId,
	open,
	onOpenChange,
	onSuccess,
}: {
	countryId: string
	open: boolean
	onOpenChange: (open: boolean) => void
	onSuccess: () => void
}) {
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		code: '',
	})

	useEffect(() => {
		if (open && countryId) {
			const loadCountry = async () => {
				try {
					setLoading(true)
					const response = await getCountryById(countryId)
					if (response?.isSuccess) {
						setFormData({
							name: response.result.name,
							code: response.result.code,
						})
					}
				} catch (error) {
					toast.error(`Failed to load faculty data ${error}`)
				} finally {
					setLoading(false)
				}
			}
			loadCountry()
		}
	}, [open, countryId])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			setLoading(true)
			await updateCountry(countryId, formData)
			toast.success('Country updated successfully')
			onOpenChange(false)
			onSuccess()
		} catch (error) {
			toast.error(`Failed to update country ${error}`)
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
						Davlatlarni tahrirlash
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
									Davlat nomi
									<span className='text-red-500'>*</span>
								</label>
								<div className='relative group'>
									<input
										value={formData.name}
										onChange={e =>
											setFormData({ ...formData, name: e.target.value })
										}
										className='w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-300 shadow-sm hover:shadow-md text-slate-900 placeholder-slate-400'
										placeholder='Fakultet nomini kiriting...'
										required
									/>
									<div className='absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-focus-within:from-indigo-500/5 group-focus-within:to-purple-500/5 rounded-xl transition-all duration-300 pointer-events-none'></div>
								</div>
							</div>

							<div className='space-y-2'>
								<label className='text-sm font-semibold text-slate-700 flex items-center gap-2'>
									Davlat kodi
									<span className='text-red-500'>*</span>
								</label>
								<div className='relative group'>
									<input
										value={formData.code}
										onChange={e =>
											setFormData({ ...formData, code: e.target.value })
										}
										className='w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-300 shadow-sm hover:shadow-md text-slate-900 placeholder-slate-400 font-mono'
										placeholder='Kodni kiriting...'
										required
									/>
									<div className='absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-focus-within:from-indigo-500/5 group-focus-within:to-purple-500/5 rounded-xl transition-all duration-300 pointer-events-none'></div>
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

				{/* Custom styles for animations */}
				<style jsx>{`
					.animation-delay-150 {
						animation-delay: 150ms;
					}
				`}</style>
			</DialogContent>
		</Dialog>
	)
}
