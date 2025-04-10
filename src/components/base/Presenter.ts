import { IViewConstructor, IView } from '@/types/components/base/View';

export abstract class Presenter<V, S extends object, M, E> {
	protected view: IView<V>;
	protected model: M;

	constructor(View: IViewConstructor<V, S>, model: M, emitter: E) {
		this.model = model;
		this.view = new View(null, this.bindView());

		this.bindModel(emitter);
	}

	protected abstract bindView(): S;

	protected abstract bindModel(emitter: E): void;
}
