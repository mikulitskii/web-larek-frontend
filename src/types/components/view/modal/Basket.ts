import { CardBasketData } from '@/types/components/view/partial/CardBasket';
import { IClickableEvent } from '@/types/components/base/View';

export interface BasketData {
	items: CardBasketData[];
	isDisabled: boolean;
	total: number;
}

export interface BasketSettings {
	total: string;
	items: string;
	action: string;
	onRemove: (event: IClickableEvent<string>) => void;
	onNext: () => void;
}
