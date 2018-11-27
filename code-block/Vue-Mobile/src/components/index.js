import Gnav from './gnav.vue';
import Gtitle from './gtitle.vue';

export default {
  install(Vue) {
    Vue.component(Gnav.name, Gnav)
    Vue.component(Gtitle.name, Gtitle)
  }
}
