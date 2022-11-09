import data from "./data.json" assert { type: "json" };
import {Example} from './example.js'
import {Claster} from './claster.js'
import fs from 'fs'

let k = 3
let startPoses = []

function main(){
    let examples = []
    data['examples'].forEach(item => {
        examples.push(new Example(item['name'], item['X'], item['Y'], item['Z']))
    })

    let currentPoses = []
    // for (var i = 0; i < k; i++){
    //     startPoses.push(new Claster(i, i + 1))
    // }
    startPoses.push(new Claster(25000, 65, 20000))
    startPoses.push(new Claster(30000, 70, 25000))
    startPoses.push(new Claster(20000, 60, 15000))
    //startPoses.push(new Claster(15000, 55, 10000))
    //startPoses.push(new Claster(3, 1))

    examples = calc(examples)
    let values = recalcClasterPos(examples)
    values.forEach(claster => {
        currentPoses.push(claster)
    })

    while (JSON.stringify(currentPoses) !== JSON.stringify(startPoses)) {
        startPoses.splice(0, startPoses.length)
        currentPoses.forEach(claster => {
            startPoses.push(claster)
        })

        examples = calc(examples)
        values = recalcClasterPos(examples)

        currentPoses.splice(0, currentPoses.length)
        values.forEach(claster => {
            currentPoses.push(claster)
        })
    }

    for (var i = 0; i < k; i++){
        fs.writeFileSync(`claster${i}${k}.json`, JSON.stringify(examples.filter(example => example.claster === i), null, 3));
        console.log(JSON.stringify(examples.filter(example => example.claster === i), null, 3))
    }
    console.log(JSON.stringify(currentPoses))
}


function calc(examples){
    let E = 0
    examples.forEach(item =>{
        item.r = Math.sqrt(Math.pow(item.x - startPoses[0].x, 2) + Math.pow(item.y - startPoses[0].y, 2) + Math.pow(item.z - startPoses[0].z, 2))
        let min = item.r
        item.claster = 0;
        for (var i = 1; i < k; i++){
            item.r = Math.sqrt(Math.pow(item.x - startPoses[i].x, 2) + Math.pow(item.y - startPoses[i].y, 2) + Math.pow(item.z - startPoses[i].z, 2))
            if (item.r < min){
                min = item.r
                item.claster = i
            }
        }
        item.r = min
        E += Math.pow(min, 2)
    })
    console.log(E)
    return examples
}

function recalcClasterPos(examples){
    let arr = []
    for (var i = 0; i < k; i++){
        let cx = examples.filter(example => example.claster === i).reduce((accumulator, object) => {
            return accumulator + object.x;
        }, 0);
        let cy = examples.filter(example => example.claster === i).reduce((accumulator, object) => {
            return accumulator + object.y;
        }, 0);
        let cz = examples.filter(example => example.claster === i).reduce((accumulator, object) => {
            return accumulator + object.z;
        }, 0);
        let cnt = examples.filter(example => example.claster === i).length
        arr.push(new Claster(cx/cnt, cy/cnt, cz/cnt))
    }
    return arr
}

main()