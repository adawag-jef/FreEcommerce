<template>
  <div class="flex flex-col mt-8">
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div
        class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
      >
        <table class="min-w-full" v-if="categories.length">
          <thead>
            <tr>
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
            <tr v-for="category in categories" :key="category._id">
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="text-sm leading-5 text-gray-900">
                  {{ category.name }}
                </div>
              </td>

              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div class="text-sm leading-5 text-gray-900">
                  {{ category.description }}
                </div>
              </td>

              <td
                class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
              >
                <div class="text-sm leading-5 text-gray-900">
                  {{ category.createdBy.username }}
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
              >
                <div class="text-sm leading-5 text-gray-900">
                  {{ category.updatedBy.username }}
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
              >
                <div class="text-sm leading-5 text-gray-900">
                  {{ category.createdAt }}
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
              >
                <div class="text-sm leading-5 text-gray-900">
                  {{ category.updatedAt }}
                </div>
              </td>

              <td
                class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
              >
                <a
                  @click.prevent="openModal(category)"
                  class="text-green-600 hover:text-green-900 cursor-pointer mr-2"
                  >Edit</a
                >
                <a
                  @click.prevent="deleteCategory(category._id)"
                  class="text-red-600 hover:text-red-900 cursor-pointer"
                  >Delete</a
                >

                <!--  -->
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
          <p>Looks like you don't have any categories please add one😊</p>
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
          <span class="font-bold text-gray-700 text-lg">Update Category</span>
        </div>
      </template>

      <template slot="body">
        <InputTextField
          :value="category.name"
          @change="handleChange"
          placeholder="Category Name"
          name="name"
          :error="errors.name"
        />
        <TextAreaField
          :value="category.description"
          @change="handleChange"
          placeholder="Category Description"
          name="description"
          :error="errors.description"
        />
        <!-- <textarea
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
        </span> -->
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
import InputTextField from "../components/inputs/InputTextField";
import TextAreaField from "../components/inputs/TextAreaField";
export default {
  props: {
    categories: { type: Array },
  },
  components: {
    FormModal,
    InputTextField,
    TextAreaField,
  },

  data() {
    return {
      errors: {},
      isOpen: false,
      isSubmitting: false,
      currentId: "",
      category: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    handleChange(e) {
      this.category[e.target.name] = e.target.value;
    },
    openModal(category) {
      this.category.name = category.name;
      this.category.description = category.description;
      this.currentId = category._id;
      this.isOpen = true;
    },
    async deleteCategory(id) {
      try {
        const res = await this.$store.dispatch("category/deleteCategory", id);
        if (res) {
          this.$toasted.success("Successfull deleted.");
        }
      } catch (error) {
        this.$toasted.error(error.message);
      }
    },
    onCloseRequest() {
      this.isOpen = false;
      this.category = {
        name: "",
        description: "",
      };
      this.currentId = "";
      this.errors = {};
    },
    async submit(e) {
      try {
        const res = await this.$store.dispatch("category/updateCategory", {
          id: this.currentId,
          category: this.category,
        });

        this.isOpen = false;
        this.$toasted.success("Category updated.");
      } catch (error) {
        this.errors = error;
      }
    },
  },
};
</script>

<style></style>
