const EventEmitter = require("events");

const customEmitter = new EventEmitter();
customEmitter.on("response", () => {
  console.log(`Data received`);
});
customEmitter.emit("response");


const customEmitter2 = new EventEmitter();
customEmitter2.on("userData", (id, name, isMember) => {
  console.log(`Id: ${id} , username: ${name}, member status: ${isMember}`);
});
customEmitter2.emit("userData", 7567, "nihal", "not member");


const customEmitter3 = new EventEmitter();
customEmitter3.on("timer", (msg) => {
  console.log(msg);
});
setInterval(() => {
  customEmitter3.emit("timer", "Hi there!");
}, 2000);


const customEmitter4 = new EventEmitter();
const waitForEvent = () => {
  return new Promise((resolve) => {
    customEmitter4.on("happens", (msg) => resolve(msg));
  });
};
const doWait = async () => {
  const msg = await waitForEvent();
  console.log("We got an event! Here it is: ", msg);
};
doWait();
customEmitter4.emit("happens", "Hello World!");