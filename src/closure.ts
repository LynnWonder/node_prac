function autoAdd() {
    let init:number = 0;
    // tslint:disable-next-line:only-arrow-functions
    return function (){
        init++;
        return init;
    };
}
// 直接使用 autoAdd()() 其实还是会先走 init 的初值定义
// 因为 autoAdd()() 执行完即被销毁，下次调用就重建重新开辟了一块新空间
console.info(autoAdd()());
console.info(autoAdd()());

// add 其实就是闭包函数，它不再走 init 的初值定义，会将 init 的值保存下来
let add = autoAdd();
console.info(add());
console.info(add());

// 及时释放掉闭包
// @ts-ignore
add = null;