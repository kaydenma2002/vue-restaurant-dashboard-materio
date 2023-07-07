import { defineStore } from "pinia";
import axios from "@axios";
import { genId, paginateArray } from "@/@fake-db/utils";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { style } from "@/views/demos/components/badge/demoCodeBadge";
export const useUserListStore = defineStore("UserListStore", {
  actions: {
    // 👉 Fetch users data
    async fetchUsers(params) {
      try {
        const sort = JSON.parse(JSON.stringify(params.options.sortBy));
        const response = await axios.get(`/admin/users?search=${params.q.toLowerCase()}&page=${params.options.page}&key=${sort[0]?.key ?? null}&order=${sort[0]?.order ?? null}&paginate=${params.options.itemsPerPage}&status=${params.status}`);
        return response
        // console.log(params);
        // const { sortBy = "", itemsPerPage = 10, page = 1 } = params.options;
        // const queryLower = params.q.toLowerCase();

        // filter users
        // let filteredUsers = response.data
        //   .filter(
        //     (user) =>
        //       (user.name.toLowerCase().includes(queryLower) ||
        //         user.email.toLowerCase().includes(queryLower)) &&
        //       user.user_type === (user_type || user.user_type) &&
        //       user.status === (params.status || user.status)
        //   )
        //   .reverse();
        // console.log(queryLower);
        // const sort = JSON.parse(JSON.stringify(sortBy));
        // if (sort.length) {
        //   if (sort[0]?.key === "user") {
        //     filteredUsers = filteredUsers.sort((a, b) => {
        //       if (sort[0]?.order === "asc") return a.name.localeCompare(b.name);
        //       else return b.name.localeCompare(a.name);
        //     });
        //   }
        //   if (sort[0]?.key === "email") {
        //     filteredUsers = filteredUsers.sort((a, b) => {
        //       if (sort[0]?.order === "asc")
        //         return a.email.localeCompare(b.email);
        //       else return b.email.localeCompare(a.email);
        //     });
        //   }
        // }
        // const totalUsers = filteredUsers.length;

        // // total pages
        // const totalPages = Math.ceil(totalUsers / itemsPerPage);

        // return [
          
        //     200,
        //     {
        //       users: paginateArray(filteredUsers, itemsPerPage, page),
        //       totalPages,
        //       totalUsers,
        //       page: page > Math.ceil(totalUsers / itemsPerPage) ? 1 : page,
        //     },
        //   ,
        // ];
      } catch (error) {
        console.log(error);
      }
    },

    // 👉 Add Owner
    addUser(userData) {
      return new Promise((resolve, reject) => {
        axios
          .post("/apps/users/user", {
            user: userData,
          })
          .then((response) => resolve(response))
          .catch((error) => reject(error));
      });
    },
    async editUser(userData){
      try {
        const response = await axios.post("/admin/updateUserById", {
            user: userData
        });
        
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    // 👉 fetch single user
    async fetchUser(id) {
      try {
        const response = await axios.get("/admin/viewUserById", {
          params: { id: id },
        });

        return response;
      } catch (error) {
        console.log(error);
      }
    },

    // 👉 Delete User
    async deleteUser(id) {
      try{
        
        toast.success('User deleted successfully !');
      }
      catch(error){
        toast(error);
      }
    },
  },
});

