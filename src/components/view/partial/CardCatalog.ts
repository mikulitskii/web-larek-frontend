import { CardView } from '@/components/view/common/Card';
import {
	CardCatalogData,
	CardCatalogSettings,
} from '@/types/components/view/partial/CardCatalog';

/**
 * Маленькая карточка продукта для списка товаров
 */
export class CardCatalogView extends CardView<
	CardCatalogData,
	CardCatalogSettings
> {
	init() {
		this.element.addEventListener('click', this.onClickHandler.bind(this));
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
}
