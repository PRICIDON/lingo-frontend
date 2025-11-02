import { SidebarItemProps } from '@/types/sidebar-item'

export const sidebarItems: SidebarItemProps[] = [
	{
		label: 'Учить',
		iconSrc: '/learn.svg',
		href: '/learn'
	},
	{
		label: 'Доска лидеров',
		iconSrc: '/leaderboard.svg',
		href: '/leaderboard'
	},
	{
		label: 'Квесты',
		iconSrc: '/quests.svg',
		href: '/quests'
	},
	{
		label: 'Магазин',
		iconSrc: '/shop.svg',
		href: '/shop'
	}
]
