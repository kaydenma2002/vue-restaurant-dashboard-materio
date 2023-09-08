<script setup>
import { useChatStore } from "@/views/apps/chat/useChatStore";
import { formatDate } from "@core/utils/formatters";

const store = useChatStore();

const contact = computed(() => ({
  id: store.activeChat.data.owner.id,
  avatar: store.activeChat?.data.owner.avatar,
}));
console.log(store.activeChat.data.owner);
const resolveFeedbackIcon = (feedback) => {
  if (feedback.isSeen)
    return {
      icon: "mdi-check-all",
      color: "success",
    };
  else if (feedback.isDelivered)
    return {
      icon: "mdi-check-all",
      color: undefined,
    };
  else
    return {
      icon: "mdi-check",
      color: undefined,
    };
};

const msgGroups = computed(() => {
  let messages = [];
  const _msgGroups = [];
  if (store.activeChat) {
    console.log(store.activeChat);
    store.activeChat.data.chat.map((item) => {
      messages.push({
        message: item.message,
        senderId: item?.super_admin_id,
        time: item?.created_at,
        type: item?.type,
      });
    });
    console.log(messages);
    let msgSenderId = store?.activeChat?.data?.chat[0]?.super_admin_id;
    let msgGroup = {
      senderId: msgSenderId,
      messages: [],
    };
    messages.forEach((msg, index) => {
      if (msgSenderId === msg.senderId) {
        msgGroup.messages.push({
          message: msg.message,
          time: msg.time,
          type: msg.type,
        });
        
      } else {
        msgSenderId = msg.senderId;
        _msgGroups.push(msgGroup);
        msgGroup = {
          senderId: msg.senderId,
          messages: [
            {
              message: msg.message,
            },
          ],
          time: msg.time,
          type: msg.type,
        };
      }
      if (index === messages.length - 1) _msgGroups.push(msgGroup);
    });
  }

  return _msgGroups;
});
</script>

<template>
  <div class="chat-log pa-5">
    <div
      v-for="(msgGrp, index) in msgGroups"
      :key="msgGrp.senderId + String(index)"
      class=""
      
    >
  
      <div>
        <div
          class=""
         
        >
          <p
            v-for="(msgData, msgIndex) in msgGrp.messages"
            :key="msgIndex"
            style="width: fit-content"
            class="chat-content text-sm py-3 px-4 elevation-1 "
            :class="[
              msgData.type !== 0
                ? 'bg-surface chat-left align-end me-auto'
                : 'bg-primary text-white chat-right align-start ms-auto',
              msgGrp.messages.length - 1 !== msgIndex ? 'mb-3' : 'mb-1',
            ]"
          >
            {{ msgData.message }}
          </p>
          <p v-if="msgGrp.messages.length > 0" :class="[
              msgGrp.messages[msgGrp.messages.length - 1].type !== 0
                ? ' chat-left align-end me-auto text-left'
                : ' chat-right align-start ms-auto text-right',
              msgGrp.messages.length - 1 !== msgIndex ? 'mb-3' : 'mb-1',
            ]" class="message-time text-xs text-gray-500">
            {{ msgGrp.messages[msgGrp.messages.length - 1].time }}
          </p>
          
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.chat-log {
  .chat-content {
    border-end-end-radius: 6px;
    border-end-start-radius: 6px;

    &.chat-left {
      border-start-end-radius: 6px;
    }

    &.chat-right {
      border-start-start-radius: 6px;
    }
  }
}
</style>
