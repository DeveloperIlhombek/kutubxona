'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

// JoditReact komponentini faqat clientda import qilamiz
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

export default function Newspage() {
	const [content, setContent] = useState('')

	return (
		<div className='p-4'>
			<h1 className='text-xl font-bold mb-4'>Yangilik qo‘shish</h1>
			<JoditEditor
				value={content}
				onChange={newContent => setContent(newContent)}
			/>
			<div className='mt-4 border p-2'>
				<h2 className='font-semibold'>Chiqarilgan kontent:</h2>
				<div dangerouslySetInnerHTML={{ __html: content }} />
			</div>
		</div>
	)
}
