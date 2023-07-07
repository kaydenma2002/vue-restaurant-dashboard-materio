import { defineStore } from "pinia";
import axios from "@axios";
import { genId, paginateArray } from "@/@fake-db/utils";

export const useOrderListStore = defineStore("OrderListStore", {
  actions: {
    // 👉 Fetch orders data
    async fetchOrders(params) {
      try {
        
        const sort = JSON.parse(JSON.stringify(params.options.sortBy)) ?? null;
        
        const response = await axios.get(`/admin/orders?search=${params.q.toLowerCase()}&page=${params.options.page}&key=${sort[0]?.key ?? null}&order=${sort[0]?.order ?? null}&paginate=${params.options.itemsPerPage}&status=${params.status}`);

        return response
       
      } catch (error) {
        console.log(error);
      }
    },
    async fetchOrdersByRestaurantId(restaurant_id){
      try {
        
        
        const response = await axios.get(`/admin/viewOrdersByRestaurantId`,{params: {restaurant_id : restaurant_id}});

        return response
       
      } catch (error) {
        console.log(error);
      }
    },

    // 👉 Add Owner
    addOrder(orderData) {
      return new Promise((resolve, reject) => {
        axios
          .post("/apps/orders/order", {
            order: orderData,
          })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    async editOrder(orderData){
      try {
        const response = await axios.post("/admin/updateOrderById", {
            order: orderData
        });
        
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    // 👉 fetch single order
    async fetchOrder(id) {
      try {

        const response = await axios.get("/admin/viewOrderById", {params: {id: id} });
        
        
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    // 👉 Delete Order
    async closeOrder(id) {
      try{
        const response = await axios.post("/admin/closeOrderById",{id: id})
        console.log(response)
      }
      catch(error){
        console.log(error)
      }
    },
  },
});
