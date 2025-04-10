import { View } from '../../base/View';
import { categoryClasses, defaultCategoryClass } from '@/utils/constants';
import { CardSettings } from '@/types/components/view/common/Card';

/**
 * Общий класс для карточек
 */
export class CardView<T, S extends Partial<CardSettings>> extends View<T, S> {
	id: string;

	set image(value: string) {
		this.setValue<HTMLImageElement>(this.settings.image, {
			src: value,
		});
	}

	set title(value: string) {
		this.setValue(this.settings.title, value);
	}

	set category(value: string) {
		this.setValue(this.settings.category, value);
		this.setValue<HTMLElement>(this.settings.category, {
			className: categoryClasses[value] || defaultCategoryClass,
		});
	}

	set price(value: string) {
		this.setValue(
			this.settings.price,
			value ? `${String(value)} синапсов` : 'Бесценно'
		);
	}
}
