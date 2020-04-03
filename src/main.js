import Vue from 'vue';
import App from './App';
import store from './store';

const chat = document.createElement('div');
chat.setAttribute("id", "chat");
document.body.appendChild(chat);

setTimeout(function(){
  new Vue({
    el: '#chat',
    store,
    components: { App },
    template: '<App/>'
  });
}, 0);