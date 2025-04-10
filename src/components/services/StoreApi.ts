import { Api, ApiListResponse } from '../base/api';
import {
	Product,
	Order,
	OrderResult,
	IStoreAPI,
} from '@/types/components/services/StoreApi';

/**
 * Класс для работы с API интернет-магазина
 */
export class StoreApi extends Api implements IStoreAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	/**
	 * Получить список товаров
	 */
	async getProducts(): Promise<Product[]> {
		const data = (await this.get('/product')) as ApiListResponse<Product>;

		return data.items.map((item) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	/**
	 * Отправить заказ на сервер
	 */
	async createOrder(order: Order) {
		const data = await this.post(`/order`, order); // Ожидаем результат от POST-запроса
		return data as OrderResult; // Возвращаем полученные данные
	}
}
