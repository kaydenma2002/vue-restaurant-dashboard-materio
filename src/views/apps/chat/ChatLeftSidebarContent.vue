<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useChat } from './useChat'
import ChatContact from '@/views/apps/chat/ChatContact.vue'
import { useChatStore } from '@/views/apps/chat/useChatStore'
import { avatarText, formatDateToMonthShort } from "@core/utils/formatters";
import { computed, onMounted } from 'vue'

const props = defineProps({
  search: {
    type: String,
    required: true,
  },
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'openChatOfContact',
  'showUserProfile',
  'close',
  'update:search',
])

const { resolveAvatarBadgeVariant } = useChat()
const search = useVModel(props, 'search', emit)
const store = useChatStore()
const uniqueChats = computed(() => {
  
  const uniqueIds = new Set();
  return store.chatsContacts.filter((contact) => {
    if (!uniqueIds.has(contact.owner_id)) {
      uniqueIds.add(contact.owner_id);
      return true;
    }
    return false;
  });
});

const uniqueContacts = computed(() =>{
  
  return store.contacts.map(item => item )
})




</script>

<template>
  <!-- 👉 Chat list header -->
  <div
    v-if="store.profileUser"
    class="chat-list-header"
  >
    <VBadge
      dot
      location="bottom right"
      offset-x="3"
      offset-y="3"
      size="8"
      :color="resolveAvatarBadgeVariant(store.profileUser.status)"
      bordered
    >
    <VAvatar
      :variant="!store.profileUser?.avatar ? 'tonal' : undefined"
        :color="
          !store.profileUser?.avatar
            ? resolveAvatarBadgeVariant(store.profileUser?.status)
            : undefined
        "
        size="40"
        class="cursor-pointer"
        @click="$emit('showUserProfile')"
      >
        <VImg
        v-if="store.profileUser?.avatar"
          :src="store?.profileUser?.avatar"
          alt="John Doe"
        />
        <span v-else>{{
          avatarText(store.profileUser.name) || avatarText(user?.owner?.name)
        }}</span>
      </VAvatar>
    </VBadge>

    <VTextField
      v-model="search"
      density="compact"
      placeholder="Search..."
      prepend-inner-icon="mdi-magnify"
      class="ms-4 me-1 chat-list-search"
    />

    <IconBtn
      v-if="$vuetify.display.smAndDown"
      @click="$emit('close')"
    >
      <VIcon
        icon="mdi-close"
        class="text-medium-emphasis"
      />
    </IconBtn>
  </div>
  <VDivider />
  
  <PerfectScrollbar
    tag="ul"
    class="chat-contacts-list px-3"
    :options="{ wheelPropagation: false }"
  >
    <li>
      <span class="chat-contact-header d-block text-primary text-xl font-weight-medium">Chats</span>
    </li>
    <ChatContact
      v-for="contact in uniqueChats"
      :key="`chat-${contact.id}`"
      :user="contact.owner"
      is-chat-contact
      @click="$emit('openChatOfContact', contact.owner_id)"
    />
    
    <span
      v-show="!uniqueChats"
      class="no-chat-items-text text-disabled"
    >No chats found</span>
    <li>
      <span  class="chat-contact-header d-block text-primary text-xl font-weight-medium">Contacts</span>
    </li>
    <ChatContact
      
      v-for="contact in uniqueContacts"
      :key="`chat-${contact.id}`"
      :user="contact"
      @click="$emit('openChatOfContact', contact.id)"
    />
    <span
      v-show="!uniqueContacts"
      class="no-chat-items-text text-disabled"
    >No contacts found</span>
  </PerfectScrollbar>
</template>

<style lang="scss">
.chat-contacts-list {
  --chat-content-spacing-x: 12px;

  padding-block-end: 0.75rem;

  .chat-contact-header {
    margin-block-end: 1rem;
    margin-block-start: 1.25rem;
  }

  .chat-contact-header,
  .no-chat-items-text {
    margin-inline: var(--chat-content-spacing-x);
  }
}
</style>
