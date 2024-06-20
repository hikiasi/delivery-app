import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FC } from 'react'

import { TypeRootStackParamList } from './navigation.types'
import { routes } from './routes'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const Navigation: FC = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
                    contentStyle: {
                        backgroundColor: '#fff'
                    }
				}}
			>
				{routes.map(route => (
					<Stack.Screen key={route.name} {...route} />
				))}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
