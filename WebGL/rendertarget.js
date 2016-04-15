/**
 * Created by Exbo on 2015/12/5.
 */


function WebglRenderTarget(w,h){
    var gl=_gl;
    var t = gl.createTexture();
    var rb = gl.createRenderbuffer();
    var fb=gl.createFramebuffer();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, w, h, 0, gl.RGB, gl.UNSIGNED_BYTE, null);


    gl.bindRenderbuffer(gl.RENDERBUFFER, rb);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, w, h);

    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, rb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);

    this.webgl=1;
    this.type=stg_const.TEX_CANVAS3D_TARGET;
    this.gltex=t;
    this.width=w;
    this.height=h;
    this.buffer=fb;
    this.d_buffer=rb;
    this.ready=1;
}

WebglRenderTarget.prototype.use=function(){
    var gl=_gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.buffer);
};

WebglRenderTarget.prototype.release=function(){
    var gl=_gl;
    gl.deleteRenderbuffer(this.d_buffer);
    gl.deleteFramebuffer(this.buffer);
    gl.deleteTexture(this.t);
};