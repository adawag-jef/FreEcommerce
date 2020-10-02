<template>
  <div>
    <div class="flex justify-between">
      <h3 class="text-gray-700 text-3xl font-medium">Category Management</h3>
      <FormModal
        :trigger="isOpen"
        :onCloseRequest="onCloseRequest"
        :onSubmitRequest="submit"
      >
        <template slot="trigger">
          <button
            @click="isOpen = !isOpen"
            class="flex items-center mt-4 px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
          >
            Add Category
          </button>
        </template>
        <template slot="header">
          <div>
            <i class="fas fa-exclamation-circle text-blue-500"></i>
            <span class="font-bold text-gray-700 text-lg">Add Category</span>
          </div>
        </template>

        <template slot="body">
          <input
            v-model="category.name"
            type="text"
            name="name"
            placeholder="Category Name"
            autocomplete="off"
            :class="{ 'border-red-500': errors.name }"
            class="shadow-md border w-full h-10 px-3 py-2 mt-3 text-green-500 focus:outline-none focus:border-green-500 rounded"
          />
          <span
            v-if="errors.name"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errors.name }}
          </span>
          <textarea
            v-model="category.description"
            style="resize: none"
            type="text"
            name="description"
            placeholder="Category Description"
            :class="{ 'border-red-500': errors.description }"
            class="shadow-md border w-full h-20 px-3 py-2 mt-3 text-green-500 focus:outline-none focus:border-green-500 rounded"
          ></textarea>
          <span
            v-if="errors.description"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errors.description }}
          </span>
        </template>
        <template slot="action">
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex items-center px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500"
            >
              <i class="far fa-paper-plane"></i>
              <span class="ml-2">{{
                isSubmitting ? "Submitting..." : "Submit"
              }}</span>
            </button>
          </div>
        </template>
      </FormModal>
    </div>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CategoryList from "../components/CategoryList";
import FormModal from "../components/FormModal";
export default {
  components: {
    CategoryList,
    FormModal,
  },
  data() {
    return {
      errors: {},
      isOpen: false,
      isSubmitting: false,
      category: {
        name: "",
        description: "",
      },
    };
  },
  computed: {
    ...mapGetters({ categories: "category/getCategories" }),
  },
  mounted() {
    this.$store.dispatch("category/listCategories");
  },
  methods: {
    onCloseRequest() {
      this.isOpen = false;
      this.category = {
        name: "",
        description: "",
      };
      this.errors = {};
    },
    async submit(e) {
      try {
        const res = await this.$store.dispatch(
          "category/createCategory",
          this.category
        );

        this.isOpen = false;
        this.$toasted.success("Category created.");
      } catch (error) {
        this.errors = error;
      }

      // const response = await this.$store.dispatch(
      //   "category/createCategory",
      //   this.category
      // );
      // if (response) {
      //   this.isOpen = false;
      // }
    },
  },
};
</script>

<style></style>
