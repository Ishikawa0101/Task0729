<style>
.ingredient{
  text-align: center;
  width: 100%;
  margin: 0 auto;
}
.ingredient .v-text-field{
  display: inline-block;
}
.ingredient li{
  list-style: none;
  text-align: left;
  
}
</style>

<template>
  <div class="ingredient">
    <h1>材料検索</h1>
    <v-text-field label="材料を検索" v-model="searchIngredient"></v-text-field>
    <v-btn @click="ingredientMethod(searchIngredient)">検索</v-btn>
    <div v-show="ingredientInfo !== null">
      <div v-for="(ingArray, key) in ingredientInfo" :key="key">
        <div v-for="(ingObj, key) in ingArray" :key="key">
          <ul>
            <div v-for="(ing, key) in ingObj" :key="key">
              <li v-if="ing!== null && ing.length > 0">{{ key }} : {{ ing }}</li>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <div v-show="ingredientInfo === null && notFirstShow">材料の詳細情報がありません。</div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      notFirstShow: false,
      searchIngredient: null,
    }
  },
  computed:{
    ingredientInfo(){
      return this.$store.state.cocktail.ingredientInfo;
    },
  },
  methods: {
    async ingredientMethod(searchIngredient){
      await this.$store.dispatch('cocktail/ingredientAction', searchIngredient);
      this.notFirstShow=true;
    }
  }
}
</script>
