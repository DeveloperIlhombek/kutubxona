// 'use client'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { Textarea } from '@/components/ui/textarea'
// import { useAncientStore } from '@/store/ancient'
// import {
// 	ArrowLeft,
// 	BookOpenCheck,
// 	Calendar,
// 	CheckCircle2,
// 	File,
// 	FileText,
// 	FolderTree,
// 	Globe,
// 	Image as ImageIcon,
// 	Info,
// 	Languages,
// 	PenSquare,
// 	Ruler,
// 	Save,
// 	Sparkles,
// 	Trash2,
// 	Upload,
// 	User,
// 	X,
// } from 'lucide-react'
// import Image from 'next/image'
// import { usePathname, useRouter } from 'next/navigation'
// import { useCallback, useEffect, useState } from 'react'
// import { useDropzone } from 'react-dropzone'
// import { toast } from 'sonner'
// import { DeleteAncientDialog } from '../_components/deleteAncientDialog'

// export default function AncientDetailPage() {
// 	const pathname = usePathname()
// 	const router = useRouter()
// 	const id = pathname.split('/')[5]
// 	const { currentAncient, fetchAncientById, updateExistingAncient, loading } =
// 		useAncientStore()

// 	const [isEditing, setIsEditing] = useState(false)
// 	const [formData, setFormData] = useState({
// 		work_name: '',
// 		arab_name: '',
// 		author: '',
// 		calligrapher: '',
// 		subject: '',
// 		language: '',
// 		date_write: '',
// 		status: '',
// 		size: '',
// 		place_saved: '',
// 		description: '',
// 		ancientCategoryId: '',
// 	})
// 	const [previewImage, setPreviewImage] = useState<string | null>(null)
// 	const [uploading, setUploading] = useState(false)
// 	const [deletingAncient, setDeletingAncient] = useState<{
// 		id: string
// 		work_name: string
// 	} | null>(null)
// 	useEffect(() => {
// 		if (id) {
// 			fetchAncientById(id as string)
// 		}
// 	}, [id])

// 	useEffect(() => {
// 		if (currentAncient) {
// 			setFormData({
// 				work_name: currentAncient.work_name,
// 				arab_name: currentAncient.arab_name,
// 				author: currentAncient.author,
// 				calligrapher: currentAncient.calligrapher,
// 				subject: currentAncient.subject,
// 				language: currentAncient.language,
// 				date_write: currentAncient.date_write,
// 				status: currentAncient.status,
// 				size: currentAncient.size,
// 				place_saved: currentAncient.place_saved,
// 				description: currentAncient.description || '',
// 				ancientCategoryId: currentAncient.ancientCategoryId,
// 			})

// 			if (currentAncient.coverImage) {
// 				setPreviewImage(currentAncient.coverImage)
// 			}
// 		}
// 	}, [currentAncient])

// 	const onDrop = useCallback((acceptedFiles: File[]) => {
// 		const file = acceptedFiles[0]
// 		if (file) {
// 			if (file.type.startsWith('image/')) {
// 				const reader = new FileReader()
// 				reader.onload = () => {
// 					setPreviewImage(reader.result as string)
// 				}
// 				reader.readAsDataURL(file)
// 			}
// 		}
// 	}, [])

// 	const { getRootProps, getInputProps, isDragActive } = useDropzone({
// 		onDrop,
// 		accept: {
// 			'image/*': ['.jpeg', '.jpg', '.png'],
// 		},
// 		maxFiles: 1,
// 		maxSize: 5 * 1024 * 1024, // 5MB
// 	})

// 	const handleRemoveImage = () => {
// 		setPreviewImage(null)
// 	}

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault()
// 		if (id) {
// 			setUploading(true)
// 			try {
// 				const updatedData = {
// 					...formData,
// 					coverImage: previewImage,
// 				}

// 				const success = await updateExistingAncient(id as string, updatedData)
// 				if (success) {
// 					toast.success("Qo'lyozma muvaffaqiyatli yangilandi")
// 					setIsEditing(false)
// 				} else {
// 					toast.error('Yangilashda xatolik yuz berdi')
// 				}
// 			} catch (error) {
// 				toast.error('Fayl yuklashda xatolik yuz berdi' + error)
// 			} finally {
// 				setUploading(false)
// 			}
// 		}
// 	}

