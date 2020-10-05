<template>
  <div>
    <div class="flex justify-between">
      <h3 class="text-gray-700 text-3xl font-medium">Site Management</h3>
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
            Add Featured Product
          </button>
        </template>
        <template slot="header">
          <div>
            <i class="fas fa-exclamation-circle text-blue-500"></i>
            <span class="font-bold text-gray-700 text-lg"
              >Add Featured Product</span
            >
          </div>
        </template>

        <template slot="body">
          <SelectField
            :options="products"
            :error="errors.product_id"
            placeholder="Featured Product"
            @change="handleProductSelect"
          />
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
    <FeaturedList :featuredProducts="featuredProducts" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FeaturedList from "../components/FeaturedList";
import FormModal from "../components/FormModal";
import SelectField from "../components/inputs/SelectField";
export default {
  components: {
    FeaturedList,
    FormModal,
    SelectField,
  },
  data() {
    return {
      isOpen: false,
      isSubmitting: false,
      selected: {},
      errors: {},
    };
  },
  computed: {
    ...mapGetters({
      products: "product/getProducts",
      featuredProducts: "product/getFeaturedProducts",
    }),
  },
  mounted() {
    this.$store.dispatch("product/listProducts");
    this.$store.dispatch("product/listFeaturedProducts");
  },
  methods: {
    onCloseRequest() {
      this.isOpen = false;
      this.selected = {};
      this.errors = {};
    },
    handleProductSelect(e) {
      this.selected = e;
    },
    async submit() {
      console.log("Submitting...");
      try {
        await this.$store.dispatch(
          "product/addFeaturedProduct",
          this.selected._id
        );
        this.onCloseRequest();
        this.$toasted.success("Product created.");
      } catch (error) {
        this.errors = error;
        this.$toasted.error(error.response);
      }
    },
  },
};
</script>

<style></style>
