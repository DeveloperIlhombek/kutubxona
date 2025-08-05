'use client'
import { useTranslations } from 'next-intl'

function Page() {
	const t = useTranslations('Greeting')
	return <div>{t('Hello')}</div>
}

export default Page
