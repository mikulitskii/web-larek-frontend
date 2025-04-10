import { Model } from '@/components/base/Model';
import { EventEmitter } from '@/components/base/events';
import {
	Order,
	Product,
	PaymentMethod,
	IStoreAPI,
	Contacts,
	Delivery,
	OrderResult,
} from '@/types/components/services/StoreApi';
import {
	AppState,
	AppStateChanges,
	AppStateModals,
	ModalState,
} from '@/types/components/model/AppState';

export class AppStateModel extends Model implements AppState {
	_selectedProduct: string | null = null;
	basket: Map<string, Product> = new Map<string, Product>();
	products: Map<string, Product> = new Map<string, Product>();
	contacts: Contacts = {
		email: '',
		phone: '',
	};
	delivery: Delivery = {
		payment: PaymentMethod.card,
		address: '',
	};
	modal: ModalState = {
		opened: AppStateModals.none,
		previous: AppStateModals.none,
		message: null,
		isError: false,
	};
	constructor(protected api: IStoreAPI, emitter: EventEmitter) {
		super(emitter);
	}

	get basketTotal(): number {
		let total = 0;
		for (const product of this.basket.values()) {
			total += product.price;
		}
		return total;
	}

	get basketCount(): number {
		return this.basket.size;
	}

	get selectedProduct(): Product | null {
		return this._selectedProduct && this.products.has(this._selectedProduct)
			? this.products.get(this._selectedProduct)
			: null;
	}

	get order(): Order {
		return {
			...this.contacts,
			...this.delivery,
			items: Array.from(this.basket.values()).map((item) => item.id),
			total: this.basketTotal,
		};
	}

	async loadProducts(): Promise<void> {
		this.products.clear();
		const products = await this.api.getProducts();
		this.products = new Map(products.map((product) => [product.id, product]));
		this.notifyChanged(AppStateChanges.products);
	}

	async createOrder(): Promise<OrderResult> {
		try {
			const result = await this.api.createOrder(this.order);
			this.basket.clear();
			this.notifyChanged(AppStateChanges.basket);
			return result;
		} catch (err: unknown) {
			let errorMessage = 'Ошибка при создании заказа';
			if (err instanceof Error) {
				errorMessage = err.message;
			} else if (typeof err === 'string') {
				errorMessage = err;
			}
			this.setMessage(errorMessage, true);
			throw new Error(errorMessage);
		}
	}

	selectProduct(id: string | null): void {
		if (!id) {
			this._selectedProduct = null;
			this.notifyChanged(AppStateChanges.selectedProduct);
			return;
		}
		if (this.products.has(id)) {
			this._selectedProduct = id;
			this.notifyChanged(AppStateChanges.selectedProduct);
		} else {
			throw new Error(`Invalid product id: ${id}`);
		}
	}

	addToBasket(id: string): void {
		const product = this.products.get(id);
		if (!product) {
			throw new Error(`Product not found: ${id}`);
		}

		this.basket.set(id, product);
		this.notifyChanged(AppStateChanges.basket);
	}

	removeFromBasket(id: string): void {
		if (!this.basket.has(id)) {
			throw new Error(`Invalid product id: ${id}`);
		}
		this.basket.delete(id);
		this.notifyChanged(AppStateChanges.basket);
	}

	toggleBasketItem(id: string): void {
		if (this.basket.has(id)) {
			this.removeFromBasket(id);
		} else {
			this.addToBasket(id);
		}
	}

	fillContacts(contacts: Partial<Contacts>): void {
		this.contacts = {
			...this.contacts,
			...contacts,
		};
		this.notifyChanged(AppStateChanges.order);
	}

	fillDelivery(delivery: Partial<Delivery>): void {
		this.delivery = {
			...this.delivery,
			...delivery,
		};
		this.notifyChanged(AppStateChanges.order);
	}

	isValidContacts(): boolean {
		const error = this.validateContacts(this.contacts);
		if (error) {
			this.setMessage(error, true);
			return false;
		} else {
			this.setMessage(null);
			return true;
		}
	}

	isValidDelivery(): boolean {
		const error = this.validateDelivery(this.delivery);
		if (error) {
			this.setMessage(error, true);
			return false;
		} else {
			this.setMessage(null);
			return true;
		}
	}

	// UI methods
	openModal(modal: AppStateModals): void {
		switch (modal) {
			case AppStateModals.preview:
				if (this.products.size === 0) {
					throw new Error(`No products loaded`);
				}
				break;
			case AppStateModals.contacts:
			case AppStateModals.delivery:
				if (this.basket.size === 0) {
					throw new Error(`No products added`);
				}
				break;
		}
		if (this.modal.opened !== modal) {
			this.modal.previous = this.modal.opened;
			this.modal.opened = modal;
			this.notifyChanged(AppStateChanges.modal);
		}
	}

	setMessage(message: string | null = null, isError = false): void {
		this.modal.message = message;
		this.modal.isError = isError;
		this.notifyChanged(AppStateChanges.modalMessage);
	}

	// helpers
	protected notifyChanged(changed: AppStateChanges): void {
		switch (changed) {
			case AppStateChanges.products:
				this.emitter.emit(changed, Array.from(this.products.values()));
				break;
			case AppStateChanges.selectedProduct:
				this.emitter.emit(changed, this.selectedProduct);
				break;
			case AppStateChanges.basket:
				this.emitter.emit(changed, {
					total: this.basketTotal,
					items: Array.from(this.basket.values()),
				});
				break;
			case AppStateChanges.order:
				this.emitter.emit(changed, {
					contacts: this.contacts,
					delivery: this.delivery,
				});
				break;
			case AppStateChanges.modal:
				this.emitter.emit(changed, {
					previous: this.modal.previous,
					current: this.modal.opened,
				});
				this.emitter.emit(this.modal.opened);
				break;
			case AppStateChanges.modalMessage:
				this.emitter.emit(changed, {
					message: this.modal.message,
					isError: this.modal.isError,
				});
				break;
			default:
				break;
		}
	}

	protected validateContacts(contacts: Partial<Contacts>): string | null {
		const errors: string[] = [];
		if (!contacts.email || !contacts.phone) {
			errors.push('Email и телефон обязательные поля');
		}
		if (
			contacts.email &&
			!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(contacts.email)
		) {
			errors.push('Некорректный email');
		}
		if (contacts.phone && !/^\+?[0-9]{10,14}$/.test(contacts.phone)) {
			errors.push('Некорректный телефон');
		}
		if (errors.length) {
			return errors.join('. ') + '.';
		}
		return null;
	}

	protected validateDelivery(delivery: Partial<Delivery>): string | null {
		const errors: string[] = [];
		if (!delivery.address) {
			errors.push('Необходимо указать адрес');
		}
		if (errors.length) {
			return errors.join('. ') + '.';
		}
		return null;
	}
}
