import React from 'react'

import { ChallengeOptionResponse, ChallengeResponseType } from '@/api/types'

import Card from '@/components/lesson/card'

import { cn } from '@/lib/utils'

interface ChallengeProps {
	options: ChallengeOptionResponse[]
	onSelect: (id: string) => void
	status: 'correct' | 'wrong' | 'none'
	selectedOption?: string
	disabled: boolean
	type: ChallengeResponseType
}

export default function Challenge({
	options,
	selectedOption,
	onSelect,
	disabled,
	status,
	type
}: ChallengeProps) {
	return (
		<div
			className={cn(
				'grid gap-2',
				type === 'ASSIST'
					? 'grid-cols-1'
					: 'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]'
			)}
		>
			{options.map((option, index) => (
				<Card
					key={option.id}
					text={option.text}
					imageSrc={option.imageSrc}
					shortcut={`${index + 1}`}
					selected={selectedOption === option.id}
					status={status}
					onClick={() => onSelect(option.id)}
					audioSrc={option.audioSrc}
					disabled={disabled}
					type={type}
				/>
			))}
		</div>
	)
}
