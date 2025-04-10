import { MainData, MainSettings } from '@/types/components/view/Main';
import {
	AppState,
	AppStateChanges,
	AppStateEvents,
	AppStateModals,
} from '@/types/components/model/AppState';
import { Presenter } from '@/components/base/Presenter';
import { EventEmitter } from '@/components/base/events';
import { MainView } from '@/components/view/Main';
import { IChangeableEvent } from '@/types/components/base/View';
import { ContactsFormData } from '@/types/components/view/forms/ContactsForm';
import { DeliveryFormData } from '@/types/components/view/forms/DeliveryForm';
import { OrderResult } from '@/types/components/services/StoreApi';

export class MainPresenter extends Presenter<
	MainData,
	MainSettings,
	AppState,
	EventEmitter
> {
	protected view: MainView;
	protected orderResult: OrderResult;

	protected bindModel(emitter: EventEmitter): void {
		emitter.on<AppStateEvents[AppStateModals.preview]>(
			AppStateModals.preview,
			() => this.updateModal(AppStateModals.preview)
		);
		emitter.on<AppStateEvents[AppStateModals.delivery]>(
			AppStateModals.delivery,
			() => this.updateModal(AppStateModals.delivery)
		);
		emitter.on<AppStateEvents[AppStateModals.contacts]>(
			AppStateModals.contacts,
			() => this.updateModal(AppStateModals.contacts)
		);
		emitter.on<AppStateEvents[AppStateModals.success]>(
			AppStateModals.success,
			() => this.updateModal(AppStateModals.success)
		);
		emitter.on<AppStateEvents[AppStateModals.basket]>(
			AppStateModals.basket,
			() => this.updateModal(AppStateModals.basket)
		);
		emitter.on<AppStateEvents[AppStateChanges.products]>(
			AppStateChanges.products,
			(items) => this.view.render({ items })
		);
		emitter.on<AppStateEvents[AppStateChanges.selectedProduct]>(
			AppStateChanges.selectedProduct,
			(item) => this.view.render({ selected: item })
		);
		emitter.on<AppStateEvents[AppStateChanges.basket]>(
			AppStateChanges.basket,
			({ items }) => {
				this.view.render({ counter: items.length });
				if (this.model.modal.opened) {
					this.updateModal(this.model.modal.opened);
				}
			}
		);
		emitter.on<AppStateEvents[AppStateChanges.order]>(
			AppStateChanges.order,
			() => this.updateModal(this.model.modal.opened)
		);
		emitter.on<AppStateEvents[AppStateChanges.modal]>(
			AppStateChanges.modal,
			({ current }) =>
				this.view.render({ isLocked: current !== AppStateModals.none })
		);
		emitter.on<AppStateEvents[AppStateChanges.modalMessage]>(
			AppStateChanges.modalMessage,
			() => this.updateModal(this.model.modal.opened)
		);
	}

	protected bindView(): MainSettings {
		return {
			page: {
				onOpenBasket: () => this.model.openModal(AppStateModals.basket),
			},
			gallery: {
				onOpenPreview: ({ item }) => {
					this.model.selectProduct(item);
					this.model.openModal(AppStateModals.preview);
				},
			},
			modal: {
				onClose: () => this.model.openModal(AppStateModals.none),
			},
			basket: {
				onRemove: ({ item }) => this.model.removeFromBasket(item),
				onNext: () => this.model.openModal(AppStateModals.delivery),
			},
			preview: {
				onClick: ({ item }) => this.model.toggleBasketItem(item),
			},
			order: {
				onClick: ({ item }) => {
					this.model.fillDelivery(item);
				},
				onChange: ({ value }: IChangeableEvent<DeliveryFormData>) => {
					this.model.fillDelivery(value);
					this.model.isValidDelivery();
				},
				onSubmit: () => {
					if (this.model.isValidDelivery()) {
						this.model.openModal(AppStateModals.contacts);
					}
				},
			},
			contacts: {
				onChange: ({ value }: IChangeableEvent<ContactsFormData>) => {
					this.model.fillContacts(value);
					this.model.isValidContacts();
				},
				onSubmit: async () => {
					if (!this.model.isValidContacts()) {
						console.warn('Контактные данные некорректны');
						return;
					}
					try {
						this.orderResult = await this.model.createOrder();
						this.model.openModal(AppStateModals.success);
					} catch (error) {
						console.error('Ошибка при создании заказа:', error);
					}
				},
			},
		};
	}

	protected updateModal(modal: AppStateModals) {
		switch (modal) {
			case AppStateModals.preview:
				this.view.preview.render({
					isActive: true,
					content: {
						...this.model.selectedProduct,
						isInBasket: this.model.basket.has(this.model.selectedProduct.id),
					},
				});
				break;
			case AppStateModals.basket:
				this.view.basket.render({
					isActive: true,
					content: {
						isDisabled: this.model.basket.size === 0,
						items: Array.from(this.model.basket.values()).map(
							(item, index) => ({
								id: item.id,
								title: item.title,
								price: item.price,
								index: ++index,
							})
						),
						total: this.model.basketTotal,
					},
				});
				break;
			case AppStateModals.delivery:
				this.view.order.render({
					isActive: true,
					content: {
						isDisabled: !this.model.delivery.address,
						...this.model.delivery,
					},
					message: this.model.modal.message,
				});
				break;
			case AppStateModals.contacts:
				this.view.contacts.render({
					isActive: true,
					content: {
						isDisabled:
							!this.model.contacts.email ||
							!this.model.contacts.phone ||
							this.model.modal.isError,
						...this.model.contacts,
					},
					message: this.model.modal.message,
				});
				break;
			case AppStateModals.success:
				this.view.success.render({
					isActive: true,
					content: {
						...this.orderResult,
					},
				});
				break;
		}
	}

	init(): void {
		this.model
			.loadProducts()
			.catch((err: string) => console.log(`Error: `, err));
	}
}