// 	const handleInputChange = (
// 		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// 	) => {
// 		const { name, value } = e.target
// 		setFormData(prev => ({
// 			...prev,
// 			[name]: value,
// 		}))
// 	}

// 	if (loading) {
// 		return (
// 			<div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900'>
// 				{/* Loading Hero Section */}
// 				<div className='w-full h-[25vh] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-700 dark:via-purple-700 dark:to-indigo-900 flex items-center justify-center relative overflow-hidden'>
// 					<div className='absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 animate-pulse'></div>
// 					<div className='relative z-10 text-center'>
// 						<div className='w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center animate-spin'>
// 							<Sparkles className='w-8 h-8 text-white' />
// 						</div>
// 						<h1 className='text-3xl font-bold text-white drop-shadow-lg'>
// 							Qo&apos;lyozma ma&apos;lumotlari yuklanmoqda...
// 						</h1>
// 					</div>
// 				</div>

// 				{/* Loading Content */}
// 				<div className='max-w-7xl mx-auto p-6 -mt-12 relative z-10'>
// 					<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 p-6 animate-pulse'>
// 						<div className='space-y-6'>
// 							<div className='h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3'></div>
// 							<div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2'></div>
// 							<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
// 								{[...Array(6)].map((_, i) => (
// 									<div key={i} className='space-y-2'>
// 										<div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4'></div>
// 										<div className='h-10 bg-slate-200 dark:bg-slate-700 rounded'></div>
// 									</div>
// 								))}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		)
// 	}

// 	return (
// 		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900'>
// 			{/* Hero Section */}
// 			<div className='w-full h-[25vh] bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-700 dark:via-purple-700 dark:to-indigo-900 flex items-center justify-center relative overflow-hidden'>
// 				{/* Animated background elements */}
// 				<div className='absolute inset-0'>
// 					<div className='absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float'></div>
// 					<div className='absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float-delayed'></div>
// 					<div className='absolute bottom-10 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float'></div>
// 					<div className='absolute bottom-20 right-1/3 w-14 h-14 bg-white/10 rounded-full animate-float-delayed'></div>
// 				</div>

// 				{/* Gradient overlay */}
// 				<div className='absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20'></div>

// 				{/* Content */}
// 				<div className='relative z-10 text-center animate-fade-in-up max-w-4xl mx-auto px-6'>
// 					<div className='flex items-center justify-center mb-4'>
// 						<BookOpenCheck className='w-8 h-8 text-white mr-3' />
// 						<Sparkles className='w-8 h-8 text-white animate-pulse' />
// 					</div>
// 					<h1 className='text-2xl md:text-4xl font-bold text-white drop-shadow-lg'>
// 						{isEditing ? "Qo'lyozmani tahrirlash" : "Qo'lyozma tafsilotlari"}
// 					</h1>
// 					<p className='text-white/80 mt-2 text-sm md:text-lg'>
// 						{currentAncient?.work_name}
// 					</p>
// 				</div>
// 			</div>

// 			{/* Main Content */}
// 			<div className='max-w-7xl mx-auto p-4 md:p-6 -mt-12 relative z-10'>
// 				{/* Header Card */}
// 				<div className='mb-6 animate-slide-in-up'>
// 					<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 p-4 md:p-6'>
// 						<div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
// 							{/* Back Button and Title */}
// 							<div className='flex items-center gap-4'>
// 								<Button
// 									variant='outline'
// 									size='icon'
// 									onClick={() => router.back()}
// 									className='shrink-0'
// 								>
// 									<ArrowLeft className='w-4 h-4 dark:text-white' />
// 								</Button>
// 								<div className='min-w-0 flex-1'>
// 									{isEditing ? (
// 										<div className='space-y-2'>
// 											<Input
// 												name='work_name'
// 												value={formData.work_name}
// 												onChange={handleInputChange}
// 												className='text-lg dark:text-white md:text-2xl font-bold h-10 md:h-12'
// 												placeholder='Asar nomi'
// 											/>
// 											<Input
// 												name='arab_name'
// 												value={formData.arab_name}
// 												onChange={handleInputChange}
// 												className='text-sm dark:text-white md:text-lg h-8 md:h-10'
// 												placeholder='Arabcha nomi'
// 											/>
// 										</div>
// 									) : (
// 										<div>
// 											<h1 className='text-lg md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent truncate'>
// 												{currentAncient?.work_name}
// 											</h1>
// 											<p className='text-sm md:text-lg text-slate-600 dark:text-slate-400 truncate'>
// 												{currentAncient?.arab_name}
// 											</p>
// 										</div>
// 									)}
// 								</div>
// 							</div>

