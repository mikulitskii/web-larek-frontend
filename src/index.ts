import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { StoreApi } from './components/services/StoreApi';
import { AppStateModel } from './components/model/AppState';
import { EventEmitter } from '@/components/base/events';
import { MainPresenter } from '@/components/presenter/Main';
import { MainView } from '@/components/view/Main';

// Initialize the application
const emitter = new EventEmitter();
const api = new StoreApi(CDN_URL, API_URL);
const model = new AppStateModel(api, emitter);
const presenter = new MainPresenter(MainView, model, emitter);
presenter.init();
