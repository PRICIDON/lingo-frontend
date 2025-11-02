import { cookies } from 'next/headers'

export async function useAuth() {
	const session = (await cookies()).get('session')?.value

	return { isAuthorized: Boolean(session) }
}
