import { defineStore } from "pinia";
import axios from "@axios";
import { genId, paginateArray } from "@/@fake-db/utils";

export const useRestaurantListStore = defineStore("RestaurantListStore", {
  actions: {
    // 👉 Fetch restaurants data
    async fetchRestaurants(params) {
      try {
        
        const sort = JSON.parse(JSON.stringify(params.options.sortBy)) ?? null;
        
        const response = await axios.get(`/admin/restaurants?search=${params.q.toLowerCase()}&page=${params.options.page}&key=${sort[0]?.key ?? null}&order=${sort[0]?.order ?? null}&paginate=${params.options.itemsPerPage}&status=${params.status}`);

        return response
       
      } catch (error) {
        console.log(error);
      }
    },
    async fetchRestaurantsByUserId(user_id){
      try {
        
        
        const response = await axios.get(`/admin/viewRestaurantsByUserId`,{params: {user_id : user_id}});

        return response
       
      } catch (error) {
        console.log(error);
      }
    },

    // 👉 Add Owner
    addRestaurant(restaurantData) {
      return new Promise((resolve, reject) => {
        axios
          .post("/apps/restaurants/restaurant", {
            restaurant: restaurantData,
          })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    async editRestaurant(restaurantData){
      try {
        const response = await axios.post("/admin/updateRestaurantById", {
            restaurant: restaurantData
        });
        
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    // 👉 fetch single restaurant
    async fetchRestaurant(id) {
      try {

        const response = await axios.get("/admin/viewRestaurantById", {params: {id: id} });
        
        
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    // 👉 Delete Restaurant
    async closeRestaurant(id) {
      try{
        const response = await axios.post("/admin/closeRestaurantById",{id: id})
        console.log(response)
      }
      catch(error){
        console.log(error)
      }
    },
  },
});
