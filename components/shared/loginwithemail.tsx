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
import { Input } from '@/components/ui/input'
import { loginwithemail } from '@/lib/login/loginbyhemis'
import { getLanguagePrefix } from '@/lib/utils'
import { useAuthStore } from '@/store/auth'
import { Eye, EyeOff } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export function LoginDialog({ trigger }: { trigger: React.ReactNode }) {
	const [open, setOpen] = useState(false)
	const router = useRouter()
	const [showPassword, setShowPassword] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const pathname = usePathname()
	const { login } = useAuthStore()

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError(null)
		try {
			const response = await loginwithemail({ login: email, password })
			const results = response.result

			// Save user data to Zustand store
			login(
				{
					firstName: results.user.firstName ?? '',
					lastName: results.user.lastName ?? '',
				},
				results.accessToken
			)

			// Save token to localStorage if needed
			localStorage.setItem('token', results.accessToken)

			setOpen(false)
			router.push(`${getLanguagePrefix(pathname)}/admin`)
		} catch (error) {
			setError(
				`Login yoki parol xato: ${
					error instanceof Error ? error.message : "Noma'lum xatolik"
				}`
			)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tizimga kirish</DialogTitle>
					<DialogDescription>Login va parolni kiriting</DialogDescription>
				</DialogHeader>
				<form className='space-y-4' onSubmit={handleLogin}>
					<Input
						type='text'
						placeholder='Email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
					<div className='relative'>
						<Input
							type={showPassword ? 'text' : 'password'}
							placeholder='Parol'
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
						<Button
							type='button'
							variant='ghost'
							size='icon'
							className='absolute right-2 top-1/2 transform -translate-y-1/2'
							onClick={() => setShowPassword(prev => !prev)}
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</Button>
					</div>
					{error && <p className='text-red-500 text-sm'>{error}</p>}
					<Button type='submit' className='w-full'>
						Kirish
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
