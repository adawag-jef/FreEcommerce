<template>
  <div class="w-full flex flex-col items-center h-auto mx-auto">
    <div class="w-full cursor-pointer" @click="isOpen = !isOpen">
      <div class="flex flex-col items-center relative">
        <div class="w-full">
          <div
            :class="{ 'border-red-500': error }"
            class="flex shadow-md border h-10 px-3 py-2 mt-3 text-green-500 focus:outline-none focus:border-green-500 rounded"
          >
            <div class="flex flex-auto flex-wrap">
              <template v-if="multi">
                <span v-if="selected.length <= 0" class="text-gray-500">{{
                  placeholder
                }}</span>
                <div
                  v-for="item in selected"
                  :key="item[identifier]"
                  @click="removeSelected(item)"
                  class="flex justify-center mx-1 items-center font-medium px-2 bg-white rounded-full text-green-700 bg-green-100 border border-green-300 "
                >
                  <div
                    class="text-xs font-normal leading-none max-w-full flex-initial"
                  >
                    {{ item[displayText] }}
                  </div>
                  <div class="flex flex-auto flex-row-reverse">
                    <div>
                      <i class="ml-1 far fa-times-circle"></i>
                    </div>
                  </div>
                </div>
              </template>
              <div v-else>
                <span v-if="!single_selected.name" class="text-gray-500">{{
                  placeholder
                }}</span>
                <span v-else class="text-gray-500">{{
                  single_selected.name
                }}</span>
              </div>
              <!-- <div class="flex-1">
                <input
                  :placeholder="placeholder"
                  class="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                />
              </div>-->
            </div>
            <div
              @click.prevent="isOpen = !isOpen"
              class="text-gray-300 w-8 py-1 pl-4 border-l flex items-center border-gray-200"
            >
              <a
                @click.prevent="isOpen = !isOpen"
                class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
              >
                <i v-if="!isOpen" class="fas fa-angle-up"></i>
                <i v-else class="fas fa-angle-down"></i>
              </a>
            </div>
          </div>
          <span
            v-if="error"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ error }}
          </span>
        </div>
        <div
          v-show="isOpen"
          class="absolute shadow top-100 bg-white z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj"
        >
          <div class="flex flex-col w-full">
            <div
              v-for="option in options"
              :key="option[identifier]"
              @click="addSelected(option)"
              class="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-green-100"
            >
              <div
                :class="
                  `flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative ${
                    isItemSelected(option) ? 'border-green-600' : ''
                  }`
                "
              >
                <div class="w-full items-center flex">
                  <div class="mx-2 leading-6  ">
                    {{ option[displayText] }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="isOpen"
      @click="isOpen = false"
      class="fixed inset-0 h-full w-full z-10"
      style="display: none;"
    ></div>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    identifier: { type: String, default: "_id" },
    displayText: { type: String, default: "name" },
    error: { type: "" },
    multi: { type: Boolean, default: false },
    placeholder: { type: "" },
    preSelected: { type: Array, default: () => [] },
  },
  data() {
    return {
      //   options: [
      //     { id: 1, text: "Java", value: "java" },
      //     { id: 2, text: "Javascript", value: "javascript" },
      //     { id: 3, text: "Python", value: "python" },
      //   ],
      selected: [
        // { id: 2, text: "Javascript", value: "javascript" },
        // { id: 3, text: "Python", value: "python" },
      ],
      single_selected: {},
      isOpen: false,
    };
  },
  mounted() {
    this.selected = [...this.preSelected];
  },
  methods: {
    isItemSelected(item) {
      return !!this.selected.find(
        (i) => i[this.identifier] === item[this.identifier]
      );
    },
    addSelected(item) {
      if (this.multi) {
        if (this.isItemSelected(item)) {
          return;
        }
        this.selected = [item, ...this.selected];
        this.$emit("change", this.selected);
      } else {
        this.single_selected = item;
        this.$emit("change", this.single_selected);
      }
    },
    removeSelected(item) {
      this.selected = this.selected.filter(
        (current) => current[this.identifier] !== item[this.identifier]
      );
      this.$emit("change", this.selected);
    },
  },
};
</script>
<style>
.top-100 {
  top: 100%;
}
.bottom-100 {
  bottom: 100%;
}
.max-h-select {
  max-height: 300px;
}
</style>
