import {
	Product,
	Order,
	Contacts,
	Delivery,
	OrderResult,
} from '../services/StoreApi';

// Какие модальные окна у нас есть
export enum AppStateModals {
	preview = 'modal:preview',
	basket = 'modal:basket',
	delivery = 'modal:delivery',
	contacts = 'modal:contacts',
	success = 'modal:success',
	none = 'modal:none',
}

// Какие изменения состояния приложения могут происходить
export enum AppStateChanges {
	products = 'change:products',
	selectedProduct = 'change:selectedProduct',
	basket = 'change:basket',
	order = 'change:order',
	modal = 'change:modal',
	modalMessage = 'change:modalMessage',
}

export interface FormErrors {
	email?: string;
	phone?: string;
	address?: string;
}

export interface ModalState {
	opened: AppStateModals;
	previous: AppStateModals;
	message: string | null;
	isError: boolean;
}

export enum AppStateSteps {
	Basket = 'basket', // Шаг 1: Корзина
	Contacts = 'contacts', // Шаг 2: Ввод email и телефона
	Delivery = 'delivery', // Шаг 3: Выбор адреса и способа оплаты
	Success = 'success', // Шаг 4: Заказ оформлен
}

export interface AppStateData {
	// Загружаемые с сервера данные
	products: Map<string, Product>;
	// Заполняемые пользователем данные
	selectedProduct: Product | null;
	basket: Map<string, Product>;
	basketTotal: number;
	basketCount: number;
	contacts: Contacts;
	delivery: Delivery;
	order: Order;
	// Состояние интерфейса
	modal: ModalState;
}

export interface AppStateActions {
	// Действия с API
	loadProducts(): Promise<void>;
	createOrder(): Promise<OrderResult>;
	// Пользовательские действия
	selectProduct(id: string): void;
	addToBasket(id: string): void;
	removeFromBasket(id: string): void;
	toggleBasketItem(id: string): void;
	fillContacts(contacts: Partial<Contacts>): void;
	fillDelivery(contacts: Partial<Delivery>): void;
	isValidContacts(): boolean;
	isValidDelivery(): boolean;
	// Методы для работы с модальными окнами
	openModal(modal: AppStateModals): void;
	setMessage(message: string | null, isError: boolean): void;
}

export interface AppState extends AppStateData, AppStateActions {}

export type ModalChange = {
	previous: AppStateModals;
	current: AppStateModals;
};

export interface AppStateEvents {
	[AppStateChanges.products]: Product[];
	[AppStateChanges.selectedProduct]: Product | null;
	[AppStateChanges.basket]: {
		total: number;
		items: Product[];
	};
	[AppStateChanges.order]: {
		contacts: Contacts;
		delivery: Delivery;
	};
	[AppStateChanges.modal]: ModalChange;
	[AppStateChanges.modalMessage]: {
		message: string;
		isError: boolean;
	};
	[AppStateModals.preview]: never;
	[AppStateModals.basket]: never;
	[AppStateModals.contacts]: never;
	[AppStateModals.delivery]: never;
	[AppStateModals.success]: never;
	[AppStateModals.none]: never;
}
