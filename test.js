const readline = require('readline');
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let count = 1;
let answer = [];
let success = false;

// 볼, 스트라이크 판독 함수
let solution = function (mySet , ans) {
    let strike = ball = 0;
    let arr = [...mySet];
    for (let i = 0; i < 3; i++) {
        if(arr.includes(ans[i])) {
            if(ans[i] === arr[i])
                strike++;
            else
                ball++;
        }
    }
    if (strike === 3) {
        success = true;
        console.log(`${strike}S\n${count}번 만에 맞히셨습니다.\n게임을 종료합니다.`);
    }
    else {
        success = false;
        if (strike === 0)
            console.log(`${ball}B`);
        else if (ball === 0)
            console.log(`${strike}S`);
        else
            console.log(`${ball}B${strike}S`);
    }
}

// 랜덤 숫자 3개 생성
const mySet = new Set();
while (mySet.size < 3)
    mySet.add(Math.floor(Math.random() * 10));

console.log("컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!");
process.stdout.write(`${count}번째 시도 : `);

// 성공할 때 까지 입력 시도
reader.on('line', (line) => {
    answer = line.split('').map((num) => parseInt(num));
    solution(mySet, answer);
    if(!success)
        process.stdout.write(`${++count}번째 시도 : `);
    else
        reader.close();   
});
reader.on('close', () => {
    reader.close();
    process.exit();
});