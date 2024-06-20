import { FC, useState } from 'react'
import { Text, View } from 'react-native'

const Auth: FC = () => {
	const [isReg, setIsReg] = useState(false)

	return (
		<View>
			<Text>Auth</Text>
		</View>
	)
}

export default Auth
