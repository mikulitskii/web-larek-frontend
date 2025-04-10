import { CardData, CardSettings } from '@/types/components/view/common/Card';
import { IClickable } from '@/types/components/base/View';

export interface CardBasketData
	extends Omit<CardData, 'image' | 'category' | 'description'> {
	index: number;
}

export interface CardBasketSettings
	extends Omit<CardSettings, 'image' | 'category' | 'description'>,
		IClickable<string> {
	index: string;
	action: string;
}
