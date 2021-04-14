import Vue from 'vue';
import { ValidationProvider, localize, extend, setInteractionMode } from "vee-validate";
import { max, required, confirmed } from "vee-validate/dist/rules";
import zhCN from 'vee-validate/dist/locale/zh_CN.json'; // 引入本地化语言

extend("required", required);
extend("max", max);
extend('confirmed', confirmed)

// extend('secret', {
//   validate: value => value === 'example',
//   message: 'This is not the magic word'
// });

localize('zh_CN', zhCN)

setInteractionMode('eager');

Vue.component('ValidationProvider', ValidationProvider);