// 							{/* Action Buttons */}
// 							<div className='flex gap-2 shrink-0'>
// 								{isEditing ? (
// 									<>
// 										<Button
// 											variant='outline'
// 											onClick={() => setIsEditing(false)}
// 											className='px-3 md:px-4'
// 										>
// 											<X className='w-4 h-4 mr-1 md:mr-2 dark:text-white' />
// 											<span className='hidden sm:inline dark:text-white'>
// 												Bekor qilish
// 											</span>
// 										</Button>
// 										<Button
// 											onClick={handleSubmit}
// 											disabled={uploading}
// 											className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-3 md:px-4'
// 										>
// 											{uploading ? (
// 												<>
// 													<div className='w-4 h-4 mr-1 md:mr-2 animate-spin rounded-full border-2 border-white/20 border-t-white'></div>
// 													<span className='hidden sm:inline dark:text-white'>
// 														Yuklanmoqda...
// 													</span>
// 												</>
// 											) : (
// 												<>
// 													<Save className='w-4 h-4 mr-1 md:mr-2' />
// 													<span className='hidden sm:inline dark:text-white'>
// 														Saqlash
// 													</span>
// 												</>
// 											)}
// 										</Button>
// 									</>
// 								) : (
// 									<Button
// 										onClick={() => setIsEditing(true)}
// 										className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 px-3 md:px-4'
// 									>
// 										<PenSquare className='w-4 h-4 mr-1 md:mr-2' />
// 										<span className='hidden sm:inline'>Tahrirlash</span>
// 									</Button>
// 								)}
// 								{currentAncient && (
// 									<Button
// 										onClick={() =>
// 											setDeletingAncient({
// 												id: currentAncient?.id,
// 												work_name: currentAncient?.work_name,
// 											})
// 										}
// 										className='flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 cursor-pointer'
// 									>
// 										<Trash2 className='w-4 h-4' />
// 										O&apos;chirish
// 									</Button>
// 								)}
// 							</div>
// 						</div>
// 					</div>
// 				</div>

// 				{/* Tabs */}
// 				<div className='bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 overflow-hidden animate-slide-in-up'>
// 					<Tabs defaultValue='main' className='w-full'>
// 						<div className='bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-b border-indigo-200/50 dark:border-indigo-800/50 p-4'>
// 							<TabsList className='grid w-full max-w-md grid-cols-2 bg-white/50 dark:bg-slate-800/50'>
// 								<TabsTrigger
// 									value='main'
// 									className='flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-xs md:text-sm'
// 								>
// 									<Info className='w-3 h-3 md:w-4 md:h-4' />
// 									<span className='hidden sm:inline'>Asosiy</span> Ma&apos;lumot
// 								</TabsTrigger>
// 								<TabsTrigger
// 									value='classification'
// 									className='flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-xs md:text-sm'
// 								>
// 									<FolderTree className='w-3 h-3 md:w-4 md:h-4 dark:text-white' />
// 									<span className='hidden sm:inline dark:text-white'>
// 										Klassifikatsiya
// 									</span>
// 									<span className='sm:hidden dark:text-white'>Klass</span>
// 								</TabsTrigger>
// 							</TabsList>
// 						</div>

// 						{/* Main Information Tab */}
// 						<TabsContent value='main' className='p-4 md:p-6'>
// 							<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
// 								{/* Left Column - Basic Info */}
// 								<div className='space-y-6'>
// 									{/* Basic Information Card */}
// 									<div className='bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60 p-4 md:p-6 shadow-lg animate-slide-in-up'>
// 										<h2 className='text-lg md:text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
// 											<BookOpenCheck className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
// 											Asar haqida
// 										</h2>

// 										<div className='space-y-4'>
// 											<div className='group'>
// 												<Label className='flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium'>
// 													<User className='w-4 h-4' />
// 													Muallif
// 												</Label>
// 												{isEditing ? (
// 													<Input
// 														name='author'
// 														value={formData.author}
// 														onChange={handleInputChange}
// 														className='mt-2 focus:ring-2 dark:text-white focus:ring-indigo-500 dark:focus:ring-indigo-400'
// 														placeholder='Muallif nomini kiriting'
// 													/>
// 												) : (
// 													<p className='mt-2 text-slate-800 dark:text-slate-200 font-medium bg-slate-100 dark:bg-slate-800 rounded-lg p-3 '>
// 														{currentAncient?.author || "Ma'lumot kiritilmagan"}
// 													</p>
// 												)}
// 											</div>

