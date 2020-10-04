<template>
  <div>
    <div class="flex justify-between">
      <h3 class="text-gray-700 text-3xl font-medium">Product Management</h3>
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
            Add Product
          </button>
        </template>
        <template slot="header">
          <div>
            <i class="fas fa-exclamation-circle text-blue-500"></i>
            <span class="font-bold text-gray-700 text-lg">Add Product</span>
          </div>
        </template>

        <template slot="body">
          <input
            v-model="product.name"
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
          <input
            v-model="product.price"
            type="text"
            name="price"
            placeholder="Category price"
            autocomplete="off"
            :class="{ 'border-red-500': errors.price }"
            class="shadow-md border w-full h-10 px-3 py-2 mt-3 text-green-500 focus:outline-none focus:border-green-500 rounded"
          />
          <span
            v-if="errors.price"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errors.price }}
          </span>

          <select
            v-model="product.category"
            multiple
            :class="{ 'border-red-500': errors.category }"
            class="shadow-md border w-full h-32 px-3 py-2 mt-3 text-green-500 focus:outline-none focus:border-green-500 rounded"
          >
            <option v-for="cat in categories" :key="cat._id" :value="cat._id">{{
              cat.name
            }}</option>
          </select>
          <span
            v-if="errors.category"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errors.category }}
          </span>

          <textarea
            v-model="product.description"
            style="resize: none"
            type="text"
            name="description"
            placeholder="Product Description"
            :class="{ 'border-red-500': errors.description }"
            class="shadow-md border w-full h-20 px-3 py-2 mt-3 text-green-500 focus:outline-none focus:border-green-500 rounded"
          ></textarea>
          <span
            v-if="errors.description"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errors.description }}
          </span>

          <input
            @change="handlePhotoChange($event)"
            type="file"
            name="Photo"
            placeholder="Main Photo"
            :class="{ 'border-red-500': errors.mainPhoto }"
            class="shadow-md border w-full h-10 px-3 py-2 mt-3 text-green-500 focus:outline-none focus:border-green-500 rounded"
          />
          <span
            v-if="errors.mainPhoto"
            class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1"
          >
            {{ errors.mainPhoto }}
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
    <!-- {{ categories }} -->
    <ProductList :products="products" :categories="categories" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductList from "../components/ProductList";
import FormModal from "../components/FormModal";
export default {
  components: {
    ProductList,
    FormModal,
  },
  data() {
    return {
      errors: {},
      isOpen: false,
      isSubmitting: false,
      product: {
        name: "",
        description: "",
        price: "",
        category: [],
        mainPhoto: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      categories: "category/getCategories",
      products: "product/getProducts",
    }),
  },
  mounted() {
    this.$store.dispatch("product/listProducts");
    this.$store.dispatch("category/listCategories");
  },

  methods: {
    handlePhotoChange(event) {
      this.product.mainPhoto = event.target.files[0];
    },
    onCloseRequest() {
      this.isOpen = false;
      this.product = {
        name: "",
        description: "",
        price: "",
        category: "",
        mainPhoto: null,
      };
      this.errors = {};
    },
    async submit(e) {
      try {
        const res = await this.$store.dispatch(
          "product/createProduct",
          this.product
        );

        this.onCloseRequest();
        this.$toasted.success("Product created.");
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
