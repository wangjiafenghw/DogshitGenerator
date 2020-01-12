import { createCanvas, loadImage } from 'canvas'
import * as fs from 'fs-extra';
import source from './source'
import colors from './colors'
const arg: string[] = process.argv.splice(2);
// console.log(parseInt(arguments[0]))

const WIDTH = 200;
const HEIGHT = 200;

let proDiv = []
let output = []

// 随机数发生器
const getRandom = (max: number = 0, min: number = 0): number => {
    return Math.floor(Math.random() * (max-min)) + min;
}

const fillImage = (ctx): any => {
    let proAll = []
    let num = arg[1] ? Number(arg[1]) : 10;
    while(num-- > 0){
        proAll.push(
            new Promise((resolve: any)=>{
                loadImage(source[getRandom(source.length-1)]).then((image) => {
                    ctx.drawImage(image, getRandom(WIDTH), getRandom(HEIGHT), getRandom(WIDTH), getRandom(HEIGHT))
                    resolve()
                })
            })
        )
    }

    return Promise.all(proAll)
}

const getImage = (index: number) => {
    return new Promise((resolve, reject)=>{
        // 建立canvas
        let canvas = createCanvas(WIDTH, HEIGHT)
        let ctx = canvas.getContext('2d')
        // 背景色
        ctx.fillStyle = typeof colors === 'object' ? colors[getRandom(colors.length-1)].hex : '#000000'
        ctx.fillRect(0,0,WIDTH,HEIGHT);
        
        fillImage(ctx).then(()=>{
            output[index] = canvas.toDataURL()
            resolve()
        })
    })
}

// const timer = (timeout=10000) => {
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{ resolve() }, timeout)
//     })
// }

const main = () => {
    console.log('玩儿命生成中。。。')
    let num = arg[0] ? Number(arg[0]) : 1
    while(num-- > 0){
        proDiv.push(getImage(num))
    }
    Promise.all(proDiv).then(async()=>{
        // console.log(JSON.stringify(output))
        await fs.writeFileSync('./output.js', `var data = ${JSON.stringify(output)}`)
        console.log(`${arg[0] ? Number(arg[0]) : 1} 张图片完成，下班`)
    })
}

main()
