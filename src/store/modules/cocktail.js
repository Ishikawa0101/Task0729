import axios from 'axios'

export default {
    namespaced: true,
    state: {
    resultCocktail: [],                     //検索結果格納配列
    imageCocktail: null,                    //検索画像用変数

    ingredientInfo: null,                   //材料の情報用変数
    
    isShowCocktail: null,                   //カクテル詳細情報

    favoriteCocktail: [],                   //お気に入りカクテル用配列
    checkfavorite: null,                    //お気に入りカクテルに既に入っているかどうか判別用変数
    checkFavoriteBool: false,               //お気に入りカクテルのポップアップの表示可否用変数
    
  },
  getters: {
    totalFavorite(state) {
      return state.favoriteCocktail.length;
    },
  },
  mutations: {
    setIngredientInfo(state, ingredientInfo){state.ingredientInfo = ingredientInfo;},

    setResultCocktail(state,resultCocktail){state.resultCocktail = resultCocktail;},

    setIsShowCocktail(state,isShowCocktail){state.isShowCocktail = isShowCocktail;},
    
    addFavoriteCocktail(state, favoriteCocktail){
      state.checkfavorite = state.favoriteCocktail.find(Cocktail => Cocktail.idDrink === favoriteCocktail.idDrink );
      if(state.checkfavorite === undefined){
        state.favoriteCocktail.push(favoriteCocktail);
        state.checkFavoriteBool = true;
      }else{
        state.checkFavoriteBool = false;
      }
    },

    deleteFavoriteCocktail(state, id){
      state.favoriteCocktail = state.favoriteCocktail.filter(Cocktail => Cocktail.idDrink !== id );
    },
  },
  actions: {
    async ingredientAction({commit}, name){
      try{
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${name}`);
        if(response.data.drinks !== "no data found" && response.data.ingredients !== null){
        commit('setIngredientInfo', response.data)
        }else{
          commit('setIngredientInfo', null)
        }
      }catch(error){console.log('error');}
    },

    async searchCocktailAction({commit}, name){
      try{
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        if(response.data.drinks !== "no data found" && response.data.drinks !== null){
          commit('setResultCocktail', response.data);
        }else{
          commit('setResultCocktail', null)
        }
      }catch(error){console.log('error');}
    },

    async searchCocktailIdAction({commit}, id){
      try{
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        if(response.data.drinks !== "no data found" && response.data.drinks !== null){
          commit('setIsShowCocktail', response.data);
        }else{
          commit('setIsShowCocktail', null)
        }
      }catch(error){console.log('error');}
    },
  },
}