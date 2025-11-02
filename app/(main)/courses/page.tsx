import React from 'react'

import { getCourses } from '@/api/requests/courses'

import List from '@/components/learn/list'

export default async function CoursesPage() {
	const courses = await getCourses()
	return (
		<div className='mx-auto h-full max-w-[912px] px-3'>
			<h1 className='text-2xl font-bold text-neutral-700'>
				Language Courses
			</h1>
			<List courses={courses} />
		</div>
	)
}
