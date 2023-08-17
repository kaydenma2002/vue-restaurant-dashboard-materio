<script setup>
import avatar3 from "@images/avatars/avatar-3.png";
import avatar4 from "@images/avatars/avatar-4.png";
import avatar5 from "@images/avatars/avatar-5.png";
import paypal from "@images/svg/paypal.svg";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useOrderListStore } from "@/views/apps/order/useOrderListStore";
import { useNotificationListStore } from "@/views/apps/notification/useNotificationListStore";
import { useClaimListStore } from "@/views/apps/claim/useClaimListStore";
import { useRoute, useRouter } from "vue-router";

const orderListStore = useOrderListStore();
const claimListStore = useClaimListStore();
const notificationListStore = useNotificationListStore();
const router = useRouter();

const pusher = new Pusher("68572aaa73079990a7d7", {
  cluster: "mt1",
  encrypted: true,
});
const echo = new Echo({
  broadcaster: "pusher",
  key: "68572aaa73079990a7d7",
  cluster: "mt1",
  encrypted: true,
  pusher: pusher,
});

const notifications = ref([]);
notificationListStore
  .fetchNotifications()
  .then((items) => {
    items?.data?.map((notification) => {
      console.log(notification);
      if (notification.type == 0) {
        orderListStore
          .fetchItemsByOrderId(notification.data)
          .then((order) => {
            notifications.value.push({
              id: notification?.id,
              title: notification.title,
              subtitle: notification.body,
              time: `${formatDate(order.data?.created_at)}`,
              isSeen: notification.admin_read_at === null ? false : true,
              type: notification?.type,
              data: notification?.data,
              add_data: notification?.add_data
            });
            console.log(notifications.value);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });
const formatDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
};
const removeNotification = (notificationId) => {
  notificationListStore.deleteNotificationById(notificationId).then((res) => {
    notifications.value.forEach((item, index) => {
      if (notificationId === item.id) notifications.value.splice(index, 1);
    });
  });
};

const markRead = (notificationId) => {
  notifications.value.forEach((item) => {
    notificationId.forEach((id) => {
      if (id === item.id) item.isSeen = true;
    });
  });
};

const markUnRead = (notificationId) => {
  notifications.value.forEach((item) => {
    notificationId.forEach((id) => {
      if (id === item.id) item.isSeen = false;
    });
  });
};

const handleNotificationClick = (notification) => {
  if (!notification.isSeen) {
    notificationListStore
      .updateIsReadByNotificationId(notification.id)
      .then((res) => {
        console.log(res)
        markRead([notification.id]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  if(notification.type == 0){
    router.push({name: 'apps-order-view-id', params: { id: notification.data }})
  }
};
echo.channel("notification-create").listen("NotificationCreated", (data) => {
  if (data.notification.type == 0) {
    orderListStore.fetchItemsByOrderId(data.notification.data).then((res) => {
      notifications.value.push({
        id: res.data?.id,
        title: res.data.title,
        subtitle: res.data.body,
        time: `${formatDate(res.data?.created_at)}`,
        isSeen: false,
        type: `${res.data?.type}`,
        data:res.data?.id,
        add_data:res.data?.add_data
      });
    });
  }else if(data.notification.type == 2){
    claimListStore.fetchClaim(data.notification.data).then((res) => {
      notifications.value.push({
        id: res.data?.id,
        title: `New Order by ${res.data?.user.name}`,
        subtitle: `This is a new Order from ${res.data?.restaurant.name}`,
        time: `${formatDate(res.data?.created_at)}`,
        isSeen: false,
        type: `${res.data?.type}`
      });
    });
  }
  // Handle the event data here
});
</script>

<template>
  <Notifications
    :notifications="notifications"
    @remove="removeNotification"
    @read="markRead"
    @unread="markUnRead"
    @click:notification="handleNotificationClick"
  />
</template>
