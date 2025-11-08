'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

import { useGetUserProgressQuery } from '@/api/hooks/useGetUserProgressQuery'
import { useUpsertUserProgressMutation } from '@/api/hooks/useUpsertUserProgressMutation'
import { GetCourseResponse } from '@/api/types'

import Card from '@/components/learn/card'

interface ListProps {
	courses: GetCourseResponse[]
}

export default function List({ courses }: ListProps) {
	const router = useRouter()
	const { data: userProgress } = useGetUserProgressQuery()
	const { mutate, isPending } = useUpsertUserProgressMutation()

	const onClick = (id: string) => {
		if (isPending) return

		if (id === userProgress?.activeCourseId) {
			return router.push('/learn')
		}

		mutate(
			{ courseId: id },
			{
				onSuccess() {
					router.push('/learn')
				},
				onError(err) {
					toast.error('Что-то пошло не так!')
					console.error(err)
				}
			}
		)
	}

	return (
		<div className='grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]'>
			{courses.map(({ id, title, imageSrc }) => (
				<Card
					key={id}
					id={id}
					title={title}
					imageSrc={imageSrc}
					onClick={onClick}
					disabled={isPending}
					active={id === userProgress?.activeCourseId}
				/>
			))}
		</div>
	)
}
