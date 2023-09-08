import Echo from "laravel-echo";
import Pusher from "pusher-js";

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

export default echo;