import Image from 'next/image'
import Link from 'next/link'

import SignedIn from '@/components/auth/signed-in'
import SignedOut from '@/components/auth/signed-out'
import { Button } from '@/components/ui/button'

export default function Home() {
	return (
		<div className='mx-auto flex w-full max-w-[988px] flex-1 flex-col items-center justify-center gap-2 p-4 lg:flex-row'>
			<div className='relative mb-8 size-[240px] lg:mb-0 lg:size-[424px]'>
				<Image src='/hero.svg' alt='Hero' fill />
			</div>
			<div className='flex flex-col items-center gap-y-8'>
				<h1 className='max-w-[480px] text-center text-xl font-bold text-neutral-600 lg:text-3xl'>
					Изучайте, практикуйте и осваивайте новые языки с Lingo.
				</h1>
				<div className='flex w-full max-w-[330px] flex-col items-center gap-y-3'>
					<SignedOut>
						<Button
							size='lg'
							variant='secondary'
							className='w-full'
						>
							<Link href='/auth/register'>Начать</Link>
						</Button>
						<Button
							size='lg'
							variant='primaryOutline'
							className='w-full'
						>
							<Link href='/auth/login'>
								У меня уже есть аккаунт
							</Link>
						</Button>
					</SignedOut>
					<SignedIn>
						<Button
							size='lg'
							variant='secondary'
							className='w-full'
							asChild
						>
							<Link href='/learn'>Продолжить обучение</Link>
						</Button>
					</SignedIn>
				</div>
			</div>
		</div>
	)
}
