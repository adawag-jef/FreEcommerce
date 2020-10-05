<template>
  <span>
    <input
      :value="value"
      @change="handleChange"
      :type="type"
      :step="step"
      autocomplete="off"
      :name="name"
      :placeholder="placeholder"
      :class="{ 'border-red-500': error }"
      class="shadow-md border w-full h-10 px-3 py-2 mt-3 text-green-500 focus:outline-none focus:border-green-500 rounded"
    />
    <span
      v-if="error"
      class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
    >
      {{ error }}
    </span>
  </span>
</template>

<script>
export default {
  props: {
    value: { type: String, default: "", required: true },
    placeholder: { type: String, default: "", required: true },
    type: { type: String, default: "text" },
    name: { type: String, required: true },
    step: { type: String, default: "" },
    error: { type: String, default: "" },
  },
  methods: {
    handleChange(e) {
      this.$emit("change", e);
    },
  },
};
</script>

<style></style>
