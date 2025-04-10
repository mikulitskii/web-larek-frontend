import {
	CardBasketData,
	CardBasketSettings,
} from '@/types/components/view/partial/CardBasket';
import { CardView } from '@/components/view/common/Card';

/**
 * Маленькая карточка продукта для списка корзины
 */
export class CardBasketView extends CardView<
	CardBasketData,
	CardBasketSettings
> {
	init() {
		this.ensure(this.settings.action).addEventListener(
			'click',
			this.onClickHandler.bind(this)
		);
	}

	onClickHandler(event: MouseEvent) {
		this.settings.onClick({ event, item: this.id });
	}

	set index(value: string) {
		this.setValue(this.settings.index, String(value));
	}
}
