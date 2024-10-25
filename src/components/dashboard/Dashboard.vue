<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 h-screen bg-teal-500 flex flex-col justify-between">
      <div class="p-4">
        <div class="mb-8">
          <img src="/src/assets/img/Logo.png" alt="Logo" class="h-12" />
        </div>
        <nav>
          <ul class="space-y-4">
            <li>
              <router-link
                to="/overview"
                class="text-white hover:bg-teal-600 p-2 block rounded flex items-center space-x-2"
                aria-label="Overview"
              >
                <i class="pi pi-home"></i>
                <span>Overview</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/transactions"
                class="text-white hover:bg-teal-600 p-2 block rounded flex items-center space-x-2"
                aria-label="Transactions"
              >
                <i class="pi pi-wallet"></i>
                <span>Transactions</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/customers"
                class="text-white hover:bg-teal-600 p-2 block rounded flex items-center space-x-2"
                aria-label="Customers"
              >
                <i class="pi pi-users"></i>
                <span>Customers</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/reports"
                class="text-white hover:bg-teal-600 p-2 block rounded flex items-center space-x-2"
                aria-label="Reports"
              >
                <i class="pi pi-chart-line"></i>
                <span>Reports</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/settings"
                class="text-white hover:bg-teal-600 p-2 block rounded flex items-center space-x-2"
                aria-label="Settings"
              >
                <i class="pi pi-cog"></i>
                <span>Settings</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="p-4">
        <button
          @click="handleLogout"
          class="text-white hover:bg-teal-600 p-2 block rounded flex items-center space-x-2"
          aria-label="Log out"
        >
          <i class="pi pi-sign-out"></i>
          <span>Log out</span>
        </button>
      </div>
    </aside>

    <!-- Main Dashboard Content -->
    <div class="flex-1 flex flex-col bg-gray-100">
      <!-- Header -->
      <header class="flex justify-between items-center p-4 bg-white shadow-md">
        <input
          type="text"
          placeholder="Search..."
          class="p-2 border border-gray-300 rounded-lg"
        />
        <div class="flex items-center space-x-4 relative">
          <img
            src="/src/assets/img/Dad.png"
            alt="Profile"
            class="h-10 w-10 rounded-full cursor-pointer"
            @click="toggleProfileMenu"
            aria-label="Profile Menu"
          />
          <span class="text-gray-700">John Doe</span>
          <router-link
            to="/notifications"
            class="relative text-gray-700 hover:text-gray-900"
            aria-label="Notifications"
          >
            Notifications
            <span
              class="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"
            ></span>
          </router-link>
          <!-- Dropdown Menu -->
          <div
            v-if="isProfileMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50"
          >
            <router-link
              to="/profile"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              aria-label="My Profile"
              >My Profile</router-link
            >
            <router-link
              to="/settings"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              aria-label="Settings"
              >Settings</router-link
            >
            <router-link
              to="/logout"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              aria-label="Log out"
              >Log out</router-link
            >
          </div>
        </div>
      </header>

      <!-- Stats Cards Section -->
      <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg stats-card"
          title="Current Monthly Recurring Revenue"
        >
          <h2 class="text-lg font-semibold text-gray-700">Current MRR</h2>
          <p class="mt-2 text-2xl font-bold text-black">$12.4k</p>
        </div>
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg stats-card"
          title="Total Current Customers"
        >
          <h2 class="text-lg font-semibold text-gray-700">Current Customers</h2>
          <p class="mt-2 text-2xl font-bold text-black">16,601</p>
        </div>
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg stats-card"
          title="Percentage of Active Customers"
        >
          <h2 class="text-lg font-semibold text-gray-700">Active Customers</h2>
          <p class="mt-2 text-2xl font-bold text-black">33%</p>
        </div>
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg stats-card"
          title="Churn Rate Percentage"
        >
          <h2 class="text-lg font-semibold text-gray-700">Churn Rate</h2>
          <p class="mt-2 text-2xl font-bold text-black">2%</p>
        </div>
      </section>

      <!-- Charts and Transactions Section -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        <!-- Trend Chart -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 mb-4">Trend</h2>
          <canvas id="trendChart"></canvas>
        </div>

        <!-- Sales and Transactions Charts -->
        <div class="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 class="text-lg font-semibold text-gray-700 mb-4">Sales</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <canvas id="salesChart"></canvas>
            </div>
            <div>
              <canvas id="transactionsChart"></canvas>
            </div>
          </div>
        </div>
      </section>

      <!-- Support Tickets and Customer Demographics Section -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <!-- Support Tickets -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 mb-4">
            Support Tickets
          </h2>
          <ul class="space-y-2">
            <li class="flex justify-between p-2 bg-gray-50 rounded-lg">
              <span class="text-gray-700">Login Issue</span>
              <span class="text-gray-500">Closed</span>
            </li>
            <li class="flex justify-between p-2 bg-gray-50 rounded-lg">
              <span class="text-gray-700">Payment Problem</span>
              <span class="text-gray-500">Pending</span>
            </li>
          </ul>
        </div>

        <!-- Customer Demographics -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-lg font-semibold text-gray-700 mb-4">
            Customer Demographics
          </h2>
          <div id="worldMap" class="h-64 flex items-center justify-center">
            <div
              class="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-500"
            ></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import "tailwindcss/tailwind.css";

export default {
  data() {
    return {
      isProfileMenuOpen: false,
    };
  },
  methods: {
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    },
    handleLogout() {
      // Add your logout logic here (e.g., Firebase sign out)
      // Example: await firebase.auth().signOut();

      // Redirect to the homepage
      this.$router.push("/");
    },
  },
  mounted() {
    const trendCtx = document.getElementById("trendChart").getContext("2d");
    const salesCtx = document.getElementById("salesChart").getContext("2d");
    const transactionsCtx = document
      .getElementById("transactionsChart")
      .getContext("2d");

    new Chart(trendCtx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "Revenue",
            data: [12000, 15000, 13000, 17000, 20000],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    new Chart(salesCtx, {
      type: "line",
      data: {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
          {
            label: "Sales",
            data: [30000, 40000, 35000, 50000],
            borderColor: "rgba(75, 192, 192, 1)",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    new Chart(transactionsCtx, {
      type: "pie",
      data: {
        labels: ["Completed", "Pending", "Cancelled"],
        datasets: [
          {
            data: [70, 20, 10],
            backgroundColor: ["#4BC0C0", "#FF6384", "#FFCE56"],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  },
};
</script>

<style scoped>
.stats-card {
  transition: transform 0.2s ease;
}

.stats-card:hover {
  transform: scale(1.05);
}
</style>
