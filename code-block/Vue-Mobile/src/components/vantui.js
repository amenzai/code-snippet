import {
  Button,
  Cell,
  CellGroup,
  DatetimePicker,
  Dialog,
  Field,
  Icon,
  Loading,
  NavBar,
  Picker,
  Popup,
  SwitchCell,
  Tab,
  Tabbar,
  Tabs,
  Tag,
  Toast
} from 'vant';

const components = [
  Button,
  Cell,
  CellGroup,
  DatetimePicker,
  Dialog,
  Field,
  Icon,
  Loading,
  NavBar,
  Picker,
  Popup,
  SwitchCell,
  Tab,
  Tabbar,
  Tabs,
  Tag,
  Toast
];

export default {
  install(Vue) {
    components.forEach(Component => {
      Vue.use(Component);
    })

    // Vue.prototype.$loading = Loading.service;
  }
}
