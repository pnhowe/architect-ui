<template>
  <v-app id="app">
    <v-container>
      <v-layout>
        <v-flex xs8>
          <h1>
            <router-link to="/">Architect</router-link>
          </h1>
        </v-flex>
        <v-flex xs4 text-xs-right class="mt-1 mr-3">
          <v-menu
            bottom
            left
            :nudge-width="200">
            <v-avatar class="grey" slot="activator">
              <span class="white--text headline">P</span>
            </v-avatar>
            <v-card>
              <v-list>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>Peter Howe</v-list-tile-title>
                    <v-list-tile-sub-title>Peter.Howe@t3kton.com</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                <v-list-tile @click="">
                  <v-list-tile-title>Settings</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="">
                  <v-list-tile-title>Logout</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-menu>
        </v-flex>
      </v-layout>
      <router-view/>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="sass">
// Base Styles
*
  box-sizing: border-box

body
  font-family: 'Roboto', sans-serif
  font-weight: 300
  margin: 50px auto
  width: 800px

h1
  margin: 0
  font-size: 60px
  font-weight: 100
  line-height: 100%;

h2
  margin: 0 0 10px
  font-size: 27px
  font-weight: 100

// Vuetify Customizations
.application.theme--light
  background: #FFF

  a
    text-decoration: inherit

  h1 a
    color: inherit

  .breadcrumbs
    padding: 0
    margin: 0 0 50px

    li
      font-size: 22px
      text-transform: capitalize
</style>
