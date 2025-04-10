import { CardData, CardSettings } from '@/types/components/view/common/Card';
import { IClickable } from '@/types/components/base/View';

export interface CardCatalogData extends Omit<CardData, 'description'> {}

export interface CardCatalogSettings
	extends Omit<CardSettings, 'description'>,
		IClickable<string> {}
