import Image from 'next/image'
import React from 'react'

import { getCourses } from '@/api/requests/courses'

import { Button } from '@/components/ui/button'

export default async function Footer() {
	const courses = await getCourses()

	return (
		<footer className='hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block'>
			<div className='mx-auto flex h-full max-w-screen-lg items-center justify-evenly'>
				{courses.map(course => (
					<Button size='lg' variant='ghost' key={course.id}>
						<Image
							src={course.imageSrc}
							alt={course.title}
							height={32}
							width={40}
							className='mr-4 rounded-[3px]'
						/>
						{course.title}
					</Button>
				))}
			</div>
		</footer>
	)
}
