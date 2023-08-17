import axios from "@axios";

export const useChatStore = defineStore("chat", {
  // ℹ️ arrow function recommended for full type inference
  state: () => ({
    contacts: [],
    chatsContacts: [],
    profileUser: undefined,
    activeChat: null,
  }),
  actions: {
    async fetchChatsAndContacts(q) {
      
      const res = await axios.get(`/admin/chats_and_contacts?search=${q}`);
      console.log(res);
      // const { chatsContacts, contacts, profileUser } = data
      // contact.chat = { id: chat.id, unseenMsgs: chat.unseenMsgs, lastMessage: chat.messages.at(-1) }

      // this.chatsContacts = chatsContacts
      
      this.contacts = res.data.contacts;
      this.profileUser = res.data.user;
      this.chatsContacts = res.data.chats
        .map((chat) => {
          
          // const contact = JSON.parse(
          //   JSON.stringify(chat.find((c) => c.id === chat.user_id))
          // );
          const contact = JSON.parse(
            JSON.stringify(chat))
          // contact.chat = {
          //   id: chat.id,
          //   unseenMsgs: chat.unseenMsgs,
          //   lastMessage: chat.message.at(-1),
          // };

          return contact;
        })
        .reverse();
      console.log(this.contacts)
      console.log(this.chatsContacts)
    },
    async getChat(userId) {
      const data = await axios.get(`/admin/chats?owner_id=${userId}`);
      console.log(data)
      this.activeChat = data;
    },
    async sendMsg(message) {
      const senderId = this.profileUser?.id
      console.log(this.activeChat)

      const  data  = await axios.post(`/admin/create_chats`,{
        message:message,
        owner_id:this.activeChat?.data?.owner.id  
      })
      console.log(data)
      

      // ? If it's not undefined => New chat is created (Contact is not in list of chats)
      if (data !== undefined) {
        const activeChat = this.activeChat

        this.chatsContacts.push({
          ...activeChat,
            id: data.data.chats.id,
            messages: data.data.chats.message,
            owner:data.data.chats.owner,
            owner_id:data.data.chats.owner_id,
            super_admin:data.data.chats.super_admin,
            super_admin_id:data.data.chats.super_admin_id,
            type:data.data.chats.type,
          
        })
        console.log(data.data)
        if (this.activeChat) {
          this.activeChat.data.chat.push(data.data.chats)
        }
      }
      else {
        this.activeChat?.chat?.push(data.data)
      }

      // Set Last Message for active contact
      // const contact = this.chatsContacts.find(c => {
      //   if (this.activeChat)
      //     return c.id === this.activeChat.contact.id

      //   return false
      // })

      // contact.chat.lastMessage = msg
    },
  },
});
