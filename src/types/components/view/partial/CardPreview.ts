import { CardData, CardSettings } from '@/types/components/view/common/Card';
import { IClickable } from '@/types/components/base/View';

export interface CardPreviewData extends CardData {
	isInBasket: boolean;
}

export interface CardPreviewSettings extends CardSettings, IClickable<string> {
	action: string;
}
