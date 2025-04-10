import { IChangeable, IClickable } from '@/types/components/base/View';
import { PaymentMethod } from '@/types/components/services/StoreApi';

export interface DeliveryFormData {
	payment?: PaymentMethod;
	address?: string;
	isDisabled?: boolean;
}

export interface DeliveryFormSettings
	extends IChangeable<DeliveryFormData>,
		IClickable<DeliveryFormData> {
	payment: string;
	paymentActiveClass: string;
	address: string;
	action: string;
	onSubmit: () => void;
}
