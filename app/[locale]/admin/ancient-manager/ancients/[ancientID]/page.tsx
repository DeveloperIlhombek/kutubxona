'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAncientStore } from '@/store/ancient'
import {
	BookOpenCheck,
	Calendar,
	FileText,
	Languages,
	Library,
	PenSquare,
	Ruler,
	User,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function AncientDetailPage() {
	const router = useRouter()
	const pathname = usePathname()
	const id = pathname.split('/')[5]
	const { currentAncient, fetchAncientById, updateExistingAncient, loading } =
		useAncientStore()

	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({
		work_name: '',
		arab_name: '',
		author: '',
		calligrapher: '',
		subject: '',
		language: '',
		date_write: '',
		status: '',
		size: '',
		place_saved: '',
		description: '',
	})

	useEffect(() => {
		if (id) {
			fetchAncientById(id as string)
		}
	}, [id])

	useEffect(() => {
		if (currentAncient) {
			setFormData({
				work_name: currentAncient.work_name,
				arab_name: currentAncient.arab_name,
				author: currentAncient.author,
				calligrapher: currentAncient.calligrapher,
				subject: currentAncient.subject,
				language: currentAncient.language,
				date_write: currentAncient.date_write,
				status: currentAncient.status,
				size: currentAncient.size,
				place_saved: currentAncient.arab_name,
				description: currentAncient.arab_name || '',
			})
		}
	}, [currentAncient])
	console.log(currentAncient)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (id) {
			const success = await updateExistingAncient(id as string, formData)
			if (success) {
				toast.success("Qo'lyozma muvaffaqiyatli yangilandi")
				setIsEditing(false)
			} else {
				toast.error('Yangilashda xatolik yuz berdi')
			}
		}
	}

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}

	if (loading) {
		return (
			<div className='container mx-auto py-8'>
				<div className='animate-pulse space-y-4'>
					<div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3'></div>
					<div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2'></div>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
						{[...Array(8)].map((_, i) => (
							<div key={i} className='space-y-2'>
								<div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4'></div>
								<div className='h-10 bg-gray-200 dark:bg-gray-700 rounded'></div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className='container mx-auto py-8'>
			<div className='flex justify-between items-center mb-6'>
				<div>
					<h1 className='text-3xl font-bold'>
						{isEditing ? (
							<Input
								name='work_name'
								value={formData.work_name}
								onChange={handleInputChange}
								className='text-3xl font-bold h-12'
							/>
						) : (
							currentAncient?.arab_name
						)}
					</h1>
					<p className='text-lg text-muted-foreground mt-2'>
						{isEditing ? (
							<Input
								name='arab_name'
								value={formData.arab_name}
								onChange={handleInputChange}
								className='text-lg h-10'
							/>
						) : (
							currentAncient?.arab_name
						)}
					</p>
				</div>
				<div className='flex gap-2'>
					{isEditing ? (
						<>
							<Button variant='outline' onClick={() => setIsEditing(false)}>
								Bekor qilish
							</Button>
							<Button onClick={handleSubmit}>Saqlash</Button>
						</>
					) : (
						<Button onClick={() => setIsEditing(true)}>
							<PenSquare className='w-4 h-4 mr-2' />
							Tahrirlash
						</Button>
					)}
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{/* Left Column - Basic Info */}
				<div className='space-y-6'>
					<div className='bg-white dark:bg-gray-900 rounded-lg border p-6'>
						<h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
							<BookOpenCheck className='w-5 h-5' />
							Asar haqida
						</h2>

						<div className='space-y-4'>
							<div>
								<Label className='flex items-center gap-2 text-muted-foreground'>
									<User className='w-4 h-4' />
									Muallif
								</Label>
								{isEditing ? (
									<Input
										name='author'
										value={formData.author}
										onChange={handleInputChange}
										className='mt-1'
									/>
								) : (
									<p className='mt-1'>{currentAncient?.author}</p>
								)}
							</div>

							<div>
								<Label className='flex items-center gap-2 text-muted-foreground'>
									<PenSquare className='w-4 h-4' />
									Xattot
								</Label>
								{isEditing ? (
									<Input
										name='calligrapher'
										value={formData.calligrapher}
										onChange={handleInputChange}
										className='mt-1'
									/>
								) : (
									<p className='mt-1'>{currentAncient?.calligrapher}</p>
								)}
							</div>

							<div>
								<Label className='flex items-center gap-2 text-muted-foreground'>
									<Languages className='w-4 h-4' />
									Til
								</Label>
								{isEditing ? (
									<Input
										name='language'
										value={formData.language}
										onChange={handleInputChange}
										className='mt-1'
									/>
								) : (
									<p className='mt-1'>{currentAncient?.language}</p>
								)}
							</div>

							<div>
								<Label className='flex items-center gap-2 text-muted-foreground'>
									<Calendar className='w-4 h-4' />
									Yozilgan vaqt
								</Label>
								{isEditing ? (
									<Input
										name='date_write'
										value={formData.date_write}
										onChange={handleInputChange}
										className='mt-1'
									/>
								) : (
									<p className='mt-1'>{currentAncient?.date_write}</p>
								)}
							</div>
						</div>
					</div>

					{/* Physical Characteristics */}
					<div className='bg-white dark:bg-gray-900 rounded-lg border p-6'>
						<h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
							<Ruler className='w-5 h-5' />
							Jismoniy xususiyatlar
						</h2>

						<div className='space-y-4'>
							<div>
								<Label className='text-muted-foreground'>Holati</Label>
								{isEditing ? (
									<Textarea
										name='status'
										value={formData.status}
										onChange={handleInputChange}
										className='mt-1'
										rows={3}
									/>
								) : (
									<p className='mt-1 whitespace-pre-line'>
										{currentAncient?.status}
									</p>
								)}
							</div>

							<div>
								<Label className='text-muted-foreground'>Olchami</Label>
								{isEditing ? (
									<Input
										name='size'
										value={formData.size}
										onChange={handleInputChange}
										className='mt-1'
									/>
								) : (
									<p className='mt-1'>{currentAncient?.size}</p>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Right Column - Additional Info */}
				<div className='space-y-6'>
					{/* Subject and Description */}
					<div className='bg-white dark:bg-gray-900 rounded-lg border p-6'>
						<h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
							<FileText className='w-5 h-5' />
							Mavzu va tavsif
						</h2>

						<div className='space-y-4'>
							<div>
								<Label className='text-muted-foreground'>Mavzu</Label>
								{isEditing ? (
									<Input
										name='subject'
										value={formData.subject}
										onChange={handleInputChange}
										className='mt-1'
									/>
								) : (
									<div className='mt-1 flex flex-wrap gap-2'>
										{currentAncient?.subject.split(',').map((topic, i) => (
											<Badge key={i} variant='secondary'>
												{topic.trim()}
											</Badge>
										))}
									</div>
								)}
							</div>

							<div>
								<Label className='text-muted-foreground'>
									Qoshimcha malumot
								</Label>
								{isEditing ? (
									<Textarea
										name='description'
										value={formData.description}
										onChange={handleInputChange}
										className='mt-1'
										rows={4}
									/>
								) : (
									<p className='mt-1 text-muted-foreground'>
										{currentAncient?.arab_name ||
											"Qo'shimcha ma'lumot kiritilmagan"}
									</p>
								)}
							</div>
						</div>
					</div>

					{/* Location and Metadata */}
					<div className='bg-white dark:bg-gray-900 rounded-lg border p-6'>
						<h2 className='text-xl font-semibold mb-4 flex items-center gap-2'>
							<Library className='w-5 h-5' />
							Saqlanish joyi
						</h2>

						<div className='space-y-4'>
							<div>
								<Label className='text-muted-foreground'>Saqlanish joyi</Label>
								{isEditing ? (
									<Input
										name='place_saved'
										value={formData.place_saved}
										onChange={handleInputChange}
										className='mt-1'
									/>
								) : (
									<p className='mt-1'>{currentAncient?.arab_name}</p>
								)}
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<div>
									<Label className='text-muted-foreground'>
										Inventar raqami
									</Label>
									<p className='mt-1'>{currentAncient?.inventor_id}</p>
								</div>
								<div>
									<Label className='text-muted-foreground'>Yaratilgan</Label>
									<p className='mt-1'>{currentAncient?.arab_name}</p>
								</div>
							</div>
						</div>
					</div>

					{/* PDF Preview */}
					{/* {currentAncient.book_File && (
						<div className='bg-white dark:bg-gray-900 rounded-lg border p-6'>
							<h2 className='text-xl font-semibold mb-4'>PDF nusxasi</h2>
							<div className='flex items-center justify-between'>
								<div>
									<p className='font-medium'>
										{currentAncient.book_File.filename}
									</p>
									<p className='text-sm text-muted-foreground'>
										{(currentAncient.book_File.size / 1024 / 1024).toFixed(2)}{' '}
										MB
									</p>
								</div>
								<Link
									href={currentAncient.book_File}
									target='_blank'
									rel='noopener noreferrer'
								>
									<Button variant='outline'>Korish</Button>
								</Link>
							</div>
						</div>
					)} */}
				</div>
			</div>
		</div>
	)
}
