<template>
  <div class="flex flex-col mt-8">
    <!-- <pre>{{products}}</pre> -->
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div
        class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
      >
        <table class="min-w-full" v-if="products.length">
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
                Created By
              </th>
              <th
                class="px-6 py-3 border-b border-gray-200 bg-gray-500 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider"
              >
                Updated By
              </th>
              <th
                class="px-6 py-3 border-b border-gray-200 bg-gray-500 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider"
              >
                Created Date
              </th>
              <th
                class="px-6 py-3 border-b border-gray-200 bg-gray-500 text-left text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider"
              >
                Updated Date
              </th>
              <th class="px-6 py-3 border-b border-gray-200 bg-gray-500"></th>
            </tr>
          </thead>

          <tbody class="bg-white">
            <tr v-for="product in products" :key="product._id">
              <td class="px-6 py-4 border-b border-gray-200">
                <div
                  class="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
                >
                  <img
                    class="h-full w-full object-cover"
                    :src="product.mainPhoto"
                    alt="product"
                  />
                </div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="text-sm leading-5 text-gray-900">
                  {{ product.name }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="text-sm leading-5 text-gray-900">
                  {{ product.description }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="text-sm leading-5 text-gray-900">
                  {{ product.price }}
                </div>
              </td>

              <td
                class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
              >
                <div class="text-sm leading-5 text-gray-900">
                  {{ product.createdBy.username }}
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
              >
                <div class="text-sm leading-5 text-gray-900">
                  {{ product.updatedBy.username }}
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
              >
                <div class="text-sm leading-5 text-gray-900">
                  {{ product.createdAt }}
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
              >
                <div class="text-sm leading-5 text-gray-900">
                  {{ product.updatedAt }}
                </div>
              </td>

              <td
                class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
              >
                <a
                  @click.prevent="openModal(product)"
                  class="text-green-600 hover:text-green-900 cursor-pointer mr-2"
                  >Edit</a
                >
                <a
                  @click.prevent="deleteProduct(product._id)"
                  class="text-red-600 hover:text-red-900 cursor-pointer"
                  >Delete</a
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
          <p>Looks like you don't have any products please add one😊</p>
        </div>
      </div>
    </div>
    <FormModal
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
        <input
          v-model="product.name"
          type="text"
          name="name"
          placeholder="Product Name"
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
          type="number"
          step=".01"
          name="price"
          placeholder="Product price"
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

        <SelectField
          :options="categories"
          :error="errors.category"
          :preSelected="product.category"
          :placeholder="'Category'"
          @change="handleCategorySelect"
        />

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
</template>

<script>
import FormModal from "./FormModal";
import SelectField from "../components/SelectField";
export default {
  props: {
    categories: { type: Array },
    products: { type: Array },
  },
  components: {
    FormModal,
    SelectField,
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
    handleCategorySelect(selected) {
      this.product.category = selected.map((item) => item._id);
    },
    handlePhotoChange(event) {
      this.product.mainPhoto = event.target.files[0];
    },
    openModal(product) {
      this.product.name = product.name;
      this.product.description = product.description;
      this.product.price = product.price;
      this.product.category = product.category;
      this.product.createdBy = product.createdBy;
      this.product.mainPhoto = product.mainPhoto;
      this.currentId = product._id;
      this.isOpen = true;
    },
    async deleteProduct(id) {
      try {
        const res = await this.$store.dispatch("product/deleteProduct", id);
        if (res) {
          this.$toasted.success("Successfull deleted.");
        }
      } catch (error) {
        this.$toasted.error(error.message);
      }
    },
    onCloseRequest() {
      this.isOpen = false;
      this.product = {
        name: "",
        description: "",
        price: "",
        category: [],
        mainPhoto: null,
      };
      this.currentId = "";
      this.errors = {};
    },
    async submit(e) {
      try {
        const res = await this.$store.dispatch("product/updateProduct", {
          id: this.currentId,
          product: this.product,
        });

        this.isOpen = false;
        this.$toasted.success("Product updated.");
      } catch (error) {
        this.errors = error;
      }
    },
  },
};
</script>

<style></style>
