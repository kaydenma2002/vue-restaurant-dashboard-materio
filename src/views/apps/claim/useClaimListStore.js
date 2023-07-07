import axios from "@axios";
import { defineStore } from "pinia";

export const useClaimListStore = defineStore("ClaimListStore", {
  actions: {
    // 👉 Fetch restaurants data
    async fetchClaims(params) {
      try {
        
        const sort = JSON.parse(JSON.stringify(params.options.sortBy)) ?? null;
        
        const response = await axios.get(`/admin/claims?search=${params.q.toLowerCase()}&page=${params.options.page}&key=${sort[0]?.key ?? null}&order=${sort[0]?.order ?? null}&paginate=${params.options.itemsPerPage}&status=${params.status}`);

        return response
       
        // const { sortBy = "", itemsPerPage = 10, page = 1 } = params.options;
        // const queryLower = params.q.toLowerCase();

        // // filter restaurants
        // let filteredClaims = response.data
        //   .filter(
        //     (restaurant) =>
        //       (restaurant.name.toLowerCase().includes(queryLower) ||
        //         restaurant.phone.toLowerCase().includes(queryLower))
        //   )
        //   .reverse();
        
        // const sort = JSON.parse(JSON.stringify(sortBy));
        // if (sort.length) {
        //   if (sort[0]?.key === "restaurant") {
        //     filteredClaims = filteredClaims.sort((a, b) => {
        //       if (sort[0]?.order === "asc") return a.name.localeCompare(b.name);
        //       else return b.name.localeCompare(a.name);
        //     });
        //   }
        //   if (sort[0]?.key === "email") {
        //     filteredClaims = filteredClaims.sort((a, b) => {
        //       if (sort[0]?.order === "asc")
        //         return a.email.localeCompare(b.email);
        //       else return b.email.localeCompare(a.email);
        //     });
        //   }
        // }
        // const totalClaims = filteredClaims.length;

        // // total pages
        // const totalPages = Math.ceil(totalClaims / itemsPerPage);

        // return [
        //   200,
        //   {
        //     restaurants: paginateArray(filteredClaims, itemsPerPage, page),
        //     totalPages,
        //     totalClaims,
        //     page: page > Math.ceil(totalClaims / itemsPerPage) ? 1 : page,
        //   },
        // ];
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

    // 👉 fetch single restaurant
    async fetchClaim(id) {
      try {
        const response = await axios.get("/admin/viewClaimById", {params: {id: id} });
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    async approveClaim(id){
      try {
        const response = await axios.post("/admin/approveClaimById",{id: id})
        return response
      } catch(error){
        console.log(error)
      }
    }
  },
});
