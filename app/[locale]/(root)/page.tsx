import { LoginDialog } from '@/components/shared/loginwithemail'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
	return (
		<div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
			<Image
				className='dark:invert'
				src='/next.svg'
				alt='Next.js logo'
				width={180}
				height={38}
				priority
			/>
			<LoginDialog
				trigger={
					<Button
						variant='destructive'
						size='lg'
						className='text-lg bg-gray-800 px-8'
					>
						Tizimga kirish
					</Button>
				}
			/>
		</div>
	)
}
