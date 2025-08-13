'use client'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { deleteBuilding } from '@/lib/books/building'
import { AlertTriangle, Loader2, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function DeleteBuildingDialog({
	buildingId,
	buildingName,
	open,
	onOpenChange,
	onSuccess,
}: {
	buildingId: string
	buildingName: string
	open: boolean
	onOpenChange: (open: boolean) => void
	onSuccess: () => void
}) {
	const [loading, setLoading] = useState(false)

	const handleDelete = async () => {
		try {
			setLoading(true)
			await deleteBuilding(buildingId)
			toast.success(`${buildingName} muvaffaqiyatli o'chirildi`)
			onOpenChange(false)
			onSuccess()
		} catch (error) {
			toast.error(`Binoni o'chirishda xatolik: ${error}`)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className='max-w-md bg-gradient-to-br from-red-50 to-orange-50 border border-red-200/60 shadow-2xl backdrop-blur-sm'>
				<DialogHeader className='space-y-3 pb-6 border-b border-red-200/50'>
					<DialogTitle className='text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-2'>
						<AlertTriangle className='w-6 h-6 text-red-600' />
						Binoni o&apos;chirish
					</DialogTitle>
				</DialogHeader>

				<div className='space-y-6'>
					{/* Warning Icon and Message */}
					<div className='flex flex-col items-center text-center space-y-4'>
						<div className='w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center'>
							<Trash2 className='w-8 h-8 text-red-600' />
						</div>

						<div className='space-y-2'>
							<p className='text-lg font-semibold text-slate-800'>
								Haqiqatan ham o&apos;chirmoqchimisiz?
							</p>
							<div className='bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4'>
								<p className='text-red-800 font-medium text-center'>
									&quot;{buildingName}&quot;
								</p>
								<p className='text-sm text-red-600 mt-2 text-center'>
									Bu amalni bekor qilib bo&apos;lmaydi
								</p>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-red-200/50'>
						<Button
							variant='outline'
							onClick={() => onOpenChange(false)}
							disabled={loading}
							className='px-6 py-2.5 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 rounded-lg font-medium'
						>
							<X className='w-4 h-4 mr-2' />
							Bekor qilish
						</Button>
						<Button
							variant='destructive'
							onClick={handleDelete}
							disabled={loading}
							className='px-6 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:from-slate-400 disabled:to-slate-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 rounded-lg font-medium min-w-[140px]'
						>
							{loading ? (
								<>
									<Loader2 className='w-4 h-4 mr-2 animate-spin' />
									O&apos;chirilmoqda...
								</>
							) : (
								<>
									<Trash2 className='w-4 h-4 mr-2' />
									Ha, o&apos;chirish
								</>
							)}
						</Button>
					</div>
				</div>

				{/* Subtle background pattern */}
				<div className='absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-lg pointer-events-none'></div>
			</DialogContent>
		</Dialog>
	)
}
