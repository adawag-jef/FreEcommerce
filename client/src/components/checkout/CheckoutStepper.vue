<template>
  <div class="w-full lg:w-1/2 order-2">
    <div class="flex items-center">
      <button
        class="flex text-sm focus:outline-none"
        :class="{ ' text-blue-500': currentStep === 1 }"
      >
        <span
          :class="{ 'bg-blue-500 text-white': currentStep === 1 }"
          class="flex items-center justify-center  rounded-full h-5 w-5 mr-2"
          >1</span
        >
        Contacts
      </button>
      <button
        class="flex text-sm ml-8 focus:outline-none"
        :class="{ ' text-blue-500': currentStep === 2 }"
      >
        <span
          :class="{ 'bg-blue-500 text-white': currentStep === 2 }"
          class="flex items-center justify-center border-2 border-blue-500 rounded-full h-5 w-5 mr-2"
          >2</span
        >
        Shipping
      </button>
      <button
        class="flex text-sm ml-8 focus:outline-none"
        :class="{ ' text-blue-500': currentStep === 3 }"
      >
        <span
          :class="{ 'bg-blue-500 text-white': currentStep === 3 }"
          class="flex items-center justify-center border-2 border-blue-500 rounded-full h-5 w-5 mr-2"
          >3</span
        >
        Payments
      </button>
    </div>
    <form class="mt-8 lg:w-3/4" @submit.prevent="submit">
      <transition-group
        tag="div"
        enter-active-class="animate__animated animate__fadeInRight"
        leave-active-class="animate__animated animate__fadeOutLeft"
      >
        <div v-show="currentStep === 1" :key="1">
          <Contact @change="mapContactValue" :errors="errors" />
        </div>
        <div v-show="currentStep === 2" :key="2">
          <Shipping @change="mapShippingValue" :errors="errors" />
        </div>
        <div v-show="currentStep === 3" :key="3"><Payment /></div>
      </transition-group>
      <div class="flex items-center justify-between mt-8">
        <button
          @click.prevent="prevStep"
          class="flex items-center text-gray-700 text-sm font-medium rounded hover:underline focus:outline-none"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
          </svg>
          <span class="mx-2">Back step</span>
        </button>
        <button
          @click.prevent="nextStep"
          :disabled="disableNext"
          :class="{ 'opacity-50 cursor-not-allowed': disableNext }"
          class="flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
        >
          <span>Next</span>
          <svg
            class="h-5 w-5 mx-2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Contact from "./Contact";
import Shipping from "./Shipping";
import Payment from "./Payment";
export default {
  components: {
    Contact,
    Shipping,
    Payment,
  },
  data() {
    return {
      currentStep: 1,
      lastStep: 3,
      disableNext: false,
      contactForm: {},
      shippingForm: {},
      errors: {},
    };
  },
  methods: {
    nextStep() {
      if (this.currentStep === this.lastStep - 1) {
        this.disableNext = true;
      }
      this.currentStep++;
    },
    prevStep() {
      if (this.currentStep === 1) {
        this.currentStep = 1;
        return;
      }
      this.currentStep--;
      this.disableNext = false;
    },
    mapContactValue(val) {
      this.contactForm = val;
    },
    mapShippingValue(val) {
      this.shippingForm = val;
    },
    async submit() {
      console.log("Submitting...");
      try {
        await this.$store.dispatch("transaction/sendTransaction", {
          ...this.contactForm,
          ...this.shippingForm,
        });
        this.$store.commit("cart/CLEAR_CART");
        this.$toasted.success("Successfull made transaction.");
        this.$router.push("/");
      } catch (error) {
        this.currentStep = 1;
        this.disableNext = false;
        this.errors = error;
      }
    },
  },
};
</script>

<style></style>
