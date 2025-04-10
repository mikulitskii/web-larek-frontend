import {
	SuccessData,
	SuccessSettings,
} from '@/types/components/view/modal/Success';
import { View } from '@/components/base/View';
import { ensureElement } from '@/utils/utils';
import { SETTINGS } from '@/utils/constants';

/**
 * Экран подтверждения успешного заказа
 */
export class SuccessView extends View<SuccessData, SuccessSettings> {
	init() {
		this.ensure(this.settings.action).addEventListener(
			'click',
			this.onCloseHandler.bind(this)
		);
	}

	protected onCloseHandler(event: MouseEvent) {
		ensureElement(SETTINGS.modalContainer).classList.remove(
			SETTINGS.modalSettings.activeClass
		);
		this.settings.onClose?.();
	}

	set total(value: string) {
		this.setValue(this.settings.total, `Списано ${String(value)} синапсов`);
	}
}
