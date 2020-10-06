<template>
  <div
    class="w-full mb-8 flex-shrink-0 order-1 lg:w-1/2 lg:mb-0 lg:order-2 overflow-y-auto"
    sytle="height: 600px;"
  >
    <div
      class="flex justify-center lg:justify-end mb-3"
      v-for="item in cart"
      :key="item._id"
    >
      <div class="border rounded-md max-w-md w-full px-4 py-3">
        <div class="flex items-center justify-between">
          <h3 class="text-gray-700 font-medium">
            Order total ({{ cart.length }})
          </h3>
          <!-- <span class="text-gray-600 text-sm">Edit</span> -->
        </div>
        <div class="flex justify-between mt-6">
          <div class="flex">
            <img
              :src="item.mainPhoto"
              alt=""
              class="h-20 w-20 object-cover rounded"
            />
            <div class="mx-3">
              <h3 class="text-sm text-gray-600">{{ item.name }}</h3>
              <div class="flex items-center mt-2">
                <button
                  @click="reduceItemCount(item)"
                  class="text-gray-500 focus:outline-none focus:text-gray-600"
                >
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-5 w-5"
                  >
                    <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
                <span class="text-gray-700 mx-2">{{ item.count }}</span>
                <button
                  @click="increaseItemCount(item)"
                  class="text-gray-500 focus:outline-none focus:text-gray-600"
                >
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <span class="text-gray-600">${{ item.price * item.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({ cart: "cart/getCart", total: "cart/getTotal" }),
  },
  methods: {
    ...mapActions({
      reduceItemCount: "cart/reduceItemCount",
      increaseItemCount: "cart/increaseItemCount",
    }),
  },
};
</script>

<style></style>
