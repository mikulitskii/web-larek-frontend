import { CardCatalogData } from '@/types/components/view/partial/CardCatalog';
import {
	IChangeableEvent,
	IClickableEvent,
} from '@/types/components/base/View';
import { ContactsFormData } from '@/types/components/view/forms/ContactsForm';
import { DeliveryFormData } from '@/types/components/view/forms/DeliveryForm';

export interface MainData {
	counter: number;
	items: CardCatalogData[];
	selected: CardCatalogData;
	isLocked: boolean;
}

export interface MainSettings {
	page: {
		onOpenBasket: () => void;
	};
	gallery: {
		onOpenPreview: (event: IClickableEvent<string>) => void;
	};
	modal: {
		onClose: () => void;
	};
	basket: {
		onRemove: (event: IClickableEvent<string>) => void;
		onNext: () => void;
	};
	preview: {
		onClick: (event: IClickableEvent<string>) => void;
	};
	order: {
		onClick: (event: IClickableEvent<DeliveryFormData>) => void;
		onChange: (event: IChangeableEvent<DeliveryFormData>) => void;
		onSubmit: () => void;
	};
	contacts: {
		onChange: (event: IChangeableEvent<ContactsFormData>) => void;
		onSubmit: () => void;
	};
}
