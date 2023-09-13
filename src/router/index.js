import MainPage from "@/components/main/Main";
import TicketPage from "@/components/ticket/Ticket";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "MainPage", component: MainPage },
  { path: "/ticket", name: "TicketPage", component: TicketPage },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
