export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const SETTINGS = {
	gallerySelector: '.gallery',
	gallerySettings: {
		activeItemClass: 'gallery__item_active',
		itemClass: 'gallery__item',
	},
	cardPreviewTemplate: '#card-preview',
	cardCatalogTemplate: '#card-catalog',
	cardBasketTemplate: '#card-basket',
	cardSettings: {
		index: '.basket__item-index',
		title: '.card__title',
		description: '.card__text',
		price: '.card__price',
		image: '.card__image',
		category: '.card__category',
		action: '.card__button',
	},
	pageSelector: '.page',
	pageSettings: {
		wrapper: '.page__wrapper',
		counter: '.header__basket-counter',
		basket: '.header__basket',
		lockedClass: 'page__wrapper_locked',
	},
	modalContainer: '#modal-container',
	modalSettings: {
		close: '.modal__close',
		content: '.modal__content',
		message: '.form__errors',
		activeClass: 'modal_active',
	},
	basketTemplate: '#basket',
	basketSettings: {
		items: '.basket__list',
		total: '.basket__price',
		action: '.basket__button',
	},
	contactsFormTemplate: '#contacts',
	contactsFormSettings: {
		email: 'input[name=email]',
		phone: 'input[name=phone]',
		action: '.button',
	},
	deliveryFormTemplate: '#order',
	deliveryFormSettings: {
		address: 'input[name=address]',
		payment: '.button_alt',
		paymentActiveClass: 'button_alt-active',
		action: '.order__button',
	},
	successTemplate: '#success',
	successSettings: {
		total: '.order-success__description',
		action: '.order-success__close',
	},
	appState: {},
};

export const defaultCategoryClass = 'card__category card__category_other';
export const categoryClasses: Record<string, string> = {
	"софт-скил": "card__category card__category_soft",
	"хард-скил": "card__category card__category_hard",
	"кнопка": "card__category card__category_button",
	"дополнительное": "card__category card__category_additional",
	"другое": "card__category card__category_other",
};