// 											<div className='group'>
// 												<Label className='flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium'>
// 													<PenSquare className='w-4 h-4' />
// 													Xattot
// 												</Label>
// 												{isEditing ? (
// 													<Input
// 														name='calligrapher'
// 														value={formData.calligrapher}
// 														onChange={handleInputChange}
// 														className='mt-2 focus:ring-2 dark:text-white focus:ring-indigo-500 dark:focus:ring-indigo-400'
// 														placeholder='Xattot nomini kiriting'
// 													/>
// 												) : (
// 													<p className='mt-2 text-slate-800 dark:text-slate-200 font-medium bg-slate-100 dark:bg-slate-800 rounded-lg p-3'>
// 														{currentAncient?.calligrapher ||
// 															"Ma'lumot kiritilmagan"}
// 													</p>
// 												)}
// 											</div>

// 											<div className='group'>
// 												<Label className='flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium'>
// 													<Languages className='w-4 h-4' />
// 													Til
// 												</Label>
// 												{isEditing ? (
// 													<Input
// 														name='language'
// 														value={formData.language}
// 														onChange={handleInputChange}
// 														className='mt-2 focus:ring-2 dark:text-white focus:ring-indigo-500 dark:focus:ring-indigo-400'
// 														placeholder='Til nomini kiriting'
// 													/>
// 												) : (
// 													<p className='mt-2 text-slate-800 dark:text-slate-200 font-medium bg-slate-100 dark:bg-slate-800 rounded-lg p-3'>
// 														{currentAncient?.language ||
// 															"Ma'lumot kiritilmagan"}
// 													</p>
// 												)}
// 											</div>

// 											<div className='group'>
// 												<Label className='flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm font-medium'>
// 													<Calendar className='w-4 h-4' />
// 													Yozilgan vaqt
// 												</Label>
// 												{isEditing ? (
// 													<Input
// 														name='date_write'
// 														value={formData.date_write}
// 														onChange={handleInputChange}
// 														className='mt-2 focus:ring-2 dark:text-white focus:ring-indigo-500 dark:focus:ring-indigo-400'
// 														placeholder='Yozilgan vaqtini kiriting'
// 													/>
// 												) : (
// 													<p className='mt-2 text-slate-800 dark:text-slate-200 font-medium bg-slate-100 dark:bg-slate-800 rounded-lg p-3'>
// 														{currentAncient?.date_write ||
// 															"Ma'lumot kiritilmagan"}
// 													</p>
// 												)}
// 											</div>
// 										</div>
// 									</div>

// 									{/* Physical Characteristics Card */}
// 									<div className='bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60 p-4 md:p-6 shadow-lg animate-slide-in-up'>
// 										<h2 className='text-lg md:text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
// 											<Ruler className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
// 											Jismoniy xususiyatlar
// 										</h2>

// 										<div className='space-y-4'>
// 											<div className='group'>
// 												<Label className='text-slate-600 dark:text-slate-400 text-sm font-medium'>
// 													Holati
// 												</Label>
// 												{isEditing ? (
// 													<Textarea
// 														name='status'
// 														value={formData.status}
// 														onChange={handleInputChange}
// 														className='mt-2 focus:ring-2 dark:text-white focus:ring-indigo-500 dark:focus:ring-indigo-400'
// 														rows={3}
// 														placeholder="Qo'lyozmaning holatini tasvirlab bering"
// 													/>
// 												) : (
// 													<div className='mt-2 text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg p-3'>
// 														<p className='whitespace-pre-line'>
// 															{currentAncient?.status ||
// 																"Ma'lumot kiritilmagan"}
// 														</p>
// 													</div>
// 												)}
// 											</div>

