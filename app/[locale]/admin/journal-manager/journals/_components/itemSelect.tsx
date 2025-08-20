'use client'

import { ChevronDown, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Country {
	id: string
	name: string
}

interface CountrySelectProps {
	countries: Country[]
	value: string
	onChange: (value: string) => void
	placeholder?: string
}

const CountrySelect = ({
	countries,
	value,
	onChange,
	placeholder,
}: CountrySelectProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const selectRef = useRef<HTMLDivElement>(null)

	const selectedCountry = countries.find(c => c.id === value)

	// Tashqi click ni aniqlash
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	// Filtrlangan davlatlar
	const filteredCountries = countries.filter(country =>
		country.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handleSelect = (countryId: string) => {
		onChange(countryId)
		setIsOpen(false)
		setSearchTerm('')
	}

	const clearSelection = () => {
		onChange('')
		setSearchTerm('')
	}

	return (
		<div className='relative mt-2' ref={selectRef}>
			{/* Select Trigger */}
			<div
				className={`flex items-center justify-between w-full p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
					isOpen
						? 'border-indigo-500 ring-2 ring-indigo-500/20 dark:ring-indigo-400/20 bg-white dark:bg-slate-800'
						: 'border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500'
				}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span
					className={`${
						selectedCountry
							? 'text-slate-800 dark:text-slate-200'
							: 'text-slate-500 dark:text-slate-400'
					}`}
				>
					{selectedCountry ? selectedCountry.name : placeholder}
				</span>

				<div className='flex items-center gap-1'>
					{value && (
						<button
							onClick={e => {
								e.stopPropagation()
								clearSelection()
							}}
							className='p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors'
						>
							<X className='w-4 h-4 text-slate-500 dark:text-slate-400' />
						</button>
					)}
					<ChevronDown
						className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
							isOpen ? 'rotate-180' : ''
						}`}
					/>
				</div>
			</div>

			{/* Dropdown */}
			{isOpen && (
				<div className='absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95'>
					{/* Search Input */}
					<div className='p-2 border-b border-gray-200 dark:border-slate-700'>
						<div className='relative'>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' />
							<input
								type='text'
								placeholder='Qidirish...'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className='w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-md border-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400'
								autoFocus
							/>
						</div>
					</div>

					{/* Countries List */}
					<div className='max-h-60 overflow-y-auto'>
						{filteredCountries.length > 0 ? (
							filteredCountries.map(country => (
								<div
									key={country.id}
									className={`px-4 py-2 cursor-pointer transition-colors ${
										value === country.id
											? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200'
											: 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
									}`}
									onClick={() => handleSelect(country.id)}
								>
									{country.name}
								</div>
							))
						) : (
							<div className='px-4 py-3 text-slate-500 dark:text-slate-400 text-center'>
								Hech narsa topilmadi
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default CountrySelect
