<style>
.cocktail{
  text-align: center;
  width: 100%;
  margin: 0 auto;
}

.cocktail .v-text-field{
  display: inline-block;
}
.cocktail li{
  list-style: none;
  
  float: left;
}
.cocktail img{
  height:100px;
  width:100px;
  border-radius: 8px;
  
}
.cocktail .contents{
  display: block;
  margin: 10px;
  border:3px solid #333;
  border-radius: 10px;
  opacity: 0.8;
  background-color: #eee;
}

.contents:hover{
  border:3px solid #eb6d80;
  background-color: white;
  opacity: 1;
}


.title{
  border-bottom:2px solid #8579B0; 
  margin-bottom: 10px;
}

.dialog__btn{
  float: right;
}

.dialog__img{
  text-align: center;
  margin: 10px 0;
  border: #333 solid 2px;
  border-radius: 10px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>

<template>
  <div class="cocktail">
    <h1>カクテル検索</h1>
    <v-text-field label="カクテル名を検索" v-model="searchCocktail" ></v-text-field>
    <v-btn @click="searchCocktailMethod(searchCocktail)">検索</v-btn>
    <div v-show="resultCocktail !== null">
      <div v-for="resultArray in resultCocktail" :key="resultArray.id">
        <div v-for="resultObj in resultArray" :key="resultObj.id">
          <ul>
            <li>
              <div class="contents" 
              @click.prevent="detailShowMethod(resultObj.idDrink, resultObj.strDrink, resultObj.strDrinkThumb);">
                
                  <img :src="resultObj.strDrinkThumb">
                  <h2>{{ resultObj.strDrink }}</h2> 
                
              </div>
            </li>
          </ul>
          </div>
      </div>
      </div>

      <div v-show="resultCocktail === null && notFirstShow">カクテルの情報が見つかりませんでした</div>
      
      <v-dialog v-model="showModal" max-width="70%">
        <v-card>
          <v-card-title class="title">レシピ</v-card-title>
          <v-card-text>
                <v-btn
                  class="mx-2 dialog__btn"
                  fab
                  dark
                  small
                  color="pink"
                  @click="addFavotiteMethod(choeseCocktail)"
                >
                  <v-icon dark>
                    mdi-heart
                  </v-icon>
                </v-btn>

                <Transition>
                  <v-alert
                    v-if="showPopup"
                    type="success"
                    class="mt-6"
                    border="left"
                    colored-border
                    elevation="2"
                  >
                    お気に入りに追加しました！
                  </v-alert>
                </Transition>

            <div v-for="(Cocktail, keyCocktail) in isShowCocktail" :key="keyCocktail">
              <div v-for="(CocktailArray, keyCocktailArray) in Cocktail" :key="keyCocktailArray">
                <div v-for="(CocktailObj, keyCocktailObj) in CocktailArray" :key="keyCocktailObj">
                  <div v-if="CocktailObj !== null && CocktailObj.length > 0 && keyCocktailObj!== `strDrinkThumb`
                   && keyCocktailObj !== `strInstructionsES` 
                   && keyCocktailObj !== `strInstructionsDE` 
                   && keyCocktailObj !== `strInstructionsFR` 
                   && keyCocktailObj !== `strInstructionsIT`
                   && keyCocktailObj !== `strInstructions`"
                   class="dialog__text"
                   >
                    {{ keyCocktailObj }} : {{ CocktailObj }}
                  
                  </div>
                  <div v-else-if="keyCocktailObj === `strDrinkThumb`" class="dialog__img">
                    <img :src="CocktailObj" width="50%">
                  </div>
                  <div v-else-if="keyCocktailObj === `strInstructions`">
                    {{ keyCocktailObj }} : {{ CocktailObj }}
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
  name: 'CocktailSearchView',
  data(){
    return{
       choeseCocktail: null,
       notFirstShow: false,
       showModal: false,
       showPopup: false,
       searchCocktail: null,
    }
  },
  computed:{
    resultCocktail(){
      return this.$store.state.cocktail.resultCocktail;
    },
    isShowCocktail(){
      return this.$store.state.cocktail.isShowCocktail;
    },
    checkFavoriteBool(){
      return this.$store.state.cocktail.checkFavoriteBool;
    },
  },
  methods: {
    async searchCocktailMethod(searchCocktail){
      await this.$store.dispatch('cocktail/searchCocktailAction', searchCocktail)
      this.notFirstShow=true;
    },
    async detailShowMethod(id, name , image){
      this.showModal=!this.showModal;
      await this.$store.dispatch('cocktail/searchCocktailIdAction', id)
      this.choeseCocktail = {idDrink: id, strDrink: name, strDrinkThumb: image};
    },
    addFavotiteMethod(favorite){
        this.$store.commit('cocktail/addFavoriteCocktail', favorite);
        if(this.checkFavoriteBool){
          this.showPopup=true;
        }

        setTimeout(() => {
          this.showPopup = false;
        }, 1000);
    },
  }
}
</script>
