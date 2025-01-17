// Composables
import { createRouter, createWebHistory } from "vue-router";
import axiosInstance from "../axios-config";
import { AxiosError } from "axios";
import { useAppStore } from "@/store/app";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
      },
      {
        path: "courses",
        name: "Courses",
        component: () => import("@/views/Courses.vue"),
      },
      {
        path: "trainer",
        name: "Trainer",
        component: () => import("@/views/Trainer.vue"),
      },
      {
        path: "member",
        name: "Member",
        component: () => import("@/views/Member.vue"),
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/Profile.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const appStore = useAppStore();
  if (!localStorage.getItem("token")) {
    appStore.showHeader = false;
    if (to.name !== "Login") {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    await axiosInstance
      .post("check-auth", { token: localStorage.getItem("token") })
      .then(async () => {
        if (to.name !== "Login") {
          next();
        } else {
          next({ name: "Home" });
        }
        appStore.showHeader = true;
      })
      .catch((error: AxiosError) => {
        console.log(error);
        localStorage.removeItem("token");
        next({ name: "Login" });
      });
  }
});

export default router;
