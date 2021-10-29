import '../css/a.css';
import '../css/b.css';
// import '@babel/polyfill';

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('调用定时器');
    resolve();
  }, 2000);
});
console.log(promise);

const a = function a(x) {
  return x;
};

console.log(a(1));
