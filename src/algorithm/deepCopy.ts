/**
 * deep copy of source, use recursion
 * https://juejin.cn/post/7072528644739956773#heading-9
 * @param source
 */
function deepCopySimple(source: any): any {
    if (typeof source !== 'object'){
        return source
    }
    let res: any;
    if(typeof source ==='object'){
        res=(source instanceof Array)?[]:{};
        for(let i in source){
            res[i]=deepCopySimple(source[i]);
        }
    }else{
        res=source;
    }
    return res;
}

/***
 * 优化步骤：
 * 1. 更多类型的限制：Date Regexp null
 * 2. 处理 symbol 类型数据，它没法使用 for in 来进行枚举
 * 3. 使用构造器
 * 4. 解决循环引用问题，使用哈希表来暂存值，但缺点是如果原对象为空了，但是哈希表中对对象的引用不会随原对象的回收而被回收，所以使用 weakmap
 * @param source
 * @param hash
 */
function deepCopy(source: any, hash: any=new WeakMap<any, any>): any {
    if (typeof source !== 'object'){
        return source
    }
    // handle null Date Regexp
    if (source === null) return null;
    if (source instanceof Date){
        return new Date(source)
    }
    if (source instanceof RegExp){
        return new RegExp(source)
    }
    if(hash.has(source)){
        return hash.get(source)
    }


    let res = new source.constructor();
    hash.set(source, res)

    if(typeof source ==='object'){
        // 解决 symbol 类型数据
        // Reflect.ownKeys 方法返回一个由目标对象自身的属性键组成的数组。
        // 它的返回值等同于Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))。
        Reflect.ownKeys(source).forEach(key =>{
            res[key]=deepCopy(source[key], hash);
        })
    }else{
        res=source;
    }
    return res;
}
let test:any = {"a":"test"};
let test_copy = deepCopy(test);
let test_json = JSON.parse(JSON.stringify(test));
let undefined_test = {"a":undefined};
let un_json_null = JSON.parse(JSON.stringify(undefined_test));

// let null_test = null;
// let test_json_null = JSON.parse(JSON.stringify(null_test));
test["b"] = "zero";
let arr:string[] = ["test"]
let arr_copy = deepCopy(arr)
arr[1] = "zero";
let date_now = new Date()
// symbol 类型
let sym = Symbol('test')
let sym_copy = deepCopy(sym)
// 处理循环引用问题
let obj:any = {"test": "test"}
obj.obj =  obj
let obj_deep = deepCopy(obj)
console.log(test_copy, test_json, test);
console.log(undefined_test, un_json_null, arr_copy);
console.log(date_now, deepCopy(date_now))
console.log(typeof(sym), sym_copy, typeof(sym_copy))
console.log(obj, obj_deep)

