<template>
  <div>
    <slot name="trigger"></slot>
    <div
      v-if="trigger"
      class="z-50 fixed flex justify-center items-center overflow-x-hidden overflow-y-auto inset-0 transition-all duration-500 ease-in-out"
    >
      <div class="w-1/3 rounded-lg shadow-lg bg-white my-3 z-50">
        <div class="flex justify-between border-b border-gray-100 px-5 py-4">
          <slot name="header"></slot>
          <div>
            <button class=" focus:outline-none active:outline-none">
              <i
                @click="onCloseRequest"
                class="fa fa-times-circle text-red-500 hover:text-red-600 transition duration-150"
              ></i>
            </button>
          </div>
        </div>
        <form @submit.prevent="onSubmitRequest">
          <div class="px-10 py-5 text-gray-600">
            <slot name="body"></slot>
          </div>

          <div class="px-5 py-2 flex justify-end border-t border-gray-100">
            <slot name="action"></slot>
          </div>
        </form>
      </div>
    </div>

    <div
      :class="{ 'z-40 opacity-50 absolute  inset-0 ': trigger }"
      class="opacity-0 bg-black transition-all duration-500 ease-in-out"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    trigger: { type: Boolean, default: false },
    onCloseRequest: { type: Function },
    onSubmitRequest: { type: Function },
  },
};
</script>

<style></style>
