<template>
  <DashboardLayout>
    <!-- <template slot="status">
      <Status />
    </template> -->
    <template slot="body">
      <router-view></router-view>
    </template>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from "../components/DashboardLayout";
import Status from "../components/Status";
import UserList from "../components/UserList";
export default {
  components: {
    DashboardLayout,
    Status,
    UserList,
  },
  // data() {
  //   return {};
  // },
  // methods: {
  //   async check() {
  //     const res = await this.$store.dispatch("auth/currentUser");
  //     console.log(res);
  //   },
  //   logout() {
  //     this.$store.dispatch("auth/logout");
  //     this.$router.push("/login");
  //   },
  // },
};
</script>
