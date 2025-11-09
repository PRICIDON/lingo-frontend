import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import Confetti from 'react-confetti'
import { useAudio, useWindowSize } from 'react-use'

import type { ChallengeResponse } from '@/api/types'

import Footer from '@/components/lesson/footer'
import ResultCard from '@/components/lesson/result-card'

interface FinishProps {
	challenges: ChallengeResponse[]
	hearts: number
	lessonId: string
	hasActiveSubscription: boolean
}

export default function Finish({
	challenges,
	hearts,
	lessonId,
	hasActiveSubscription
}: FinishProps) {
	const { width, height } = useWindowSize()
	const router = useRouter()
	const [finishAudio] = useAudio({ src: '/finish.mp3', autoPlay: true })

	return (
		<>
			{finishAudio}
			<Confetti
				width={width}
				height={height}
				recycle={false}
				numberOfPieces={500}
				tweenDuration={10000}
			/>
			<div className='mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8'>
				<Image
					src='/finish.svg'
					alt='Finish'
					className='hidden lg:block'
					height={100}
					width={100}
				/>
				<Image
					src='/finish.svg'
					alt='Finish'
					className='lg:hidden'
					height={50}
					width={50}
				/>
				<h1 className='text-xl font-bold text-neutral-700 lg:text-3xl'>
					Хорошая работа! <br /> Вы завершили этот урок.
				</h1>
				<div className='flex w-full items-center gap-x-4'>
					<ResultCard
						variant='points'
						value={challenges.length * 10}
					/>
					<ResultCard
						variant='hearts'
						value={hearts}
						hasActiveSubscription={hasActiveSubscription}
					/>
				</div>
			</div>
			<Footer
				lessonId={lessonId}
				status='completed'
				onCheck={() => router.push('/learn')}
			/>
		</>
	)
}
