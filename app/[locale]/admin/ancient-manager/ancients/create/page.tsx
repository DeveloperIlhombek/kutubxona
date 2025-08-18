// 'use client'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { useAncientStore } from '@/store/ancient'
// import { useRouter } from 'next/navigation'
// import { FormEvent, useState } from 'react'

// export default function CreateAncientPage() {
// 	const router = useRouter()
// 	const { createNewAncient } = useAncientStore()
// 	const [formData, setFormData] = useState({
// 		work_name: '',
// 		arab_name: '',
// 		author: '',
// 		subject: '',
// 		language: '',
// 	})

// 	const handleSubmit = async (e: FormEvent) => {
// 		e.preventDefault()
// 		const success = await createNewAncient(formData)
// 		if (success) {
// 			router.push('/ancient')
// 		}
// 	}

// 	return (
// 		<div className='container mx-auto py-8'>
// 			<h1 className='text-3xl font-bold mb-6'>Yangi qolyozma qoshish</h1>

// 			<form onSubmit={handleSubmit} className='space-y-6 max-w-2xl'>
// 				<div className='space-y-2'>
// 					<Label htmlFor='work_name'>Asar nomi</Label>
// 					<Input
// 						id='work_name'
// 						value={formData.work_name}
// 						onChange={e =>
// 							setFormData({ ...formData, work_name: e.target.value })
// 						}
// 						required
// 					/>
// 				</div>

// 				<div className='space-y-2'>
// 					<Label htmlFor='arab_name'>Arabcha nomi</Label>
// 					<Input
// 						id='arab_name'
// 						value={formData.arab_name}
// 						onChange={e =>
// 							setFormData({ ...formData, arab_name: e.target.value })
// 						}
// 					/>
// 				</div>

// 				<div className='space-y-2'>
// 					<Label htmlFor='author'>Muallif</Label>
// 					<Input
// 						id='author'
// 						value={formData.author}
// 						onChange={e => setFormData({ ...formData, author: e.target.value })}
// 					/>
// 				</div>

// 				<div className='flex gap-4'>
// 					<Button type='submit'>Saqlash</Button>
// 					<Button variant='outline' onClick={() => router.push('/ancient')}>
// 						Bekor qilish
// 					</Button>
// 				</div>
// 			</form>
// 		</div>
// 	)
// }