// 											<div className='group'>
// 												<Label className='text-slate-600 dark:text-slate-400 text-sm font-medium'>
// 													O&apos;lchami
// 												</Label>
// 												{isEditing ? (
// 													<Input
// 														name='size'
// 														value={formData.size}
// 														onChange={handleInputChange}
// 														className='mt-2 focus:ring-2 dark:text-white focus:ring-indigo-500 dark:focus:ring-indigo-400'
// 														placeholder="O'lchamini kiriting (masalan: 20x30 sm)"
// 													/>
// 												) : (
// 													<p className='mt-2 text-slate-800 dark:text-slate-200 font-medium bg-slate-100 dark:bg-slate-800 rounded-lg p-3'>
// 														{currentAncient?.size || "Ma'lumot kiritilmagan"}
// 													</p>
// 												)}
// 											</div>
// 										</div>
// 									</div>
// 								</div>

// 								{/* Right Column - Additional Info */}
// 								<div className='space-y-6'>
// 									{/* Subject and Description Card */}
// 									<div className='bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60 p-4 md:p-6 shadow-lg animate-slide-in-up'>
// 										<h2 className='text-lg md:text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
// 											<FileText className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
// 											Mavzu va tavsif
// 										</h2>

// 										<div className='space-y-4'>
// 											<div className='group'>
// 												<Label className='text-slate-600 dark:text-slate-400 text-sm font-medium'>
// 													Mavzu
// 												</Label>
// 												{isEditing ? (
// 													<Input
// 														name='subject'
// 														value={formData.subject}
// 														onChange={handleInputChange}
// 														className='mt-2 focus:ring-2 dark:text-white focus:ring-indigo-500 dark:focus:ring-indigo-400'
// 														placeholder='Mavzularni vergul bilan ajrating'
// 													/>
// 												) : (
// 													<div className='mt-2 flex flex-wrap gap-2'>
// 														{currentAncient?.subject ? (
// 															currentAncient.subject
// 																.split(',')
// 																.map((topic, i) => (
// 																	<Badge
// 																		key={i}
// 																		variant='secondary'
// 																		className='bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-indigo-800 dark:text-indigo-200'
// 																	>
// 																		{topic.trim()}
// 																	</Badge>
// 																))
// 														) : (
// 															<p className='text-slate-500 dark:text-slate-400 italic'>
// 																Ma&apos;lumot kiritilmagan
// 															</p>
// 														)}
// 													</div>
// 												)}
// 											</div>

// 											<div className='group'>
// 												<Label className='text-slate-600 dark:text-slate-400 text-sm font-medium'>
// 													Qo&apos;shimcha ma&apos;lumot
// 												</Label>
// 												{isEditing ? (
// 													<Textarea
// 														name='description'
// 														value={formData.description}
// 														onChange={handleInputChange}
// 														className='mt-2 focus:ring-2 dark:text-white focus:ring-indigo-500 dark:focus:ring-indigo-400'
// 														rows={4}
// 														placeholder="Qo'lyozma haqida qo'shimcha ma'lumot kiriting"
// 													/>
// 												) : (
// 													<div className='mt-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg p-3 min-h-[100px]'>
// 														<p className='whitespace-pre-line'>
// 															{currentAncient?.description ||
// 																"Qo'shimcha ma'lumot kiritilmagan"}
// 														</p>
// 													</div>
// 												)}
// 											</div>
// 										</div>
// 									</div>

// 									{/* PDF File Card */}
// 									{currentAncient?.book_File && (
// 										<div className='bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60 p-4 md:p-6 shadow-lg animate-slide-in-up'>
// 											<h2 className='text-lg md:text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
// 												<File className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
// 												PDF fayli
// 											</h2>
// 											<div className='bg-slate-100 dark:bg-slate-800 rounded-lg p-4 flex items-center justify-between'>
// 												<div className='flex items-center gap-3'>
// 													<div className='w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 rounded-lg flex items-center justify-center'>
// 														<File className='w-5 h-5 text-red-600 dark:text-red-400' />
// 													</div>
// 													<div>
// 														<p className='font-medium text-slate-800 dark:text-slate-200 truncate max-w-[150px] md:max-w-none'>
// 															{currentAncient.book_File.filename}
// 														</p>
// 														<p className='text-sm text-slate-500 dark:text-slate-400'>
// 															{(
// 																currentAncient.book_File.size /
// 																1024 /
// 																1024
// 															).toFixed(2)}{' '}
// 															MB
// 														</p>
// 													</div>
// 												</div>
// 												<a
// 													href={currentAncient.book_File.fileUrl}
// 													target='_blank'
// 													rel='noopener noreferrer'
// 												>
// 													<Button
// 														variant='outline'
// 														size='sm'
// 														className='hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950 dark:hover:to-purple-950'
// 													>
// 														Ko&apos;rish
// 													</Button>
// 												</a>
// 											</div>
// 										</div>
// 									)}

