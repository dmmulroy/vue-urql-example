import Vue from "vue";
import { createClient } from "urql";

import App from "./App.vue";

const urqlClient = createClient({
  url: "https://graphbrainz.herokuapp.com/graphql"
});

Vue.prototype.$urqlClient = urqlClient;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
