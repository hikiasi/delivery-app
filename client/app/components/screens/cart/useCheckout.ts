import { useStripe } from '@stripe/stripe-react-native'
import { useMutation } from '@tanstack/react-query'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'

import { OrderService } from '@/services/order.service'

export const useCheckout = () => {
	const { items, total } = useCart()
	const { user } = useAuth()
	const { reset } = useActions()
	const { navigate } = useTypedNavigation()

	const { initPaymentSheet, presentPaymentSheet } = useStripe()

	const { mutateAsync: placeOrder } = useMutation({
		mutationKey: ['place order'],
		mutationFn: () =>
			OrderService.place({
				items: items.map(item => ({
					price: item.price,
					quantity: item.quantity,
					productId: item.product.id
				}))
			})
	})

	const onCheckout = async () => {
		try {
			const { clientSecret } = await placeOrder()

			const { error } = await initPaymentSheet({
				merchantDisplayName: 'Ваше торговое имя',
				paymentIntentClientSecret: clientSecret
			})

			if (error) {
				console.error('Ошибка инициализации платежной ведомости:', error)
				return
			}

			const { error: paymentError } = await presentPaymentSheet()
			if (paymentError) {
				console.error('Ошибка при оформлении платежной ведомости:', paymentError)
				return
			}

			reset()
			navigate('Thanks')
		} catch (error) {
			console.error('Ошибка при оформлении заказа:', error)
		}
	}

	return { onCheckout }
}