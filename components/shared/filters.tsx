'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import {
	AlertCircle,
	CheckCircle,
	ChevronDown,
	ChevronUp,
	FilterIcon,
	Search,
	Settings,
	Sparkles,
	X,
} from 'lucide-react'
import { useEffect, useState } from 'react'

export interface FilterOption {
	key: string
	label: string
	type: 'text' | 'select' | 'number' | 'boolean'
	options?: { value: string; label: string }[]
	placeholder?: string
}

export interface FilterValues {
	[key: string]: string | number | boolean
}

interface FilterProps {
	triggerButton?: React.ReactNode
	filterOptions: FilterOption[]
	onFilterChange: (filters: FilterValues) => void
	initialFilters?: FilterValues
}

export default function Filter({
	triggerButton,
	filterOptions,
	onFilterChange,
	initialFilters = {},
}: FilterProps) {
	const [open, setOpen] = useState(false)
	const [filters, setFilters] = useState<FilterValues>(initialFilters)
	const [mounted, setMounted] = useState(false)
	const [expandedSections, setExpandedSections] = useState<
		Record<string, boolean>
	>({})

	useEffect(() => {
		setMounted(true)
		// Barcha sectionlarni boshlang'ichda yopiq qilish
		const initialExpanded: Record<string, boolean> = {}
		filterOptions.forEach(option => {
			initialExpanded[option.key] = false
		})
		setExpandedSections(initialExpanded)
	}, [filterOptions])

	useEffect(() => {
		setFilters(initialFilters)
	}, [initialFilters])

	const toggleSection = (key: string) => {
		setExpandedSections(prev => ({
			...prev,
			[key]: !prev[key],
		}))
	}

	const handleFilterChange = (
		key: string,
		value: string | number | boolean
	) => {
		const newFilters = { ...filters, [key]: value }
		setFilters(newFilters)
	}

	const handleRemoveFilter = (key: string) => {
		const newFilters = { ...filters }
		delete newFilters[key]
		setFilters(newFilters)
	}

	const applyFilters = () => {
		// Bo'sh qiymatlarni olib tashlash
		const cleanedFilters: FilterValues = {}
		Object.entries(filters).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				cleanedFilters[key] = value
			}
		})

		onFilterChange(cleanedFilters)
		setOpen(false)
	}

	const clearAllFilters = () => {
		setFilters({})
		onFilterChange({})
		setOpen(false)
	}

	const renderFilterInput = (option: FilterOption) => {
		const currentValue = filters[option.key]

		switch (option.type) {
			case 'text':
				return (
					<div className='relative group'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500' />
						<Input
							value={(currentValue as string) || ''}
							onChange={e => handleFilterChange(option.key, e.target.value)}
							placeholder={
								option.placeholder || `${option.label} bo'yicha qidiruv...`
							}
							className='pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200'
						/>
						{currentValue && (
							<button
								onClick={() => handleRemoveFilter(option.key)}
								className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors'
							>
								<X className='h-4 w-4' />
							</button>
						)}
					</div>
				)

			case 'number':
				return (
					<div className='relative group'>
						<Input
							type='number'
							value={(currentValue as number) || ''}
							onChange={e =>
								handleFilterChange(option.key, Number(e.target.value))
							}
							placeholder={option.placeholder || `${option.label} kiriting...`}
							className='bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200'
						/>
						{currentValue && (
							<button
								onClick={() => handleRemoveFilter(option.key)}
								className='absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors'
							>
								<X className='h-4 w-4' />
							</button>
						)}
					</div>
				)

			case 'select':
				return (
					<div className='relative'>
						<Select
							value={(currentValue as string) || ''}
							onValueChange={value => handleFilterChange(option.key, value)}
						>
							<SelectTrigger className='bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200'>
								<SelectValue
									placeholder={
										option.placeholder || `${option.label} tanlang...`
									}
								/>
							</SelectTrigger>
							<SelectContent className='bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xl'>
								{option.options?.map(opt => (
									<SelectItem
										key={opt.value}
										value={opt.value}
										className='focus:bg-indigo-50 dark:focus:bg-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors'
									>
										{opt.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{currentValue && (
							<button
								onClick={() => handleRemoveFilter(option.key)}
								className='absolute right-8 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors z-10'
							>
								<X className='h-4 w-4' />
							</button>
						)}
					</div>
				)

			case 'boolean':
				return (
					<div className='relative'>
						<Select
							value={currentValue !== undefined ? currentValue.toString() : ''}
							onValueChange={value =>
								handleFilterChange(option.key, value === 'true')
							}
						>
							<SelectTrigger className='bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200'>
								<SelectValue
									placeholder={
										option.placeholder || `${option.label} tanlang...`
									}
								/>
							</SelectTrigger>
							<SelectContent className='bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xl'>
								<SelectItem
									value='true'
									className='focus:bg-indigo-50 dark:focus:bg-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors'
								>
									<div className='flex items-center gap-2'>
										<CheckCircle className='w-4 h-4 text-green-600 dark:text-green-400' />
										Ha
									</div>
								</SelectItem>
								<SelectItem
									value='false'
									className='focus:bg-indigo-50 dark:focus:bg-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors'
								>
									<div className='flex items-center gap-2'>
										<AlertCircle className='w-4 h-4 text-red-600 dark:text-red-400' />
										Yo&apos;q
									</div>
								</SelectItem>
							</SelectContent>
						</Select>
						{currentValue !== undefined && (
							<button
								onClick={() => handleRemoveFilter(option.key)}
								className='absolute right-8 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors z-10'
							>
								<X className='h-4 w-4' />
							</button>
						)}
					</div>
				)

			default:
				return null
		}
	}

	const activeFiltersCount = Object.keys(filters).filter(
		key =>
			filters[key] !== undefined && filters[key] !== null && filters[key] !== ''
	).length

	if (!mounted) return null

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				{triggerButton || (
					<Button
						variant='outline'
						className='flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 relative '
					>
						<FilterIcon className='h-4 w-4' />
						Filter
						{activeFiltersCount > 0 && (
							<div className='absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold'>
								{activeFiltersCount}
							</div>
						)}
					</Button>
				)}
			</SheetTrigger>

			<SheetContent
				side='left'
				className='w-full sm:max-w-md overflow-y-auto bg-gradient-to-b from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900 border-r border-slate-200 dark:border-slate-700 z-99999'
			>
				{/* Header */}
				<SheetHeader className='pb-6 border-b border-slate-200 dark:border-slate-700'>
					<div className='flex items-center gap-3'>
						<div className='w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center'>
							<Settings className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
						</div>
						<div>
							<SheetTitle className='text-slate-800 dark:text-slate-200 text-lg font-bold'>
								Filter Parametrlari
							</SheetTitle>
							<p className='text-sm text-slate-600 dark:text-slate-400'>
								Malumotlarni filterlash uchun parametrlarni tanlang
							</p>
						</div>
					</div>
				</SheetHeader>

				{/* Filter Options */}
				<div className='mt-6 space-y-3'>
					{filterOptions.map((option, index) => (
						<div
							key={option.key}
							className='bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200'
							style={{
								animationDelay: `${index * 50}ms`,
								animation: 'slideInLeft 0.3s ease-out forwards',
							}}
						>
							<button
								onClick={() => toggleSection(option.key)}
								className='w-full px-4 py-3 flex items-center justify-between text-left font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 group'
							>
								<div className='flex items-center gap-3'>
									<div
										className={`w-2 h-2 rounded-full transition-all duration-200 ${
											filters[option.key] !== undefined &&
											filters[option.key] !== null &&
											filters[option.key] !== ''
												? 'bg-gradient-to-r from-indigo-600 to-purple-600'
												: 'bg-slate-300 dark:bg-slate-600'
										}`}
									/>
									<span className='group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors'>
										{option.label}
									</span>
								</div>
								<div className='flex items-center gap-2'>
									{filters[option.key] !== undefined &&
										filters[option.key] !== null &&
										filters[option.key] !== '' && (
											<div className='w-2 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-pulse' />
										)}
									{expandedSections[option.key] ? (
										<ChevronUp className='h-4 w-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors' />
									) : (
										<ChevronDown className='h-4 w-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors' />
									)}
								</div>
							</button>

							{expandedSections[option.key] && (
								<div className='px-4 pb-4 pt-2 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50'>
									{renderFilterInput(option)}
								</div>
							)}
						</div>
					))}
				</div>

				{/* Active Filters Display */}
				{activeFiltersCount > 0 && (
					<div className='mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-xl border border-indigo-200 dark:border-indigo-800'>
						<div className='flex items-center gap-2 mb-3'>
							<Sparkles className='w-4 h-4 text-indigo-600 dark:text-indigo-400' />
							<h3 className='text-sm font-semibold text-indigo-800 dark:text-indigo-300'>
								Faol Filterlar ({activeFiltersCount})
							</h3>
						</div>
						<div className='flex flex-wrap gap-2'>
							{Object.entries(filters).map(([key, value]) => {
								if (value === undefined || value === null || value === '')
									return null

								const option = filterOptions.find(opt => opt.key === key)
								if (!option) return null

								let displayValue = value.toString()
								if (option.type === 'select') {
									const selectedOption = option.options?.find(
										opt => opt.value === value.toString()
									)
									displayValue = selectedOption?.label || displayValue
								} else if (option.type === 'boolean') {
									displayValue = value ? 'Ha' : "Yo'q"
								}

								return (
									<div
										key={key}
										className='flex items-center gap-2 bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-full text-sm border border-indigo-200 dark:border-indigo-700 shadow-sm'
									>
										<span className='font-medium'>{option.label}:</span>
										<span className='font-semibold'>{displayValue}</span>
										<button
											onClick={() => handleRemoveFilter(key)}
											className='ml-1 text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-200 rounded-full p-0.5 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all duration-200'
										>
											<X className='h-3 w-3' />
										</button>
									</div>
								)
							})}
						</div>
					</div>
				)}

				{/* Action Buttons */}
				<div className='mt-8 flex flex-col justify-center items-center gap-3 sticky bottom-0 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-900 dark:to-transparent pt-6 pb-2'>
					<Button
						onClick={applyFilters}
						className='w-1/2  bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 '
					>
						<FilterIcon className='w-4 h-4 mr-2' />
						Filterlarni Qo&apos;llash
						{activeFiltersCount > 0 && (
							<span className='ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold'>
								{activeFiltersCount}
							</span>
						)}
					</Button>

					{activeFiltersCount > 0 && (
						<Button
							variant='outline'
							onClick={clearAllFilters}
							className='w-full border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200'
						>
							<X className='w-4 h-4 mr-2' />
							Barcha Filterlarni Tozalash
						</Button>
					)}
				</div>

				{/* Custom Styles */}
				<style jsx>{`
					@keyframes slideInLeft {
						from {
							opacity: 0;
							transform: translateX(-20px);
						}
						to {
							opacity: 1;
							transform: translateX(0);
						}
					}
				`}</style>
			</SheetContent>
		</Sheet>
	)
}
