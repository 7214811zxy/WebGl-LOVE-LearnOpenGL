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
// 创建三角几何
export function createTri(gl) {
    let positionBuffer = gl.createBuffer();
    let vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    gl.bindBuffer(byt3.gl.ARRAY_BUFFER, positionBuffer);
    triGeometry(gl);
    gl.enableVertexAttribArray( byt3.attributes.positionAttributeLocation );
    gl.vertexAttribPointer( byt3.attributes.positionAttributeLocation, 3, byt3.gl.FLOAT, false, 0, 0);
    vao.count = 6;
    return vao;
}
// 创建三角3D几何
export function createTri3D(gl) {

    // 创建VAO
    let vao = gl.createVertexArray();

    // 创建几何VBO
    let positionBuffer = gl.createBuffer();
    gl.bindVertexArray(vao);
    gl.bindBuffer(byt3.gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData( gl.ARRAY_BUFFER,  new Float32Array([
            // 正面
            200, 0,   0,
            400, 300, 0,
            0,   300, 0,

            // 背面
            200, 0,   -100,
            0,   300, -100,
            400, 300, -100,

            // 侧边1
            200, 0, 0,
            200, 0, -100,
            400, 300, 0,

            400, 300, 0,
            200, 0, -100,
            400, 300, -100,

            // 侧边2
            400, 300, 0,
            400, 300, -100,
            0, 300, -100,

            0, 300, -100,
            0, 300, 0,
            400, 300, 0,

            // 侧边3
            0, 300, 0,
            0, 300, -100,
            200, 0, -100,

            200, 0, -100,
            200, 0, 0,
            0, 300, 0
        ]), gl.STATIC_DRAW);

    let posLocation = byt3.gl.getAttribLocation(byt3.program, "a_position");
    gl.enableVertexAttribArray( posLocation );
    gl.vertexAttribPointer( posLocation, 3, byt3.gl.FLOAT, false, 0, 0);

    // 创建颜色VBO
    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(byt3.gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData( gl.ARRAY_BUFFER,  new Uint8Array([
        // 正面
        200,  70, 120,
        200,  70, 120,
        200,  70, 120,

        // 背面
        80, 70, 200, // 紫色
        80, 70, 200,
        80, 70, 200,

        // 侧边1
        160, 160, 220,
        160, 160, 220,
        160, 160, 220,

        160, 160, 220,
        160, 160, 220,
        160, 160, 220,

        // 侧边2
        90, 130, 110,
        90, 130, 110,
        90, 130, 110,

        90, 130, 110,
        90, 130, 110,
        90, 130, 110,

        // 侧边3
        140, 210, 80,
        140, 210, 80,
        140, 210, 80,

        140, 210, 80,
        140, 210, 80,
        140, 210, 80
    ]), gl.STATIC_DRAW);

    let colorLocation = byt3.gl.getAttribLocation(byt3.program, "a_color");
    gl.enableVertexAttribArray( colorLocation );
    gl.vertexAttribPointer( colorLocation, 3, gl.UNSIGNED_BYTE, true, 0, 0);

    vao.count = 24;

    return vao;
}

// 字母F几何
export function fGeometry(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            // 竖
            0,   0, 1.0,
            30,  0, 1.0,
            0, 150, 1.0,
            0, 150, 1.0,
            30,  0, 1.0,
            30,150, 1.0,

            // 长横
            30,  0, 1.0,
            100, 0, 1.0,
            30, 30, 1.0,
            30, 30, 1.0,
            100, 0, 1.0,
            100,30, 1.0,

            // 短横
            30, 60, 1.0,
            67, 60, 1.0,
            30, 90, 1.0,
            30, 90, 1.0,
            67, 60, 1.0,
            67, 90, 1.0
        ]),
        gl.STATIC_DRAW);
}
// 创建字母几何
export function createLetterF(gl) {
    let positionBuffer = gl.createBuffer();
    let vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    gl.bindBuffer(byt3.gl.ARRAY_BUFFER, positionBuffer);
    fGeometry(gl);
    gl.enableVertexAttribArray( byt3.attributes.positionAttributeLocation );
    gl.vertexAttribPointer( byt3.attributes.positionAttributeLocation, 3, byt3.gl.FLOAT, false, 0, 0);
    vao.count = 18;
    return vao;
}