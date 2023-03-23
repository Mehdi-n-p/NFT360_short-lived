import { createApp } from "vue";
import { createPinia } from "pinia";
import Amplify from "aws-amplify";
import router from "./router";

// Import CSS
import "./style.css";

import App from "./App.vue";

// AWS Amplify Config
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

createApp(App).use(router).use(createPinia()).mount("#app");
