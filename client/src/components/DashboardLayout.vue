<template>
  <div>
    <div class="flex h-screen bg-gray-200">
      <!-- overlay -->
      <div
        :class="sidebarOpen ? 'block' : 'hidden'"
        @click="setSideBarOpen(false)"
        class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
      ></div>
      <!-- end of overlay -->

      <div
        :class="
          sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        "
        class="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
      >
        <!-- logo -->
        <div class="flex items-center justify-center mt-8">
          <div class="flex items-center">
            <img src="/free.svg" alt="" class="h-12 w-12" />
            <span class="text-white text-2xl ml-2 font-semibold">fre</span
            ><span class="text-green-500 text-2xl font-medium">Ecommerce</span>
          </div>
        </div>
        <!-- end logo -->

        <!-- menu list -->
        <nav class="mt-10">
          <router-link
            tag="a"
            class="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
            to="/admin"
            exact
          >
            <i class="fas fa-chart-pie"></i>

            <span class="mx-3">Dashboard</span></router-link
          >
          <router-link
            tag="a"
            class="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
            to="/admin/users"
            exact
          >
            <i class="fas fa-users"></i>

            <span class="mx-3">User Management</span></router-link
          >
          <router-link
            tag="a"
            class="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
            to="/admin/products"
            exact
          >
            <i class="fas fa-box-open"></i>

            <span class="mx-3">Product Management</span></router-link
          >
          <router-link
            tag="a"
            class="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
            to="/admin/categories"
            exact
          >
            <i class="fas fa-tags"></i>

            <span class="mx-3">Category Management</span></router-link
          >
          <router-link
            tag="a"
            class="flex items-center mt-4 py-2 px-6 text-gray-100 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
            to="/admin/transactions"
            exact
          >
            <i class="fas fa-chart-line"></i>

            <span class="mx-3">Transactions</span></router-link
          >
          <!-- <a
            class="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
            href="/forms"
          >
            <i class="fas fa-chart-line"></i>
            <span class="mx-3">Transactions</span>
          </a> -->
        </nav>
        <!-- end of menu list -->
      </div>

      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- top nav -->
        <header
          class="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-green-600"
        >
          <div class="flex items-center">
            <!-- menu icon -->
            <button
              @click="setSideBarOpen(true)"
              class="text-gray-500 focus:outline-none lg:hidden"
            >
              <svg
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H11"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <!-- end of menu icon -->

            <!-- search -->
            <!-- <div class="relative mx-4 lg:mx-0">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg
                  class="h-5 w-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>

              <input
                class="form-input w-32 sm:w-64 rounded-md pl-10 pr-4 focus:border-indigo-600"
                type="text"
                placeholder="Search"
              />
            </div> -->
            <!-- end search -->
          </div>

          <div class="flex items-center">
            <!-- notification -->
            <NotificationDropdown
              :setNotificationOpen="setNotificationOpen"
              :notificationOpen="notificationOpen"
            />
            <!-- end of notification -->
            <!-- avatar -->
            <AvatarDropdown
              :setDropDown="setDropDown"
              :dropdownOpen="dropdownOpen"
            />
            <!-- end of avatar -->
          </div>
        </header>
        <!-- end of top nav -->
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div class="container mx-auto px-6 py-8">
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarDropdown from "./AvatarDropdown";
import NotificationDropdown from "./NotificationDropdown";
export default {
  components: {
    AvatarDropdown,
    NotificationDropdown,
  },
  data() {
    return {
      sidebarOpen: false,
      dropdownOpen: false,
      notificationOpen: false,
    };
  },

  methods: {
    setDropDown(value) {
      this.dropdownOpen = value;
    },

    setNotificationOpen(value) {
      this.notificationOpen = value;
    },

    setSideBarOpen(value) {
      this.sidebarOpen = value;
    },
  },
};
</script>

<style></style>
