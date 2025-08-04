import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'
export type Locale = (typeof routing.locales)[number]

export const { Link, getPathname, usePathname, useRouter, redirect } =
	createNavigation(routing)
