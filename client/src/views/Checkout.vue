<template>
  <main class="my-8">
    <div class="container mx-auto px-6">
      <h3 class="text-gray-700 text-2xl font-medium">Checkout</h3>
      <div class="flex flex-col lg:flex-row mt-8">
        <CheckoutStepper />
        <CheckoutCart />
      </div>
    </div>
  </main>
</template>

<script>
import CheckoutCart from "../components/checkout/CheckoutCart";
import CheckoutStepper from "../components/checkout/CheckoutStepper";
export default {
  components: {
    CheckoutCart,
    CheckoutStepper,
  },
};
</script>

<style></style>
