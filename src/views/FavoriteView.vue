


<style>
.favorite{
  text-align: center;
  width: 100%;
  margin: 0 auto;
}

.favorite .v-text-field{
  display: inline-block;
}
.favorite li{
  list-style: none;
  float: left;
}
.favorite img{
  height:100px;
  width:100px;
}
.favorite .contents{
  background-color: #eee;
  opacity: 0.8;
  display: block;
  padding:50px;
  margin:10px;
  border:3px solid #333;
  border-radius: 10px;
}

.contents:hover{
  border:3px solid #eb6d80;
  background-color: white;
  opacity: 1;
}

.favorite .v-btn{
  top: 57.5px;
  z-index: 2;
}


</style>

<template>
  <div class="favorite">
    <h1>お気に入り</h1>
    <h2>お気に入りのカクテル数 : {{ totalFavorite }}コ</h2>
    <div v-show="favoriteCocktail.lenght !== 0">
      <div v-for="(favoriteObj, key) in favoriteCocktail" :key="key">
          <ul>
            <li>
              <div>
                  <v-btn
                    class="mx-1"
                    fab
                    dark
                    small
                    color="#112A42"
                    @click="deleteFavoriteMethod(favoriteObj.idDrink)"
                  >
                  <v-icon style="font-style: normal;">×</v-icon>
                  </v-btn>
                <div class="contents" @click.prevent="detailShowMethod(favoriteObj.idDrink, favoriteObj.strDrink, favoriteObj.strDrinkThumb);"><!--  @click="  -->
                  <img :src="favoriteObj.strDrinkThumb">
                  <h2>{{ favoriteObj.strDrink }}</h2> 
                </div>
              </div>
            </li>
          </ul>
      </div>
      </div>

    <v-dialog v-model="showModal" max-width="70%">
          <v-card>
            <v-card-title class="title">レシピ</v-card-title>
            <v-card-text>
              <div v-for="(testA, keyA) in isShowCocktail" :key="keyA">
                <div v-for="(testB, keyB) in testA" :key="keyB">
                  <div v-for="(testC, keyC) in testB" :key="keyC">
                    <div v-if="testC !== null && testC.length > 0 && keyC!== `strDrinkThumb`
                      && keyC !== `strInstructionsES` 
                      && keyC !== `strInstructionsDE` 
                      && keyC !== `strInstructionsFR` 
                      && keyC !== `strInstructionsIT`
                      && keyC !== `strInstructions`"
                      class="dialog__text">
                        {{ keyC }} : {{ testC }}
                      
                      </div>
                      <div v-else-if="keyC === `strDrinkThumb`" class="dialog__img">
                        <img :src="testC" width="50%">
                      </div>
                      <div v-else-if="keyC === `strInstructions`">
                        {{ keyC }} : {{ testC }}
                      </div>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
        
  </div>
</template>

<script>
export default {
  data(){
    return{
       choeseCocktail: null,
       showModal: false,
    }
  },
  computed:{
    isShowCocktail(){
      return this.$store.state.cocktail.isShowCocktail;
    },
    favoriteCocktail(){
      return this.$store.state.cocktail.favoriteCocktail;
    },
    totalFavorite() {
      return this.$store.getters['cocktail/totalFavorite']; // 名前空間の変更
    },
  },
  methods: {
    async detailShowMethod(id, name , image){
      this.showModal=!this.showModal;
      await this.$store.dispatch('cocktail/searchCocktailIdAction', id)
      this.choeseCocktail = {idDrink: id, strDrink: name, strDrinkThumb: image};
    },

    deleteFavoriteMethod(id){
      this.$store.commit('cocktail/deleteFavoriteCocktail', id)
    }
    }
  }
</script>
