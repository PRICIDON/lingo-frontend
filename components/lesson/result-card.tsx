import React from 'react'
import Image from 'next/image'
import {cn} from '@/lib/utils'
import {Infinity} from 'lucide-react'

interface ResultCardProps {
	value: number
	variant: "points" | "hearts"
	hasActiveSubscription?: boolean
}

export default function ResultCard({ value, variant, hasActiveSubscription } : ResultCardProps) {
	const imageSrc = variant === "hearts" ? "/heart.svg" : "/points.svg"
	
	return (
		<div className={cn("rounded-2xl border-2 w-full", variant === "hearts" ? "bg-rose-500 border-rose-500" : "bg-orange-400 border-orange-400")}>
			<div className={cn("p-1.5 text-white rounded-xl font-bold text-center uppercase text-xs", variant === "hearts" ? "bg-rose-500" : "bg-orange-400")}>
				{variant === "hearts"  ? "Hearts Left" : "Total XP"}
			</div>
			<div className={cn("rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg", variant === "hearts" ? "text-rose-500" : "text-orange-400")}>
				<Image src={imageSrc} alt={variant} width={30} height={30} className="mr-1.5"/>
				{hasActiveSubscription && variant === "hearts" ? (
					<Infinity className="size-6 stroke-[3] shrink-0" />
				) : value}
			</div>
		</div>
	)
}
