'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useAudio, useMount } from 'react-use'
import { toast } from 'sonner'

import { useGetUserProgressQuery } from '@/api/hooks/useGetUserProgressQuery'
import { useGetUserSubscriptionQuery } from '@/api/hooks/useGetUserSubscriptionQuery'
import { useReduceHeartsMutation } from '@/api/hooks/useReduceHeartsMutation'
import { useUpsertChallengeProgressMutation } from '@/api/hooks/useUpsertChallengeProgressMutation'
import { type ChallengeResponse } from '@/api/types'

import Challenge from '@/components/lesson/challenge'
import Finish from '@/components/lesson/finish'
import Footer from '@/components/lesson/footer'
import Header from '@/components/lesson/header'
import QuestionBubble from '@/components/lesson/question-bubble'
import HeartsModal from '@/components/modals/hearts-modal'
import PracticeModal from '@/components/modals/practice-modal'

interface QuizProps {
	initialPercentage: number
	initialLessonId: string
	initialLessonChallenges: ChallengeResponse[]
}

export default function Quiz({
	initialPercentage,
	initialLessonId,
	initialLessonChallenges
}: QuizProps) {
	const router = useRouter()
	const { data: userProgress, isLoading: isLoadingUserProgress } =
		useGetUserProgressQuery()
	const { data: userSubscription, isLoading: isLoadingUserSubscription } =
		useGetUserSubscriptionQuery()
	const isLoading = isLoadingUserProgress || isLoadingUserSubscription

	if (isLoading) return <div>Loading...</div>

	if (!userProgress || !userSubscription) router.push('/learn')

	const [isOpenHeartModal, setIsOpenHeartModal] = useState(false)
	const [isOpenPracticeModal, setIsOpenPracticeModal] = useState(false)

	useMount(() => {
		if (initialPercentage === 100) {
			setIsOpenPracticeModal(true)
		}
	})

	const [correctAudio, _c, correctControls] = useAudio({
		src: '/correct.wav'
	})
	const [incorrectAudio, _i, incorrectControls] = useAudio({
		src: '/incorrect.wav'
	})
	const { mutate: mutateReduceHearts, isPending: isPendingReduceHearts } =
		useReduceHeartsMutation()
	const {
		mutate: mutateChallengeProgress,
		isPending: isPendingUpsertChallengeProgress
	} = useUpsertChallengeProgressMutation()
	const isPending = isPendingReduceHearts || isPendingUpsertChallengeProgress

	const [lessonId] = useState(initialLessonId)
	const [hearts, setHearts] = useState<number>(userProgress?.hearts!)
	const [percentage, setPercentage] = useState(() => {
		return initialPercentage === 100 ? 0 : initialPercentage
	})
	const [challenges, _] = useState(initialLessonChallenges)
	const [activeIndex, setActiveIndex] = useState(() => {
		const uncompletedIndex = challenges.findIndex(
			challenge => !challenge.completed
		)
		return uncompletedIndex === -1 ? 0 : uncompletedIndex
	})
	const challenge = challenges[activeIndex]
	const options = challenge?.challengeOptions ?? []

	const onNext = () => {
		setActiveIndex(current => current + 1)
	}

	const [selectedOption, setSelectedOption] = useState<string>()
	const [status, setStatus] = useState<'correct' | 'wrong' | 'none'>('none')

	const onSelect = (id: string) => {
		if (status !== 'none') return

		setSelectedOption(id)
	}

	const onContinue = () => {
		if (!selectedOption) return

		switch (status) {
			case 'wrong':
				setStatus('none')
				setSelectedOption(undefined)
				return
			case 'correct':
				onNext()
				setStatus('none')
				setSelectedOption(undefined)
				return
		}
		const correctOption = options.find(option => option.correct)
		if (!correctOption) return
		if (correctOption.id === selectedOption) {
			mutateChallengeProgress(
				{ challengeId: challenge.id },
				{
					onSuccess(response) {
						if (response?.error === 'hearts') {
							setIsOpenHeartModal(true)
							return
						}
						correctControls.play()
						setStatus('correct')
						setPercentage(prev => prev + 100 / challenges.length)
						// In practice mode, points don't give, hearts не забираются
					},
					onError(err) {
						console.error(err)
						toast.error('Что-то пошло не так. Попробуйте еще раз')
					}
				}
			)
		} else {
			mutateReduceHearts(
				{ challengeId: challenge.id },
				{
					onSuccess(response) {
						if (response?.error === 'hearts') {
							setIsOpenHeartModal(true)
							return
						}

						incorrectControls.play()
						setStatus('wrong')

						if (!response?.error) {
							setHearts(prev => Math.max(prev - 1, 0))
						}
					},
					onError(err) {
						console.error(err)
						toast.error('Что-то пошло не так. Попробуйте еще раз.')
					}
				}
			)
		}
	}

	if (!challenge) {
		return (
			<Finish
				challenges={challenges}
				hearts={hearts}
				lessonId={lessonId}
				hasActiveSubscription={!!userSubscription?.isActive}
			/>
		)
	}

	const title =
		challenge.type === 'ASSIST'
			? 'Выберите правильный ответ'
			: challenge.question

	return (
		<>
			{incorrectAudio}
			{correctAudio}
			<Header
				hearts={hearts}
				percentage={percentage}
				hasActiveSubscription={!!userSubscription?.isActive}
			/>
			<div className='flex-1'>
				<div className='flex h-full items-center justify-center'>
					<div className='flex w-full flex-col gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0'>
						<h1 className='text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl'>
							{title}
						</h1>
						<div>
							{challenge.type === 'ASSIST' && (
								<QuestionBubble question={challenge.question} />
							)}
							<Challenge
								options={options}
								onSelect={onSelect}
								status={status}
								selectedOption={selectedOption}
								disabled={isPending}
								type={challenge.type}
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer
				disabled={isPending || !selectedOption}
				status={status}
				onCheck={onContinue}
			/>
			<HeartsModal
				isOpen={isOpenHeartModal}
				onClose={() => setIsOpenHeartModal(false)}
			/>
			<PracticeModal
				isOpen={isOpenPracticeModal}
				onClose={() => setIsOpenPracticeModal(false)}
			/>
		</>
	)
}
