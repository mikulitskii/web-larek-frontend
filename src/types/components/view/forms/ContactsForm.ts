import { IChangeable } from '@/types/components/base/View';

export interface ContactsFormData {
	email?: string;
	phone?: string;
	isDisabled?: boolean;
}

export interface ContactsFormSettings extends IChangeable<ContactsFormData> {
	email: string;
	phone: string;
	action: string;
	onSubmit: () => void;
}
