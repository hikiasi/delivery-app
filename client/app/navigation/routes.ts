import Explorer from '@/components/screens/explorer/Explorer'
import Favorites from '@/components/screens/favorites/Favorites'
import Home from '@/components/screens/home/Home'
import Profile from '@/components/screens/profile/Profile'
import Search from '@/components/screens/search/Search'

import { IRoute } from './navigation.types'

export const routes: IRoute[] = [
	{
		name: 'Home',
		component: Home
	},
	{
		name: 'Favorites',
		component: Favorites
	},
	{
		name: 'Search',
		component: Search
	},
	{
		name: 'Explorer',
		component: Explorer
	},
	{
		name: 'Profile',
		component: Profile
	}
]
