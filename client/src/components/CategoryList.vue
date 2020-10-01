<template>
  <div class="flex flex-col mt-8">
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div
        class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
      >
        <table class="min-w-full">
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
                Created Date
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
                  {{ Date(category.createdAt) }}
                </div>
              </td>

              <td
                class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
              >
                <a
                  @click.prevent="$router.push(`/admin/users/${category._id}`)"
                  class="text-green-600 hover:text-green-900 cursor-pointer"
                  >Edit</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: { type: Array },
  },
};
</script>

<style></style>
