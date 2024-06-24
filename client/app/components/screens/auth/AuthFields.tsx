import { FC } from 'react'
import { Control } from 'react-hook-form'

import Field from '@/components/ui/field/Field'

import { IAuthFormData } from '@/types/auth.interface'

import { validEmail } from './email.regex'

interface IAuthFields {
	control: Control<IAuthFormData>
	isPassRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({ control, isPassRequired }) => {
	return (
		<>
			<Field<IAuthFormData>
				placeholder='Введите email'
				control={control}
				name='email'
				rules={{
					required: 'Email обязателен',
					pattern: {
						value: validEmail,
						message: 'Некорректный email'
					}
				}}
				keyboardType='email-address'
			/>
			<Field<IAuthFormData>
				placeholder='Введите пароль'
				control={control}
				name='password'
				secureTextEntry
				rules={{
					required: 'Пароль обязателен',
					minLength: {
						value: 6,
						message: 'Пароль должен состоять минимум из 6 символов'
					}
				}}
			/>
		</>
	)
}

export default AuthFields
