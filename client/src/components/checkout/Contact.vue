<template>
  <div>
    <h4 class="text-sm text-gray-500 font-medium">Contact Info</h4>
    <InputTextField
      :value="contact.name"
      @change="handleChange"
      placeholder="Name"
      name="name"
      :error="errors.name"
    />
    <InputTextField
      :value="contact.email"
      type="email"
      @change="handleChange"
      placeholder="Email"
      name="email"
      :error="errors.email"
    />
    <InputTextField
      :value="contact.country"
      @change="handleChange"
      placeholder="Country"
      name="country"
      :error="errors.country"
    />
    <div class="flex justify-between">
      <InputTextField
        :value="contact.street"
        @change="handleChange"
        placeholder="Street"
        name="street"
        :error="errors.street"
      />
      <InputTextField
        :value="contact.city"
        @change="handleChange"
        placeholder="City"
        name="city"
        :error="errors.city"
      />
    </div>

    <div class="flex justify-between">
      <InputTextField
        :value="contact.zip"
        @change="handleChange"
        placeholder="ZIP"
        name="zip"
        :error="errors.zip"
      />
      <InputTextField
        :value="contact.phone"
        @change="handleChange"
        placeholder="Phone Number"
        name="phone"
        :error="errors.phone"
      />
    </div>
  </div>
</template>

<script>
import InputTextField from "../inputs/InputTextField";
export default {
  components: {
    InputTextField,
  },
  props: {
    errors: { type: Object },
  },
  data() {
    return {
      contact: {
        name: "",
        email: "",
        street: "",
        city: "",
        country: "",
        zip: "",
        phone: "",
      },
    };
  },
  mounted() {
    this.$emit("change", this.contact);
  },
  methods: {
    handleChange(e) {
      this.contact[e.target.name] = e.target.value;
      this.$emit("change", this.contact);
    },
  },
};
</script>

<style></style>
