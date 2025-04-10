import { View } from '../base/View';
import { MainData, MainSettings } from '@/types/components/view/Main';
import { PageView } from '@/components/view/partial/Page';
import { cloneTemplate, ensureElement } from '@/utils/utils';
import { SETTINGS } from '@/utils/constants';
import { CardCatalogData } from '@/types/components/view/partial/CardCatalog';
import { CardCatalogView } from '@/components/view/partial/CardCatalog';
import { ListView } from '@/components/view/common/List';
import { ModalView } from '@/components/view/common/Modal';
import { BasketView } from '@/components/view/modal/Basket';
import { BasketData } from '@/types/components/view/modal/Basket';
import { CardPreviewView } from '@/components/view/partial/CardPreview';
import { CardPreviewData } from '@/types/components/view/partial/CardPreview';
import { DeliveryFormData } from '@/types/components/view/forms/DeliveryForm';
import { ContactsFormData } from '@/types/components/view/forms/ContactsForm';
import { DeliveryFormView } from '@/components/view/forms/DeliveryForm';
import { ContactsFormView } from '@/components/view/forms/ContactsForm';
import { SuccessData } from '@/types/components/view/modal/Success';
import { SuccessView } from '@/components/view/modal/Success';

export class MainView extends View<MainData, MainSettings> {
	protected declare gallery: ListView<CardCatalogData>;
	protected declare page: PageView;
	public declare basket: ModalView<BasketData>;
	public declare preview: ModalView<CardPreviewData>;
	public declare order: ModalView<DeliveryFormData>;
	public declare contacts: ModalView<ContactsFormData>;
	public declare success: ModalView<SuccessData>;

	init() {
		this.page = new PageView(ensureElement(SETTINGS.pageSelector), {
			...SETTINGS.pageSettings,
			onClick: this.settings.page.onOpenBasket,
		});

		this.gallery = new ListView<CardCatalogData>(
			ensureElement(SETTINGS.gallerySelector),
			{
				...SETTINGS.gallerySettings,
				item: new CardCatalogView(cloneTemplate(SETTINGS.cardCatalogTemplate), {
					...SETTINGS.cardSettings,
					onClick: this.settings.gallery.onOpenPreview,
				}),
			}
		);

		this.basket = new ModalView(ensureElement(SETTINGS.modalContainer), {
			contentView: new BasketView(cloneTemplate(SETTINGS.basketTemplate), {
				...SETTINGS.basketSettings,
				...this.settings.basket,
			}),
			...SETTINGS.modalSettings,
			onClose: this.settings.modal.onClose,
		});

		this.preview = new ModalView(ensureElement(SETTINGS.modalContainer), {
			contentView: new CardPreviewView(
				cloneTemplate(SETTINGS.cardPreviewTemplate),
				{
					...SETTINGS.cardSettings,
					onClick: this.settings.preview.onClick,
				}
			),
			...SETTINGS.modalSettings,
			onClose: this.settings.modal.onClose,
		});

		this.order = new ModalView(ensureElement(SETTINGS.modalContainer), {
			contentView: new DeliveryFormView(
				cloneTemplate(SETTINGS.deliveryFormTemplate),
				{
					...SETTINGS.deliveryFormSettings,
					...this.settings.order,
				}
			),
			...SETTINGS.modalSettings,
			onClose: this.settings.modal.onClose,
		});

		this.contacts = new ModalView(ensureElement(SETTINGS.modalContainer), {
			contentView: new ContactsFormView(
				cloneTemplate(SETTINGS.contactsFormTemplate),
				{
					...SETTINGS.contactsFormSettings,
					...this.settings.contacts,
				}
			),
			...SETTINGS.modalSettings,
			onClose: this.settings.modal.onClose,
		});

		this.success = new ModalView(ensureElement(SETTINGS.modalContainer), {
			contentView: new SuccessView(cloneTemplate(SETTINGS.successTemplate), {
				...SETTINGS.successSettings,
				onClose: this.settings.modal.onClose,
			}),
			...SETTINGS.modalSettings,
			onClose: this.settings.modal.onClose,
		});

		this.element = this.page.element;
	}

	set counter(value: number) {
		this.page.counter = value;
	}

	set items(value: CardCatalogData[]) {
		this.gallery.items = value;
	}

	set selected(value: CardCatalogData) {
		this.gallery.setActiveItem(value.id);
	}

	set isLocked(value: boolean) {
		this.page.isLocked = value;
	}
}
