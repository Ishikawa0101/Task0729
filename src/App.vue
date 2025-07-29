<style>
  .logo .v-img{
    filter: hue-rotate(90deg);
  }
</style>

<template>
  <v-app>
    <v-app-bar
      app
      color="#181878"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo logo"
          class="shrink mr-2"
          contain
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgKzZqGXOp7fCN4rVjQjFYJGMIVyavMUodptJHDKsu6dmszErBPmbK8EKjk2bci8TC1VH739lpoZQ7Oek0GBFbKgvY8MhbEEzhJgtiX8rc0T4q1h8gh1jJh5hxvY1iBngm8srxPsuzubG0/s450/bartender_shaker.png"
          transition="scale-transition"
          width="40"
        />
          <h1>Cocktail Web</h1>
      </div>

      <v-spacer></v-spacer>
      <v-btn text to="/" tag="router-link">カクテル検索</v-btn>
      <v-btn text to="/ingredients" tag="router-link">材料検索</v-btn>
      <v-btn text to="/favorite" tag="router-link">お気に入り</v-btn>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
