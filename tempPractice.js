const readFileAsArray = function(file, cb = () => {}) {
    return new Promise(async (resolve, reject) => {  //try without return
      if(typeof file === "string") {
          reject(new Error("generated error"));
          return cb(err);
      }
      const lines = file;
      await cb(null, lines);
      setTimeout(() => {
          console.log("in promise")
          resolve(lines);
      },5000)
    });
  };
  
  (async function (){
      const hello = readFileAsArray(123,callb);
      console.log("helo",hello);
  })();
  
// .then((data)=>{
//     console.log("promise",data);
// })
// .catch((err) => {
//     console.log("promise err",err);
// })

function x() {
    return "x";
}
async function y() {
    return "y";
}
function z() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("z");
        },2000)
    })
}
async function w(n1,n2) {
    return new Promise((resolve,reject) => {
        if(n2 === 0){
            reject(new Error("man error"));
        } else {
            resolve(n1/n2)
        }
    })
}
const a = x();
console.log("a",a);
const b = y();
console.log("b",b);
z().then((data) => {
    console.log("z",data);
}).catch((err) => {
    console.log("z err",err);
})

w(5,0).then((data) => {
    console.log("w",data);
}).catch((err) => {
    console.log("w err",err);
})

// (async function (){
//     const az = await z();
//     console.log("az",az);
// })();

// (async function (){
//     const aw = await w();
//     console.log("aw",aw);
// })();

function promisedDivision(n1, n2) {
  if (n2 === 0) {
    return Promise.reject(new Error('Cannot divide by 0'));
  } else {
    return Promise.resolve(n1 / n2);
  }
}
async function divideWithAwait() {
  try {
    return await promisedDivision(5, 0);
  } catch (error) {
    // Rejection caught
    console.log("---err---",error); // logs Error('Cannot divide by 0')
  }
}

async function run() {
  const result = await divideWithAwait();
}
run();

async function divideWithoutAwait() {
  try {
    return promisedDivision(5, 0);
  } catch (error) {
    // Rejection NOT caught
    console.log("-----err-----",error);
  }
}

async function run() {
  const result = await divideWithoutAwait();
}
run();

setTimeout(() => {
  console.log("setTimeout");
},0)

process.nextTick(() => {
  console.log("next tick");
})

Promise.resolve("1").then((data) => {
  console.log("promise",data);
})

setImmediate(() => {
  console.log("setImmediate");
})

console.log("normal")