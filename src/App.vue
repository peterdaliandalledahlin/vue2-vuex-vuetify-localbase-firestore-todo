<template>
  <v-app id="inspire">
    <v-navigation-drawer
    v-model="drawer"
    :mobile-breakpoint="768"
    app
    >
      <!-- <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            ToDo List
          </v-list-item-title>
          <v-list-item-subtitle>
            Omnia, Team EHB söder
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> -->

      <v-list-item>
        <v-list-item-content>
          <v-avatar size="70">
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
          <v-list-item-subtitle>Peter Dahlin</v-list-item-subtitle>
          <v-list-item-subtitle>admin@admin.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>


      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      height="110"
    >
    <v-container class="pa-0">
    <v-row>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <Search />
    </v-row>
    <v-row>
      <v-toolbar-title class="ml-3">{{ $store.state.appTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <LiveDateTime />
    </v-row>
    </v-container>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-0">
        <router-view></router-view>
        <Snackbar />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from './components/Shared/Snackbar.vue'
import Search from './components/Tools/Search.vue'
import LiveDateTime from './components/Tools/LiveDateTime.vue'

export default {

  name: 'App',
  data: () => ({
    drawer: null,
    items: [
        { title: 'ToDo', icon: 'mdi-format-list-checks', to: '/' },
        { title: 'About', icon: 'mdi-information', to: '/about' },
      ],
    }),
    mounted() {
      this.$store.dispatch('getTasks')
    },
    components: {
      Snackbar, Search, LiveDateTime
    },
}
</script>