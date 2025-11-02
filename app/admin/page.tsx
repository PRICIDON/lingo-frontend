'use client'

import { useRouter } from 'next/navigation'
import simpleRestProvider from 'ra-data-simple-rest'
import React from 'react'
import { Admin, Resource, fetchUtils } from 'react-admin'

import { useGetMeQuery } from '@/api/hooks/useGetMeQuery'

import ChallengeOptionCreate from '@/components/admin/challengeOptions/create'
import ChallengeOptionEdit from '@/components/admin/challengeOptions/edit'
import ChallengeOptionList from '@/components/admin/challengeOptions/list'
import ChallengeCreate from '@/components/admin/challenges/create'
import ChallengeEdit from '@/components/admin/challenges/edit'
import ChallengeList from '@/components/admin/challenges/list'
import CourseCreate from '@/components/admin/course/create'
import CourseEdit from '@/components/admin/course/edit'
import CourseList from '@/components/admin/course/list'
import LessonCreate from '@/components/admin/lessons/create'
import LessonEdit from '@/components/admin/lessons/edit'
import LessonList from '@/components/admin/lessons/list'
import UnitCreate from '@/components/admin/units/create'
import UnitEdit from '@/components/admin/units/edit'
import UnitList from '@/components/admin/units/list'
import Loading from '@/components/loading'

import { ADMIN_ID } from '@/lib/constants'

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
	if (!options.headers) {
		options.headers = new Headers({ Accept: 'application/json' })
	}

	options.credentials = 'include'

	return fetchUtils.fetchJson(url, options)
}

const dataProvider = simpleRestProvider('http://localhost:4000', httpClient)

export default function AdminApp() {
	const router = useRouter()
	const { data: user, isLoading } = useGetMeQuery()

	if (isLoading) return <Loading />

	const isAdmin = user?.id === ADMIN_ID

	if (!isAdmin || !user?.id) router.push('/auth/login')

	return (
		<Admin dataProvider={dataProvider}>
			<Resource
				name='courses'
				recordRepresentation='title'
				list={CourseList}
				create={CourseCreate}
				edit={CourseEdit}
			/>
			<Resource
				name='units'
				recordRepresentation='title'
				list={UnitList}
				create={UnitCreate}
				edit={UnitEdit}
			/>
			<Resource
				name='lessons'
				recordRepresentation='title'
				list={LessonList}
				create={LessonCreate}
				edit={LessonEdit}
			/>
			<Resource
				name='challenges'
				recordRepresentation='question'
				list={ChallengeList}
				create={ChallengeCreate}
				edit={ChallengeEdit}
			/>
			<Resource
				name='challengeOptions'
				options={{ label: 'Challenge Options' }}
				recordRepresentation='text'
				list={ChallengeOptionList}
				create={ChallengeOptionCreate}
				edit={ChallengeOptionEdit}
			/>
		</Admin>
	)
}
