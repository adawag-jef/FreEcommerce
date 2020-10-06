<template>
  <div class="mx-1">
    <textarea
      :value="value"
      @change="handleChange"
      style="resize: none"
      type="text"
      :name="name"
      :placeholder="placeholder"
      :class="{ 'border-red-500': error }"
      class="shadow-md border w-full h-20 px-3 py-2 mt-3 text-green-500 focus:outline-none focus:border-green-500 rounded"
    ></textarea>
    <span
      v-if="error"
      class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
    >
      {{ error }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: String, default: "", required: true },
    placeholder: { type: String, default: "", required: true },
    name: { type: String, required: true },
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
