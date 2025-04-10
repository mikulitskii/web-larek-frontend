export interface IView<T, S = object> {
	element: HTMLElement;
	copy(settings?: S): IView<T>;
	render(data?: Partial<T>): HTMLElement;
}

export interface IViewConstructor<T, S> {
	new (root: HTMLElement, settings: S): IView<T>;
}

// Настройки для кликабельного отображения (кнопки, карточки...)
export type IClickableEvent<T> = { event: MouseEvent; item?: T };
export interface IClickable<T> {
	onClick: (args: IClickableEvent<T>) => void;
}

// Настройки для изменяемого отображения (формы, переключатели...)
export type IChangeableEvent<T> = { event: Event; value?: T };
export interface IChangeable<T> {
	onChange: (args: IChangeableEvent<T>) => void;
}
