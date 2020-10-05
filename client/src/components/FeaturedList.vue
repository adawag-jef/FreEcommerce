<template>
  <div class="flex flex-col mt-8">
    <!-- <pre>{{products}}</pre> -->
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div
        class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
      >
        <table class="min-w-full" v-if="featuredProducts.length">
          <thead>
            <tr>
              <th
                class="px-6 py-3 border-b border-gray-200 bg-gray-500 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider"
              ></th>
              <th
                class="px-6 py-3 border-b border-gray-200 bg-gray-500 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                class="px-6 py-3 border-b border-gray-200 bg-gray-500 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                class="px-6 py-3 border-b border-gray-200 bg-gray-500 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                class="px-6 py-3 border-b border-gray-200 bg-gray-500 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider"
              >
                Created
              </th>
              <th class="px-6 py-3 border-b border-gray-200 bg-gray-500"></th>
            </tr>
          </thead>
          <!-- <pre>{{ featuredProducts }}</pre> -->
          <tbody class="bg-white">
            <tr v-for="featured in featuredProducts" :key="featured._id">
              <td class="px-6 py-4 border-b border-gray-200">
                <div
                  class="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
                >
                  <img
                    class="h-full w-full object-cover"
                    :src="featured.product_id.mainPhoto"
                    alt="product"
                  />
                </div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="text-sm leading-5 text-gray-900">
                  {{ featured.product_id.name }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="text-sm leading-5 text-gray-900">
                  {{ featured.product_id.description }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="text-sm leading-5 text-gray-900">
                  {{ featured.product_id.price }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="text-sm leading-5 text-gray-900">
                  {{ featured.createdAt }}
                </div>
              </td>

              <td
                class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
              >
                <a
                  @click.prevent="removeProduct(featured._id)"
                  class="text-red-600 hover:text-red-900 cursor-pointer"
                  >Remove</a
                >
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-else
          class="bg-orange-400 border-l-4 border-orange-700 text-white p-4"
          role="alert"
        >
          <p class="font-bold">Oooppss!</p>
          <p>
            Looks like you don't have any featured products please add one😊
          </p>
        </div>
      </div>
    </div>
    <!-- <FormModal
      :trigger="isOpen"
      :onCloseRequest="onCloseRequest"
      :onSubmitRequest="submit"
    >
      <template slot="header">
        <div>
          <i class="fas fa-exclamation-circle text-blue-500"></i>
          <span class="font-bold text-gray-700 text-lg">Update Product</span>
        </div>
      </template>

      <template slot="body">
       
        <InputTextField
          :value="product.name"
          @change="handleChange"
          placeholder="Product Name"
          name="name"
          :error="errors.name"
        />
        <InputTextField
          :value="product.price"
          @change="handleChange"
          type="number"
          step=".01"
          placeholder="Product Price"
          name="price"
          :error="errors.price"
        />

        <SelectField
          :options="categories"
          :error="errors.category"
          :preSelected="product.category"
          :placeholder="'Category'"
          @change="handleCategorySelect"
        />

       
        <TextAreaField
          :value="product.description"
          @change="handleChange"
          placeholder="Product Description"
          name="description"
          :error="errors.description"
        />

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
    </FormModal> -->
  </div>
</template>

<script>
import FormModal from "./FormModal";
import SelectField from "../components/inputs/SelectField";
import InputTextField from "../components/inputs/InputTextField";
import TextAreaField from "../components/inputs/TextAreaField";
export default {
  props: {
    featuredProducts: { type: Array },
  },
  components: {
    FormModal,
    SelectField,
    InputTextField,
    TextAreaField,
  },

  data() {
    return {
      errors: {},
      isOpen: false,
      isSubmitting: false,
      currentId: "",
      product: {
        name: "",
        description: "",
        price: "",
        category: [],
        createdBy: "",
        mainPhoto: null,
      },
    };
  },
  methods: {
    async removeProduct(id) {
      try {
        await this.$store.dispatch("product/removeFeaturedProduct", id);
        this.$toasted.success("Successfully removed");
      } catch (error) {
        this.$toasted.error("Failed to remove");
      }
    },
  },
};
</script>

<style></style>
