export interface Product {
	id: string; // уникальный ID
	title: string; // название товара
	description: string; // описание товара
	price: number | null; // цена товара
	category: string; // категория товара
	image: string; // ссылка на изображение товара
}

export interface Contacts {
	email: string; // Email клиента
	phone: string; // Телефон клиента
}

export enum PaymentMethod {
	card = 'card',
	cash = 'cash',
}

export interface Delivery {
	payment: PaymentMethod; // Выбранный способ оплаты
	address: string; // Адрес доставки
}

export interface Order extends Contacts, Delivery {
	items: string[]; // товары в заказе
	total: number | null; // Общая стоимость товаров
}

export interface OrderResult {
	id: string;
	total: number | null;
}

export interface IStoreAPI {
	getProducts: () => Promise<Product[]>;
	createOrder: (order: Order) => Promise<OrderResult>;
}
