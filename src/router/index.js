import MainPage from "@/components/main/Main";
import { createRouter, createWebHistory } from "vue-router";

const routes = [{ path: "/", name: "MainPage", component: MainPage }];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
