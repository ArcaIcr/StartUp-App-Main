import About from "@/components/about/About.vue";
import Dashboard from "@/components/dashboard/DashboardMain.vue";
import Analysis from "@/components/features/Analysis.vue";
import Business from "@/components/features/Business.vue";
import ROI from "@/components/features/ROI.vue";
import TrendSeeker from "@/components/features/TrendSeeker.vue";
import ForgotPassword from "@/components/user/ForgotPassword.vue"; // Forgot Password
import Login from "@/components/user/Login.vue";
import Pricing from "@/components/user/Pricing.vue";
import Profile from "@/components/user/Profile.vue"; // Add your Profile component
import ResetPassword from "@/components/user/ResetPassword.vue"; // Reset Password
import Settings from "@/components/user/Settings.vue"; // Add your Settings component
import SignUp from "@/components/user/SignUp.vue";
import { auth } from "@/firebaseConfig"; // Ensure this path is correct
import AssessmentView from "@/views/AssessmentView.vue";
import HomeView from "@/views/HomeView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/pricing",
      name: "Pricing",
      component: Pricing,
    },
    {
      path: "/roi",
      name: "ROI",
      component: ROI,
    },
    {
      path: "/business",
      name: "Business",
      component: Business,
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPassword,
    },
    {
      path: "/reset-password",
      name: "ResetPassword",
      component: ResetPassword,
    },
    {
      path: "/about",
      name: "About",
      component: About,
    },
    {
      path: "/assessment",
      name: "Assessment",
      component: AssessmentView,
      meta: { requiresAuth: true },
    },
    {
      path: "/analysis",
      name: "Analysis",
      component: Analysis,
    },
    {
      path: "/trend",
      name: "Trend Seeker",
      component: TrendSeeker,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: { requiresAuth: true }, // Protect this route
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
      meta: { requiresAuth: true }, // Protect this route
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

// Navigation Guard to protect routes
router.beforeEach((to, from, next) => {
  const user = auth.currentUser;

  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user) {
      next(); // Proceed to the route if the user is authenticated
    } else {
      next("/login"); // Redirect to the login page if not authenticated
    }
  } else {
    next(); // Allow access if the route does not require authentication
  }
});

export default router;
