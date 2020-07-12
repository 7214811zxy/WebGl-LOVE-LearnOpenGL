// 矩阵转置
function transpose( matrix, row, col ) {
    let arrayEncode = {};
    let arrayDecode = [];
    let index = 0;

    // 对原数组编码
    for( let i = 1; i <= row; i++ ){
        for( let j = 1; j <= col; j++ ){
            arrayEncode[ i + '' + j] = matrix[index];
            index += 1;
        }
    }

    // 解码数组
    index = 0;
    for( let i = 1; i <= col; i++ ){
        for( let j = 1; j <= row; j++ ){
            arrayDecode[ index ] = arrayEncode[j + '' + i];
            index += 1;
        }
    }

    return arrayDecode
}
// 转置Demo
console.log('-----------矩阵转置Demo-----------');
let testMatrix1 = [
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.3, 0.5, 1.0
];
let testMatrix2 = [
    1.0, 0.0,
    0.0, 1.0,
    0.3, 0.5
];
console.log( transpose( testMatrix1, 3, 3 ) );
console.log( transpose( testMatrix2, 3, 2 ) );