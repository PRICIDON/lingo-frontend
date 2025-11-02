import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import AuthSocial from '@/components/auth/auth-social'

interface AuthWrapperProps {
	children: React.ReactNode
	title: string
	description: string
	bottomText?: string
	bottomTextLink?: string
	bottomLinkHref?: string
	isShowSocial?: boolean
}

export default function AuthWrapper({
	children,
	title,
	description,
	bottomText,
	bottomTextLink,
	bottomLinkHref,
	isShowSocial
}: AuthWrapperProps) {
	return (
		<div className='flex min-h-screen'>
			<div className='relative hidden overflow-hidden bg-gradient-to-br from-[#f5f5f5] via-[#b4e8d9] to-[#28be96] lg:flex lg:w-1/2'>
				<div className='absolute inset-0 bg-gradient-to-br from-[#f5f5f5]/90 via-[#b4e8d9]/90 to-[#28be96]/90' />
				<div className='relative z-10 flex h-full w-full flex-col items-center justify-center p-12'>
					<Image
						src='/mascot.svg'
						alt='Logo'
						width={100}
						height={100}
					/>
				</div>
			</div>
			<div className='flex w-full items-center bg-gray-50 p-8 lg:w-1/2'>
				<div className='mx-auto w-full max-w-md'>
					<div className='text-center lg:text-left'>
						<h1 className='text-3xl font-bold'>{title}</h1>
						<p className='text-muted-foreground mt-2'>
							{description}
						</p>
					</div>
					{isShowSocial && <AuthSocial />}
					<div className='my-5 p-0'>{children}</div>

					{bottomText && bottomLinkHref && bottomTextLink && (
						<p className='text-muted-foreground text-center text-[15px]'>
							{bottomText}{' '}
							<Link
								href={bottomLinkHref}
								className='text-green-500'
							>
								{bottomTextLink}
							</Link>
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
