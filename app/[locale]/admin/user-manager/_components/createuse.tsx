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
import { getAllBuildings } from '@/lib/books/building'
import { getFaculties } from '@/lib/faculty/faculty'
import {
	API_URL,
	createAdmin,
	createStudent,
	createTeacher,
	IAdmin,
	ITeacher,
	StudentCreateDTO,
} from '@/lib/users/createUser'
import { IBuilding, IFaculty } from '@/types'
import {
	AlertCircle,
	BookOpen,
	Briefcase,
	Building2,
	CheckCircle,
	GraduationCap,
	Hash,
	Loader2,
	Lock,
	Mail,
	Phone,
	PlusSquareIcon,
	Shield,
	Sparkles,
	Trash2,
	User,
	UserCheck,
	UserCog,
	Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface CreateUserDialogProps {
	trigger: React.ReactNode
	onUserAdded?: () => void
	userType:
		| 'student'
		| 'teacher'
		| 'admin'
		| 'employee'
		| 'moderator'
		| 'superadmin'
		| 'guest'
}

interface UserFormData {
	email: string
	firstName: string
	lastName: string
	password: string
	phone: string
	userPhotoId: string
	hemisId?: string
	facultyId?: string
	buildingId?: string
	course?: string
	group?: string
}

function CreateUserDialog({
	trigger,
	onUserAdded,
	userType,
}: CreateUserDialogProps) {
	const [loading, setLoading] = useState(false)
	const [facultiesLoading, setFacultiesLoading] = useState(false)
	const [buildingsLoading, setBuildingsLoading] = useState(false)
	const [faculties, setFaculties] = useState<IFaculty[]>([])
	const [buildings, setBuildings] = useState<IBuilding[]>([])
	const [open, setOpen] = useState(false)
	const [mounted, setMounted] = useState(false)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [uploadingPhoto, setUploadingPhoto] = useState(false)
	const [formData, setFormData] = useState<UserFormData>({
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		phone: '',
		userPhotoId: '',
		hemisId: '',
		facultyId: '',
		buildingId: '',
		course: '',
		group: '',
	})

	// User type nomlari
	const userTypeTitles = {
		student: 'Student',
		teacher: "O'qituvchi",
		admin: 'Admin',
		employee: 'Xodim',
		moderator: 'Moderator',
		superadmin: 'Super Admin',
		guest: 'Mehmon',
	}

	const userTypeIcons = {
		student: GraduationCap,
		teacher: User,
		admin: UserCog,
		employee: Briefcase,
		moderator: Shield,
		superadmin: UserCheck,
		guest: Users,
	}

	const userTypeColors = {
		student:
			'from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900',
		teacher:
			'from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900',
		admin:
			'from-purple-100 to-violet-100 dark:from-purple-900 dark:to-violet-900',
		employee:
			'from-orange-100 to-amber-100 dark:from-orange-900 dark:to-amber-900',
		moderator: 'from-red-100 to-rose-100 dark:from-red-900 dark:to-rose-900',
		superadmin:
			'from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900',
		guest: 'from-gray-100 to-slate-100 dark:from-gray-900 dark:to-slate-900',
	}

	const IconComponent = userTypeIcons[userType]

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		if (open) {
			fetchFaculties()
			fetchBuildings()
		}
	}, [open])

	const handleFileUpload = async (file: File) => {
		try {
			setUploadingPhoto(true)
			const formData = new FormData()
			formData.append('file', file)

			const response = await fetch(`${API_URL}/api/user/uploaduserphoto`, {
				method: 'POST',
				body: formData,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})

			if (response.ok) {
				const data = await response.json()
				setFormData(prev => ({
					...prev,
					userPhotoId: data.result?.id || data.id,
				}))
				toast.success('Rasm muvaffaqiyatli yuklandi')
			} else {
				throw new Error('Rasm yuklashda xatolik')
			}
		} catch (error) {
			console.error('File upload error:', error)
			toast.error('Rasm yuklashda xatolik')
		} finally {
			setUploadingPhoto(false)
		}
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			// File size check (max 5MB)
			if (file.size > 5 * 1024 * 1024) {
				toast.error('Rasm hajmi 5MB dan oshmasligi kerak')
				return
			}

			// File type check
			if (!file.type.startsWith('image/')) {
				toast.error('Faqat rasm fayllari qabul qilinadi')
				return
			}

			setSelectedFile(file)
			handleFileUpload(file)
		}
	}

	const handleDeletePhoto = async () => {
		if (!formData.userPhotoId) return

		try {
			setUploadingPhoto(true)
			const response = await fetch(
				`${API_URL}/api/user/deleteuserphoto/${formData.userPhotoId}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)

			if (response.ok) {
				setFormData(prev => ({ ...prev, userPhotoId: '' }))
				setSelectedFile(null)
				toast.success("Rasm o'chirildi")
			}
		} catch (error) {
			console.error('Delete photo error:', error)
		} finally {
			setUploadingPhoto(false)
		}
	}

	const fetchFaculties = async () => {
		try {
			setFacultiesLoading(true)
			const response = await getFaculties({
				pageSize: 100,
				pageNumber: 0,
			})
			if (response && response.result) {
				setFaculties(response.result.items || [])
			}
		} catch (error) {
			console.error('Fakultetlarni yuklashda xatolik:', error)
			toast.error('Fakultetlarni yuklashda xatolik yuz berdi')
		} finally {
			setFacultiesLoading(false)
		}
	}

	const fetchBuildings = async () => {
		try {
			setBuildingsLoading(true)
			const response = await getAllBuildings({
				pageSize: 100,
				pageNumber: 0,
			})
			if (response && response.result) {
				setBuildings(response.result.items || [])
			}
		} catch (error) {
			console.error('Binolarni yuklashda xatolik:', error)
			toast.error('Binolarni yuklashda xatolik yuz berdi')
		} finally {
			setBuildingsLoading(false)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// Majburiy maydonlarni tekshirish
		const requiredFields = ['email', 'firstName', 'lastName', 'password']
		for (const field of requiredFields) {
			if (!formData[field as keyof UserFormData]) {
				toast.error(`Iltimos, ${field} maydonini to'ldiring`)
				return
			}
		}

		// Email formatini tekshirish
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(formData.email)) {
			toast.error("Iltimos, to'g'ri email manzilini kiriting")
			return
		}

		// Parol uzunligini tekshirish
		if (formData.password.length < 6) {
			toast.error("Parol kamida 6 ta belgidan iborat bo'lishi kerak")
			return
		}

		try {
			setLoading(true)

			let response

			switch (userType) {
				case 'student':
					const studentData: StudentCreateDTO = {
						firstName: formData.firstName.trim(),
						lastName: formData.lastName.trim(),
						email: formData.email.trim(),
						password: formData.password,
						phone: formData.phone.trim() || undefined,
						hemisId: formData.hemisId ? parseInt(formData.hemisId) : undefined,
						facultyId: formData.facultyId || undefined,
						course: formData.course ? parseInt(formData.course) : undefined,
						group: formData.group || undefined,
						userPhotoId: formData.userPhotoId || undefined,
					}
					response = await createStudent(studentData)
					break
				// ADmin yaratish
				case 'admin':
					const adminData: IAdmin = {
						email: formData.email.trim(),
						firstName: formData.firstName.trim(),
						lastName: formData.lastName.trim(),
						password: formData.password,
						phone: formData.phone.trim(),
						userPhotoId: formData.userPhotoId || undefined,
						buildingId: formData.buildingId || undefined,
					}
					response = await createAdmin(adminData)
					break
				//TEacher yaratish
				case 'teacher':
					const teacherData: ITeacher = {
						firstName: formData.firstName.trim(),
						lastName: formData.lastName.trim(),
						email: formData.email.trim(),
						password: formData.password,
						phone: formData.phone.trim() || undefined,
						hemisId: formData.hemisId ? parseInt(formData.hemisId) : undefined,
						facultyId: formData.facultyId || undefined,
						userPhotoId: formData.userPhotoId || undefined,
					}
					response = await createTeacher(teacherData)
					break

				default:
					throw new Error("Noto'g'ri foydalanuvchi turi")
			}

			if (response && response.isSuccess) {
				toast.success(`${userTypeTitles[userType]} muvaffaqiyatli yaratildi`)
				if (onUserAdded) onUserAdded()
				handleReset()
				setOpen(false)
			} else {
				throw new Error(
					response?.errorMessages?.[0] || 'Foydalanuvchi yaratishda xatolik'
				)
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error('Yaratish xatosi:', error)
			toast.error(
				`Foydalanuvchi yaratishda xatolik: ${error.message || "Noma'lum xato"}`
			)
		} finally {
			setLoading(false)
		}
	}

	const handleReset = () => {
		setFormData({
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			phone: '',
			userPhotoId: '',
			hemisId: '',
			facultyId: '',
			buildingId: '',
			course: '',
			group: '',
		})
	}

	const handleInputChange = (field: keyof UserFormData, value: string) => {
		setFormData(prev => ({
			...prev,
			[field]: value,
		}))
	}

	// Formaning to'ldirilganligini tekshirish
	const isFormValid =
		formData.firstName &&
		formData.lastName &&
		formData.email &&
		formData.password
	const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
	const isPasswordValid = formData.password.length >= 6

	if (!mounted) return null

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='max-w-4xl max-h-[95vh] overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 border border-slate-200/60 dark:border-slate-700/60 shadow-2xl backdrop-blur-sm z-999999'>
				{/* Header */}
				<DialogHeader className='space-y-4 pb-6 border-b border-slate-200/50 dark:border-slate-700/50'>
					<div className='flex items-center gap-4'>
						<div
							className={`w-14 h-14 bg-gradient-to-br ${userTypeColors[userType]} rounded-full flex items-center justify-center ring-4 ring-white/50 dark:ring-slate-800/50 shadow-lg`}
						>
							<IconComponent className='w-7 h-7 text-indigo-600 dark:text-indigo-400' />
						</div>
						<div className='flex-1'>
							<DialogTitle className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
								Yangi {userTypeTitles[userType]} qo&apos;shish
							</DialogTitle>
							<DialogDescription className='text-slate-600 dark:text-slate-400 text-base leading-relaxed mt-1'>
								Tizimga yangi {userTypeTitles[userType].toLowerCase()}{' '}
								qo&apos;shish uchun quyidagi ma&apos;lumotlarni kiriting
							</DialogDescription>
						</div>
					</div>

					{/* Progress indicator
					<div className='flex items-center gap-2'>
						<div className='flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden'>
							<div
								className='h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500 ease-out'
								style={{
									width: `${Math.min(
										100,
										(Object.values(formData).filter(v => v).length /
											Object.keys(formData).length) *
											100
									)}%`,
								}}
							/>
						</div>
						<span className='text-xs font-medium text-slate-500 dark:text-slate-400 min-w-[3rem]'>
							{Math.round(
								(Object.values(formData).filter(v => v).length /
									Object.keys(formData).length) *
									100
							)}
							%
						</span>
					</div> */}
				</DialogHeader>

				{/* Form Content */}
				<div className='max-h-[60vh] overflow-y-auto custom-scrollbar'>
					<form onSubmit={handleSubmit} className='space-y-2 p-1'>
						{/* Basic Information Section */}
						<div className='space-y-6'>
							<div className='flex items-center gap-3 mb-4'>
								<div className='w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center'>
									<User className='w-4 h-4 text-indigo-600 dark:text-indigo-400' />
								</div>
								<h3 className='text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
									Asosiy ma&apos;lumotlar
								</h3>
							</div>

							<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
								{/* First Name */}
								<div className='space-y-2 group'>
									<label className='text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2'>
										<User className='w-4 h-4 text-slate-500' />
										Ism <span className='text-red-500'>*</span>
									</label>
									<div className='relative'>
										<input
											value={formData.firstName}
											onChange={e =>
												handleInputChange('firstName', e.target.value)
											}
											className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-300 dark:group-hover:border-indigo-600 shadow-sm hover:shadow-md text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500'
											placeholder='Ismni kiriting...'
											required
											disabled={loading}
										/>
										{formData.firstName && (
											<CheckCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500' />
										)}
									</div>
								</div>

								{/* Last Name */}
								<div className='space-y-2 group'>
									<label className='text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2'>
										<User className='w-4 h-4 text-slate-500' />
										Familiya <span className='text-red-500'>*</span>
									</label>
									<div className='relative'>
										<input
											value={formData.lastName}
											onChange={e =>
												handleInputChange('lastName', e.target.value)
											}
											className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-300 dark:group-hover:border-indigo-600 shadow-sm hover:shadow-md text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500'
											placeholder='Familiyani kiriting...'
											required
											disabled={loading}
										/>
										{formData.lastName && (
											<CheckCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500' />
										)}
									</div>
								</div>

								{/* Email */}
								<div className='space-y-2 group'>
									<label className='text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2'>
										<Mail className='w-4 h-4 text-slate-500' />
										Email <span className='text-red-500'>*</span>
									</label>
									<div className='relative'>
										<input
											type='email'
											value={formData.email}
											onChange={e => handleInputChange('email', e.target.value)}
											className={`w-full px-4 py-3 bg-white dark:bg-slate-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-300 dark:group-hover:border-indigo-600 shadow-sm hover:shadow-md text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 ${
												formData.email && !isEmailValid
													? 'border-red-300 dark:border-red-700'
													: 'border-slate-200 dark:border-slate-700'
											}`}
											placeholder='Email manzilini kiriting...'
											required
											disabled={loading}
										/>
										{formData.email &&
											(isEmailValid ? (
												<CheckCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500' />
											) : (
												<AlertCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500' />
											))}
									</div>
									{formData.email && !isEmailValid && (
										<p className='text-xs text-red-500 mt-1'>
											To&apos;g&apos;ri email formatini kiriting
										</p>
									)}
								</div>

								{/* Password */}
								<div className='space-y-2 group'>
									<label className='text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2'>
										<Lock className='w-4 h-4 text-slate-500' />
										Parol <span className='text-red-500'>*</span>
									</label>
									<div className='relative'>
										<input
											type='password'
											value={formData.password}
											onChange={e =>
												handleInputChange('password', e.target.value)
											}
											className={`w-full px-4 py-3 bg-white dark:bg-slate-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-300 dark:group-hover:border-indigo-600 shadow-sm hover:shadow-md text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 ${
												formData.password && !isPasswordValid
													? 'border-red-300 dark:border-red-700'
													: 'border-slate-200 dark:border-slate-700'
											}`}
											placeholder='Parolni kiriting...'
											required
											disabled={loading}
										/>
										{formData.password &&
											(isPasswordValid ? (
												<CheckCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500' />
											) : (
												<AlertCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500' />
											))}
									</div>
									{formData.password && !isPasswordValid && (
										<p className='text-xs text-red-500 mt-1'>
											Parol kamida 6 ta belgidan iborat bo&apos;lishi kerak
										</p>
									)}
								</div>

								{/* Phone */}
								<div className='space-y-2 group lg:col-span-2'>
									<label className='text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2'>
										<Phone className='w-4 h-4 text-slate-500' />
										Telefon
									</label>
									<div className='relative'>
										<input
											value={formData.phone}
											onChange={e => handleInputChange('phone', e.target.value)}
											className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-300 dark:group-hover:border-indigo-600 shadow-sm hover:shadow-md text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500'
											placeholder='+998 90 123 45 67'
											disabled={loading}
										/>
										{formData.phone && (
											<CheckCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500' />
										)}
									</div>
								</div>

								{/* Phone dan keyingi qo'shing */}
								<div className='space-y-2 group lg:col-span-2'>
									<label className='text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2'>
										<User className='w-4 h-4 text-slate-500' />
										Profil rasmi
									</label>

									<div className='flex items-center gap-4'>
										<div className='relative'>
											<input
												type='file'
												accept='image/*'
												onChange={handleFileChange}
												className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
												disabled={uploadingPhoto || loading}
											/>
											<Button
												type='button'
												variant='outline'
												disabled={uploadingPhoto || loading}
												className='px-4 py-2 border-slate-300 dark:border-slate-600'
											>
												{uploadingPhoto ? (
													<Loader2 className='w-4 h-4 mr-2 animate-spin' />
												) : (
													<User className='w-4 h-4 mr-2' />
												)}
												{uploadingPhoto ? 'Yuklanmoqda...' : 'Rasm tanlash'}
											</Button>
										</div>

										{formData.userPhotoId && (
											<div className='flex items-center gap-2'>
												<div className='w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center'>
													<User className='w-5 h-5 text-slate-500' />
												</div>
												<Button
													type='button'
													variant='ghost'
													size='sm'
													onClick={handleDeletePhoto}
													disabled={uploadingPhoto}
													className='text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950'
												>
													<Trash2 className='w-4 h-4' />
												</Button>
											</div>
										)}

										{selectedFile && (
											<span className='text-sm text-slate-600 dark:text-slate-400'>
												{selectedFile.name}
											</span>
										)}
									</div>

									<p className='text-xs text-slate-500 dark:text-slate-400'>
										PNG, JPG yoki JPEG formatida, maksimum 5MB
									</p>
								</div>
							</div>
						</div>

						{/* Additional Information Section */}
						{(userType === 'student' ||
							userType === 'teacher' ||
							userType === 'admin') && (
							<div className='space-y-6'>
								<div className='flex items-center gap-3 mb-4'>
									<div className='w-8 h-8 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 rounded-full flex items-center justify-center'>
										<Sparkles className='w-4 h-4 text-emerald-600 dark:text-emerald-400' />
									</div>
									<h3 className='text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'>
										Qo&apos;shimcha ma&apos;lumotlar
									</h3>
								</div>

								<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
									{/* HEMIS ID */}
									{(userType === 'student' || userType === 'teacher') && (
										<div className='space-y-2 group'>
											<label className='text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2'>
												<Hash className='w-4 h-4 text-slate-500' />
												HEMIS ID
											</label>
											<div className='relative'>
												<input
													type='number'
													value={formData.hemisId}
													onChange={e =>
														handleInputChange('hemisId', e.target.value)
													}
													className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-300 dark:group-hover:border-indigo-600 shadow-sm hover:shadow-md text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500'
													placeholder='HEMIS ID raqamini kiriting'
													disabled={loading}
												/>
												{formData.hemisId && (
													<CheckCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500' />
												)}
											</div>
										</div>
									)}

									{/* Faculty */}
									{(userType === 'student' || userType === 'teacher') && (
										<div className='space-y-2 group'>
											<label className='text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2'>
												<GraduationCap className='w-4 h-4 text-slate-500' />
												Fakultet
											</label>
											<div className='relative'>
												<select
													value={formData.facultyId}
													onChange={e =>
														handleInputChange('facultyId', e.target.value)
													}
													className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-300 dark:group-hover:border-indigo-600 shadow-sm hover:shadow-md text-slate-900 dark:text-slate-100'
													disabled={loading || facultiesLoading}
												>
													<option value=''>
														{facultiesLoading
															? 'Yuklanmoqda...'
															: 'Fakultetni tanlang'}
													</option>
													{faculties.map(faculty => (
														<option key={faculty.id} value={faculty.id}>
															{faculty.name}
														</option>
													))}
												</select>
												{formData.facultyId && (
													<CheckCircle className='absolute right-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500' />
												)}
											</div>
										</div>
									)}

									{/* Course - Student only */}
									{userType === 'student' && (
										<div className='space-y-2 group'>
											<label className='text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2'>
												<BookOpen className='w-4 h-4 text-slate-500' />
												Kurs
											</label>
											<div className='relative'>
												<select
													value={formData.course}
													onChange={e =>
														handleInputChange('course', e.target.value)
													}
													className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-300 dark:group-hover:border-indigo-600 shadow-sm hover:shadow-md text-slate-900 dark:text-slate-100'
													disabled={loading}
												>
													<option value=''>Kursni tanlang</option>
													<option value='11'>1-kurs</option>
													<option value='12'>2-kurs</option>
													<option value='13'>3-kurs</option>
													<option value='14'>4-kurs</option>
													<option value='15'>5-kurs</option>
													<option value='5'>Magister 1</option>
													<option value='6'>Magister 2</option>
												</select>
												{formData.course && (
													<CheckCircle className='absolute right-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500' />
												)}
											</div>
										</div>
									)}

									{/* Group - Student only */}
									{userType === 'student' && (
										<div className='space-y-2 group'>
											<label className='text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2'>
												<Users className='w-4 h-4 text-slate-500' />
												Guruh
											</label>
											<div className='relative'>
												<input
													value={formData.group}
													onChange={e =>
														handleInputChange('group', e.target.value)
													}
													className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-300 dark:group-hover:border-indigo-600 shadow-sm hover:shadow-md text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500'
													placeholder='Guruh nomini kiriting...'
													disabled={loading}
												/>
												{formData.group && (
													<CheckCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500' />
												)}
											</div>
										</div>
									)}

									{/* Building - Admin only */}
									{userType === 'admin' && (
										<div className='space-y-2 group lg:col-span-2'>
											<label className='text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2'>
												<Building2 className='w-4 h-4 text-slate-500' />
												Bino
											</label>
											<div className='relative'>
												<select
													value={formData.buildingId}
													onChange={e =>
														handleInputChange('buildingId', e.target.value)
													}
													className='w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 group-hover:border-indigo-300 dark:group-hover:border-indigo-600 shadow-sm hover:shadow-md text-slate-900 dark:text-slate-100'
													disabled={loading || buildingsLoading}
												>
													<option value=''>
														{buildingsLoading
															? 'Yuklanmoqda...'
															: 'Binoni tanlang'}
													</option>
													{buildings.map(building => (
														<option key={building.id} value={building.id}>
															{building.name}
														</option>
													))}
												</select>
												{formData.buildingId && (
													<CheckCircle className='absolute right-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500' />
												)}
											</div>
										</div>
									)}
								</div>
							</div>
						)}
					</form>
				</div>

				{/* Footer */}
				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row justify-end gap-3'>
					<Button
						type='button'
						variant='outline'
						onClick={handleReset}
						disabled={loading}
						className='px-6 py-2.5 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-200 rounded-lg font-medium'
					>
						Tozalash
					</Button>
					<Button
						onClick={handleSubmit}
						disabled={
							loading || !isFormValid || !isEmailValid || !isPasswordValid
						}
						type='submit'
						className='min-w-[160px] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 dark:disabled:from-slate-600 dark:disabled:to-slate-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 text-white rounded-lg font-medium px-6 py-2.5'
					>
						{loading ? (
							<>
								<Loader2 className='w-4 h-4 mr-2 animate-spin' />
								Yaratilmoqda...
							</>
						) : (
							<>
								Yaratish
								<PlusSquareIcon className='w-4 h-4 ml-2' />
							</>
						)}
					</Button>
				</div>

				{/* Custom Styles */}
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

					@keyframes fade-in {
						from {
							opacity: 0;
							transform: translateY(10px);
						}
						to {
							opacity: 1;
							transform: translateY(0);
						}
					}

					.animate-fade-in {
						animation: fade-in 0.3s ease-out;
					}
				`}</style>
			</DialogContent>
		</Dialog>
	)
}

export default CreateUserDialog
