import { View } from '../../base/View';

import { ModalData, ModalSettings } from '@/types/components/view/common/Modal';

/**
 * Отображение модального окна
 */
export class ModalView<C> extends View<ModalData<C>, ModalSettings<C>> {
	protected init() {
		// слушаем клик по иконке закрыть
		this.ensure(this.settings.close).addEventListener(
			'click',
			this.onCloseHandler.bind(this)
		);
		// клик по оверлею тоже закрывает модальное окно
		this.element.addEventListener('click', this.onCloseHandler.bind(this));
	}

	protected onCloseHandler(event?: MouseEvent) {
		if (
			event &&
			// при повторном вызове ensure возвращает элемент из кеша
			![this.ensure(this.settings.close), this.element].includes(
				event.target as HTMLElement
			)
		)
			return;
		this.element.classList.remove(this.settings.activeClass);
		if (event) {
			this.settings.onClose?.();
		}
	}

	protected onOpenHandler() {
		this.element.classList.add(this.settings.activeClass);
		this.settings.onOpen?.();
	}

	set content(data: C) {
		this.setValue(
			this.settings.content,
			this.settings.contentView.render(data)
		);
	}

	// Установка сообщения в модальное окно
	set message(value: string | undefined) {
		if (value) {
			this.setValue(this.settings.message, value);
			this.setVisibility(this.settings.message, true);
		} else {
			this.setVisibility(this.settings.message, false);
		}
	}

	// Открытие и закрытие модального окна
	set isActive(state: boolean) {
		if (state) {
			this.element.classList.add(this.settings.activeClass);
			this.onOpenHandler();
		} else {
			this.element.classList.remove(this.settings.activeClass);
			this.onCloseHandler();
		}
	}
}
