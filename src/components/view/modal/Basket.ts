import {
	BasketData,
	BasketSettings,
} from '@/types/components/view/modal/Basket';
import { View } from '@/components/base/View';
import { cloneTemplate, ensureElement } from '@/utils/utils';
import { SETTINGS } from '@/utils/constants';
import { ListView } from '@/components/view/common/List';
import { CardBasketData } from '@/types/components/view/partial/CardBasket';
import { CardBasketView } from '@/components/view/partial/CardBasket';

/**
 * Экран корзины
 */
export class BasketView extends View<BasketData, BasketSettings> {
	protected declare basketList: ListView<CardBasketData>;

	init() {
		this.ensure(this.settings.action).addEventListener(
			'click',
			this.settings.onNext
		);

		this.basketList = new ListView<CardBasketData>(
			ensureElement(this.settings.items, this.element),
			{
				...SETTINGS.gallerySettings,
				item: new CardBasketView(cloneTemplate(SETTINGS.cardBasketTemplate), {
					...SETTINGS.cardSettings,
					onClick: this.settings.onRemove,
				}),
			}
		);
	}

	set items(value: CardBasketData[]) {
		this.basketList.items = value;
	}

	set total(value: string) {
		this.setValue(this.settings.total, `${String(value)} синапсов`);
	}

	set isDisabled(state: boolean) {
		this.setValue<HTMLButtonElement>(this.settings.action, {
			disabled: state,
		});
	}
}
