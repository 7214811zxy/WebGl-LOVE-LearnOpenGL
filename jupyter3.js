// 矩阵转置
export function transpose( matrix, row, col ) {
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

// 创建GL程序
export function createProgram( gl, vertexCodeDomID, fragmentCodeDomID ) {

    // 创建Shader
    function createShader(gl, type, source) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }

    // 获取Shader程序字符串
    let vertexShaderSource = document.querySelector("#" + vertexCodeDomID).text;
    let fragmentShaderSource = document.querySelector("#" + fragmentCodeDomID).text;

    // 创建两个Shader程序
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // 生成并连接GL程序
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader );
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    gl.deleteProgram(program);
}

// 创建GL上下文
export function creatContext( domID ) {
    let canvas = document.querySelector("#" +  domID);
    let gl = canvas.getContext("webgl2");
    if (!gl) {
        console.error('未找到用于生成WebGL上下文的DOM元素');
        return;
    }
    byt3.gl = gl;
}

// 获取属性位置


// 三角形几何
export function triGeometry(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            200.0, 0.0,   1.0,
            0.0,   300.0, 1.0,
            400.0, 300.0, 1.0
        ]),
        gl.STATIC_DRAW);
}