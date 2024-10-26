<script setup>
import logo from "@/assets/img/logo.png";
import { RouterLink, useRoute } from "vue-router";

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};

// Define props for dynamic styling
defineProps({
  btnBackground: {
    type: String,
    default: "bg-gradient-light",
  },
  isBlur: {
    type: String,
    default: "bg-accentLight border-b border-lightblue",
  },
  darkMode: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <nav
    class="navbar navbar-expand-lg top-0 z-index-3 position-absolute"
    :class="[isBlur ? isBlur : 'shadow-none my-2 navbar-transparent w-100']"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-[65px] items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <!-- Logo -->
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
            <span
              class="hidden md:block text-2xl font-bold ml-2"
              :class="darkMode ? 'text-black' : 'text-darkblue'"
              >StartUp Compass</span
            >
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-4">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/')
                    ? 'bg-accentDark text-white'
                    : 'hover:bg-bgLight hover:text-textDark',
                  darkMode ? 'text-black' : 'text-darkblue',
                  'px-4 py-2 rounded-md transition duration-300',
                ]"
                >Home</RouterLink
              >
              <RouterLink
                to="/about"
                :class="[
                  isActiveLink('/about')
                    ? 'bg-accentDark text-white'
                    : 'hover:bg-bgLight hover:text-textDark',
                  darkMode ? 'text-black' : 'text-darkblue',
                  'px-4 py-2 rounded-md transition duration-300',
                ]"
                >About</RouterLink
              >
              <RouterLink
                to="/pricing"
                :class="[
                  isActiveLink('/pricing')
                    ? 'bg-accentDark text-white'
                    : 'hover:bg-bgLight hover:text-textDark',
                  darkMode ? 'text-black' : 'text-darkblue',
                  'px-4 py-2 rounded-md transition duration-300',
                ]"
                >Pricing</RouterLink
              >
              <RouterLink
                to="/login"
                :class="[
                  isActiveLink('/login')
                    ? 'bg-accentDark text-white'
                    : 'hover:bg-bgLight hover:text-textDark',
                  darkMode ? 'text-black' : 'text-darkblue',
                  'px-4 py-2 rounded-md transition duration-300',
                ]"
                >Log-in</RouterLink
              >
              <RouterLink
                to="/signup"
                :class="[
                  isActiveLink('/signup')
                    ? 'bg-bgLight text-darkblue'
                    : 'hover:bg-accentDark hover:text-bgLight',
                  darkMode ? 'text-black' : 'text-darkblue',
                  'px-4 py-2 rounded-md transition duration-300',
                ]"
                >Sign-up</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