// 									{/* Image Upload Card */}
// 									<div className='bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60 p-4 md:p-6 shadow-lg animate-slide-in-up'>
// 										<h2 className='text-lg md:text-xl font-semibold mb-4 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
// 											<ImageIcon className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
// 											Muqova rasmi
// 										</h2>
// 										{isEditing ? (
// 											<div>
// 												{previewImage ? (
// 													<div className='relative group'>
// 														<Image
// 															src={previewImage}
// 															alt='Uploaded preview'
// 															width={400}
// 															height={300}
// 															className='rounded-lg object-cover w-full h-48 md:h-64 transition-transform duration-200 group-hover:scale-105'
// 														/>
// 														<Button
// 															variant='destructive'
// 															size='icon'
// 															className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
// 															onClick={handleRemoveImage}
// 														>
// 															<X className='w-4 h-4' />
// 														</Button>
// 													</div>
// 												) : (
// 													<div
// 														{...getRootProps()}
// 														className={`border-2 border-dashed rounded-lg p-6 md:p-8 text-center cursor-pointer transition-all duration-200 ${
// 															isDragActive
// 																? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 scale-105'
// 																: 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950 dark:hover:to-purple-950'
// 														}`}
// 													>
// 														<input {...getInputProps()} />
// 														<div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center'>
// 															<Upload className='w-8 h-8 text-indigo-600 dark:text-indigo-400' />
// 														</div>
// 														<p className='text-sm md:text-base text-slate-600 dark:text-slate-300 font-medium'>
// 															{isDragActive
// 																? 'Rasmni shu yerga tashlang'
// 																: 'Rasmni sudrab keling yoki bosing'}
// 														</p>
// 														<p className='text-xs md:text-sm text-slate-400 dark:text-slate-500 mt-2'>
// 															Faqat JPG, JPEG, PNG (maks. 5MB)
// 														</p>
// 													</div>
// 												)}
// 											</div>
// 										) : (
// 											<div>
// 												{currentAncient?.coverImage ? (
// 													<div className='group relative'>
// 														<Image
// 															src={currentAncient.coverImage}
// 															alt='Ancient cover'
// 															width={400}
// 															height={300}
// 															className='rounded-lg object-cover w-full h-48 md:h-64 transition-transform duration-200 group-hover:scale-105'
// 														/>
// 														<div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 rounded-lg'></div>
// 													</div>
// 												) : (
// 													<div className='bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg p-6 md:p-8 text-center h-48 md:h-64 flex flex-col items-center justify-center'>
// 														<div className='w-16 h-16 mx-auto mb-4 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center'>
// 															<ImageIcon className='w-8 h-8 text-slate-400 dark:text-slate-500' />
// 														</div>
// 														<p className='text-slate-500 dark:text-slate-400'>
// 															Rasm yuklanmagan
// 														</p>
// 													</div>
// 												)}
// 											</div>
// 										)}
// 									</div>
// 								</div>
// 							</div>
// 						</TabsContent>

// 						{/* Classification Tab */}
// 						<TabsContent value='classification' className='p-4 md:p-6'>
// 							<div className='bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60 p-4 md:p-6 shadow-lg animate-slide-in-up'>
// 								<h2 className='text-lg md:text-xl font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
// 									<FolderTree className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
// 									Qo&apos;lyozma klassifikatsiyasi
// 								</h2>

// 								<div className='space-y-6'>
// 									<div className='group'>
// 										<Label className='text-slate-600 dark:text-slate-400 text-sm font-medium'>
// 											Kategoriya ID
// 										</Label>
// 										{isEditing ? (
// 											<Input
// 												name='ancientCategoryId'
// 												value={formData.ancientCategoryId}
// 												onChange={handleInputChange}
// 												className='mt-2 focus:ring-2 dark:text-white focus:ring-indigo-500 dark:focus:ring-indigo-400'
// 												placeholder='Kategoriya ID sini kiriting'
// 											/>
// 										) : (
// 											<div className='mt-2 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg'>
// 												<div className='flex items-center gap-3'>
// 													<div className='w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center'>
// 														<FolderTree className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
// 													</div>
// 													<div>
// 														<p className='font-medium text-slate-800 dark:text-slate-200'>
// 															{currentAncient?.ancientCategoryId ||
// 																'Kategoriya belgilanmagan'}
// 														</p>
// 														<p className='text-sm text-slate-500 dark:text-slate-400'>
// 															Klassifikatsiya identifikatori
// 														</p>
// 													</div>
// 												</div>
// 											</div>
// 										)}
// 									</div>

