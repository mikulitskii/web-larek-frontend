import { CardView } from '@/components/view/common/Card';
import {
	CardPreviewData,
	CardPreviewSettings,
} from '@/types/components/view/partial/CardPreview';

/**
 * Карточка продукта для превью
 */
export class CardPreviewView extends CardView<
	CardPreviewData,
	CardPreviewSettings
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

	set title(value: string) {
		super.title = value;
		this.setValue<HTMLImageElement>(this.settings.image, {
			alt: value,
		});
	}

	set description(value: string) {
		this.setValue(this.settings.description, String(value));
	}

	set price(value: string) {
		super.price = value;
		this.setValue<HTMLButtonElement>(this.settings.action, {
			disabled: !value,
		});
	}

	set isInBasket(value: string) {
		this.setValue(
			this.settings.action,
			!value ? 'Купить' : 'Удалить из корзины'
		);
	}
}
