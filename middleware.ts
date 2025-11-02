import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = [
	'/learn',
	'/courses',
	'/courses/:path*',
	'/leaderboard',
	'/quests',
	'/shop',
	'/settings'
]
const authRoutes = ['/auth/login', '/auth/register']

const adminRoutes = ['/admin']

export default function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl
	const session = request.cookies.get('session')?.value

	if (!session && protectedRoutes.includes(pathname)) {
		const loginUrl = request.nextUrl.clone()
		loginUrl.pathname = '/auth/login'
		return NextResponse.redirect(loginUrl)
	}
	if (session && authRoutes.includes(pathname)) {
		const learnUrl = request.nextUrl.clone()
		learnUrl.pathname = '/learn'
		return NextResponse.redirect(learnUrl)
	}
	// if (session && adminRoutes.includes(pathname) && ) {}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/learn',
		'/auth/:path*',
		'/courses',
		'/lesson/:path*',
		'/leaderboard',
		'/quests',
		'/shop'
	]
}
