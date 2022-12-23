console.log(c)
// 函数提升优先于变量提升，会提升到最前面
// tslint:disable-next-line:no-empty
function c(){}

// TDZ 问题
// var tmp = 123;
// if(true){
//     tmp = '123';
//     // tmp 进入了 Temproal dead zone
//     let tmp;
// }
// console.info(tmp);