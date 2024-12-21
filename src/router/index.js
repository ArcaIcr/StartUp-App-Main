import ForgotPassword from "@/components/user/ForgotPassword.vue";
import Profile from "@/components/user/Profile.vue";
import ResetPassword from "@/components/user/ResetPassword.vue";
import Settings from "@/components/user/Settings.vue";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import AssessmentView from "@/views/DashboardViews/AssessmentView.vue";
import {
  default as Dashboard,
  default as DashboardOverview,
} from "@/views/DashboardViews/DashboardOverview.vue";
import DemoView from "@/views/DashboardViews/DemoView.vue";
import UserSpace from "@/views/DashboardViews/UserSpace.vue";
import About from "@/views/LandingPageViews/AboutView.vue";
import HomeView from "@/views/LandingPageViews/HomeView.vue";
import LoginView from "@/views/LandingPageViews/LoginView.vue";
import AdminLoginView from "@/views/LandingPageViews/AdminLoginView.vue";
import Pricing from "@/views/LandingPageViews/PricingView.vue";
import SignUpView from "@/views/LandingPageViews/SignUpView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import Help from '../views/Help.vue'; // Import the Help component

// Features
import Analysis from "@/components/features/Analysis.vue";
import Business from "@/components/features/Business.vue";
import ROI from "@/components/features/ROI.vue";
import TrendSeeker from "@/components/features/TrendSeeker.vue";

// Dashboard Features
import assessBusiness from "@/components/dashboard/Features/AssessBusiness.vue";
import trends from "@/components/dashboard/Features/Trends.vue";

// MakerSpace
import Evaluation from "@/components/workspace/Features/Evaluation.vue";
import FinancialAnalysis from "@/components/workspace/Features/FinancialAnalysis.vue";
import MarketShareAnalysis from "@/components/workspace/Features/MarketShareAnalysis.vue";
import PerformanceMeasurement from "@/components/workspace/Features/PerformanceMeasurement.vue";
import Makerspace from "@/components/workspace/MakerSpace.vue";

import AdminDashboard from "@/components/admin/AdminDashboard.vue";

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
      path:'/demo',
      name: 'Demo',
      component: DemoView,
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
      component: SignUpView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/admin-login",
      name: "AdminLogin",
      component: AdminLoginView,
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
      path: "/help", 
      name: "Help",
      component: Help,
    },
    // DASHBOARD PATHS
    {
      path: "/overview",
      name: "Overview",
      component: DashboardOverview,
      meta: { requiresAuth: true },
    },
    {
      path: "/assessment",
      name: "Assessment",
      component: AssessmentView,
      meta: { requiresAuth: true },
    },
    {
      path: "/assessmentwindow",
      name: "AssessBusiness",
      component: assessBusiness,
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
      path: "/trends",
      name: "Trends",
      component: trends,
      meta: { requiresAuth: true },
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
      meta: { requiresAuth: true },
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
      meta: { requiresAuth: true },
    },

    {
      path: "/space",
      name: "UserSpace",
      component: UserSpace,
      meta: { requiresAuth: true },
    },
    // Maker Space
    {
      path: "/maker-space",
      name: "MakerSpace",
      component: Makerspace,
    },
    {
      path: "/workspace/financial-analysis",
      name: "FinancialAnalysis",
      component: FinancialAnalysis,
    },
    {
      path: "/workspace/evaluation",
      name: "Evaluation",
      component: Evaluation,
    },
    {
      path: "/workspace/performance-measurement",
      name: "PerformanceMeasurement",
      component: PerformanceMeasurement,
    },
    {
      path: "/workspace/market-share-analysis",
      name: "MarketShareAnalysis",
      component: MarketShareAnalysis,
    },
    {
      path: "/admin",
      name: "AdminDashboard",
      component: AdminDashboard,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    // NOT FOUND PATH
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

// Navigation guard to handle different user types
router.beforeEach(async (to, from, next) => {
  const user = auth.currentUser;
  
  // If no user is logged in, allow navigation
  if (!user) {
    next();
    return;
  }

  try {
    // Check if user is an admin
    const adminDoc = await getDoc(doc(db, 'admins', user.uid));
    const isAdmin = adminDoc.exists();

    // Special handling for assessment and dashboard routes
    if (isAdmin) {
      // Admins should only access admin routes
      if (to.path === '/assessment' || to.path === '/overview') {
        next('/admin');
        return;
      }
    } else {
      // Regular users should not access admin routes
      if (to.path === '/admin') {
        next('/overview');
        return;
      }
    }

    // Default navigation
    next();
  } catch (error) {
    console.error('Navigation guard error:', error);
    next('/login');
  }
});

export default router;
