import { View } from '@/components/base/View';
import {
	ContactsFormData,
	ContactsFormSettings,
} from '@/types/components/view/forms/ContactsForm';

export class ContactsFormView extends View<
	ContactsFormData,
	ContactsFormSettings
> {
	init() {
		this.element.addEventListener('submit', this.onSubmitHandler.bind(this));
		this.ensure(this.settings.email).addEventListener(
			'input',
			this.onChangeHandler.bind(this)
		);
		this.ensure(this.settings.phone).addEventListener(
			'input',
			this.onChangeHandler.bind(this)
		);
	}

	protected onSubmitHandler(event: SubmitEvent) {
		event.preventDefault();
		this.settings.onSubmit();
	}

	protected onChangeHandler(event: Event) {
		const input = event.target as HTMLInputElement;
		this.settings.onChange?.({
			event,
			value: { [input.name]: input.value },
		});
		input.focus();
	}

	set email(value: string) {
		this.setValue(this.settings.email, value);
	}

	set phone(value: string) {
		this.setValue(this.settings.phone, value);
	}

	set isDisabled(state: boolean) {
		this.setValue<HTMLButtonElement>(this.settings.action, {
			disabled: state,
		});
	}
}