// 									{currentAncient?.place_saved && (
// 										<div className='group'>
// 											<Label className='text-slate-600 dark:text-slate-400 text-sm font-medium'>
// 												Saqlash joyi
// 											</Label>
// 											{isEditing ? (
// 												<Input
// 													name='place_saved'
// 													value={formData.place_saved}
// 													onChange={handleInputChange}
// 													className='mt-2 focus:ring-2 dark:text-white focus:ring-indigo-500 dark:focus:ring-indigo-400'
// 													placeholder='Saqlash joyini kiriting'
// 												/>
// 											) : (
// 												<div className='mt-2 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg'>
// 													<div className='flex items-center gap-3'>
// 														<div className='w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-full flex items-center justify-center'>
// 															<Globe className='w-5 h-5 text-green-600 dark:text-green-400' />
// 														</div>
// 														<div>
// 															<p className='font-medium text-slate-800 dark:text-slate-200'>
// 																{currentAncient.place_saved}
// 															</p>
// 															<p className='text-sm text-slate-500 dark:text-slate-400'>
// 																Hozirgi saqlash manzili
// 															</p>
// 														</div>
// 													</div>
// 												</div>
// 											)}
// 										</div>
// 									)}

// 									{/* Success Message */}
// 									<div className='bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border border-green-200 dark:border-green-800 rounded-lg p-4'>
// 										<div className='flex items-center gap-3'>
// 											<CheckCircle2 className='w-5 h-5 text-green-600 dark:text-green-400' />
// 											<div>
// 												<p className='text-sm font-medium text-green-800 dark:text-green-200'>
// 													Klassifikatsiya muvaffaqiyatli saqlangan
// 												</p>
// 												<p className='text-xs text-green-600 dark:text-green-400 mt-1'>
// 													Bu qo&apos;lyozma tizimda ro&apos;yxatdan o&apos;tgan
// 													va kataloglangan
// 												</p>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</TabsContent>
// 					</Tabs>

// 					<DeleteAncientDialog
// 						ancientId={deletingAncient?.id || ''}
// 						ancientName={deletingAncient?.work_name || ''}
// 						open={!!deletingAncient}
// 						onOpenChange={open => !open && setDeletingAncient(null)}
// 						onSuccess={() => {
// 							router.push('/ancient')
// 						}}
// 					/>
// 				</div>
// 			</div>

// 			{/* Custom Styles */}
// 			<style jsx>{`
// 				@keyframes float {
// 					0%,
// 					100% {
// 						transform: translateY(0px) rotate(0deg);
// 					}
// 					50% {
// 						transform: translateY(-20px) rotate(180deg);
// 					}
// 				}

// 				@keyframes float-delayed {
// 					0%,
// 					100% {
// 						transform: translateY(0px) rotate(0deg);
// 					}
// 					50% {
// 						transform: translateY(-15px) rotate(-180deg);
// 					}
// 				}

// 				@keyframes fade-in-up {
// 					from {
// 						opacity: 0;
// 						transform: translateY(30px);
// 					}
// 					to {
// 						opacity: 1;
// 						transform: translateY(0);
// 					}
// 				}

// 				@keyframes slide-in-up {
// 					from {
// 						opacity: 0;
// 						transform: translateY(50px) scale(0.95);
// 					}
// 					to {
// 						opacity: 1;
// 						transform: translateY(0) scale(1);
// 					}
// 				}

// 				.animate-float {
// 					animation: float 6s ease-in-out infinite;
// 				}

// 				.animate-float-delayed {
// 					animation: float-delayed 8s ease-in-out infinite;
// 				}

// 				.animate-fade-in-up {
// 					animation: fade-in-up 1s ease-out;
// 				}

// 				.animate-slide-in-up {
// 					animation: slide-in-up 0.8s ease-out forwards;
// 					opacity: 0;
// 				}
// 			`}</style>
// 		</div>
// 	)
// }
