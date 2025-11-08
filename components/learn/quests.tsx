'use client'

import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

import { useGetUserProgressQuery } from '@/api/hooks/useGetUserProgressQuery'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'

import { quests } from '@/data/quests'

export default function Quests() {
	const { data: userProgress, isLoading } = useGetUserProgressQuery()

	if (isLoading) return <QuestSkeleton />

	if (!userProgress || !userProgress.activeCourse) {
		redirect('/courses')
	}

	return (
		<div className='space-y-4 rounded-xl border-2 p-4'>
			<div className='flex w-full items-center justify-between space-y-2'>
				<h3 className='text-lg font-bold'>Квесты</h3>
				<Link href='/quests'>
					<Button size='sm' variant='primaryOutline'>
						Посмотреть все
					</Button>
				</Link>
			</div>
			<ul className='w-full space-y-4'>
				{quests.map(quest => {
					const progress = (userProgress.points / quest.value) * 100

					return (
						<div
							className='flex w-full items-center gap-x-4 pb-3'
							key={quest.title}
						>
							<Image
								src='/points.svg'
								alt='Points'
								height={40}
								width={40}
							/>
							<div className='flex w-full flex-col gap-y-2'>
								<p className='text-lg font-bold text-neutral-700'>
									{quest.title}
								</p>
								<Progress value={progress} className='h-2' />
							</div>
						</div>
					)
				})}
			</ul>
		</div>
	)
}

function QuestSkeleton() {
	return (
		<div className='space-y-4 rounded-xl border-2 p-4'>
			<div className='flex w-full items-center justify-between space-y-2'>
				<h3 className='text-lg font-bold'>Квесты</h3>
				<Link href='/quests'>
					<Button size='sm' variant='primaryOutline'>
						Посмотреть все
					</Button>
				</Link>
			</div>
			<ul className='w-full space-y-4'>
				{Array.from({ length: 5 }).map((_, index) => (
					<div
						className='flex w-full items-center gap-x-4 pb-3'
						key={index}
					>
						<Skeleton className='h-10 w-14' />
						<div className='flex w-full flex-col gap-y-2'>
							<Skeleton className='h-5 w-30' />
							<Skeleton className='h-3 w-[280px]' />
						</div>
					</div>
				))}
			</ul>
		</div>
	)
}
