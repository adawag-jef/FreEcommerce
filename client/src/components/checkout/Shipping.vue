<template>
  <div>
    <div>
      <h4 class="text-sm text-gray-500 font-medium">Delivery method</h4>
      <div class="mt-3 flex justify-around">
        <label class="inline-flex items-center mt-3">
          <input
            type="radio"
            class="form-radio h-5 w-5 text-green-600"
            name="deliveryMode"
            value="lbc"
            checked
            @change="handleDeliveryChange"
          /><span class="ml-2 text-gray-700">LBC</span>
        </label>
        <label class="inline-flex items-center mt-3">
          <input
            type="radio"
            class="form-radio h-5 w-5 text-green-600"
            name="deliveryMode"
            value="lalamove"
            @change="handleDeliveryChange"
          /><span class="ml-2 text-gray-700">Lalamove</span>
        </label>
      </div>
    </div>
    <div class="mt-4">
      <h4 class="text-sm text-gray-500 font-medium">
        Delivery address
      </h4>
      <div class="mt-3">
        <InputTextField
          :value="delivery.address"
          @change="handleChange"
          placeholder="Address"
          name="address"
          :error="errors.address"
        />
      </div>
    </div>
    <div class="mt-4">
      <h4 class="text-sm text-gray-500 font-medium mb-3">
        Estimated Date of Delivery
        <div class="text-lg text-gray-700 font-semibold">
          {{ deliveryDate }}
        </div>
      </h4>
    </div>
  </div>
</template>

<script>
import InputTextField from "../inputs/InputTextField";

var today = new Date();
var newdate = new Date();
newdate.setDate(today.getDate() + 10);

export default {
  components: {
    InputTextField,
  },
  props: {
    errors: { type: Object },
  },
  // mounted() {
  //   debugger;
  //   var today = new Date();
  //   var newdate = new Date();
  //   newdate.setDate(today.getDate() + 29);
  //   this.delivery.deliveryDate = newdate;
  // },
  data() {
    return {
      delivery: {
        address: "",
        deliveryMode: "lbc",
      },
      deliveryDate: newdate,
    };
  },
  mounted() {
    this.$emit("change", this.delivery);
  },
  methods: {
    handleChange(e) {
      this.delivery[e.target.name] = e.target.value;
      this.$emit("change", this.delivery);
    },
    handleDeliveryChange(e) {
      this.delivery.deliveryMode = e.target.value;
      this.$emit("change", this.delivery);
    },
  },
};
</script>

<style></style>
