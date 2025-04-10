import { EventEmitter } from '@/components/base/events';

export abstract class Model {
	protected emitter: EventEmitter;

	constructor(emitter: EventEmitter) {
		this.emitter = emitter;
	}
}
