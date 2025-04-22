import { View } from '@/components/base/View';
import {
	DeliveryFormData,
	DeliveryFormSettings,
} from '@/types/components/view/forms/DeliveryForm';
import { PaymentMethod } from '@/types/components/services/StoreApi';
import { ensureAllElements } from '@/utils/utils';

export class DeliveryFormView extends View<
	DeliveryFormData,
	DeliveryFormSettings
> {
	protected paymentButtons: HTMLButtonElement[];

	init() {
		this.paymentButtons = ensureAllElements(
			this.settings.payment,
			this.element
		);
		this.paymentButtons.forEach((button) => {
			button.addEventListener('click', this.onClickHandler.bind(this));
		});
		this.element.addEventListener('submit', this.onSubmitHandler.bind(this));
		this.ensure(this.settings.address).addEventListener(
			'input',
			this.onChangeHandler.bind(this)
		);
	}

	protected onSubmitHandler(event: SubmitEvent) {
		event.preventDefault();
		this.settings.onSubmit();
	}

	protected onClickHandler(event: MouseEvent) {
		const target = event.target as HTMLButtonElement;
		if (target.name) {
			this.settings.onClick?.({
				event,
				item: { payment: target.name as PaymentMethod },
			});
		}
	}

	protected onChangeHandler(event: Event) {
		const input = event.target as HTMLInputElement;
		this.settings.onChange?.({
			event,
			value: { address: input.value },
		});
		input.focus();
	}

	set payment(value: PaymentMethod) {
		this.paymentButtons.forEach((button) => {
			if (button.name === value) {
				button.classList.add(this.settings.paymentActiveClass);
			} else {
				button.classList.remove(this.settings.paymentActiveClass);
			}
		});
	}

	set address(value: string) {
		this.setValue(this.settings.address, value);
	}

	set isDisabled(state: boolean) {
		this.setValue<HTMLButtonElement>(this.settings.action, {
			disabled: state,
		});
	}
}
