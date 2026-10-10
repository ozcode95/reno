const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./src-BgDMISwm.js","./MeshBVH-B6lI7nUC.js","./workers-B_eBEtFL.js"])))=>i.map(i=>d[i]);
import{$ as e,$n as t,A as n,An as r,At as i,B as a,Bn as o,C as s,Cn as c,Cr as l,Ct as u,D as d,Dn as f,Dr as p,Dt as m,E as h,Er as g,Et as _,F as v,Fn as y,Ft as b,G as x,Gn as S,H as C,I as w,In as T,It as E,J as D,Jn as O,K as k,Kn as A,L as j,Ln as M,Lt as ee,M as te,Mt as ne,N,Nt as re,O as P,On as F,Or as ie,Ot as ae,P as oe,Pt as se,Q as ce,Qn as le,R as ue,Rn as de,Sn as fe,Sr as pe,St as me,T as he,Tr as ge,Tt as _e,U as ve,Ut as ye,V as be,Vn as xe,W as Se,Wn as Ce,Wt as we,Xn as Te,Y as Ee,Yn as De,Z as Oe,Zn as ke,_ as Ae,_r as I,_t as je,at as Me,b as Ne,bn as L,br as Pe,bt as R,cr as Fe,ct as Ie,dr as z,dt as Le,er as Re,et as ze,fr as Be,ft as Ve,g as He,gr as Ue,gt as We,h as Ge,hr as Ke,ht as qe,ir as Je,it as Ye,j as Xe,jt as Ze,k as Qe,kn as $e,kt as et,lr as tt,lt as nt,m as rt,mr as it,mt as at,nr as ot,nt as st,or as ct,ot as lt,pt as ut,q as dt,rt as ft,sr as pt,st as mt,t as ht,tr as gt,ur as B,v as _t,vr as vt,vt as V,w as yt,wn as bt,wr as xt,wt as St,xn as Ct,xr as wt,xt as Tt,y as Et,yr as Dt,yt as Ot,z as kt,zn as At,zt as jt}from"./MeshBVH-B6lI7nUC.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function Mt(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Nt(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Pt={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},H={common:{diffuse:{value:new d(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new B(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new d(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new z},probesMax:{value:new z},probesResolution:{value:new z}},points:{diffuse:{value:new d(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new d(16777215)},opacity:{value:1},center:{value:new B(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},Ft={basic:{uniforms:ge([H.common,H.specularmap,H.envmap,H.aomap,H.lightmap,H.fog]),vertexShader:Pt.meshbasic_vert,fragmentShader:Pt.meshbasic_frag},lambert:{uniforms:ge([H.common,H.specularmap,H.envmap,H.aomap,H.lightmap,H.emissivemap,H.bumpmap,H.normalmap,H.displacementmap,H.fog,H.lights,{emissive:{value:new d(0)},envMapIntensity:{value:1}}]),vertexShader:Pt.meshlambert_vert,fragmentShader:Pt.meshlambert_frag},phong:{uniforms:ge([H.common,H.specularmap,H.envmap,H.aomap,H.lightmap,H.emissivemap,H.bumpmap,H.normalmap,H.displacementmap,H.fog,H.lights,{emissive:{value:new d(0)},specular:{value:new d(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Pt.meshphong_vert,fragmentShader:Pt.meshphong_frag},standard:{uniforms:ge([H.common,H.envmap,H.aomap,H.lightmap,H.emissivemap,H.bumpmap,H.normalmap,H.displacementmap,H.roughnessmap,H.metalnessmap,H.fog,H.lights,{emissive:{value:new d(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Pt.meshphysical_vert,fragmentShader:Pt.meshphysical_frag},toon:{uniforms:ge([H.common,H.aomap,H.lightmap,H.emissivemap,H.bumpmap,H.normalmap,H.displacementmap,H.gradientmap,H.fog,H.lights,{emissive:{value:new d(0)}}]),vertexShader:Pt.meshtoon_vert,fragmentShader:Pt.meshtoon_frag},matcap:{uniforms:ge([H.common,H.bumpmap,H.normalmap,H.displacementmap,H.fog,{matcap:{value:null}}]),vertexShader:Pt.meshmatcap_vert,fragmentShader:Pt.meshmatcap_frag},points:{uniforms:ge([H.points,H.fog]),vertexShader:Pt.points_vert,fragmentShader:Pt.points_frag},dashed:{uniforms:ge([H.common,H.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Pt.linedashed_vert,fragmentShader:Pt.linedashed_frag},depth:{uniforms:ge([H.common,H.displacementmap]),vertexShader:Pt.depth_vert,fragmentShader:Pt.depth_frag},normal:{uniforms:ge([H.common,H.bumpmap,H.normalmap,H.displacementmap,{opacity:{value:1}}]),vertexShader:Pt.meshnormal_vert,fragmentShader:Pt.meshnormal_frag},sprite:{uniforms:ge([H.sprite,H.fog]),vertexShader:Pt.sprite_vert,fragmentShader:Pt.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Pt.background_vert,fragmentShader:Pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:Pt.backgroundCube_vert,fragmentShader:Pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Pt.cube_vert,fragmentShader:Pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Pt.equirect_vert,fragmentShader:Pt.equirect_frag},distance:{uniforms:ge([H.common,H.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Pt.distance_vert,fragmentShader:Pt.distance_frag},shadow:{uniforms:ge([H.lights,H.fog,{color:{value:new d(0)},opacity:{value:1}}]),vertexShader:Pt.shadow_vert,fragmentShader:Pt.shadow_frag}};Ft.physical={uniforms:ge([Ft.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new B(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new d(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new B},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new d(0)},specularColor:{value:new d(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new B},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Pt.meshphysical_vert,fragmentShader:Pt.meshphysical_frag};var It={r:0,b:0,g:0},Lt=new V,Rt=new je;Rt.set(-1,0,0,0,1,0,0,0,1);function zt(e,t,n,r,i,a){let o=new d(0),s=i===!0?0:1,c,u,f=null,p=0,m=null;function h(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function g(t){let r=!1,i=h(t);i===null?v(o,s):i&&i.isColor&&(v(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function _(t,n){let i=h(n);i&&(i.isCubeTexture||i.mapping===306)?(u===void 0&&(u=new Ot(new _t(1,1,1),new de({name:`BackgroundCubeMaterial`,uniforms:vt(Ft.backgroundCube.uniforms),vertexShader:Ft.backgroundCube.vertexShader,fragmentShader:Ft.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=i,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Lt.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(Rt),u.material.toneMapped=P.getTransfer(i.colorSpace)!==T,(f!==i||p!==i.version||m!==e.toneMapping)&&(u.material.needsUpdate=!0,f=i,p=i.version,m=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Ot(new se(2,2),new de({name:`BackgroundMaterial`,uniforms:vt(Ft.background.uniforms),vertexShader:Ft.background.vertexShader,fragmentShader:Ft.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=P.getTransfer(i.colorSpace)!==T,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(f!==i||p!==i.version||m!==e.toneMapping)&&(c.material.needsUpdate=!0,f=i,p=i.version,m=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function v(t,r){t.getRGB(It,l(e)),n.buffers.color.setClear(It.r,It.g,It.b,r,a)}function y(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,v(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,v(o,s)},render:g,addToRenderList:_,dispose:y}}function Bt(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Vt(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Ht(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(p(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&p(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let m=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_TEXTURE_SIZE),_=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),v=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),b=e.getParameter(e.MAX_VARYING_VECTORS),x=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),S=e.getParameter(e.MAX_SAMPLES),C=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:m,maxVertexTextures:h,maxTextureSize:g,maxCubemapSize:_,maxAttributes:v,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:x,maxSamples:S,samples:C}}function Ut(e){let t=this,n=null,r=0,i=!1,a=!1,o=new re,s=new je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Wt=4,Gt=6,Kt=20,qt=256,Jt=new Ze,Yt=new d,Xt=null,Zt=0,Qt=0,$t=!1,en=new z,tn=new z,nn=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=en}=i;Xt=this._renderer.getRenderTarget(),Zt=this._renderer.getActiveCubeFace(),Qt=this._renderer.getActiveMipmapLevel(),$t=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=un(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ln(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Xt,Zt,Qt),this._renderer.xr.enabled=$t,e.scissorTest=!1,on(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Xt=this._renderer.getRenderTarget(),Zt=this._renderer.getActiveCubeFace(),Qt=this._renderer.getActiveMipmapLevel(),$t=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:nt,minFilter:nt,generateMipmaps:!1,type:ce,format:ye,colorSpace:ut,depthBuffer:!1},r=an(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=an(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=rn(r)),this._blurMaterial=cn(r,e,t),this._ggxMaterial=sn(r,e,t)}return r}_compileMaterial(e){let t=new Ot(new Ne,e);this._renderer.compile(t,Jt)}_sceneToCubeUV(e,t,n,r,i){let a=new ne(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Yt),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ot(new _t,new R({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Yt),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;on(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=un()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ln());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;on(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Jt)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Wt?n-d+Wt:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,on(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Jt),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,on(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Jt)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];on(t,3*l*(r>this._lodMax-Wt?r-this._lodMax+Wt:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Jt)}};function rn(e){let t=[],n=[],r=e,i=e-Wt+1+Gt;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?tn.set(1,r,n):e===1?tn.set(-n,1,-r):e===2?tn.set(-n,r,1):e===3?tn.set(-1,r,-n):e===4?tn.set(-n,-1,r):tn.set(n,r,-1),tn.toArray(l,(e*6+t)*3)}}let u=new Ne;u.setAttribute(`position`,new Et(c,3)),u.setAttribute(`outputDirection`,new Et(l,3)),n.push(new Ot(u,null)),r>Wt&&r--}return{lodMeshes:n,sizeLods:t}}function an(e,t,n){let r=new Ke(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function on(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function sn(e,t,n){return new de({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:qt,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:dn(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function cn(e,t,n){return new de({name:`SphericalGaussianBlur`,defines:{SAMPLES:Kt,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:dn(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ln(){return new de({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:dn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function un(){return new de({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function dn(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var fn=class extends Ke{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new te(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new _t(5,5,5),a=new de({name:`CubemapFromEquirect`,uniforms:vt(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:1,blending:0});a.uniforms.tEquirect.value=t;let o=new Ot(i,a),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=nt),new n(1,10,this).update(e,o),t.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function pn(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new fn(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new nn(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new nn(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function mn(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&ie(`WebGLRenderer: `+e+` extension not supported.`),t}}}function hn(e,n,r,i){let a={},o=new WeakMap;function s(e){let t=e.target;t.index!==null&&n.remove(t.index);for(let e in t.attributes)n.remove(t.attributes[e]);t.removeEventListener(`dispose`,s),delete a[t.id];let c=o.get(t);c&&(n.remove(c),o.delete(t)),i.releaseStatesOfGeometry(t),t.isInstancedBufferGeometry===!0&&delete t._maxInstanceCount,r.memory.geometries--}function c(e,t){return a[t.id]===!0?t:(t.addEventListener(`dispose`,s),a[t.id]=!0,r.memory.geometries++,t)}function l(t){let r=t.attributes;for(let t in r)n.update(r[t],e.ARRAY_BUFFER)}function u(e){let r=[],i=e.index,a=e.attributes.position,s=0;if(a===void 0)return;if(i!==null){let e=i.array;s=i.version;for(let t=0,n=e.length;t<n;t+=3){let n=e[t+0],i=e[t+1],a=e[t+2];r.push(n,i,i,a,a,n)}}else{let e=a.array;s=a.version;for(let t=0,n=e.length/3-1;t<n;t+=3){let e=t+0,n=t+1,i=t+2;r.push(e,n,n,i,i,e)}}let c=new(a.count>=65535?Re:t)(r,1);c.version=s;let l=o.get(e);l&&n.remove(l),o.set(e,c)}function d(e){let t=o.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&u(e)}else u(e);return o.get(e)}return{get:c,update:l,getWireframeAttribute:d}}function gn(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function _n(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:wt(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function vn(e,t,n){let r=new WeakMap,i=new Be;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new v(h,p,m,u);g.type=dt,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new B(p,m)},r.set(o,d);function y(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function yn(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var bn={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function xn(e,t,n,r,i,a){let o=new Ke(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Ne;l.setAttribute(`position`,new k([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new k([0,2,0,0,2,0],2));let u=new fe({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Ot(l,u),f=new Ze(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new Ke(t,n,{type:ce,depthBuffer:!1,stencilBuffer:!1}),c=new Ke(t,n,{type:ce,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},P.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=bn[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Sn=new De,Cn=new be(1,1),wn=new v,Tn=new oe,En=new te,Dn=[],On=[],kn=new Float32Array(16),An=new Float32Array(9),jn=new Float32Array(4);function Mn(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Dn[i];if(a===void 0&&(a=new Float32Array(i),Dn[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Nn(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Pn(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Fn(e,t){let n=On[t];n===void 0&&(n=new Int32Array(t),On[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function In(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Ln(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Nn(n,t))return;e.uniform2fv(this.addr,t),Pn(n,t)}}function Rn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Nn(n,t))return;e.uniform3fv(this.addr,t),Pn(n,t)}}function zn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Nn(n,t))return;e.uniform4fv(this.addr,t),Pn(n,t)}}function Bn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Nn(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Pn(n,t)}else{if(Nn(n,r))return;jn.set(r),e.uniformMatrix2fv(this.addr,!1,jn),Pn(n,r)}}function Vn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Nn(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Pn(n,t)}else{if(Nn(n,r))return;An.set(r),e.uniformMatrix3fv(this.addr,!1,An),Pn(n,r)}}function Hn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Nn(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Pn(n,t)}else{if(Nn(n,r))return;kn.set(r),e.uniformMatrix4fv(this.addr,!1,kn),Pn(n,r)}}function Un(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Wn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Nn(n,t))return;e.uniform2iv(this.addr,t),Pn(n,t)}}function Gn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Nn(n,t))return;e.uniform3iv(this.addr,t),Pn(n,t)}}function Kn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Nn(n,t))return;e.uniform4iv(this.addr,t),Pn(n,t)}}function qn(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Jn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Nn(n,t))return;e.uniform2uiv(this.addr,t),Pn(n,t)}}function Yn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Nn(n,t))return;e.uniform3uiv(this.addr,t),Pn(n,t)}}function Xn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Nn(n,t))return;e.uniform4uiv(this.addr,t),Pn(n,t)}}function Zn(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Cn.compareFunction=n.isReversedDepthBuffer()?518:515,a=Cn):a=Sn,n.setTexture2D(t||a,i)}function Qn(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Tn,i)}function $n(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||En,i)}function er(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||wn,i)}function tr(e){switch(e){case 5126:return In;case 35664:return Ln;case 35665:return Rn;case 35666:return zn;case 35674:return Bn;case 35675:return Vn;case 35676:return Hn;case 5124:case 35670:return Un;case 35667:case 35671:return Wn;case 35668:case 35672:return Gn;case 35669:case 35673:return Kn;case 5125:return qn;case 36294:return Jn;case 36295:return Yn;case 36296:return Xn;case 35678:case 36198:case 36298:case 36306:case 35682:return Zn;case 35679:case 36299:case 36307:return Qn;case 35680:case 36300:case 36308:case 36293:return $n;case 36289:case 36303:case 36311:case 36292:return er}}function nr(e,t){e.uniform1fv(this.addr,t)}function rr(e,t){let n=Mn(t,this.size,2);e.uniform2fv(this.addr,n)}function ir(e,t){let n=Mn(t,this.size,3);e.uniform3fv(this.addr,n)}function ar(e,t){let n=Mn(t,this.size,4);e.uniform4fv(this.addr,n)}function or(e,t){let n=Mn(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function sr(e,t){let n=Mn(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function cr(e,t){let n=Mn(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function lr(e,t){e.uniform1iv(this.addr,t)}function ur(e,t){e.uniform2iv(this.addr,t)}function dr(e,t){e.uniform3iv(this.addr,t)}function fr(e,t){e.uniform4iv(this.addr,t)}function pr(e,t){e.uniform1uiv(this.addr,t)}function mr(e,t){e.uniform2uiv(this.addr,t)}function hr(e,t){e.uniform3uiv(this.addr,t)}function gr(e,t){e.uniform4uiv(this.addr,t)}function _r(e,t,n){let r=this.cache,i=t.length,a=Fn(n,i);Nn(r,a)||(e.uniform1iv(this.addr,a),Pn(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Cn:Sn;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function vr(e,t,n){let r=this.cache,i=t.length,a=Fn(n,i);Nn(r,a)||(e.uniform1iv(this.addr,a),Pn(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Tn,a[e])}function yr(e,t,n){let r=this.cache,i=t.length,a=Fn(n,i);Nn(r,a)||(e.uniform1iv(this.addr,a),Pn(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||En,a[e])}function br(e,t,n){let r=this.cache,i=t.length,a=Fn(n,i);Nn(r,a)||(e.uniform1iv(this.addr,a),Pn(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||wn,a[e])}function xr(e){switch(e){case 5126:return nr;case 35664:return rr;case 35665:return ir;case 35666:return ar;case 35674:return or;case 35675:return sr;case 35676:return cr;case 5124:case 35670:return lr;case 35667:case 35671:return ur;case 35668:case 35672:return dr;case 35669:case 35673:return fr;case 5125:return pr;case 36294:return mr;case 36295:return hr;case 36296:return gr;case 35678:case 36198:case 36298:case 36306:case 35682:return _r;case 35679:case 36299:case 36307:return vr;case 35680:case 36300:case 36308:case 36293:return yr;case 36289:case 36303:case 36311:case 36292:return br}}var Sr=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=tr(t.type)}},Cr=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=xr(t.type)}},wr=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Tr=/(\w+)(\])?(\[|\.)?/g;function Er(e,t){e.seq.push(t),e.map[t.id]=t}function Dr(e,t,n){let r=e.name,i=r.length;for(Tr.lastIndex=0;;){let a=Tr.exec(r),o=Tr.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Er(n,l===void 0?new Sr(s,e,t):new Cr(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new wr(s),Er(n,e)),n=e}}}var Or=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Dr(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function kr(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Ar=37297,jr=0;function Mr(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Nr=new je;function Pr(e){P._getMatrix(Nr,P.workingColorSpace,e);let t=`mat3( ${Nr.elements.map(e=>e.toFixed(4))} )`;switch(P.getTransfer(e)){case at:return[t,`LinearTransferOETF`];case T:return[t,`sRGBTransferOETF`];default:return p(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Fr(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Mr(e.getShaderSource(t),r)}return i}function Ir(e,t){let n=Pr(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Lr={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Rr(e,t){let n=Lr[t];return n===void 0?(p(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var zr=new z;function Br(){return P.getLuminanceCoefficients(zr),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${zr.x.toFixed(4)}, ${zr.y.toFixed(4)}, ${zr.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Vr(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Wr).join(`
`)}function Hr(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Ur(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Wr(e){return e!==``}function Gr(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Kr(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var qr=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jr(e){return e.replace(qr,Xr)}var Yr=new Map;function Xr(e,t){let n=Pt[t];if(n===void 0){let e=Yr.get(t);if(e!==void 0)n=Pt[e],p(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Jr(n)}var Zr=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qr(e){return e.replace(Zr,$r)}function $r(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function ei(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var ti={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function ni(e){return ti[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var ri={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function ii(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:ri[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var ai={302:`ENVMAP_MODE_REFRACTION`};function oi(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:ai[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var si={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function ci(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:si[e.combine]||`ENVMAP_BLENDING_NONE`}function li(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function ui(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=ni(n),l=ii(n),u=oi(n),d=ci(n),f=li(n),m=Vr(n),h=Hr(a),g=i.createProgram(),_,v,y=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter(Wr).join(`
`),_.length>0&&(_+=`
`),v=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter(Wr).join(`
`),v.length>0&&(v+=`
`)):(_=[ei(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Wr).join(`
`),v=[ei(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Pt.tonemapping_pars_fragment,n.toneMapping===0?``:Rr(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Pt.colorspace_pars_fragment,Ir(`linearToOutputTexel`,n.outputColorSpace),Br(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Wr).join(`
`)),o=Jr(o),o=Gr(o,n),o=Kr(o,n),s=Jr(s),s=Gr(s,n),s=Kr(s,n),o=Qr(o),s=Qr(s),n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,_=[m,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+_,v=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+v);let b=y+_+o,x=y+v+s,S=kr(i,i.VERTEX_SHADER,b),C=kr(i,i.FRAGMENT_SHADER,x);i.attachShader(g,S),i.attachShader(g,C),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(g,0,`position`):i.bindAttribLocation(g,0,n.index0AttributeName),i.linkProgram(g);function w(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(g)||``,r=i.getShaderInfoLog(S)||``,a=i.getShaderInfoLog(C)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,g,S,C);else{let e=Fr(i,S,`vertex`),n=Fr(i,C,`fragment`);wt(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):p(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:_},fragmentShader:{log:c,prefix:v}})}i.deleteShader(S),i.deleteShader(C),T=new Or(i,g),E=Ur(i,g)}let T;this.getUniforms=function(){return T===void 0&&w(this),T};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let D=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=i.getProgramParameter(g,Ar)),D},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=jr++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=C,this}var di=0,fi=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new pi(e),t.set(e,n)),n}},pi=class{constructor(e){this.id=di++,this.code=e,this.usedTimes=0}};function mi(e){return e===1030||e===37490||e===36285}function hi(e,t,n,r,i,a){let o=new Ye,s=new fi,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,m={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function h(e){return c.add(e),e===0?`uv`:`uv${e}`}function g(i,o,l,u,g,_){let v=u.fog,y=g.geometry,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,x=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,S=t.get(i.envMap||b,x),C=S&&S.mapping===306?S.image.height:null,w=m[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&p(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let T=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,E=T===void 0?0:T.length,D=0;y.morphAttributes.position!==void 0&&(D=1),y.morphAttributes.normal!==void 0&&(D=2),y.morphAttributes.color!==void 0&&(D=3);let O,k,A,j;if(w){let e=Ft[w];O=e.vertexShader,k=e.fragmentShader}else{O=i.vertexShader,k=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),A=e.id,j=t.id}let M=e.getRenderTarget(),ee=e.state.buffers.depth.getReversed(),te=g.isInstancedMesh===!0,ne=g.isBatchedMesh===!0,N=!!i.map,re=!!i.matcap,F=!!S,ie=!!i.aoMap,ae=!!i.lightMap,oe=!!i.bumpMap&&i.wireframe===!1,se=!!i.normalMap,ce=!!i.displacementMap,le=!!i.emissiveMap,ue=!!i.metalnessMap,de=!!i.roughnessMap,fe=i.anisotropy>0,pe=i.clearcoat>0,me=i.dispersion>0,he=i.retroreflectivity>0,ge=i.iridescence>0,_e=i.sheen>0,ve=i.transmission>0,ye=fe&&!!i.anisotropyMap,be=pe&&!!i.clearcoatMap,xe=pe&&!!i.clearcoatNormalMap,Se=pe&&!!i.clearcoatRoughnessMap,Ce=ge&&!!i.iridescenceMap,we=ge&&!!i.iridescenceThicknessMap,Te=_e&&!!i.sheenColorMap,Ee=_e&&!!i.sheenRoughnessMap,De=!!i.specularMap,Oe=!!i.specularColorMap,ke=!!i.specularIntensityMap,Ae=ve&&!!i.transmissionMap,I=ve&&!!i.thicknessMap,je=!!i.gradientMap,Me=!!i.alphaMap,Ne=i.alphaTest>0,L=!!i.alphaHash,Pe=!!i.extensions,R=0;i.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(R=e.toneMapping);let Fe={shaderID:w,shaderType:i.type,shaderName:i.name,vertexShader:O,fragmentShader:k,defines:i.defines,customVertexShaderID:A,customFragmentShaderID:j,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:ne,batchingColor:ne&&g._colorsTexture!==null,instancing:te,instancingColor:te&&g.instanceColor!==null,instancingMorph:te&&g.morphTexture!==null,outputColorSpace:M===null?e.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:P.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:N,matcap:re,envMap:F,envMapMode:F&&S.mapping,envMapCubeUVHeight:C,aoMap:ie,lightMap:ae,bumpMap:oe,normalMap:se,displacementMap:ce,emissiveMap:le,normalMapObjectSpace:se&&i.normalMapType===1,normalMapTangentSpace:se&&i.normalMapType===0,packedNormalMap:se&&i.normalMapType===0&&mi(i.normalMap.format),metalnessMap:ue,roughnessMap:de,anisotropy:fe,anisotropyMap:ye,clearcoat:pe,clearcoatMap:be,clearcoatNormalMap:xe,clearcoatRoughnessMap:Se,dispersion:me,retroreflection:he,iridescence:ge,iridescenceMap:Ce,iridescenceThicknessMap:we,sheen:_e,sheenColorMap:Te,sheenRoughnessMap:Ee,specularMap:De,specularColorMap:Oe,specularIntensityMap:ke,transmission:ve,transmissionMap:Ae,thicknessMap:I,gradientMap:je,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Me,alphaTest:Ne,alphaHash:L,combine:i.combine,mapUv:N&&h(i.map.channel),aoMapUv:ie&&h(i.aoMap.channel),lightMapUv:ae&&h(i.lightMap.channel),bumpMapUv:oe&&h(i.bumpMap.channel),normalMapUv:se&&h(i.normalMap.channel),displacementMapUv:ce&&h(i.displacementMap.channel),emissiveMapUv:le&&h(i.emissiveMap.channel),metalnessMapUv:ue&&h(i.metalnessMap.channel),roughnessMapUv:de&&h(i.roughnessMap.channel),anisotropyMapUv:ye&&h(i.anisotropyMap.channel),clearcoatMapUv:be&&h(i.clearcoatMap.channel),clearcoatNormalMapUv:xe&&h(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&h(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&h(i.iridescenceMap.channel),iridescenceThicknessMapUv:we&&h(i.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&h(i.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&h(i.sheenRoughnessMap.channel),specularMapUv:De&&h(i.specularMap.channel),specularColorMapUv:Oe&&h(i.specularColorMap.channel),specularIntensityMapUv:ke&&h(i.specularIntensityMap.channel),transmissionMapUv:Ae&&h(i.transmissionMap.channel),thicknessMapUv:I&&h(i.thicknessMap.channel),alphaMapUv:Me&&h(i.alphaMap.channel),vertexTangents:!!y.attributes.tangent&&(se||fe),vertexNormals:!!y.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,pointsUvs:g.isPoints===!0&&!!y.attributes.uv&&(N||Me),fog:!!v,useFog:i.fog===!0,fogExp2:!!v&&v.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||y.attributes.normal===void 0&&se===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ee,skinning:g.isSkinnedMesh===!0,hasPositionAttribute:y.attributes.position!==void 0,morphTargets:y.morphAttributes.position!==void 0,morphNormals:y.morphAttributes.normal!==void 0,morphColors:y.morphAttributes.color!==void 0,morphTargetsCount:E,morphTextureStride:D,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:_.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:R,decodeVideoTexture:N&&i.map.isVideoTexture===!0&&P.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:le&&i.emissiveMap.isVideoTexture===!0&&P.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Pe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Pe&&i.extensions.multiDraw===!0||ne)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Fe.vertexUv1s=c.has(1),Fe.vertexUv2s=c.has(2),Fe.vertexUv3s=c.has(3),c.clear(),Fe}function _(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(v(n,t),y(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function v(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function y(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function b(e){let t=m[e.type],n;if(t){let e=Ft[t];n=gt.clone(e.uniforms)}else n=e.uniforms;return n}function x(t,n){let r=u.get(n);return r===void 0?(r=new ui(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function S(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function C(e){s.remove(e)}function w(){s.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:b,acquireProgram:x,releaseProgram:S,releaseShaderCache:C,programs:l,dispose:w}}function gi(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function _i(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function vi(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function yi(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||_i),r.length>1&&r.sort(t||vi),i.length>1&&i.sort(t||vi)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function bi(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new yi,e.set(t,[i])):n>=r.length?(i=new yi,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function xi(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new z,color:new d};break;case`SpotLight`:n={position:new z,direction:new z,color:new d,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new z,color:new d,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new z,skyColor:new d,groundColor:new d};break;case`RectAreaLight`:n={color:new d,position:new z,halfWidth:new z,halfHeight:new z}}return e[t.id]=n,n}}}function Si(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Ci=0;function wi(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Ti(e){let t=new xi,n=Si(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new z);let i=new z,a=new V,o=new V;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(wi);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=H.LTC_FLOAT_1,r.rectAreaLTC2=H.LTC_FLOAT_2):(r.rectAreaLTC1=H.LTC_HALF_1,r.rectAreaLTC2=H.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Ci++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Ei(e){let t=new Ti(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Di(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Ei(e),t.set(n,[a])):r>=i.length?(a=new Ei(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Oi=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ki=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Ai=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],ji=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],Mi=new V,Ni=new z,Pi=new z;function Fi(e,t,n){let r=new Ee,i=new B,a=new B,o=new Be,s=new Tt,c=new me,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new de({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new B},radius:{value:4}},vertexShader:Oi,fragmentShader:ki}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let g=new Ne;g.setAttribute(`position`,new Et(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ot(g,f),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let y=this.type;this.render=function(t,n,s){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||t.length===0)return;this.type===2&&(p(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let h=y!==this.type;h&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){p(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let g=d.getFrameExtents();i.multiply(g),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/g.x),i.x=a.x*g.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/g.y),i.y=a.y*g.y,d.mapSize.y=a.y));let _=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=_,d.map===null||h===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){p(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Ke(i.x,i.y,{format:L,type:ce,minFilter:nt,magFilter:nt,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new be(i.x,i.y,dt),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=kt,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=m,d.map.depthTexture.magFilter=m}else l.isPointLight?(d.map=new fn(i.x),d.map.depthTexture=new Xe(i.x,ct)):(d.map=new Ke(i.x,i.y),d.map.depthTexture=new be(i.x,i.y,ct)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=kt,this.type===1?(d.map.depthTexture.compareFunction=_?518:515,d.map.depthTexture.minFilter=nt,d.map.depthTexture.magFilter=nt):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=m,d.map.depthTexture.magFilter=m);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let v=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<v;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Ni.setFromMatrixPosition(l.matrixWorld),e.position.copy(Ni),Pi.copy(e.position),Pi.add(Ai[t]),e.up.copy(ji[t]),e.lookAt(Pi),e.updateMatrixWorld(),n.makeTranslation(-Ni.x,-Ni.y,-Ni.z),Mi.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Mi,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),S(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&b(d,s),d.needsUpdate=!1}y=this.type,v.needsUpdate=!1,e.setRenderTarget(c,l,d)};function b(n,r){let a=t.update(_);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,h.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),n.mapPass===null?n.mapPass=new Ke(i.x,i.y,{format:L,type:ce}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,_,null),h.uniforms.shadow_pass.value=n.mapPass.texture,h.uniforms.resolution.value.set(n.map.width,n.map.height),h.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,h,_,null)}function x(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,C)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function S(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=x(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=x(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)S(c[e],i,a,o,s)}function C(e){e.target.removeEventListener(`dispose`,C);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Ii(e,t){function n(){let t=!1,n=new Be,r=null,i=new Be(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?le(e.DEPTH_TEST):ue(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=$e[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?le(e.STENCIL_TEST):ue(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},f={},p={},m=new WeakMap,h=[],g=null,_=!1,v=null,y=null,b=null,x=null,S=null,C=null,w=null,T=new d(0,0,0),E=0,D=!1,O=null,k=null,A=null,j=null,M=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),te=!1,ne=0,N=e.getParameter(e.VERSION);N.indexOf(`WebGL`)===-1?N.indexOf(`OpenGL ES`)!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),te=ne>=2):(ne=parseFloat(/^WebGL (\d)/.exec(N)[1]),te=ne>=1);let re=null,P={},F=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new Be().fromArray(F),oe=new Be().fromArray(ie);function se(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ce={};ce[e.TEXTURE_2D]=se(e.TEXTURE_2D,e.TEXTURE_2D,1),ce[e.TEXTURE_CUBE_MAP]=se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[e.TEXTURE_2D_ARRAY]=se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ce[e.TEXTURE_3D]=se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),le(e.DEPTH_TEST),o.setFunc(3),ve(!1),ye(1),le(e.CULL_FACE),ge(0);function le(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ue(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function de(t,n){return p[t]!==n&&(e.bindFramebuffer(t,n),p[t]=n,t===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=n),!0)}function fe(t,n){let r=h,i=!1;if(t){r=m.get(n),r===void 0&&(r=[],m.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function pe(t){return g!==t&&(e.useProgram(t),g=t,!0)}let me={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};me[103]=e.MIN,me[104]=e.MAX;let he={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ge(t,n,r,i,a,o,s,c,l,u){if(t===0){_===!0&&(ue(e.BLEND),_=!1);return}if(_===!1&&(le(e.BLEND),_=!0),t!==5){if(t!==v||u!==D){if((y!==100||S!==100)&&(e.blendEquation(e.FUNC_ADD),y=100,S=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:wt(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:wt(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:wt(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:wt(`WebGLState: Invalid blending: `,t)}b=null,x=null,C=null,w=null,T.set(0,0,0),E=0,v=t,D=u}return}a||=n,o||=r,s||=i,(n!==y||a!==S)&&(e.blendEquationSeparate(me[n],me[a]),y=n,S=a),(r!==b||i!==x||o!==C||s!==w)&&(e.blendFuncSeparate(he[r],he[i],he[o],he[s]),b=r,x=i,C=o,w=s),(c.equals(T)===!1||l!==E)&&(e.blendColor(c.r,c.g,c.b,l),T.copy(c),E=l),v=t,D=!1}function _e(t,n){t.side===2?ue(e.CULL_FACE):le(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ve(r),t.blending===1&&t.transparent===!1?ge(0):ge(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),xe(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?le(e.SAMPLE_ALPHA_TO_COVERAGE):ue(e.SAMPLE_ALPHA_TO_COVERAGE)}function ve(t){O!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),O=t)}function ye(t){t===0?ue(e.CULL_FACE):(le(e.CULL_FACE),t!==k&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),k=t}function be(t){t!==A&&(te&&e.lineWidth(t),A=t)}function xe(t,n,r){t?(le(e.POLYGON_OFFSET_FILL),(j!==n||M!==r)&&(j=n,M=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ue(e.POLYGON_OFFSET_FILL)}function Se(t){t?le(e.SCISSOR_TEST):ue(e.SCISSOR_TEST)}function Ce(t){t===void 0&&(t=e.TEXTURE0+ee-1),re!==t&&(e.activeTexture(t),re=t)}function we(t,n,r){r===void 0&&(r=re===null?e.TEXTURE0+ee-1:re);let i=P[r];i===void 0&&(i={type:void 0,texture:void 0},P[r]=i),(i.type!==t||i.texture!==n)&&(re!==r&&(e.activeTexture(r),re=r),e.bindTexture(t,n||ce[t]),i.type=t,i.texture=n)}function Te(){let t=P[re];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ee(){try{e.compressedTexImage2D(...arguments)}catch(e){wt(`WebGLState:`,e)}}function De(){try{e.compressedTexImage3D(...arguments)}catch(e){wt(`WebGLState:`,e)}}function Oe(){try{e.texSubImage2D(...arguments)}catch(e){wt(`WebGLState:`,e)}}function ke(){try{e.texSubImage3D(...arguments)}catch(e){wt(`WebGLState:`,e)}}function Ae(){try{e.compressedTexSubImage2D(...arguments)}catch(e){wt(`WebGLState:`,e)}}function I(){try{e.compressedTexSubImage3D(...arguments)}catch(e){wt(`WebGLState:`,e)}}function je(){try{e.texStorage2D(...arguments)}catch(e){wt(`WebGLState:`,e)}}function Me(){try{e.texStorage3D(...arguments)}catch(e){wt(`WebGLState:`,e)}}function Ne(){try{e.texImage2D(...arguments)}catch(e){wt(`WebGLState:`,e)}}function L(){try{e.texImage3D(...arguments)}catch(e){wt(`WebGLState:`,e)}}function Pe(t){return f[t]===void 0?e.getParameter(t):f[t]}function R(t,n){f[t]!==n&&(e.pixelStorei(t,n),f[t]=n)}function Fe(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function Ie(t){oe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),oe.copy(t))}function z(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Le(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Re(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},f={},re=null,P={},p={},m=new WeakMap,h=[],g=null,_=!1,v=null,y=null,b=null,x=null,S=null,C=null,w=null,T=new d(0,0,0),E=0,D=!1,O=null,k=null,A=null,j=null,M=null,ae.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:le,disable:ue,bindFramebuffer:de,drawBuffers:fe,useProgram:pe,setBlending:ge,setMaterial:_e,setFlipSided:ve,setCullFace:ye,setLineWidth:be,setPolygonOffset:xe,setScissorTest:Se,activeTexture:Ce,bindTexture:we,unbindTexture:Te,compressedTexImage2D:Ee,compressedTexImage3D:De,texImage2D:Ne,texImage3D:L,pixelStorei:R,getParameter:Pe,updateUBOMapping:z,uniformBlockBinding:Le,texStorage2D:je,texStorage3D:Me,texSubImage2D:Oe,texSubImage3D:ke,compressedTexSubImage2D:Ae,compressedTexSubImage3D:I,scissor:Fe,viewport:Ie,reset:Re}}function Li(e,t,n,r,i,o,s){let c=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,l=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),u=new B,d=new WeakMap,f=new Set,h,g=new WeakMap,v=!1;try{v=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function y(e,t){return v?new OffscreenCanvas(e,t):Pe(`canvas`)}function b(e,t,n){let r=1,i=Ne(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);h===void 0&&(h=y(n,a));let o=t?y(n,a):h;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),p(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&p(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function x(e){return e.generateMipmaps}function S(t){e.generateMipmap(t)}function C(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function w(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];p(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||p(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?at:P.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function T(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,p(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function E(e,t){return x(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function D(e){let t=e.target;t.removeEventListener(`dispose`,D),k(t),t.isVideoTexture&&d.delete(t),t.isHTMLTexture&&f.delete(t)}function O(e){let t=e.target;t.removeEventListener(`dispose`,O),j(t)}function k(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=g.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&A(e),Object.keys(i).length===0&&g.delete(n)}r.remove(e)}function A(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=g.get(i);delete a[n.__cacheKey],s.memory.textures--}function j(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),s.memory.textures--),r.remove(i[t])}r.remove(t)}let M=0;function ee(){M=0}function te(){return M}function ne(e){M=e}function N(){let e=M;return e>=i.maxTextures&&p(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),M+=1,e}function re(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ie(t,i){let a=r.get(t);if(t.isVideoTexture&&je(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)p(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)p(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ve(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function oe(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){ve(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function se(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){ve(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ce(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){ye(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let le={[F]:e.REPEAT,[he]:e.CLAMP_TO_EDGE,[_]:e.MIRRORED_REPEAT},ue={[m]:e.NEAREST,[et]:e.NEAREST_MIPMAP_NEAREST,[ae]:e.NEAREST_MIPMAP_LINEAR,[nt]:e.LINEAR,[Ve]:e.LINEAR_MIPMAP_NEAREST,[Le]:e.LINEAR_MIPMAP_LINEAR},de={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function fe(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&p(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,le[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,le[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,le[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ue[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ue[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,de[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function me(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,D));let i=n.source,a=g.get(i);a===void 0&&(a={},g.set(i,a));let o=re(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},s.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&A(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function ge(e,t,n){return Math.floor(Math.floor(e/n)/t)}function _e(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ge(n.start,r.width,4),c=ge(t.start,r.width,4);n.start<=i+1&&a===c&&ge(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function ve(t,s,c){let l=e.TEXTURE_2D;(s.isDataArrayTexture||s.isCompressedArrayTexture)&&(l=e.TEXTURE_2D_ARRAY),s.isData3DTexture&&(l=e.TEXTURE_3D);let u=me(t,s),d=s.source;n.bindTexture(l,t.__webglTexture,e.TEXTURE0+c);let m=r.get(d);if(d.version!==m.__version||u===!0){if(n.activeTexture(e.TEXTURE0+c),!(typeof ImageBitmap<`u`&&s.image instanceof ImageBitmap)){let t=P.getPrimaries(P.workingColorSpace),r=s.colorSpace===``?null:P.getPrimaries(s.colorSpace),i=s.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,s.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,s.unpackAlignment);let t=b(s.image,!1,i.maxTextureSize);t=Me(s,t);let r=o.convert(s.format,s.colorSpace),h=o.convert(s.type),g=w(s.internalFormat,r,h,s.normalized,s.colorSpace,s.isVideoTexture);fe(l,s);let _,v=s.mipmaps,y=s.isVideoTexture!==!0,C=m.__version===void 0||u===!0,D=d.dataReady,O=E(s,t);if(s.isDepthTexture)g=T(s.format===a,s.type),C&&(y?n.texStorage2D(e.TEXTURE_2D,1,g,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,g,t.width,t.height,0,r,h,null));else if(s.isDataTexture){if(v.length>0){y&&C&&n.texStorage2D(e.TEXTURE_2D,O,g,v[0].width,v[0].height);for(let t=0,i=v.length;t<i;t++)_=v[t],y?D&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,_.width,_.height,r,h,_.data):n.texImage2D(e.TEXTURE_2D,t,g,_.width,_.height,0,r,h,_.data);s.generateMipmaps=!1}else y?(C&&n.texStorage2D(e.TEXTURE_2D,O,g,t.width,t.height),D&&_e(s,t,r,h)):n.texImage2D(e.TEXTURE_2D,0,g,t.width,t.height,0,r,h,t.data)}else if(s.isCompressedTexture){if(s.isCompressedArrayTexture){y&&C&&n.texStorage3D(e.TEXTURE_2D_ARRAY,O,g,v[0].width,v[0].height,t.depth);for(let i=0,a=v.length;i<a;i++)if(_=v[i],s.format!==1023){if(r!==null){if(y){if(D){if(s.layerUpdates.size>0){let t=pe(_.width,_.height,s.format,s.type);for(let a of s.layerUpdates){let o=_.data.subarray(a*t/_.data.BYTES_PER_ELEMENT,(a+1)*t/_.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,_.width,_.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,_.width,_.height,t.depth,r,_.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,g,_.width,_.height,t.depth,0,_.data,0,0)}else p(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else y?D&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,_.width,_.height,t.depth,r,h,_.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,g,_.width,_.height,t.depth,0,r,h,_.data);s.layerUpdates.size>0&&s.clearLayerUpdates()}else{y&&C&&n.texStorage2D(e.TEXTURE_2D,O,g,v[0].width,v[0].height);for(let t=0,i=v.length;t<i;t++)_=v[t],s.format===1023?y?D&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,_.width,_.height,r,h,_.data):n.texImage2D(e.TEXTURE_2D,t,g,_.width,_.height,0,r,h,_.data):r===null?p(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):y?D&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,_.width,_.height,r,_.data):n.compressedTexImage2D(e.TEXTURE_2D,t,g,_.width,_.height,0,_.data)}}else if(s.isDataArrayTexture){if(y){if(C&&n.texStorage3D(e.TEXTURE_2D_ARRAY,O,g,t.width,t.height,t.depth),D){if(s.layerUpdates.size>0){let i=pe(t.width,t.height,s.format,s.type);for(let a of s.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,h,o)}s.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,h,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,g,t.width,t.height,t.depth,0,r,h,t.data)}else if(s.isData3DTexture)y?(C&&n.texStorage3D(e.TEXTURE_3D,O,g,t.width,t.height,t.depth),D&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,h,t.data)):n.texImage3D(e.TEXTURE_3D,0,g,t.width,t.height,t.depth,0,r,h,t.data);else if(s.isFramebufferTexture){if(C){if(y)n.texStorage2D(e.TEXTURE_2D,O,g,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<O;t++)n.texImage2D(e.TEXTURE_2D,t,g,i,a,0,r,h,null),i>>=1,a>>=1}}}else if(s.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),f.add(s),n.onpaint=e=>{let t=e.changedElements;for(let e of f)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(v.length>0){if(y&&C){let t=Ne(v[0]);n.texStorage2D(e.TEXTURE_2D,O,g,t.width,t.height)}for(let t=0,i=v.length;t<i;t++)_=v[t],y?D&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,h,_):n.texImage2D(e.TEXTURE_2D,t,g,r,h,_);s.generateMipmaps=!1}else if(y){if(C){let r=Ne(t);n.texStorage2D(e.TEXTURE_2D,O,g,r.width,r.height)}D&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,h,t)}else n.texImage2D(e.TEXTURE_2D,0,g,r,h,t);x(s)&&S(l),m.__version=d.version,s.onUpdate&&s.onUpdate(s)}t.__version=s.version}function ye(t,a,s){if(a.image.length!==6)return;let c=me(t,a),l=a.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=P.getPrimaries(P.workingColorSpace),r=a.colorSpace===``?null:P.getPrimaries(a.colorSpace),d=a.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,a.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,a.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,a.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=a.isCompressedTexture||a.image[0].isCompressedTexture,m=a.image[0]&&a.image[0].isDataTexture,h=[];for(let e=0;e<6;e++)!f&&!m?h[e]=b(a.image[e],!0,i.maxCubemapSize):h[e]=m?a.image[e].image:a.image[e],h[e]=Me(a,h[e]);let g=h[0],_=o.convert(a.format,a.colorSpace),v=o.convert(a.type),y=w(a.internalFormat,_,v,a.normalized,a.colorSpace),C=a.isVideoTexture!==!0,T=u.__version===void 0||c===!0,D=l.dataReady,O=E(a,g);fe(e.TEXTURE_CUBE_MAP,a);let k;if(f){C&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,O,y,g.width,g.height);for(let t=0;t<6;t++){k=h[t].mipmaps;for(let r=0;r<k.length;r++){let i=k[r];a.format===1023?C?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,_,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,i.width,i.height,0,_,v,i.data):_===null?p(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):C?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,_,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,i.width,i.height,0,i.data)}}}else{if(k=a.mipmaps,C&&T){k.length>0&&O++;let t=Ne(h[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,O,y,t.width,t.height)}for(let t=0;t<6;t++)if(m){C?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,h[t].width,h[t].height,_,v,h[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,h[t].width,h[t].height,0,_,v,h[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;C?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,_,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,i.width,i.height,0,_,v,i.data)}}else{C?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,_,v,h[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,_,v,h[t]);for(let r=0;r<k.length;r++){let i=k[r];C?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,_,v,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,_,v,i.image[t])}}}x(a)&&S(e.TEXTURE_CUBE_MAP),u.__version=l.version,a.onUpdate&&a.onUpdate(a)}t.__version=a.version}function be(t,i,a,s,l,u){let d=o.convert(a.format,a.colorSpace),f=o.convert(a.type),p=w(a.internalFormat,d,f,a.normalized,a.colorSpace),m=r.get(i),h=r.get(a);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),I(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,s,l,h.__webglTexture,0,Ae(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,s,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function xe(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=T(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;I(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ae(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ae(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],s=o.convert(a.format,a.colorSpace),l=o.convert(a.type),u=w(a.internalFormat,s,l,a.normalized,a.colorSpace);I(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ae(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ae(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Se(t,i,a){let s=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),s){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,D)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),fe(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=o.convert(i.depthTexture.format),r=o.convert(i.depthTexture.type),a;i.depthTexture.format===1026?a=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(a=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,a,i.width,i.height,0,t,r,null)}}else ie(i.depthTexture,0);let u=l.__webglTexture,d=Ae(i),f=s?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)I(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)I(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Ce(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Se(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?Se(i.__webglFramebuffer[0],t,0):Se(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),xe(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),xe(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function we(t,n,i){let a=r.get(t);n!==void 0&&be(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Ce(t)}function Te(t){let i=t.texture,a=r.get(t),c=r.get(i);t.addEventListener(`dispose`,O);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,s.memory.textures++),u){a.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){a.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)a.__webglFramebuffer[t][n]=e.createFramebuffer()}else a.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){a.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)a.__webglFramebuffer[t]=e.createFramebuffer()}else a.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),s.memory.textures++)}if(t.samples>0&&I(t)===!1){a.__webglMultisampledFramebuffer=e.createFramebuffer(),a.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,a.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];a.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,a.__webglColorRenderbuffer[n]);let i=o.convert(r.format,r.colorSpace),s=o.convert(r.type),c=w(r.internalFormat,i,s,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ae(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,a.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(a.__webglDepthRenderbuffer=e.createRenderbuffer(),xe(a.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),fe(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)be(a.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else be(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);x(i)&&S(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,o=l.length;i<o;i++){let o=l[i],s=r.get(o),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,s.__webglTexture),fe(c,o),be(a.__webglFramebuffer,t,o,e.COLOR_ATTACHMENT0+i,c,0),x(o)&&S(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),fe(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)be(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else be(a.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);x(i)&&S(r),n.unbindTexture()}t.depthBuffer&&Ce(t)}function Ee(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(x(a)){let t=C(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),S(t),n.unbindTexture()}}}let De=[],Oe=[];function ke(t){if(t.samples>0){if(I(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,c=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),l===!0&&(De.length=0,Oe.length=0,De.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(De.push(c),Oe.push(c),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Oe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,De))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&l){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ae(e){return Math.min(i.maxSamples,e.samples)}function I(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function je(e){let t=s.render.frame;d.get(e)!==t&&(d.set(e,t),e.update())}function Me(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(P.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&p(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):wt(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ne(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(u.width=e.naturalWidth||e.width,u.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(u.width=e.displayWidth,u.height=e.displayHeight):(u.width=e.width,u.height=e.height),u}this.allocateTextureUnit=N,this.resetTextureUnits=ee,this.getTextureUnits=te,this.setTextureUnits=ne,this.setTexture2D=ie,this.setTexture2DArray=oe,this.setTexture3D=se,this.setTextureCube=ce,this.rebindTextures=we,this.setupRenderTarget=Te,this.updateRenderTargetMipmap=Ee,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=be,this.useMultisampledRTT=I,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Ri(e,t){function n(n,r=``){let i,a=P.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var zi=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Bi=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Vi=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new x(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new de({vertexShader:zi,fragmentShader:Bi,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ot(new se(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Hi=class extends Se{constructor(e,t){super();let n=this,r=null,i=1,o=null,s=`local-floor`,c=1,l=null,u=null,d=null,f=null,m=null,h=null,g=typeof XRWebGLBinding<`u`,_=new Vi,v={},y=t.getContextAttributes(),b=null,S=null,C=[],w=[],T=new B,E=null,D=null,O=new ne;O.viewport=new Be;let k=new ne;k.viewport=new Be;let A=[O,k],j=new rt,M=null,ee=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new Ue,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new Ue,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new Ue,C[e]=t),t.getHandSpace()};function te(e){let t=w.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,l||o),n.dispatchEvent({type:e.type,data:e.inputSource}))}function N(){r.removeEventListener(`select`,te),r.removeEventListener(`selectstart`,te),r.removeEventListener(`selectend`,te),r.removeEventListener(`squeeze`,te),r.removeEventListener(`squeezestart`,te),r.removeEventListener(`squeezeend`,te),r.removeEventListener(`end`,N),r.removeEventListener(`inputsourceschange`,re);for(let e=0;e<C.length;e++){let t=w[e];t!==null&&(w[e]=null,C[e].disconnect(t))}M=null,ee=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(b),m=null,f=null,d=null,r=null,S=null,le.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(T.width,T.height,!1),D!==null){let e=D.camera;e.fov=D.fov,e.zoom=D.zoom,e.updateProjectionMatrix(),D=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&p(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){s=e,n.isPresenting===!0&&p(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(e){l=e},this.getBaseLayer=function(){return f===null?m:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(u){if(r=u,r!==null){if(b=e.getRenderTarget(),r.addEventListener(`select`,te),r.addEventListener(`selectstart`,te),r.addEventListener(`selectend`,te),r.addEventListener(`squeeze`,te),r.addEventListener(`squeezestart`,te),r.addEventListener(`squeezeend`,te),r.addEventListener(`end`,N),r.addEventListener(`inputsourceschange`,re),y.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(T),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,o=null,s=null;y.depth&&(s=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=y.stencil?a:kt,o=y.stencil?Je:ct);let c={colorFormat:t.RGBA8,depthFormat:s,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(c),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new Ke(f.textureWidth,f.textureHeight,{format:ye,type:ot,depthTexture:new be(f.textureWidth,f.textureHeight,o,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:i};m=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new Ke(m.framebufferWidth,m.framebufferHeight,{format:ye,type:ot,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(s),le.setContext(r),le.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function re(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=w.indexOf(n);r>=0&&(w[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=w.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=w.length){w.push(n),r=e;break}else if(w[e]===null){w[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let P=new z,F=new z;function ie(e,t,n){P.setFromMatrixPosition(t.matrixWorld),F.setFromMatrixPosition(n.matrixWorld);let r=P.distanceTo(F),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ae(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),j.near=k.near=O.near=t,j.far=k.far=O.far=n,(M!==j.near||ee!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),M=j.near,ee=j.far),j.layers.mask=e.layers.mask|6,O.layers.mask=j.layers.mask&-5,k.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;ae(j,i);for(let e=0;e<a.length;e++)ae(a[e],i);a.length===2?ie(j,O,k):j.projectionMatrix.copy(O.projectionMatrix),D===null&&e.isPerspectiveCamera&&(D={camera:e,fov:e.fov,zoom:e.zoom}),oe(e,j,i)};function oe(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=jt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(f!==null||m!==null)return c},this.setFoveation=function(e){c=e,f!==null&&(f.fixedFoveation=e),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(j)},this.getCameraTexture=function(e){return v[e]};let se=null;function ce(t,i){if(u=i.getViewerPose(l||o),h=i,u!==null){let t=u.views;m!==null&&(e.setRenderTargetFramebuffer(S,m.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(m!==null)a=m.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=A[n];o===void 0&&(o=new ne,o.layers.enable(n),o.viewport=new Be,A[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new x,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=w[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,l||o)}se&&se(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),h=null}let le=new Mt;le.setAnimationLoop(ce),this.setAnimationLoop=function(e){se=e},this.dispose=function(){}}},Ui=new V,Wi=new je;Wi.set(-1,0,0,0,1,0,0,0,1);function Gi(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,l(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),f(e,t)):t.isMeshPhongMaterial?(a(e,t),d(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),p(e,t),t.isMeshPhysicalMaterial&&m(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),h(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),g(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?u(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Ui.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Wi),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function d(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function f(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function p(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function m(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function h(e,t){t.matcap&&(e.matcap.value=t.matcap)}function g(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Ki(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(_(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,y));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return wt(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)m(t[n],e,n,a);else m(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function m(t,n,r,i){if(g(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=v(i);h(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else h(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function h(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function g(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function _(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=v(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function v(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?p(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):p(`WebGLRenderer: Unsupported uniform value type.`,e),t}function y(t){let n=t.target;n.removeEventListener(`dispose`,y);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function b(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:b}}var qi=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ji=null;function Yi(){return Ji===null&&(Ji=new w(qi,16,16,L,ce),Ji.name=`DFG_LUT`,Ji.minFilter=nt,Ji.magFilter=nt,Ji.wrapS=he,Ji.wrapT=he,Ji.generateMipmaps=!1,Ji.needsUpdate=!0),Ji}var Xi=class{constructor(e={}){let{canvas:t=Dt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:m=!1,outputBufferType:h=ot}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);_=n.getContextAttributes().alpha}else _=a;let v=h,b=new Set([we,Ct,f]),x=new Set([ot,ct,tt,Je,pt,Fe]),S=new Uint32Array(4),C=new Int32Array(4),w=new z,T=null,E=null,D=[],O=[],k=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,j=!1,M=null,ee=null,te=null,ne=null;this._outputColorSpace=y;let N=0,re=0,F=null,ie=-1,ae=null,oe=new Be,se=new Be,le=null,ue=new d(0),de=0,fe=t.width,pe=t.height,me=1,he=null,ge=null,_e=new Be(0,0,fe,pe),ve=new Be(0,0,fe,pe),ye=!1,be=new Ee,xe=!1,Se=!1,Ce=new V,Te=new z,De=new Be,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ke=!1;function Ae(){return F===null?me:1}let I=n;function je(e,n){return t.getContext(e,n)}let Me,Ne,L,Pe,R,Ie,Re,ze,Ve,He,Ue,We,Ge,qe,Ye,Xe,Ze,Qe,$e,et,nt,rt,at;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,ut,!1),t.addEventListener(`webglcontextrestored`,dt,!1),t.addEventListener(`webglcontextcreationerror`,ft,!1),I===null){let t=`webgl2`;if(I=je(t,e),I===null)throw je(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}st()}catch(e){throw t.removeEventListener(`webglcontextlost`,ut,!1),t.removeEventListener(`webglcontextrestored`,dt,!1),t.removeEventListener(`webglcontextcreationerror`,ft,!1),wt(`WebGLRenderer: `+e.message),e}function st(){Me=new mn(I),Me.init(),nt=new Ri(I,Me),Ne=new Ht(I,Me,e,nt),L=new Ii(I,Me),Ne.reversedDepthBuffer&&m&&L.buffers.depth.setReversed(!0),ee=I.createFramebuffer(),te=I.createFramebuffer(),ne=I.createFramebuffer(),Pe=new _n(I),R=new gi,Ie=new Li(I,Me,L,R,Ne,nt,Pe),Re=new pn(A),ze=new Nt(I),rt=new Bt(I,ze),Ve=new hn(I,ze,Pe,rt),He=new yn(I,Ve,ze,rt,Pe),Qe=new vn(I,Ne,Ie),Ye=new Ut(R),Ue=new hi(A,Re,Me,Ne,rt,Ye),We=new Gi(A,R),Ge=new bi,qe=new Di(Me),Ze=new zt(A,Re,L,He,_,s),Xe=new Fi(A,He,Ne),at=new Ki(I,Pe,Ne,L),$e=new Vt(I,Me,Pe),et=new gn(I,Me,Pe),Pe.programs=Ue.programs,A.capabilities=Ne,A.extensions=Me,A.properties=R,A.renderLists=Ge,A.shadowMap=Xe,A.state=L,A.info=Pe}v!==1009&&(k=new xn(v,t.width,t.height,o,r,i));let lt=new Hi(A,I);this.xr=lt,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){let e=Me.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Me.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return me},this.setPixelRatio=function(e){e!==void 0&&(me=e,this.setSize(fe,pe,!1))},this.getSize=function(e){return e.set(fe,pe)},this.setSize=function(e,n,r=!0){if(lt.isPresenting){p(`WebGLRenderer: Can't change size while VR device is presenting.`);return}fe=e,pe=n,t.width=Math.floor(e*me),t.height=Math.floor(n*me),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),k!==null&&k.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(fe*me,pe*me).floor()},this.setDrawingBufferSize=function(e,n,r){fe=e,pe=n,me=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(v===1009){wt(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){p(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}k.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(oe)},this.getViewport=function(e){return e.copy(_e)},this.setViewport=function(e,t,n,r){e.isVector4?_e.set(e.x,e.y,e.z,e.w):_e.set(e,t,n,r),L.viewport(oe.copy(_e).multiplyScalar(me).round())},this.getScissor=function(e){return e.copy(ve)},this.setScissor=function(e,t,n,r){e.isVector4?ve.set(e.x,e.y,e.z,e.w):ve.set(e,t,n,r),L.scissor(se.copy(ve).multiplyScalar(me).round())},this.getScissorTest=function(){return ye},this.setScissorTest=function(e){L.setScissorTest(ye=e)},this.setOpaqueSort=function(e){he=e},this.setTransparentSort=function(e){ge=e},this.getClearColor=function(e){return e.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor(...arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(F!==null){let t=F.texture.format;e=b.has(t)}if(e){let e=F.texture.type,t=x.has(e),n=Ze.getClearColor(),r=Ze.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(S[0]=i,S[1]=a,S[2]=o,S[3]=r,I.clearBufferuiv(I.COLOR,0,S)):(C[0]=i,C[1]=a,C[2]=o,C[3]=r,I.clearBufferiv(I.COLOR,0,C))}else r|=I.COLOR_BUFFER_BIT}t&&(r|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&I.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),M=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ut,!1),t.removeEventListener(`webglcontextrestored`,dt,!1),t.removeEventListener(`webglcontextcreationerror`,ft,!1),Ze.dispose(),Ge.dispose(),qe.dispose(),R.dispose(),Re.dispose(),He.dispose(),rt.dispose(),at.dispose(),Ue.dispose(),lt.dispose(),lt.removeEventListener(`sessionstart`,yt),lt.removeEventListener(`sessionend`,bt),St.stop()};function ut(e){e.preventDefault(),xt(`WebGLRenderer: Context Lost.`),j=!0}function dt(){xt(`WebGLRenderer: Context Restored.`),j=!1;let e=Pe.autoReset,t=Xe.enabled,n=Xe.autoUpdate,r=Xe.needsUpdate,i=Xe.type;st(),Pe.autoReset=e,Xe.enabled=t,Xe.autoUpdate=n,Xe.needsUpdate=r,Xe.type=i}function ft(e){wt(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function mt(e){let t=e.target;t.removeEventListener(`dispose`,mt),ht(t)}function ht(e){gt(e),R.remove(e)}function gt(e){let t=R.get(e).programs;t!==void 0&&(t.forEach(function(e){Ue.releaseProgram(e)}),e.isShaderMaterial&&Ue.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Oe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=It(e,t,n,r,i);L.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ve.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;rt.setup(i,r,s,n,c);let h,g=$e;if(c!==null&&(h=ze.get(c),g=et,g.setIndex(h)),i.isMesh)r.wireframe===!0?(L.setLineWidth(r.wireframeLinewidth*Ae()),g.setMode(I.LINES)):g.setMode(I.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),L.setLineWidth(e*Ae()),i.isLineSegments?g.setMode(I.LINES):i.isLineLoop?g.setMode(I.LINE_LOOP):g.setMode(I.LINE_STRIP)}else i.isPoints?g.setMode(I.POINTS):i.isSprite&&g.setMode(I.TRIANGLES);if(i.isBatchedMesh){if(Me.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?ze.get(c).bytesPerElement:1,o=R.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(I,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function B(e,t,n,r){M!==null&&e.isNodeMaterial&&M.setObject(r,e),xe===!0&&Ye.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,jt(e,t,r),e.side=0,e.needsUpdate=!0,jt(e,t,r),e.side=2):jt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),M!==null&&M.renderStart(e,t,n),E=qe.get(n),E.init(t),O.push(E),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(E.pushLight(e),e.castShadow&&E.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(E.pushLight(e),e.castShadow&&E.pushShadow(e))}),E.setupLights(),M!==null&&M.updateLights(E.state.lightsArray),Se=this.localClippingEnabled,xe=Ye.init(this.clippingPlanes,Se),xe===!0&&Ye.setGlobalState(this.clippingPlanes,t),M!==null&&Xe.render(E.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];B(o,n,t,e),r.add(o)}else B(i,n,t,e),r.add(i)}}),E=O.pop(),M!==null&&M.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=R.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Me.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let _t=null;function vt(e){_t&&_t(e)}function yt(){St.stop()}function bt(){St.start()}let St=new Mt;St.setAnimationLoop(vt),typeof self<`u`&&St.setContext(self),this.setAnimationLoop=function(e){_t=e,lt.setAnimationLoop(e),e===null?St.stop():St.start()},lt.addEventListener(`sessionstart`,yt),lt.addEventListener(`sessionend`,bt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){wt(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(j===!0)return;M!==null&&M.renderStart(e,t);let n=lt.enabled===!0&&lt.isPresenting===!0,r=k!==null&&(F===null||n)&&k.begin(A,F);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(k===null||k.isCompositing()===!1)&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(t),t=lt.getCamera()),e.isScene===!0&&e.onBeforeRender(A,e,t,F),E=qe.get(e,O.length),E.init(t),E.state.textureUnits=Ie.getTextureUnits(),O.push(E),Ce.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),be.setFromProjectionMatrix(Ce,it,t.reversedDepth),Se=this.localClippingEnabled,xe=Ye.init(this.clippingPlanes,Se),T=Ge.get(e,D.length),T.init(),D.push(T),lt.enabled===!0&&lt.isPresenting===!0){let e=A.xr.getDepthSensingMesh();e!==null&&Tt(e,t,-1/0,A.sortObjects)}Tt(e,t,0,A.sortObjects),T.finish(),M!==null&&M.updateLights(E.state.lightsArray),A.sortObjects===!0&&T.sort(he,ge),ke=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,ke&&Ze.addToRenderList(T,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),xe===!0&&Ye.beginShadows();let i=E.state.shadowsArray;if(Xe.render(i,e,t),xe===!0&&Ye.endShadows(),(r&&k.hasRenderPass())===!1){let n=T.opaque,r=T.transmissive;if(E.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];Ot(n,r,e,a)}ke&&Ze.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];Et(T,e,n,n.viewport)}}else r.length>0&&Ot(n,r,e,t),ke&&Ze.render(e),Et(T,e,t)}F!==null&&re===0&&(Ie.updateMultisampleRenderTarget(F),Ie.updateRenderTargetMipmap(F)),r&&k.end(A),e.isScene===!0&&e.onAfterRender(A,e,t),rt.resetDefaultState(),ie=-1,ae=null,O.pop(),O.length>0?(E=O[O.length-1],Ie.setTextureUnits(E.state.textureUnits),xe===!0&&Ye.setGlobalState(A.clippingPlanes,E.state.camera)):E=null,D.pop(),T=D.length>0?D[D.length-1]:null,M!==null&&M.renderEnd()};function Tt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)E.pushLightProbeGrid(e);else if(e.isLight)E.pushLight(e),e.castShadow&&E.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(be)){r&&De.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Ce);let i=He.update(e),a=e.material;a.visible&&T.push(e,i,a,n,De.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(be))){let i=He.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),De.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),De.copy(e.boundingSphere.center)),De.applyMatrix4(e.matrixWorld).applyMatrix4(Ce)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&T.push(e,i,c,n,De.z,s,t)}}else a.visible&&T.push(e,i,a,n,De.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)Tt(i[e],t,n,r)}function Et(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;E.setupLightsView(n),xe===!0&&Ye.setGlobalState(A.clippingPlanes,n),r&&L.viewport(oe.copy(r)),i.length>0&&kt(i,t,n),a.length>0&&kt(a,t,n),o.length>0&&kt(o,t,n),L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function Ot(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[r.id]===void 0){let e=Me.has(`EXT_color_buffer_half_float`)||Me.has(`EXT_color_buffer_float`);E.state.transmissionRenderTarget[r.id]=new Ke(1,1,{generateMipmaps:!0,type:e?ce:ot,minFilter:Le,samples:Math.max(4,Ne.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:P.workingColorSpace})}let a=E.state.transmissionRenderTarget[r.id],o=r.viewport||oe;a.setSize(o.z*A.transmissionResolutionScale,o.w*A.transmissionResolutionScale);let s=A.getRenderTarget(),c=A.getActiveCubeFace(),l=A.getActiveMipmapLevel();A.setRenderTarget(a),A.getClearColor(ue),de=A.getClearAlpha(),de<1&&A.setClearColor(16777215,.5),A.clear(),ke&&Ze.render(n);let u=A.toneMapping;A.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),E.setupLightsView(r),xe===!0&&Ye.setGlobalState(A.clippingPlanes,r),kt(e,n,r),Ie.updateMultisampleRenderTarget(a),Ie.updateRenderTargetMipmap(a),Me.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,At(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Ie.updateMultisampleRenderTarget(a),Ie.updateRenderTargetMipmap(a))}A.setRenderTarget(s,c,l),A.setClearColor(ue,de),d!==void 0&&(r.viewport=d),A.toneMapping=u}function kt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&At(o,t,n,s,l,c)}}function At(e,t,n,r,i,a){M!==null&&i.isNodeMaterial&&M.setObject(e,i),e.onBeforeRender(A,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(A,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,A.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,A.renderBufferDirect(n,t,r,i,e,a),i.side=2):A.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(A,t,n,r,i,a)}function jt(e,t,n){t.isScene!==!0&&(t=Oe);let r=R.get(e),i=E.state.lights,a=E.state.shadowsArray,o=i.state.version,s=Ue.getParameters(e,i.state,a,t,n,E.state.lightProbeGridArray),c=Ue.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Re.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,mt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return H(e,s),d}else s.uniforms=Ue.getUniforms(e),M!==null&&e.isNodeMaterial&&M.build(e,n,s),e.onBeforeCompile(s,A),d=Ue.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ye.uniform),H(e,s),r.needsLights=Rt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=E.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Pt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Or.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function H(e,t){let n=R.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Ft(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];w.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(w))return n}return null}function It(e,t,n,r,i){t.isScene!==!0&&(t=Oe),Ie.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=F===null?A.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:P.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Re.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(h=A.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=R.get(r),y=E.state.lights;if(xe===!0&&(Se===!0||e!==ae)){let t=e===ae&&r.id===ie;Ye.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ye.numPlanes||v.numIntersection!==Ye.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=E.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=jt(r,t,i),M&&r.isNodeMaterial&&M.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),D=v.uniforms;if(L.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==ie&&(ie=r.id,C=!0),v.needsLights){let e=Ft(E.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||ae!==e){L.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(I,`projectionMatrix`,e.projectionMatrix),T.setValue(I,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(I,Te.setFromMatrixPosition(e.matrixWorld)),Ne.logarithmicDepthBuffer&&T.setValue(I,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(I,`isOrthographic`,e.isOrthographicCamera===!0),ae!==e&&(ae=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(I,`sunShadowMap`,y.state.sunShadowMap,Ie),y.state.directionalShadowMap.length>0&&T.setValue(I,`directionalShadowMap`,y.state.directionalShadowMap,Ie),y.state.spotShadowMap.length>0&&T.setValue(I,`spotShadowMap`,y.state.spotShadowMap,Ie),y.state.pointShadowMap.length>0&&T.setValue(I,`pointShadowMap`,y.state.pointShadowMap,Ie)),i.isSkinnedMesh){T.setOptional(I,i,`bindMatrix`),T.setOptional(I,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(I,`boneTexture`,e.boneTexture,Ie))}i.isBatchedMesh&&(T.setOptional(I,i,`batchingTexture`),T.setValue(I,`batchingTexture`,i._matricesTexture,Ie),T.setOptional(I,i,`batchingIdTexture`),T.setValue(I,`batchingIdTexture`,i._indirectTexture,Ie),T.setOptional(I,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(I,`batchingColorTexture`,i._colorsTexture,Ie));let O=n.morphAttributes;if((O.position!==void 0||O.normal!==void 0||O.color!==void 0)&&Qe.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(I,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(D.envMapIntensity.value=t.environmentIntensity),D.dfgLUT!==void 0&&(D.dfgLUT.value=Yi()),C){if(T.setValue(I,`toneMappingExposure`,A.toneMappingExposure),v.needsLights&&Lt(D,w),a&&r.fog===!0&&We.refreshFogUniforms(D,a),We.refreshMaterialUniforms(D,r,me,pe,E.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;D.probesSH.value=e.texture,D.probesMin.value.copy(e.boundingBox.min),D.probesMax.value.copy(e.boundingBox.max),D.probesResolution.value.copy(e.resolution)}Or.upload(I,Pt(v),D,Ie)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Or.upload(I,Pt(v),D,Ie),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(I,`center`,i.center),T.setValue(I,`modelViewMatrix`,i.modelViewMatrix),T.setValue(I,`normalMatrix`,i.normalMatrix),T.setValue(I,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];at.update(n,x),at.bind(n,x)}}return x}function Lt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Rt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return re},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(e,t,n){let r=R.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),R.get(e.texture).__webglTexture=t,R.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=R.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){F=e,N=t,re=n;let r=null,i=!1,a=!1;if(e){let o=R.get(e);if(o.__useDefaultFramebuffer!==void 0){L.bindFramebuffer(I.FRAMEBUFFER,o.__webglFramebuffer),oe.copy(e.viewport),se.copy(e.scissor),le=e.scissorTest,L.viewport(oe),L.scissor(se),L.setScissorTest(le),ie=-1;return}if(o.__webglFramebuffer===void 0)Ie.setupRenderTarget(e);else if(o.__hasExternalTextures)Ie.rebindTextures(e,R.get(e.texture).__webglTexture,R.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&R.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Ie.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=R.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Ie.useMultisampledRTT(e)===!1?R.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,oe.copy(e.viewport),se.copy(e.scissor),le=e.scissorTest}else oe.copy(_e).multiplyScalar(me).floor(),se.copy(ve).multiplyScalar(me).floor(),le=ye;if(n!==0&&(r=ee),L.bindFramebuffer(I.FRAMEBUFFER,r)&&L.drawBuffers(e,r),L.viewport(oe),L.scissor(se),L.setScissorTest(le),i){let r=R.get(e.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=R.get(e.textures[t]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=R.get(e.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,t.__webglTexture,n)}ie=-1};function Wt(e){let t=R.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ne.textureFormatReadable(e.format),t.__typeReadable=Ne.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){wt(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){L.bindFramebuffer(I.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+s);let u=Wt(o);if(u.__formatReadable===!1){wt(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){wt(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&I.readPixels(t,n,r,i,nt.convert(c),nt.convert(l),a)}finally{let e=F===null?null:R.get(F).__webglFramebuffer;L.bindFramebuffer(I.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=R.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){L.bindFramebuffer(I.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+s);let d=Wt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,f),I.bufferData(I.PIXEL_PACK_BUFFER,a.byteLength,I.STREAM_READ),I.readPixels(t,n,r,i,nt.convert(l),nt.convert(u),0),I.bindBuffer(I.PIXEL_PACK_BUFFER,null);let p=F===null?null:R.get(F).__webglFramebuffer;L.bindFramebuffer(I.FRAMEBUFFER,p);let m=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await g(I,m,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,f),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,a),I.bindBuffer(I.PIXEL_PACK_BUFFER,null),I.deleteBuffer(f),I.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Ie.setTexture2D(e,0),I.copyTexSubImage2D(I.TEXTURE_2D,n,0,0,o,s,i,a),L.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=nt.convert(t.format),_=nt.convert(t.type),v;t.isData3DTexture?(Ie.setTexture3D(t,0),v=I.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Ie.setTexture2DArray(t,0),v=I.TEXTURE_2D_ARRAY):(Ie.setTexture2D(t,0),v=I.TEXTURE_2D),L.activeTexture(I.TEXTURE0),L.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,t.flipY),L.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),L.pixelStorei(I.UNPACK_ALIGNMENT,t.unpackAlignment);let y=L.getParameter(I.UNPACK_ROW_LENGTH),b=L.getParameter(I.UNPACK_IMAGE_HEIGHT),x=L.getParameter(I.UNPACK_SKIP_PIXELS),S=L.getParameter(I.UNPACK_SKIP_ROWS),C=L.getParameter(I.UNPACK_SKIP_IMAGES);L.pixelStorei(I.UNPACK_ROW_LENGTH,h.width),L.pixelStorei(I.UNPACK_IMAGE_HEIGHT,h.height),L.pixelStorei(I.UNPACK_SKIP_PIXELS,l),L.pixelStorei(I.UNPACK_SKIP_ROWS,u),L.pixelStorei(I.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=R.get(e),r=R.get(t),h=R.get(n.__renderTarget),g=R.get(r.__renderTarget);L.bindFramebuffer(I.READ_FRAMEBUFFER,h.__webglFramebuffer),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(e).__webglTexture,i,d+n),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,R.get(t).__webglTexture,a,m+n)),I.blitFramebuffer(l,u,o,s,f,p,o,s,I.DEPTH_BUFFER_BIT,I.NEAREST);L.bindFramebuffer(I.READ_FRAMEBUFFER,null),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||R.has(e)){let n=R.get(e),r=R.get(t);L.bindFramebuffer(I.READ_FRAMEBUFFER,te),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,ne);for(let e=0;e<c;e++)w?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,n.__webglTexture,i),T?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,r.__webglTexture,a),i===0?T?I.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):I.copyTexSubImage2D(v,a,f,p,l,u,o,s):I.blitFramebuffer(l,u,o,s,f,p,o,s,I.COLOR_BUFFER_BIT,I.NEAREST);L.bindFramebuffer(I.READ_FRAMEBUFFER,null),L.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?I.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?I.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):I.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):I.texSubImage2D(I.TEXTURE_2D,a,f,p,o,s,g,_,h);L.pixelStorei(I.UNPACK_ROW_LENGTH,y),L.pixelStorei(I.UNPACK_IMAGE_HEIGHT,b),L.pixelStorei(I.UNPACK_SKIP_PIXELS,x),L.pixelStorei(I.UNPACK_SKIP_ROWS,S),L.pixelStorei(I.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&I.generateMipmap(v),L.unbindTexture()},this.initRenderTarget=function(e){R.get(e).__webglFramebuffer===void 0&&Ie.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Ie.setTextureCube(e,0):e.isData3DTexture?Ie.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Ie.setTexture2DArray(e,0):Ie.setTexture2D(e,0),L.unbindTexture()},this.resetState=function(){N=0,re=0,F=null,L.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return it}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=P._getDrawingBufferColorSpace(e),t.unpackColorSpace=P._getUnpackColorSpace()}},Zi={type:`change`},Qi={type:`start`},$i={type:`end`},ea=new c,ta=new re,na=Math.cos(70*We.DEG2RAD),ra=new z,ia=2*Math.PI,aa={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},oa=1e-6,sa=class extends Qe{constructor(e,t=null){super(e,t),this.state=aa.NONE,this.target=new z,this.cursor=new z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:qe.ROTATE,MIDDLE:qe.DOLLY,RIGHT:qe.PAN},this.touches={ONE:O.ROTATE,TWO:O.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new z,this._lastQuaternion=new ee,this._lastTargetPosition=new z,this._quat=new ee().setFromUnitVectors(e.up,new z(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new A,this._sphericalDelta=new A,this._scale=1,this._panOffset=new z,this._rotateStart=new B,this._rotateEnd=new B,this._rotateDelta=new B,this._panStart=new B,this._panEnd=new B,this._panDelta=new B,this._dollyStart=new B,this._dollyEnd=new B,this._dollyDelta=new B,this._dollyDirection=new z,this._mouse=new B,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=la.bind(this),this._onPointerDown=ca.bind(this),this._onPointerUp=ua.bind(this),this._onContextMenu=_a.bind(this),this._onMouseWheel=pa.bind(this),this._onKeyDown=ma.bind(this),this._onTouchStart=ha.bind(this),this._onTouchMove=ga.bind(this),this._onMouseDown=da.bind(this),this._onMouseMove=fa.bind(this),this._interceptControlDown=va.bind(this),this._interceptControlUp=ya.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.state=aa.NONE,this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),e.removeEventListener(`keyup`,this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction=``,this.domElement.style.cursor=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Zi),this.update(),this.state=aa.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;ra.copy(t).sub(this.target),ra.applyQuaternion(this._quat),this._spherical.setFromVector3(ra),this.autoRotate&&this.state===aa.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=ia:n>Math.PI&&(n-=ia),r<-Math.PI?r+=ia:r>Math.PI&&(r-=ia),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(ra.setFromSpherical(this._spherical),ra.applyQuaternion(this._quatInverse),t.copy(this.target).add(ra),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=ra.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new z(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new z(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=ra.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(ea.origin.copy(this.object.position),ea.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ea.direction))<na?this.object.lookAt(this.target):(ta.setFromNormalAndCoplanarPoint(this.object.up,this.target),ea.intersectPlane(ta,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>oa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>oa||this._lastTargetPosition.distanceToSquared(this.target)>oa?(this.dispatchEvent(Zi),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?ia/60/60*this.autoRotateSpeed:ia/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){ra.setFromMatrixColumn(t,0),ra.multiplyScalar(-e),this._panOffset.add(ra)}_panUp(e,t){this.screenSpacePanning===!0?ra.setFromMatrixColumn(t,1):(ra.setFromMatrixColumn(t,0),ra.crossVectors(this.object.up,ra)),ra.multiplyScalar(e),this._panOffset.add(ra)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;ra.copy(r).sub(this.target);let i=ra.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ia*this._rotateDelta.x/t.clientHeight),this._rotateUp(ia*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ia*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ia*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ia*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ia*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ia*this._rotateDelta.x/t.clientHeight),this._rotateUp(ia*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new B,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function ca(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function la(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function ua(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent($i),this.state=aa.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y})}}function da(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case qe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=aa.DOLLY;break;case qe.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=aa.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=aa.ROTATE}break;case qe.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=aa.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=aa.PAN}break;default:this.state=aa.NONE}this.state!==aa.NONE&&this.dispatchEvent(Qi)}function fa(e){switch(this.state){case aa.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case aa.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case aa.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e)}}function pa(e){this.enabled!==!1&&this.enableZoom!==!1&&this.state===aa.NONE&&(e.preventDefault(),this.dispatchEvent(Qi),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent($i))}function ma(e){this.enabled!==!1&&this._handleKeyDown(e)}function ha(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case O.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=aa.TOUCH_ROTATE;break;case O.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=aa.TOUCH_PAN;break;default:this.state=aa.NONE}break;case 2:switch(this.touches.TWO){case O.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=aa.TOUCH_DOLLY_PAN;break;case O.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=aa.TOUCH_DOLLY_ROTATE;break;default:this.state=aa.NONE}break;default:this.state=aa.NONE}this.state!==aa.NONE&&this.dispatchEvent(Qi)}function ga(e){switch(this._trackPointer(e),this.state){case aa.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case aa.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case aa.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case aa.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=aa.NONE}}function _a(e){this.enabled!==!1&&e.preventDefault()}function va(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function ya(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}var ba=class extends i{constructor(e=document.createElement(`div`)){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position=`absolute`,this.element.style.userSelect=`none`,this.element.setAttribute(`draggable`,!1),this.center=new B(.5,.5),this.rotation2D=0,this.addEventListener(`removed`,function(){this.traverse(function(e){e.element&&e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this.rotation2D=e.rotation2D,this}},xa=new z,Sa=new V,Ca=new V,wa=new z,Ta=new z,Ea=class{constructor(e={}){let t=this,n,r,i,a,o={objects:new WeakMap},s=e.element===void 0?document.createElement(`div`):e.element;s.style.overflow=`hidden`,this.domElement=s,this.sortObjects=!0,this.getSize=function(){return{width:n,height:r}},this.render=function(e,t){e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Sa.copy(t.matrixWorldInverse),Ca.multiplyMatrices(t.projectionMatrix,Sa),l(e,e,t),this.sortObjects&&f(e)},this.setSize=function(e,t){n=e,r=t,i=n/2,a=r/2,s.style.width=e+`px`,s.style.height=t+`px`};function c(e){e.isCSS2DObject&&(e.element.style.display=`none`);for(let t=0,n=e.children.length;t<n;t++)c(e.children[t])}function l(e,n,r){if(e.visible===!1){c(e);return}if(e.isCSS2DObject){xa.setFromMatrixPosition(e.matrixWorld),xa.applyMatrix4(Ca);let c=xa.z>=-1&&xa.z<=1&&e.layers.test(r.layers)===!0,l=e.element;if(l.style.display=c===!0?``:`none`,c===!0){e.onBeforeRender(t,n,r);let o=100*e.center.x,c=100*e.center.y;l.style.transformOrigin=`${o}% ${c}%`;let u=-e.rotation2D,d=xa.x*i+i,f=-xa.y*a+a;l.style.transform=`translate(${-o}%, ${-c}%) translate(${d}px, ${f}px) rotate(${u}rad)`,l.parentNode!==s&&s.appendChild(l),e.onAfterRender(t,n,r)}let d={distanceToCameraSquared:u(r,e)};o.objects.set(e,d)}for(let t=0,i=e.children.length;t<i;t++)l(e.children[t],n,r)}function u(e,t){return wa.setFromMatrixPosition(e.matrixWorld),Ta.setFromMatrixPosition(t.matrixWorld),wa.distanceToSquared(Ta)}function d(e){let t=[];return e.traverseVisible(function(e){e.isCSS2DObject&&t.push(e)}),t}function f(e){let t=d(e).sort(function(e,t){return e.renderOrder===t.renderOrder?o.objects.get(e).distanceToCameraSquared-o.objects.get(t).distanceToCameraSquared:t.renderOrder-e.renderOrder}),n=t.length;for(let e=0,r=t.length;e<r;e++)t[e].element.style.zIndex=n-e}}},Da=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Oa=new Ze(-1,1,1,-1,0,1),ka=new class extends Ne{constructor(){super(),this.setAttribute(`position`,new k([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new k([0,2,0,0,2,0],2))}},Aa=class{constructor(e){this._mesh=new Ot(ka,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Oa)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},ja={Mesh:Ot.prototype.raycast,Line:Me.prototype.raycast,LineSegments:Ie.prototype.raycast,LineLoop:mt.prototype.raycast,Points:E.prototype.raycast,BatchedMesh:Ge.prototype.raycast},Ma=new Ot,Na=[];function Pa(e,t){if(this.isBatchedMesh)Fa.call(this,e,t);else{let{geometry:n}=this;if(n.boundsTree)n.boundsTree.raycastObject3D(this,e,t);else{let n;if(this instanceof Ot)n=ja.Mesh;else if(this instanceof Ie)n=ja.LineSegments;else if(this instanceof mt)n=ja.LineLoop;else if(this instanceof Me)n=ja.Line;else if(this instanceof E)n=ja.Points;else throw Error(`BVH: Fallback raycast function not found.`);n.call(this,e,t)}}}function Fa(e,t){if(this.boundsTrees){let n=this.boundsTrees,r=this._drawInfo||this._instanceInfo,i=this._drawRanges||this._geometryInfo,a=this.matrixWorld;Ma.material=this.material,Ma.geometry=this.geometry;let o=Ma.geometry.boundsTree,s=Ma.geometry.drawRange;Ma.geometry.boundingSphere===null&&(Ma.geometry.boundingSphere=new Ce);for(let o=0,s=r.length;o<s;o++){if(!this.getVisibleAt(o))continue;let s=r[o].geometryIndex;if(Ma.geometry.boundsTree=n[s],this.getMatrixAt(o,Ma.matrixWorld).premultiply(a),!Ma.geometry.boundsTree){this.getBoundingBoxAt(s,Ma.geometry.boundingBox),this.getBoundingSphereAt(s,Ma.geometry.boundingSphere);let e=i[s];Ma.geometry.setDrawRange(e.start,e.count)}Ma.raycast(e,Na);for(let e=0,n=Na.length;e<n;e++){let n=Na[e];n.object=this,n.batchId=o,t.push(n)}Na.length=0}Ma.geometry.boundsTree=o,Ma.geometry.drawRange=s,Ma.material=null,Ma.geometry=null}else ja.BatchedMesh.call(this,e,t)}function Ia(e={}){let{type:t=ht}=e;return this.boundsTree=new t(this,e),this.boundsTree}function La(){this.boundsTree=null}var Ra=new z,za=new z;function Ba(e,t){return typeof e==`string`?e:e[t]??e.rest??`wallInt`}function Va(e,t){let n=Math.abs(t[0]),r=Math.abs(t[1]),i=Math.abs(t[2]);return r>=n&&r>=i?[e[0],t[1]>0?-e[2]:e[2]]:n>=i?[t[0]>0?-e[2]:e[2],e[1]]:[t[2]>0?e[0]:-e[0],e[1]]}function Ha(e,t,n){let r=t[0]-e[0],i=t[1]-e[1],a=t[2]-e[2],o=n[0]-e[0],s=n[1]-e[1],c=n[2]-e[2];return[i*c-a*s,a*o-r*c,r*s-i*o]}function Ua(e){let t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]}function Wa(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function Ga(e){let t=0;for(let n=0;n<e.length;n++){let r=e[n],i=e[(n+1)%e.length];t+=r[0]*i[1]-i[0]*r[1]}return t}var Ka=class{buckets=new Map;group=`gf`;remap={};uvFn=null;m=new V;nm=new je;identity=!0;flip=!1;setTransform(e){if(!e){this.identity=!0,this.flip=!1,this.m.identity(),this.nm.identity();return}this.identity=!1,this.m.copy(e),this.nm.getNormalMatrix(e),this.flip=e.determinant()<0}bucket(e){let t=this.remap[e]??e,n=this.buckets.get(this.group);n||(n=new Map,this.buckets.set(this.group,n));let r=n.get(t);return r||(r={pos:[],nor:[],uv:[]},n.set(t,r)),r}tp(e){return this.identity?e:(Ra.set(e[0],e[1],e[2]).applyMatrix4(this.m),[Ra.x,Ra.y,Ra.z])}tn(e){return this.identity?e:(za.set(e[0],e[1],e[2]).applyMatrix3(this.nm).normalize(),[za.x,za.y,za.z])}tri(e,t,n,r,i,a,o,s){let c=[this.tp(e),this.tp(t),this.tp(n)],l=Ua(Ha(c[0],c[1],c[2])),u=this.flip?[-l[0],-l[1],-l[2]]:l,d=[i?this.tn(i):u,a?this.tn(a):u,o?this.tn(o):u],f=this.flip?[0,2,1]:[0,1,2],p=this.bucket(r);for(let e of f){let t=c[e],n=d[e];p.pos.push(t[0],t[1],t[2]),p.nor.push(n[0],n[1],n[2]);let i=s?s[e]:this.uvFn?.(t,u,r)??Va(t,u);p.uv.push(i[0],i[1])}}quad(e,t,n,r,i,a,o){let s=Ua(Ha(e,t,n));a&&Wa(s,a)<0&&([t,r]=[r,t],o&&=[o[0],o[3],o[2],o[1]],s=[-s[0],-s[1],-s[2]]),this.tri(e,t,n,i,s,s,s,o?[o[0],o[1],o[2]]:void 0),this.tri(e,n,r,i,s,s,s,o?[o[0],o[2],o[3]]:void 0)}box(e,t,n,r,i,a,o,s=``){if(t<e&&([e,t]=[t,e]),r<n&&([n,r]=[r,n]),a<i&&([i,a]=[a,i]),t-e<1e-5||r-n<1e-5||a-i<1e-5)return;let c=e=>!s.includes(e);c(`px`)&&this.quad([t,n,a],[t,n,i],[t,r,i],[t,r,a],Ba(o,`px`),[1,0,0]),c(`nx`)&&this.quad([e,n,i],[e,n,a],[e,r,a],[e,r,i],Ba(o,`nx`),[-1,0,0]),c(`py`)&&this.quad([e,r,a],[t,r,a],[t,r,i],[e,r,i],Ba(o,`py`),[0,1,0]),c(`ny`)&&this.quad([e,n,i],[t,n,i],[t,n,a],[e,n,a],Ba(o,`ny`),[0,-1,0]),c(`pz`)&&this.quad([e,n,a],[t,n,a],[t,r,a],[e,r,a],Ba(o,`pz`),[0,0,1]),c(`nz`)&&this.quad([t,n,i],[e,n,i],[e,r,i],[t,r,i],Ba(o,`nz`),[0,0,-1])}capTris(e){let t=e.map(e=>new B(e[0],e[1]));return xe.triangulateShape(t,[])}prismXZ(e,t,n,r,i,a){let o=this.capTris(e);for(let a of o){let[o,s,c]=a.map(t=>e[t]),l=[o[0],n,o[1]],u=[s[0],n,s[1]],d=[c[0],n,c[1]],f=Ua(Ha(l,u,d));f[1]<0?this.tri(l,d,u,r):this.tri(l,u,d,r);let p=[o[0],t,o[1]],m=[s[0],t,s[1]],h=[c[0],t,c[1]];f=Ua(Ha(p,m,h)),f[1]>0?this.tri(p,h,m,i):this.tri(p,m,h,i)}let s=Math.sign(Ga(e));for(let r=0;r<e.length;r++){let i=e[r],o=e[(r+1)%e.length],c=o[0]-i[0],l=o[1]-i[1],u=Math.hypot(c,l);if(u<1e-6)continue;let d=(s>0?l:-l)/u,f=(s>0?-c:c)/u,p=typeof a==`string`?a:a(d,f,r);this.quad([i[0],t,i[1]],[o[0],t,o[1]],[o[0],n,o[1]],[i[0],n,i[1]],p,[d,0,f])}}prismZY(e,t,n,r,i){let a=this.capTris(e);for(let i of a){let[a,o,s]=i.map(t=>e[t]);this.oriented([n,a[1],a[0]],[n,o[1],o[0]],[n,s[1],s[0]],r,[1,0,0]),this.oriented([t,a[1],a[0]],[t,o[1],o[0]],[t,s[1],s[0]],r,[-1,0,0])}let o=Math.sign(Ga(e));for(let r=0;r<e.length;r++){let a=e[r],s=e[(r+1)%e.length],c=s[0]-a[0],l=s[1]-a[1],u=Math.hypot(c,l);if(u<1e-6)continue;let d=(o>0?l:-l)/u,f=(o>0?-c:c)/u,p=typeof i==`string`?i:i(d,f,r);this.quad([t,a[1],a[0]],[n,a[1],a[0]],[n,s[1],s[0]],[t,s[1],s[0]],p,[0,f,d])}}prismXY(e,t,n,r,i){let a=this.capTris(e);for(let i of a){let[a,o,s]=i.map(t=>e[t]);this.oriented([a[0],a[1],n],[o[0],o[1],n],[s[0],s[1],n],r,[0,0,1]),this.oriented([a[0],a[1],t],[o[0],o[1],t],[s[0],s[1],t],r,[0,0,-1])}let o=Math.sign(Ga(e));for(let r=0;r<e.length;r++){let a=e[r],s=e[(r+1)%e.length],c=s[0]-a[0],l=s[1]-a[1],u=Math.hypot(c,l);if(u<1e-6)continue;let d=(o>0?l:-l)/u,f=(o>0?-c:c)/u,p=typeof i==`string`?i:i(d,f,r);this.quad([a[0],a[1],t],[s[0],s[1],t],[s[0],s[1],n],[a[0],a[1],n],p,[d,f,0])}}oriented(e,t,n,r,i){Wa(Ha(e,t,n),i)<0?this.tri(e,n,t,r):this.tri(e,t,n,r)}geom(e,t,n,r=!1){let i=e.index?e.toNonIndexed():e;i.getAttribute(`normal`)||i.computeVertexNormals();let a=i.getAttribute(`position`),o=i.getAttribute(`normal`),s=i.getAttribute(`uv`),c=n?new je().getNormalMatrix(n):null,l=n?n.determinant()<0:!1,u=[],d=[],f=[];for(let e=0;e<a.count;e++)Ra.fromBufferAttribute(a,e),za.fromBufferAttribute(o,e),n&&(Ra.applyMatrix4(n),za.applyMatrix3(c).normalize()),u.push([Ra.x,Ra.y,Ra.z]),d.push([za.x,za.y,za.z]),s&&f.push([s.getX(e),s.getY(e)]);for(let e=0;e+2<u.length;e+=3){let n=e,i=l?e+2:e+1,a=l?e+1:e+2;this.tri(u[n],u[i],u[a],t,d[n],d[i],d[a],r&&s?[f[n],f[i],f[a]]:void 0)}i!==e&&i.dispose()}bar(e,t,n,r,i){let a=new z().subVectors(t,e),o=a.length();if(o<1e-5)return;let s=a.clone().normalize(),c=new z(0,1,0);Math.abs(s.y)>.99&&(c=new z(1,0,0));let l=new z().crossVectors(s,c).normalize(),u=new z().crossVectors(l,s).normalize(),d=new V().makeBasis(s,u,l);d.setPosition(e.clone().add(t).multiplyScalar(.5));let f=new _t(o,r,n);this.geom(f,i,d),f.dispose()}rod(e,t,n,r,i=10){let a=new z().subVectors(t,e),o=a.length();if(o<1e-5)return;let s=new N(n,n,o,i,1,!1),c=new ee().setFromUnitVectors(new z(0,1,0),a.clone().normalize()),l=new V().compose(e.clone().add(t).multiplyScalar(.5),c,new z(1,1,1));this.geom(s,r,l),s.dispose()}groups(){return[...this.buckets.keys()]}build(e,t){let n=new Map;for(let[r,i]of this.buckets){let a=new Oe;a.name=r;for(let[n,o]of i){if(o.pos.length===0)continue;let i=new Ne;i.setAttribute(`position`,new k(o.pos,3)),i.setAttribute(`normal`,new k(o.nor,3)),i.setAttribute(`uv`,new k(o.uv,2)),i.computeBoundingBox(),i.computeBoundingSphere();let s=new Ot(i,e(n));s.name=`${r}:${n}`,s.castShadow=t(n),s.receiveShadow=!0,s.userData.matKey=n,s.matrixAutoUpdate=!1,s.updateMatrix(),a.add(s)}n.set(r,a)}return this.buckets.clear(),n}},U=6.096,qa=.2,Ja=.1,Ya=.12,W=11.74,Xa={a:3.15,b:5.5,y0:1.05,y1:2.5,openingWidth:.65,frameWidth:.035},Za={z:7.6,width:2.1,depth:.94,chaiseDepth:1.85,legHeight:.18},Qa=-2.66,$a=-.1+.12/2,eo={a:2.65,b:3.52},to={a:3.72,b:4.92,y0:1.1,y1:2.55},no={westX:.058,showerZ:-.76,toiletZ:-1.72,basinX:.75,rearZ:-2.552},ro={z:1.6,a:3.42,b:5.8,height:2.35},io={z:12.15,a:2.72,b:3.66,height:2.1},ao={a:.35,b:1.25,height:2.1},oo=18.7,so={margin:2.2,drainWidth:.65,drainWall:.1,frontDrainOffset:.05,rearDrainOffset:.1,frontPavementWidth:.5},co=16.45,lo=15.02,uo=14.62,fo=.97,G=3.6,po=3.45,mo=2.85,ho=6.65,go=6.95,_o=-.3,vo=-.15,yo=-.15,bo=12.28,xo={size:[.6,.3],thickness:.02,grout:.004},So=5.6,Co=12.29,wo=3.35,To=1.17,Eo=3.15,Do=.9,Oo=2.4,ko=3.5500000000000003,Ao={eaveRise:.09,wallRise:.27},jo={back:11.64,front:14.87,ceiling:6.800000000000001,eastOverhang:.12},Mo=(Ao.wallRise-Ao.eaveRise)/(jo.front-jo.back),No=.016,Po={frameWidth:.055,frameDepth:.1,panelWidth:.8,panelThickness:No,porch:{back:14.719999999999999,front:18.58,high:wo,slope:Math.tan(5*Math.PI/180)},balcony:{back:Co,front:16.52,slope:Mo,high:jo.ceiling+Ao.wallRise-(Co-jo.back)*Mo-No}},Fo=Math.PI/180*27,Io=Math.tan(Fo),Lo=.22,Ro=11.74/2,zo=12.45,Bo=-.65;function Vo(e){return 7.17+(Ro-Math.abs(e-Ro))*Io}var Ho=Vo(Ro),Uo=3.94,Wo=.65,Go=6.5,Ko=6.3;function qo(e){let t=7.17;return Math.min(t+(e-0)*Io,t+(W-e)*Io-Wo)}var Jo=11.74/2-Wo/(2*Io),Yo=qo(Jo),Xo={lower:8,middle:3,upper:6},Zo=G/(Xo.lower+2+Xo.middle+1+Xo.upper+1),Qo=4.44,$o=6.5,es=7.58,ts=3.16,ns=1.15,rs=1.72,is=3.28,as=3.36,os=4.3,ss=2.76,cs=3.94,ls=9.63,us=[{a:4.35,b:4.9,y0:5.45,y1:5.95},{a:5.15,b:5.7,y0:5.45,y1:5.95}],ds=qa/2,fs=Ja/2,ps=[{id:`living`,name:`Living Room`,malay:`Ruang Tamu`,level:`gf`,x0:fs,x1:6.046,z0:7.64,z1:11.64,y:0},{id:`dining`,name:`Dining`,malay:`Ruang Makan`,level:`gf`,x0:ts,x1:6.046,z0:4.5,z1:7.64,y:0},{id:`kitchen`,name:`Kitchen`,malay:`Dapur`,level:`gf`,x0:3.16,x1:6.046,z0:ds,z1:4.380000000000001,y:0,labelOffset:[.2,.6]},{id:`bed4`,name:`Bedroom 4`,malay:`Bilik Tidur 4`,level:`gf`,x0:fs,x1:3.04,z0:1.59,z1:4.380000000000001,y:0},{id:`bath3`,name:`Bathroom 3`,malay:`Bilik Mandi 3`,level:`gf`,x0:1.57,x1:3.92,z0:ds,z1:1.47,y:0},{id:`porch`,name:`Car Porch`,malay:`Anjung Kereta`,level:`site`,x0:fs,x1:6.046,z0:11.84,z1:oo,y:-.15},{id:`yard`,name:`Rear Yard`,malay:`Laman Belakang`,level:`site`,x0:fs,x1:6.046,z0:-2.56,z1:-.1,y:-.1},{id:`bed3`,name:`Bedroom 3`,malay:`Bilik Tidur 3`,level:`ff`,x0:fs,x1:2.98,z0:ds,z1:4.380000000000001,y:G},{id:`bed2`,name:`Bedroom 2`,malay:`Bilik Tidur 2`,level:`ff`,x0:3.1,x1:6.046,z0:ds,z1:4.380000000000001,y:G},{id:`family`,name:`Family Hall`,malay:`Ruang Keluarga`,level:`ff`,x0:rs,x1:6.046,z0:4.5,z1:7.5200000000000005,y:G,labelOffset:[.7,0]},{id:`master`,name:`Master Bedroom`,malay:`Bilik Tidur Utama`,level:`ff`,x0:fs,x1:3.88,z0:7.64,z1:11.64,y:G},{id:`bath2`,name:`Bathroom 2`,malay:`Bilik Mandi 2`,level:`ff`,x0:4,x1:6.046,z0:7.64,z1:9.57,y:G},{id:`bath1`,name:`Bathroom 1 (ensuite)`,malay:`Bilik Mandi 1`,level:`ff`,x0:4,x1:6.046,z0:9.690000000000001,z1:12.09,y:G},{id:`balcony`,name:`Balcony`,malay:`Balkoni`,level:`ff`,x0:fs,x1:6.046,z0:11.84,z1:16.25,y:ko,labelOffset:[.3,.4]}],ms=[[`Orientation`,`Front (street side) faces south`],[`Lot size`,`20′ × 70′ (6.10 m × 21.34 m)`],[`Ground floor (internal length)`,`11.74 m`],[`First floor (internal length)`,`12.19 m`],[`Floor to floor (GF → FF)`,`3.60 m`],[`FF floor to roof beam`,`3.35 m`],[`Plinth above road`,`0.20 m`],[`Porch → front door`,`2 steps × 150 mm`],[`Car porch depth`,`≈ 6.9 m`],[`Balcony depth`,`≈ 4.6 m`],[`Bedrooms / Bathrooms`,`4 / 3`]],hs=[{id:`none`,label:`Existing house`,description:`Original layout, open rear yard, full balcony and existing gate.`,groundFloor:!1,masterExtension:!1,autoGate:!1,kitchen:`open`,bathroomAccess:`shared`,masterZone:`open`,wideKitchenOpening:!1},{id:`open-plan`,label:`Open family plan`,description:`Keep the original wall and opening between the living passage and dining, with an open rear kitchen. Bathroom 3 stays shared; the extended master is one open room. Translucent polycarbonate awnings over the car porch and balcony admit daylight.`,groundFloor:!0,masterExtension:!0,autoGate:!0,kitchen:`open`,bathroomAccess:`shared`,masterZone:`open`,wideKitchenOpening:!1}],gs=hs[0],_s=[{id:`japanese`,label:`Japanese minimal`,description:`Pale oak, cream linen, a compact wooden coffee table on wheels and simple storage.`,swatches:[{color:`#c9ae86`,label:`Pale oak`},{color:`#e9e0cf`,label:`Cream linen`},{color:`#ded3bd`,label:`Warm stone`}],masterNook:`tatami`,finishes:{}},{id:`scandinavian`,label:`Scandinavian minimal`,description:`Light timber, off-white walls, oatmeal fabric and a compact wooden coffee table on wheels.`,swatches:[{color:`#d6c6a7`,label:`Light timber`},{color:`#f5f4ee`,label:`Off-white`},{color:`#cbc4b7`,label:`Oatmeal`}],masterNook:`reading`,finishes:{jpOak:{color:`#fff9ee`,woodGrain:!0},jpOakDark:{color:`#c5b391`},jpLinen:{color:`#f4f1e9`},jpLinenGrey:{color:`#cbc4b7`},jpCushion:{color:`#b4b4a8`},jpRug:{color:`#e7e2d8`},modernLinen:{color:`#cbc4b7`},modernPlaster:{color:`#f5f4ee`},modernStone:{color:`#e5e0d5`},modernFloor:{color:`#e1dbcf`},cabinet:{color:`#f5f4ee`},worktop:{color:`#c9c6bc`}}},{id:`soft-grey`,label:`Soft grey minimal`,description:`Soft grey upholstery, matte grey cabinetry and white walls with a compact wooden coffee table on wheels.`,swatches:[{color:`#f1f1ee`,label:`Soft white`},{color:`#bfc1be`,label:`Light grey`},{color:`#777b79`,label:`Muted charcoal`}],masterNook:`desk`,finishes:{jpOak:{color:`#c8cbc7`},jpOakDark:{color:`#777b79`},jpLinen:{color:`#efefeb`},jpLinenGrey:{color:`#bec2bf`},jpCushion:{color:`#989e99`},jpRug:{color:`#d5d7d3`},modernLinen:{color:`#bfc1be`},modernPlaster:{color:`#f1f1ee`},modernStone:{color:`#d4d6d2`},modernFloor:{color:`#d1d3cf`},cabinet:{color:`#c8cbc7`},worktop:{color:`#888e89`}}}],vs=e=>_s.find(t=>t.id===e),ys=(e,t)=>`${e}/${t}`;function bs(e){let t=vs(e)?.finishes??{};return Object.fromEntries(Object.keys(t).map(t=>[t,ys(e,t)]))}function xs(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}var Ss=class{px;py;vals;constructor(e,t,n){this.px=e,this.py=t,this.vals=new Float32Array(e*t);for(let e=0;e<this.vals.length;e++)this.vals[e]=n()}sample(e,t){let{px:n,py:r,vals:i}=this,a=Math.floor(e),o=Math.floor(t),s=e-a,c=t-o,l=s*s*(3-2*s),u=c*c*(3-2*c),d=(a%n+n)%n,f=(o%r+r)%r,p=(d+1)%n,m=(f+1)%r,h=i[f*n+d],g=i[f*n+p],_=i[m*n+d],v=i[m*n+p];return h+(g-h)*l+(_-h)*u+(h-g-_+v)*l*u}},Cs=class{gain;layers=[];constructor(e,t,n,r,i=.5){this.gain=i;let a=xs(r);for(let r=0;r<n;r++)this.layers.push(new Ss(e<<r,t<<r,a))}at(e,t){let n=0,r=1,i=0;for(let a of this.layers)n+=a.sample(e*a.px,t*a.py)*r,i+=r,r*=this.gain;return n/i}};function ws(e,t,n){let r=Math.imul(e,374761393)+Math.imul(t,668265263)+Math.imul(n,1442695041);return r=Math.imul(r^r>>>13,1274126177),r^=r>>>16,(r>>>0)/4294967296}var Ts=8;function Es(e){Ts=Math.min(16,e)}function Ds(e,t){let n=new s(e);return n.wrapS=n.wrapT=F,n.colorSpace=t?y:``,n.anisotropy=Ts,n.generateMipmaps=!0,n.minFilter=Le,n.needsUpdate=!0,n}function Os(e,t,n){let r=document.createElement(`canvas`);r.width=e,r.height=t;let i=r.getContext(`2d`),a=i.createImageData(e,t);return n(a.data),i.putImageData(a,0,0),r}function ks(e,t,n,r){return Os(t,n,i=>{for(let a=0;a<n;a++){let o=(a-1+n)%n,s=(a+1)%n;for(let n=0;n<t;n++){let c=(n-1+t)%t,l=(n+1)%t,u=(e[a*t+l]-e[a*t+c])*r,d=(e[s*t+n]-e[o*t+n])*r,f=-u,p=d,m=1,h=Math.hypot(f,p,m);f/=h,p/=h,m/=h;let g=(a*t+n)*4;i[g]=(f*.5+.5)*255,i[g+1]=(p*.5+.5)*255,i[g+2]=(m*.5+.5)*255,i[g+3]=255}}})}function As(e){let t=parseInt(e.replace(`#`,``),16);return[t>>16&255,t>>8&255,t&255]}function js(e){let t=e.px,n=Math.round(e.px*(e.meters[1]/e.meters[0])),r=As(e.base),i=As(e.grout_c),a=new Cs(e.cloudScale,Math.round(e.cloudScale*(e.meters[1]/e.meters[0])),5,e.seed),o=new Cs(64,Math.round(64*(e.meters[1]/e.meters[0])),2,e.seed+7),s=new Float32Array(t*n),c=new Float32Array(t*n),l=new Float32Array(t*n*3),u=e.meters[0]/t;for(let d=0;d<n;d++)for(let f=0;f<t;f++){let p=(f+.5)*u,m=(d+.5)*u,h=Math.floor(m/e.tile[1]),g=(p+(e.stagger&&h%2?e.tile[0]/2:0))%e.meters[0],_=Math.floor(g/e.tile[0]);g-=_*e.tile[0];let v=m-h*e.tile[1],y=Math.min(g,e.tile[0]-g,v,e.tile[1]-v),b=d*t+f,x=f/t,S=d/n,C=e.grout/2;if(y<C){s[b]=0,c[b]=e.roughGrout;let t=.92+o.at(x,S)*.16;l[b*3]=i[0]*t,l[b*3+1]=i[1]*t,l[b*3+2]=i[2]*t}else{let t=Math.min(1,(y-C)/Math.max(1e-4,e.bevel));s[b]=.35+.65*Math.sin(t*Math.PI/2),e.surfaceRelief&&(s[b]+=(o.at(x,S)-.5)*e.surfaceRelief);let n=(ws(_,h,e.seed)-.5)*2*e.tileVar,i=ws(_+17,h+31,e.seed),u=(a.at((x+i)%1,(S+i*.7)%1)-.5)*2*e.cloud,d=0;e.speckle&&(d=(o.at(x,S)-.5)*e.speckle);let f=1+n+u+d;l[b*3]=r[0]*f,l[b*3+1]=r[1]*f,l[b*3+2]=r[2]*f,c[b]=e.roughTile*(.85+.3*a.at(x,S))}}let d=Os(t,n,e=>{for(let r=0;r<t*n;r++)e[r*4]=l[r*3],e[r*4+1]=l[r*3+1],e[r*4+2]=l[r*3+2],e[r*4+3]=255}),f=Os(t,n,e=>{for(let r=0;r<t*n;r++){let t=Math.max(0,Math.min(1,c[r]))*255;e[r*4]=t,e[r*4+1]=t,e[r*4+2]=t,e[r*4+3]=255}}),p=ks(s,t,n,e.normalStrength);return{map:Ds(d,!0),roughnessMap:Ds(f,!1),normalMap:Ds(p,!1),size:e.meters}}function Ms(e=1024,t=11){let n=.3,r=.33,i=[4*n,4*r],a=e,o=Math.round(e*(i[1]/i[0])),s=As(`#4a4f55`),c=new Cs(6,7,5,t),l=new Cs(96,105,2,t+3),u=new Float32Array(a*o),d=new Float32Array(a*o*3),f=new Float32Array(a*o);for(let e=0;e<o;e++){let p=(1-(e+.5)/o)*i[1],m=Math.floor(p/r),h=p/r-m;for(let r=0;r<a;r++){let p=((r+.5)/a*i[0]+(m%2?n*.5:0))%i[0],g=Math.floor(p/n),_=p/n-g,v=.5+.5*Math.cos(_*Math.PI*2*2)*.55+(_<.1||_>.9?-.25:0),y=(1-h)*1.3,b=h<.035?h/.035*.3+.7:1,x=e*a+r;u[x]=(y+v*.35)*b;let S=(ws(g+m*13,m,t)-.5)*.16,C=(c.at(r/a,e/o)-.5)*.35,w=h>.9?1-(h-.9)*3.2:1,T=(.8+.2*v)*w,E=(1+S+C+(l.at(r/a,e/o)-.5)*.12)*T;d[x*3]=s[0]*E,d[x*3+1]=s[1]*E,d[x*3+2]=s[2]*E*1.02,f[x]=.62+C*.4}}let p=Os(a,o,e=>{for(let t=0;t<a*o;t++)e[t*4]=d[t*3],e[t*4+1]=d[t*3+1],e[t*4+2]=d[t*3+2],e[t*4+3]=255}),m=Os(a,o,e=>{for(let t=0;t<a*o;t++){let n=Math.max(0,Math.min(1,f[t]))*255;e[t*4]=n,e[t*4+1]=n,e[t*4+2]=n,e[t*4+3]=255}}),h=ks(u,a,o,7);return{map:Ds(p,!0),roughnessMap:Ds(m,!1),normalMap:Ds(h,!1),size:i}}function Ns(e){let t=e.px,n=Math.round(e.px*(e.meters[1]/e.meters[0])),r=As(e.base),i=As(e.dark),a=new Cs(24,2,5,e.seed),o=new Cs(3,3,3,e.seed+1),s=new Float32Array(t*n),c=new Float32Array(t*n*3);for(let l=0;l<n;l++)for(let u=0;u<t;u++){let d=u/t,f=l/n,p=o.at(d,f)*.08,m=a.at((d+p)%1,f);m=Math.abs(Math.sin(m*Math.PI*9))**3*e.grain;let h=l*t+u,g=m,_=1-m*.1;if(e.grooves){let t=d*e.meters[0]/e.grooves;t-Math.floor(t)<.04&&(_=.2,g=Math.min(1,g+.5))}s[h]=_,c[h*3]=r[0]+(i[0]-r[0])*g,c[h*3+1]=r[1]+(i[1]-r[1])*g,c[h*3+2]=r[2]+(i[2]-r[2])*g}let l=Os(t,n,e=>{for(let r=0;r<t*n;r++)e[r*4]=c[r*3],e[r*4+1]=c[r*3+1],e[r*4+2]=c[r*3+2],e[r*4+3]=255}),u=ks(s,t,n,e.grooves?6:1.5),d=Os(t,n,r=>{for(let i=0;i<t*n;i++){let t=Math.min(1,e.rough+(1-s[i])*.6)*255;r[i*4]=r[i*4+1]=r[i*4+2]=t,r[i*4+3]=255}});return{map:Ds(l,!0),normalMap:Ds(u,!1),roughnessMap:Ds(d,!1),size:e.meters}}function Ps(e=512,t=81){let n=new Cs(32,32,2,t),r=new Float32Array(e*e);for(let t=0;t<e;t++)for(let i=0;i<e;i++){let a=i/e*32,o=t/e*32,s=Math.sin(a%1*Math.PI),c=Math.sin(o%1*Math.PI),l=(Math.floor(a)+Math.floor(o))%2==0;r[t*e+i]=(l?s*.75+c*.25:c*.75+s*.25)*(.85+n.at(i/e,t/e)*.15)}let i=(t,n)=>Ds(Os(e,e,e=>{for(let i=0;i<r.length;i++){let a=t+r[i]*n;e[i*4]=e[i*4+1]=e[i*4+2]=a,e[i*4+3]=255}}),!1),a=i(225,30);return a.colorSpace=y,{map:a,normalMap:Ds(ks(r,e,e,1.1),!1),roughnessMap:i(235,-18),size:[.064,.064]}}function Fs(e=512,t=91){let n=new Cs(5,5,4,t),r=new Cs(96,96,2,t+1),i=new Float32Array(e*e),a=Os(e,e,t=>{for(let a=0;a<e;a++)for(let o=0;o<e;o++){let s=a*e+o,c=n.at(o/e,a/e),l=r.at(o/e,a/e);i[s]=l*.65+c*.35;let u=233+c*18+l*4;t[s*4]=u,t[s*4+1]=u-2,t[s*4+2]=u-5,t[s*4+3]=255}}),o=Os(e,e,e=>{for(let t=0;t<i.length;t++){let n=(.62+i[t]*.16)*255;e[t*4]=e[t*4+1]=e[t*4+2]=n,e[t*4+3]=255}});return{map:Ds(a,!0),normalMap:Ds(ks(i,e,e,.65),!1),roughnessMap:Ds(o,!1),size:[.8,.8]}}function Is(e=512,t=5,n=.9){let r=new Cs(24,24,4,t,.55),i=new Cs(3,3,3,t+9),a=new Float32Array(e*e);for(let t=0;t<e;t++)for(let n=0;n<e;n++)a[t*e+n]=r.at(n/e,t/e)*.8+i.at(n/e,t/e)*.2;let o=ks(a,e,e,n),s=Os(e,e,t=>{for(let n=0;n<e*e;n++){let e=(.82+(a[n]-.5)*.12)*255;t[n*4]=e,t[n*4+1]=e,t[n*4+2]=e,t[n*4+3]=255}});return{normalMap:Ds(o,!1),roughnessMap:Ds(s,!1),size:[1.5,1.5]}}function Ls(e,t=!0){let n=new s(e);return n.colorSpace=t?y:``,n.anisotropy=Ts,n.needsUpdate=!0,n}function Rs(e,t,n={}){if(!t)return;let r=n.size??t.size,i=e=>{if(!e)return;let t=e;return(e.repeat.x!==1||e.repeat.y!==1)&&(Math.abs(e.repeat.x-1/r[0])>1e-6||Math.abs(e.repeat.y-1/r[1])>1e-6)&&(t=e.clone()),t.repeat.set(1/r[0],1/r[1]),n.origin&&(t===e&&(t=e.clone()),t.repeat.set(1/r[0],1/r[1]),t.offset.set(-n.origin[0]/r[0],-n.origin[1]/r[1])),t.wrapS=t.wrapT=F,t.updateMatrix(),t.needsUpdate=!0,t};if(n.map!==!1&&t.map&&(e.map=i(t.map)),n.normal!==!1&&t.normalMap){e.normalMap=i(t.normalMap);let r=n.normalScale??1;e.normalScale.set(r,r)}n.rough!==!1&&t.roughnessMap&&(e.roughnessMap=i(t.roughnessMap))}async function zs(e,t,n,r=0){let i=`./textures/${t}`,a=await Promise.all([e.loadAsync(`${i}_diff.jpg`),e.loadAsync(`${i}_nor.jpg`),e.loadAsync(`${i}_rough.jpg`)]),o=a[0],[,c,l]=a;if(r>0){let e=o.image,t=document.createElement(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0);let i=n.getImageData(0,0,t.width,t.height),a=i.data,c=0;for(let e=0;e<a.length;e+=4)c+=a[e]*.3+a[e+1]*.59+a[e+2]*.11;c/=a.length/4;for(let e=0;e<a.length;e+=4)for(let t=0;t<3;t++)a[e+t]=150+(a[e+t]-c)*.5;for(let e=0;e<a.length;e+=4){let t=a[e]*.3+a[e+1]*.59+a[e+2]*.11;a[e]=a[e]+(t-a[e])*r,a[e+1]=a[e+1]+(t-a[e+1])*r,a[e+2]=a[e+2]+(t*1.02-a[e+2])*r}n.putImageData(i,0,0),o.dispose(),o=new s(t)}o.colorSpace=y,c.colorSpace=``,l.colorSpace=``;for(let e of[o,c,l])e.anisotropy=8,e.wrapS=e.wrapT=F;return{map:o,normalMap:c,roughnessMap:l,size:n}}var Bs=[`modernFloor`,`modernStone`,`modernPlaster`,`modernBronze`,`modernLinen`,`coffeeTableOak`,`wallInt`,`ceiling`,`floorTile`,`stairTile`,`bathWall`,`bathWallDark`,`bathFloor`,`kitchenTile`,`cabinet`,`worktop`,`doorWood`,`doorBath`,`ceramic`,`chrome`,`stainless`,`plasticWhite`,`steelRail`,`frameSage`,`jpOak`,`jpOakDark`,`jpLinen`,`jpLinenGrey`,`jpCushion`,`jpTatami`,`jpHeri`,`jpRug`,`jpWashi`,`jpLED`,`jpLacquer`,`jpGold`,`jpBrass`,`jpIncense`,`jpOrange`,`jpAltarRed`,`jpAltarPlaque`,`jpTudiPlaque`,..._s.flatMap(e=>Object.keys(e.finishes).map(t=>ys(e.id,t)))],Vs=[`concretePorch`,`porchTile`,`doorMain`,`plasticGrey`,`concreteLight`],Hs=class{entries=new Map;missing=new _e({color:16711935});interiorEnv=null;envScaled=!0;skyLevel=1;setInteriorEnv(e){this.interiorEnv=e,this.applyInteriorEnv(!0)}applyInteriorEnv(e){for(let t of[...Bs,...Vs]){let n=this.entries.get(t);n&&(n.mat.envMap=e?this.interiorEnv:null,n.mat.needsUpdate=!0)}}get(e){let t=this.entries.get(e);return t?t.mat:(console.warn(`missing material`,e),this.missing)}casts(e){return this.entries.get(e)?.cast??!0}keys(){return[...this.entries.keys()]}all(){return[...this.entries.values()].map(e=>e.mat)}add(e,t,n=1,r=!0){return t.name=e,t.envMapIntensity=n,t.castShadow=r,this.entries.set(e,{mat:t,cast:r,env:n}),t}setEnvScaled(e){this.envScaled=e,this.applyEnvIntensity(),this.interiorEnv&&this.applyInteriorEnv(e)}setSkyLevel(e){this.skyLevel=e,this.applyEnvIntensity()}applyEnvIntensity(){for(let e of this.entries.values())e.mat.envMapIntensity=(this.envScaled?e.env:1)*this.skyLevel}async init(e){let t=new Te;await e(`Loading surface scans…`);let[n,r,i]=await Promise.all([zs(t,`concrete_floor_02`,[2.2,2.2],.85),zs(t,`asphalt_02`,[2.5,2.5]),zs(t,`white_stucco`,[1.6,1.6])]);await e(`Generating porcelain tiles…`);let a=js({px:1024,meters:[1.2,1.2],tile:[.6,.6],grout:.0025,base:`#cdc4b6`,grout_c:`#a89e90`,tileVar:.03,cloud:.06,cloudScale:5,speckle:.03,roughTile:.09,roughGrout:.75,bevel:.0015,normalStrength:3,seed:3}),o=js({px:1024,meters:[xo.size[0]*4,xo.size[1]*8],tile:[...xo.size],grout:xo.grout,stagger:!0,base:`#565c60`,grout_c:`#353b3f`,tileVar:.035,cloud:.07,cloudScale:8,speckle:.07,roughTile:.86,roughGrout:.95,bevel:.0015,surfaceRelief:.05,normalStrength:2.5,seed:57}),s=js({px:1024,meters:[2.4,2.4],tile:[1.2,1.2],grout:.002,base:`#d7cfc0`,grout_c:`#c8bead`,tileVar:.012,cloud:.025,cloudScale:6,speckle:.012,roughTile:.65,roughGrout:.8,bevel:6e-4,normalStrength:1,seed:43}),c=js({px:1024,meters:[1.2,1.2],tile:[.6,.3],grout:.002,base:`#dcdcd7`,grout_c:`#c9c9c4`,tileVar:.02,cloud:.035,cloudScale:8,speckle:.05,roughTile:.2,roughGrout:.7,bevel:.0015,normalStrength:3,seed:21}),l=js({px:512,meters:[1.2,1.2],tile:[.6,.3],grout:.002,base:`#a4a5a2`,grout_c:`#959693`,tileVar:.02,cloud:.04,cloudScale:8,speckle:.06,roughTile:.25,roughGrout:.7,bevel:.0015,normalStrength:3,seed:22});await e(`Generating bathroom & balcony tiles…`);let u=js({px:512,meters:[.9,.9],tile:[.3,.3],grout:.003,base:`#77797a`,grout_c:`#666868`,tileVar:.03,cloud:.05,cloudScale:6,speckle:.12,roughTile:.55,roughGrout:.85,bevel:.002,normalStrength:2.5,seed:31}),d=js({px:512,meters:[1.2,1.2],tile:[.6,.3],grout:.002,base:`#ecebe6`,grout_c:`#d7d5cf`,tileVar:.015,cloud:.02,cloudScale:6,roughTile:.12,roughGrout:.7,bevel:.0015,normalStrength:3,seed:41}),f=js({px:1024,meters:[1.2,1.2],tile:[.3,.3],grout:.003,base:`#505356`,grout_c:`#77797a`,tileVar:.04,cloud:.06,cloudScale:6,speckle:.14,roughTile:.5,roughGrout:.9,bevel:.002,normalStrength:2.5,seed:51});await e(`Generating roof tiles…`);let p=Ms(1024,11);await e(`Generating timber & plaster…`);let m=Ns({px:512,meters:[1,2.2],base:`#7b3118`,dark:`#56200e`,grain:.45,seed:61,rough:.35}),h=Ns({px:512,meters:[1,2.4],base:`#b6581f`,dark:`#8a3c12`,grain:.35,grooves:.085,seed:62,rough:.3}),g=Ns({px:512,meters:[.9,2.2],base:`#b89570`,dark:`#8e6c4b`,grain:.55,seed:63,rough:.45}),_=Is(512,5,.9),v=Ns({px:1024,meters:[.8,2],base:`#d6b98f`,dark:`#b39164`,grain:.4,seed:71,rough:.5}),y=Ns({px:512,meters:[.8,2],base:`#6b4b33`,dark:`#4a3122`,grain:.45,seed:72,rough:.45});await e(`Weaving linen & finishing stone…`);let b=Ps(),x=Fs(),S=e=>new _e(e),C=e=>new St(e),w=this.add(`wallInt`,S({color:`#ffffff`,roughness:.9}),.55);Rs(w,_,{normalScale:.35,map:!1}),w=this.add(`ceiling`,S({color:`#ffffff`,roughness:.95}),.6),Rs(w,_,{normalScale:.2,rough:!1,map:!1}),w=this.add(`wallExt`,S({color:`#ffffff`,roughness:.95}),1),Rs(w,i,{normalScale:.7,map:!1}),w=this.add(`wallPorch`,S({color:`#ffffff`,roughness:.95}),1.1),Rs(w,i,{normalScale:.9,map:!1}),w=this.add(`wallWhite`,S({color:`#ffffff`,roughness:.95}),1),Rs(w,i,{normalScale:.8,map:!1}),w=this.add(`wallExtGrey`,S({color:`#8f9398`,roughness:.92}),1),Rs(w,i,{normalScale:.6}),this.add(`soffit`,S({color:`#ffffff`,roughness:.95}),1.1),this.add(`fascia`,S({color:`#d9dcdc`,roughness:.55}),1),w=this.add(`modernFloor`,S({color:`#ffffff`,roughness:1}),.6),Rs(w,s,{origin:[U-Ja/2,0]}),w=this.add(`modernStone`,S({color:`#ded3bd`,roughness:1}),.6),Rs(w,x,{normalScale:.35}),w=this.add(`modernPlaster`,S({color:`#f3eee4`,roughness:.95}),1),Rs(w,_,{map:!1,rough:!1,normalScale:.12}),this.add(`modernBronze`,S({color:`#484139`,roughness:.48,metalness:.6}),.8),w=this.add(`modernLinen`,C({color:`#e9e0cf`,roughness:1,sheen:.55,sheenColor:`#fff7e9`,sheenRoughness:.85}),.7),Rs(w,b,{normalScale:.45}),w=this.add(`floorTile`,C({color:`#ffffff`,roughness:1,specularIntensity:.9}),.6),Rs(w,a,{origin:[U-Ja/2,0]}),w=this.add(`porchTile`,S({color:`#ffffff`,roughness:1}),1.1),Rs(w,o,{origin:[U-Ja/2,0]}),w=this.add(`stairTile`,C({color:`#ffffff`,roughness:1,specularIntensity:.9}),.6),Rs(w,a),w=this.add(`bathWall`,S({color:`#ffffff`,roughness:1}),.6),Rs(w,c,{map:!1}),w=this.add(`bathWallDark`,S({color:`#ffffff`,roughness:1}),.6),Rs(w,l,{map:!1}),w=this.add(`bathFloor`,S({color:`#ffffff`,roughness:1}),.6),Rs(w,u),w=this.add(`kitchenTile`,S({color:`#ffffff`,roughness:1}),.6),Rs(w,d,{map:!1}),w=this.add(`balconyTile`,S({color:`#ffffff`,roughness:1}),1),Rs(w,f),w=this.add(`concrete`,S({color:`#e2e2de`,roughness:1}),1),Rs(w,n),w=this.add(`concretePorch`,S({color:`#e6e6e2`,roughness:1}),1.1),Rs(w,n),w=this.add(`concreteLight`,S({color:`#eceae4`,roughness:1}),1),Rs(w,n,{size:[1.4,1.4],normalScale:.6}),w=this.add(`asphalt`,S({color:`#8f9091`,roughness:1}),1),Rs(w,r),w=this.add(`ground`,S({color:`#c9c9c4`,roughness:1}),1),Rs(w,n,{size:[7,7],normalScale:.5}),this.add(`drainDark`,S({color:`#4a4b48`,roughness:.95}),1),this.add(`paintLine`,S({color:`#f0f0ec`,roughness:.7}),1),w=this.add(`roofTile`,S({color:`#ffffff`,roughness:1}),1),Rs(w,p),this.add(`roofRidge`,S({color:`#4c5157`,roughness:.62}),1),this.add(`awningFrame`,S({color:`#484b49`,roughness:.48,metalness:.65}),1),this.add(`awningDaylight`,C({color:`#f3f1e7`,roughness:.28,transmission:.72,thickness:Po.panelThickness,ior:1.58}),1,!1),w=this.add(`doorWood`,C({color:`#ffffff`,roughness:1,clearcoat:.3,clearcoatRoughness:.4}),.5),Rs(w,m),w=this.add(`doorMain`,C({color:`#ffffff`,roughness:1,clearcoat:.4,clearcoatRoughness:.35}),.8),Rs(w,h),w=this.add(`doorBath`,S({color:`#ffffff`,roughness:1}),.5),Rs(w,g),this.add(`doorRear`,S({color:`#a6ada9`,roughness:.38,metalness:.7}),.6),this.add(`frameSage`,S({color:`#86998f`,roughness:.45,metalness:.2}),.6),this.add(`cabinet`,S({color:`#ecebe6`,roughness:.5}),.5),this.add(`worktop`,C({color:`#2f3133`,roughness:.3,clearcoat:.5,clearcoatRoughness:.2}),.6),w=this.add(`jpOak`,C({color:`#ffffff`,roughness:1,clearcoat:.12,clearcoatRoughness:.6}),.5),Rs(w,v,{normalScale:.3}),this.add(`coffeeTableOak`,w.clone(),.5),w=this.add(`jpOakDark`,S({color:`#ffffff`,roughness:1}),.5),Rs(w,y,{normalScale:.3}),this.add(`jpLinen`,C({color:`#eee8dc`,roughness:.92,sheen:.4,sheenColor:`#ffffff`,sheenRoughness:.8}),.5),this.add(`jpLinenGrey`,C({color:`#b9b2a6`,roughness:.95,sheen:.4,sheenColor:`#ffffff`,sheenRoughness:.8}),.5),this.add(`jpCushion`,C({color:`#8c9179`,roughness:.95,sheen:.3,sheenColor:`#e8ecd8`,sheenRoughness:.8}),.5),this.add(`jpTatami`,S({color:`#cbbf8a`,roughness:.85}),.5),this.add(`jpHeri`,S({color:`#2d3440`,roughness:.8}),.5),this.add(`jpRug`,S({color:`#ddd5c5`,roughness:1}),.5);for(let e of[`jpLinen`,`jpLinenGrey`,`jpCushion`,`jpRug`])Rs(this.get(e),b,{normalScale:e===`jpRug`?.65:.4});this.add(`jpWashi`,S({color:`#f5efe2`,roughness:.9,emissive:`#ffd09a`,emissiveIntensity:0}),.5,!1),this.add(`jpLED`,S({color:`#f4f2ee`,roughness:.4,emissive:`#ffe2c0`,emissiveIntensity:0}),.5,!1),this.add(`jpLacquer`,C({color:`#7d1512`,roughness:.3,clearcoat:.8,clearcoatRoughness:.15}),.5),this.add(`jpGold`,S({color:`#d4a84b`,roughness:.28,metalness:1}),.6),this.add(`jpBrass`,S({color:`#a57f3c`,roughness:.4,metalness:1}),.6),this.add(`jpIncense`,S({color:`#6e2a1b`,roughness:.8}),.5),this.add(`jpOrange`,S({color:`#e5831c`,roughness:.55}),.5),this.add(`jpAltarRed`,S({color:`#c8231b`,roughness:.5,emissive:`#ff3a1c`,emissiveIntensity:2.2}),.5,!1);let T=e=>S({map:Ls(e),roughness:.35,metalness:.1});this.add(`jpAltarPlaque`,T(Ks()),.5),this.add(`jpTudiPlaque`,T(qs()),.5);for(let e of _s)for(let[t,n]of Object.entries(e.finishes)){let r=this.entries.get(t),i=r.mat.clone();i.color.set(n.color),n.woodGrain||(i.map=null),i.roughness=.9,i instanceof St&&(i.clearcoat=0),this.add(ys(e.id,t),i,r.env,r.cast)}this.add(`aluWhite`,S({color:`#efefec`,roughness:.35,metalness:.1}),.8),this.add(`aluSilver`,S({color:`#c3c6c7`,roughness:.3,metalness:.85}),.9);let E=(e,t=.02)=>C({color:e,roughness:t,metalness:0,transmission:1,thickness:0,ior:1.5,specularIntensity:1,transparent:!1});this.add(`glass`,E(`#eef5f1`),1,!1),this.add(`glassTint`,E(`#bdd8ca`,.03),1,!1),this.add(`glassSolar`,E(`#737b76`,.03),1),this.add(`glassRail`,E(`#e6f2ec`),1,!1),this.add(`glassFrosted`,E(`#f1f4f2`,.35),1,!1),this.add(`glassDark`,C({color:`#1f2927`,roughness:.05,metalness:.1,clearcoat:1,clearcoatRoughness:.05}),1),this.add(`steelRail`,S({color:`#627872`,roughness:.42,metalness:.45}),.6),this.add(`galv`,S({color:`#aab0b3`,roughness:.42,metalness:.75}),1),this.add(`railBlack`,S({color:`#2b2e30`,roughness:.5,metalness:.5}),1),this.add(`ceramic`,C({color:`#f8f8f6`,roughness:.08,clearcoat:1,clearcoatRoughness:.05}),.5),this.add(`chrome`,S({color:`#e9e9e9`,roughness:.07,metalness:1}),.8),this.add(`stainless`,S({color:`#d2d4d6`,roughness:.28,metalness:1}),.8),this.add(`plasticWhite`,S({color:`#f0f0ec`,roughness:.4}),.5),this.add(`switchIndicatorRed`,S({color:`#d51b16`,roughness:.25,emissive:`#e32418`,emissiveIntensity:.6}),.5),this.add(`plasticGrey`,S({color:`#b3b7b9`,roughness:.5}),.8),this.add(`black`,S({color:`#1c1c1c`,roughness:.6}),.8),this.add(`rubber`,S({color:`#2a2a2a`,roughness:.9}),.6);for(let e of[`wallInt`,`wallExt`,`wallPorch`,`wallWhite`,`wallExtGrey`,`bathWall`,`bathWallDark`,`kitchenTile`])this.get(e).shadowSide=0}setLampLevel(e){this.get(`jpWashi`).emissiveIntensity=3.2*e,this.get(`jpLED`).emissiveIntensity=4*e}register(e,t,n=1,r=!0){this.add(e,t,n,r)}},Us=`"KaiTi", "STKaiti", "Kaiti SC", "BiauKai", "Noto Serif SC", "Noto Serif TC", "SimSun", serif`;function Ws(e,t){let n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`),i=r.createLinearGradient(0,0,0,t);return i.addColorStop(0,`#8e1a14`),i.addColorStop(1,`#6a100d`),r.fillStyle=i,r.fillRect(0,0,e,t),r.strokeStyle=`#d9b25a`,r.lineWidth=e*.02,r.strokeRect(e*.04,e*.04,e-e*.08,t-e*.08),r.lineWidth=e*.006,r.strokeRect(e*.07,e*.07,e-e*.14,t-e*.14),r.fillStyle=`#e8c46a`,r.textAlign=`center`,r.textBaseline=`middle`,{c:n,ctx:r}}function Gs(e,t,n,r,i,a){let o=[...t],s=(i-r)/o.length;e.font=`700 ${a}px ${Us}`,o.forEach((t,i)=>e.fillText(t,n,r+s*(i+.5)))}function Ks(){let{c:e,ctx:t}=Ws(420,560);t.font=`700 64px ${Us}`,t.fillText(`佛光普照`,210,82);let n=t.createRadialGradient(210,291.2,10,210,291.2,159.6);return n.addColorStop(0,`rgba(240, 200, 110, 0.55)`),n.addColorStop(1,`rgba(240, 200, 110, 0)`),t.fillStyle=n,t.fillRect(0,120,420,410),t.fillStyle=`#e8c46a`,Gs(t,`南無觀世音菩薩`,67.2,150,510,38),Gs(t,`合家平安`,352.8,170,470,42),e}function qs(){let{c:e,ctx:t}=Ws(360,320);return Gs(t,`五方五土龍神`,223.2,34,290,38),Gs(t,`唐番地主財神`,136.8,34,290,38),e}function Js(e,t,n,r,i){return e===`x`?[n,r,t+i]:[t+i,r,n]}function K(e,t,n,r,i,a,o,s,c,l){t===`x`?e.box(r,i,a,o,n+s,n+c,l):e.box(n+s,n+c,a,o,r,i,l)}function Ys(e){return e===`x`?[0,1]:[1,0]}function Xs(e){return e===`x`?[1,0]:[0,1]}function Zs(e,t,n,r,i,a,o,s,c,l,u=[],d){let f=d??l,p=t===`x`?{pz:c,nz:l,px:f,nx:f,py:f,ny:f}:{px:c,nx:l,pz:f,nz:f,py:f,ny:f},m=(r,i,a,o)=>{i-r<1e-4||o-a<1e-4||K(e,t,n,r,i,a,o,-s/2,s/2,p)},h=[...u].sort((e,t)=>e.a-t.a),g=r;for(let e of h){let t=Math.max(r,e.a),n=Math.min(i,e.b);n<=t||(m(g,t,a,o),e.y0>a+1e-4&&m(t,n,a,Math.min(e.y0,o)),e.y1<o-1e-4&&m(t,n,Math.max(e.y1,a),o),g=n)}m(g,i,a,o)}function Qs(e,t,n,r,i,a,o,s,c,l,u=[]){let d=.008;Zs(e,t,n+i*(r+d/2),a,o,s,c,d,l,l,u,l)}function $s(e,t,n,r,i,a,o,s,c=`frameSage`,l,u=.045){let d=r/2+.012;K(e,t,n,i,i+u,o,s,-d,d,c),K(e,t,n,a-u,a,o,s,-d,d,c),K(e,t,n,i,a,s-u,s,-d,d,c),l!==void 0&&K(e,t,n,i+u,a-u,l,l+u,-d,d,c);let f=u<.04?.008:.012;K(e,t,n,i+u,i+u+f,o,s-u,-.015,.015,c),K(e,t,n,a-u-f,a-u,o,s-u,-.015,.015,c)}function ec(e,t,n,r,i,a){$s(e,`z`,t,.12,n,r,0,2.1,`frameSage`,void 0,.035);for(let[i,a]of[[n-.035,n+.025],[r-.025,r+.035]])e.box(t-.12,t-.06,0,2.12,i,a,`frameSage`);e.box(t-.12,t-.06,2.065,2.13,n-.035,r+.035,`frameSage`);let o=r-n+.05,s=Math.min(n,n+i*o),c=Math.max(r,r+i*o);return e.box(t-.14,t-.08,2.12,2.17,s-.04,c+.04,`aluSilver`),{kind:`slide`,index:0,offset:[0,i*o],build:e=>{e.box(t-.16,t-.12,.008,2.11,n-.025,r+.025,a),e.box(t-.155,t-.125,0,.008,n-.025,r+.025,a);let o=i>0?n+.09:r-.09;for(let n of[t-.175,t-.105])e.box(n-.006,n+.006,.85,1.1,o-.015,o+.015,`chrome`)}}}function tc(e,t){let n=t.thick??.04,r=Math.cos(t.angle),i=Math.sin(t.angle),a=new z(t.dir[0]*r+t.swing[0]*i,0,t.dir[1]*r+t.swing[1]*i).normalize(),o=new z(t.swing[0]*r-t.dir[0]*i,0,t.swing[1]*r-t.dir[1]*i).normalize(),s=new z(0,1,0),c=new z(t.hinge[0],t.y0+t.height/2,t.hinge[1]).addScaledVector(a,t.width/2),l=new V().makeBasis(a,s,o).setPosition(c),u=new _t(t.width,t.height,n);e.geom(u,t.mat,l),u.dispose();for(let n of[.25,t.height/2,t.height-.25]){let r=new z(t.hinge[0],t.y0+n,t.hinge[1]);e.rod(r.clone().add(new z(0,-.05,0)),r.clone().add(new z(0,.05,0)),.008,`stainless`,8)}let d=t.knob??`knob`;if(d===`none`)return;let f=new z(t.hinge[0],t.y0+(d===`pull`?1.05:.98),t.hinge[1]).addScaledVector(a,t.width-.065);for(let t of[1,-1]){let r=f.clone().addScaledVector(o,n/2*t),i=r.clone().addScaledVector(o,t*.055);if(d===`knob`){e.rod(r,r.clone().addScaledVector(o,t*.012),.03,`stainless`,16),e.rod(r,i,.009,`stainless`,8);let n=new S(.029,16,12);n.scale(1,1,.8),e.geom(n,`stainless`,new V().makeBasis(a,s,o).setPosition(i)),n.dispose()}else if(d===`lever`)e.rod(r,r.clone().addScaledVector(o,t*.01),.025,`stainless`,16),e.rod(r,i,.009,`stainless`,8),e.bar(i,i.clone().addScaledVector(a,-.12),.018,.012,`stainless`);else if(d===`pull`){let n=r.clone().addScaledVector(o,t*.05);e.bar(n.clone().add(new z(0,-.3,0)),n.clone().add(new z(0,.3,0)),.022,.022,`stainless`),e.rod(r.clone().add(new z(0,-.25,0)),n.clone().add(new z(0,-.25,0)),.008,`stainless`,8),e.rod(r.clone().add(new z(0,.25,0)),n.clone().add(new z(0,.25,0)),.008,`stainless`,8)}}}function nc(e,t,n,r,i,a,o,s,c){let l=c.frameW??.045;c.frame!==!1&&$s(e,t,n,r,i,a,o,c.transom??o+s+l,`frameSage`,c.transom===void 0?void 0:o+s,l);let u=Xs(t),d=Ys(t),f=c.hingeAtB?a-l-.004:i+l+.004,p=a-i-2*l-.008,m=Js(t,n,f,0,0),h=c.hingeAtB?[-u[0],-u[1]]:[u[0],u[1]];return{hinge:[m[0],m[2]],dir:h,swing:[d[0]*c.openTo,d[1]*c.openTo],angle:c.angle,width:p,height:s-.01,y0:o+.008,mat:c.mat,knob:c.knob,thick:c.thick}}function rc(e,t,n,r,i,a,o,s,c){tc(e,nc(e,t,n,r,i,a,o,s,c))}function ic(e,t){return e[1]*t[0]-e[0]*t[1]>=0?1:-1}function ac(e,t,n,r,i,a,o,s={}){let c=s.panes??2,l=s.frame??`aluWhite`,u=s.glass??`glass`,d=s.nOff??0,f=d<0?-1:1,p=s.frameW??.045,m=.05;K(e,t,n,r,r+p,a,o,d-m,d+m,l),K(e,t,n,i-p,i,a,o,d-m,d+m,l),K(e,t,n,r,i,o-p,o,d-m,d+m,l),K(e,t,n,r,i,a,a+p,d-m,d+m,l);let h=(i-r-2*p)/c,g=Xs(t),_=Ys(t);for(let i=0;i<c;i++){let v=r+p+i*h,y=v+h;i>0&&K(e,t,n,v-.02,v+.02,a+p,o-p,d-m,d+m,l);let b=s.sashW??.035,x=.03,S=v+(i>0?.02:0),C=y-(i<c-1?.02:0),w=(i>0&&i===c-1)!=!!s.flip,T=e=>{K(e,t,n,S,S+b,a+p,o-p,d-x,d+x,l),K(e,t,n,C-b,C,a+p,o-p,d-x,d+x,l),K(e,t,n,S,C,o-p-b,o-p,d-x,d+x,l),K(e,t,n,S,C,a+p,a+p+b,d-x,d+x,l),K(e,t,n,S+b,C-b,a+p+b,o-p-b,d-.003,d+.003,u);let r=-f,i=Math.min(d+r*x,d+r*.06),c=Math.max(d+r*x,d+r*.06);if(s.hung===`top`){let r=(S+C)/2,o=a+p+b/2;K(e,t,n,r-.05,r+.05,o-.008,o+.008,i,c,`chrome`)}else{let r=w?S+b/2:C-b/2;K(e,t,n,r-.008,r+.008,(a+o)/2-.05,(a+o)/2+.05,i,c,`chrome`)}};if(!s.movable){T(e);continue}if(s.hung===`top`){let e=Js(t,n,(S+C)/2,o-p,d+f*x),r=s.openAngle??35*Math.PI/180,a=t===`x`?-f*r:f*r;s.movable({kind:`hinge`,build:T,rotAxis:t===`x`?`x`:`z`,pivot:[e[0],e[2]],pivotY:e[1],angle:a,open:s.open?.[i]??!1,index:i});continue}let E=Js(t,n,w?C:S,0,d+f*x),D=w?[-g[0],-g[1]]:[g[0],g[1]],O=[_[0]*f,_[1]*f];s.movable({kind:`hinge`,build:T,pivot:[E[0],E[2]],angle:ic(D,O)*(s.openAngle??75*Math.PI/180),open:s.open?.[i]??!1,index:i})}}function oc(e,t,n,r,i,a,o,s){let c=s.frame??`aluSilver`,l=s.glass??`glassTint`,u=s.nOff??0,d=.05,f=.06;K(e,t,n,r,r+d,a,o,u-f,u+f,c),K(e,t,n,i-d,i,a,o,u-f,u+f,c),K(e,t,n,r,i,o-d,o,u-f,u+f,c),K(e,t,n,r,i,a,a+.02,u-f,u+f,c);let p=s.panels,m=.04,h=(i-r-2*d+m*(p-1))/p,g=Xs(t);for(let i=0;i<p;i++){let f=r+d+i*(h-m);!s.movable&&s.openIndex===i&&(f-=s.openAmount??h*.9);let _=f+h,v=p===3,y=v?u+(i-1)*.038:u+(i%2==0?.022:-.022),b=.045,x=.06,S=v?.016:.018,C=e=>{K(e,t,n,f,f+b,a+.02,o-d,y-S,y+S,c),K(e,t,n,_-b,_,a+.02,o-d,y-S,y+S,c),K(e,t,n,f,_,o-d-x,o-d,y-S,y+S,c),K(e,t,n,f,_,a+.02,a+.02+x,y-S,y+S,c),K(e,t,n,f+b,_-b,a+.02+x,o-d-x,y-.003,y+.003,l);let r=i===0?_-b/2:f+b/2,s=v?i===0?-1:1:i%2==0?1:-1,u=v&&i===1?.005:.012,p=y+s*S,m=y+s*(S+u);K(e,t,n,r-.01,r+.01,a+.9,a+1.15,Math.min(p,m),Math.max(p,m),`black`)},w=h-m,T=e=>[g[0]*e,g[1]*e];if(v){if(!s.movable){C(e);continue}let t=i===0?[T(w),T(2*w)]:i===1?[T(0),T(w)]:[T(0),T(0)];s.movable({kind:`slide`,build:C,group:s.group??`slide3`,stages:t,index:i});continue}let E=0;if(p===2&&(E=(i===0?1:-1)*w*.95),!s.movable||E===0){C(e);continue}s.movable({kind:`slide`,build:C,offset:T(E),open:s.openIndex===i,index:i})}}function sc(e,t,n,r,i,a,o,s={}){let c=s.frame??`aluWhite`,l=s.glass??`glassFrosted`,u=s.nOff??0,d=s.out??1,f=.035,p=.045;K(e,t,n,r,r+f,a,o,u-p,u+p,c),K(e,t,n,i-f,i,a,o,u-p,u+p,c),K(e,t,n,r,i,o-f,o,u-p,u+p,c),K(e,t,n,r,i,a,a+f,u-p,u+p,c);let m=s.pitch??.075,h=s.tilt??28*Math.PI/180,g=Math.max(1,Math.floor((o-a-2*f)/m)),_=(o-a-2*f-g*m)/2,v=i-r-2*f-.006,y=Xs(t),b=Ys(t),x=new z(y[0],0,y[1]),S=new z(b[0]*d,0,b[1]*d);for(let o=0;o<g;o++){let s=a+f+_+(o+.5)*m,d=Js(t,n,(r+i)/2,s,u),p=new z(0,1,0),g=S.clone().multiplyScalar(Math.cos(h)).addScaledVector(p,-Math.sin(h)),y=new z().crossVectors(g,x).normalize(),b=new V().makeBasis(x,y,g).setPosition(d[0],d[1],d[2]),C=new _t(v,.005,.095);e.geom(C,l,b),C.dispose();for(let a of[r+f,i-f-.012])K(e,t,n,a,a+.012,s-.02,s+.02,u-.035,u+.035,c)}}function cc(e,t,n,r,i,a,o,s,c,l={}){let u=l.w??.08,d=l.depth??.035,f=l.mat??`wallExt`,p=i*r,m=i*(r+d);K(e,t,n,a-u,a,s-u,c+u,p,m,f),K(e,t,n,o,o+u,s-u,c+u,p,m,f),K(e,t,n,a,o,c,c+u,p,m,f),K(e,t,n,a,o,s-u,s,p,m,f),l.sill&&K(e,t,n,a-u-.03,o+u+.03,s-u-.04,s-u,p,i*(r+l.sill),f)}function lc(e,t,n){let r=n.mat??`steelRail`,i=new z(0,1,0),a=n.spacing??.115,o=n.balFrom??.1,s=n.balTo??n.height;for(let c=0;c+1<t.length;c++){let l=t[c],u=t[c+1];e.bar(l.clone().addScaledVector(i,n.height),u.clone().addScaledVector(i,n.height),n.topW??.045,n.topH??.04,r);for(let t of n.rails??[o])e.bar(l.clone().addScaledVector(i,t),u.clone().addScaledVector(i,t),.03,.022,r);let d=Math.hypot(u.x-l.x,u.z-l.z),f=Math.max(1,Math.round(d/a));for(let t=1;t<f;t++){let n=l.clone().lerp(u,t/f);e.bar(n.clone().addScaledVector(i,o),n.clone().addScaledVector(i,s),.018,.018,r)}}if(n.posts!==!1)for(let a of t)e.bar(a.clone().addScaledVector(i,-.02),a.clone().addScaledVector(i,n.height+.03),.05,.05,r)}function uc(e,t,n,r){return new V().makeRotationY(r).setPosition(e,t,n)}function dc(e,t,n,r,i){let a=uc(t,n,r,i),o=e=>new V().multiplyMatrices(a,e),s=new N(.1,.13,.3,24);e.geom(s,`ceramic`,o(new V().makeScale(1,1,1.35).setPosition(0,.15,.33)));let c=[new B(0,0),new B(.12,0),new B(.17,.06),new B(.185,.12),new B(.18,.14),new B(.155,.13),new B(.13,.06),new B(.05,.02),new B(0,.02)],l=new ft(c,32);e.geom(l,`ceramic`,o(new V().makeScale(1,1,1.3).setPosition(0,.26,.37)));let u=new le(.15,.025,10,32);e.geom(u,`ceramic`,o(new V().makeRotationX(Math.PI/2).premultiply(new V().makeScale(1,.6,1.3)).setPosition(0,.415,.38))),e.geom(new _t(.38,.36,.17),`ceramic`,o(new V().setPosition(0,.6,.1))),e.geom(new _t(.4,.03,.19),`ceramic`,o(new V().setPosition(0,.795,.1))),e.geom(new N(.02,.02,.012,16),`chrome`,o(new V().setPosition(0,.815,.1))),e.geom(new _t(.12,.2,.12),`ceramic`,o(new V().setPosition(0,.36,.14))),e.geom(new N(.012,.012,.08,8),`chrome`,o(new V().makeRotationZ(Math.PI/2).setPosition(.24,.2,.03)))}function fc(e,t,n,r,i){let a=uc(t,n,r,i),o=e=>new V().multiplyMatrices(a,e),s=[new B(0,-.17),new B(.08,-.168),new B(.15,-.13),new B(.195,-.05),new B(.21,0),new B(.205,.015),new B(.185,.012),new B(.17,-.03),new B(.13,-.1),new B(.06,-.125),new B(0,-.128)],c=new ft(s,36);e.geom(c,`ceramic`,o(new V().makeScale(1.2,1,.95).setPosition(0,0,.22))),e.geom(new _t(.46,.05,.1),`ceramic`,o(new V().setPosition(0,-.01,.05))),e.geom(new N(.018,.022,.1,16),`chrome`,o(new V().setPosition(0,.06,.07))),e.geom(new N(.009,.009,.1,8),`chrome`,o(new V().makeRotationX(Math.PI/2).setPosition(0,.1,.11))),e.geom(new _t(.015,.012,.08),`chrome`,o(new V().setPosition(0,.125,.05))),e.geom(new N(.016,.016,.3,10),`chrome`,o(new V().setPosition(0,-.3,.2))),e.geom(new N(.016,.016,.18,10),`chrome`,o(new V().makeRotationX(Math.PI/2).setPosition(0,-.45,.11)))}function pc(e,t,n,r,i,a={}){let o=uc(t,n,r,i),s=e=>new V().multiplyMatrices(o,e);e.geom(new N(.01,.01,.3,8),`chrome`,s(new V().makeRotationX(Math.PI/2-.35).setPosition(0,2,.14))),e.geom(new N(.05,.035,.03,20),`chrome`,s(new V().makeRotationX(-.4).setPosition(0,1.95,.29))),e.geom(new N(.035,.035,.02,20),`chrome`,s(new V().makeRotationX(Math.PI/2).setPosition(0,1.05,.01))),e.geom(new _t(.012,.012,.08),`chrome`,s(new V().setPosition(0,1.05,.05))),a.waterTap!==!1&&e.geom(new N(.012,.012,.06,8),`chrome`,s(new V().makeRotationX(Math.PI/2).setPosition(.25,.55,.03)))}function mc(e,t,n,r){e.box(t-.06,t+.06,n,n+.003,r-.06,r+.06,`stainless`)}function hc(e,t,n,r,i,a=.086,o=.086,s=`plasticWhite`){let c=.012;switch(i){case`px`:e.box(t,t+c,n-o/2,n+o/2,r-a/2,r+a/2,s);break;case`nx`:e.box(t-c,t,n-o/2,n+o/2,r-a/2,r+a/2,s);break;case`pz`:e.box(t-a/2,t+a/2,n-o/2,n+o/2,r,r+c,s);break;case`nz`:e.box(t-a/2,t+a/2,n-o/2,n+o/2,r-c,r,s)}}function gc(e,t,n,i,a,o=`uk`){let s={pz:0,px:Math.PI/2,nz:Math.PI,nx:-Math.PI/2}[a],c=new V().makeRotationY(s).setPosition(t,n,i),l=(t,n,r,i,a,o,s,l=0)=>{let u=new _t(t,n,r),d=new V().makeRotationX(l).setPosition(i,a,o);e.geom(u,s,c.clone().multiply(d)),u.dispose()};if(l(.086,.086,.012,0,0,.006,`plasticWhite`),o===`uk`){l(.005,.009,5e-4,0,.0055,.01225,`black`);for(let e of[-.011,.011])l(.009,.005,5e-4,e,-.016,.01225,`black`);l(.014,.021,.008,.024,.024,.017,`plasticWhite`,.12)}else if(o===`fibre`)l(.076,.074,.026,0,0,.025,`plasticWhite`),l(.064,.001,5e-4,0,-.019,.03825,`plasticGrey`),l(.01,.005,.004,0,-.036,.027,`plasticGrey`);else{let t=new r(.003,.006,24);e.geom(t,`chrome`,c.clone().multiply(new V().makeTranslation(0,0,.015))),t.dispose();let n=new yt(.003,24);e.geom(n,`black`,c.clone().multiply(new V().makeTranslation(0,0,.0125))),n.dispose()}}function _c(e,t,n,r,i,a,o=`galv`){let s=.05;e.box(t,t+s,i,i+a,r-s/2,r+s/2,o),e.box(n-s,n,i,i+a,r-s/2,r+s/2,o),e.box(t,n,i+a-s,i+a,r-s/2,r+s/2,o),e.box(t,n,i,i+s,r-s/2,r+s/2,o),e.box(t,n,i+a-.16,i+a-.13,r-.02,r+.02,o);let c=Math.round((n-t)/.105);for(let l=1;l<c;l++){let u=t+(n-t)*l/c;e.box(u-.0125,u+.0125,i+s,i+a-s,r-.0125,r+.0125,o)}}function vc(e){let t=e.dir[1]*e.swing[0]-e.dir[0]*e.swing[1]>=0?1:-1;return{id:e.id,label:e.label,level:e.level,open:e.open??!1,index:0,kind:`hinge`,pivot:e.hinge,angle:t*e.maxAngle,build:t=>tc(t,{...e,angle:0})}}var yc={hinge:1.1},bc=e=>e*e*(3-2*e),xc=class{getMat;casts;leaves=[];groups=new Map;onSettled;onToggle;moving=!1;constructor(e,t){this.getMat=e,this.casts=t}buildPart(e,t){let n=new Ka;n.group=`part`,t(n);let r=n.build(this.getMat,this.casts).get(`part`)??new Oe;return r.name=`openable-part:${e}`,r}add(e){let t=this.buildPart(e.id,e.build),n=new Oe;n.name=`openable:${e.id}`;let r=e.kind===`hinge`?e.pivot??[0,0]:[0,0],i=e.kind===`hinge`?e.pivotY??0:0;n.position.set(r[0],i,r[1]),t.position.set(-r[0],-i,-r[1]),n.add(t);let a;if(e.kind===`hinge`&&e.fold){let[t,o]=e.fold.pivot;a=new Oe,a.name=`openable-fold:${e.id}`,a.position.set(t-r[0],0,o-r[1]);let s=this.buildPart(`${e.id}:fold`,e.fold.build);s.position.set(-t,-i,-o),a.add(s),n.add(a)}let o=[];n.traverse(t=>{let n=t;n.isMesh&&(n.userData.openable=e.id,o.push(n))});let s=e.open??!1,c=e.kind===`slide`&&s&&!e.group?e.offset??[0,0]:[0,0],l={spec:e,pivot:n,foldPivot:a,open:s,t:e.kind===`hinge`?+!!s:1,meshes:o,from:c,goal:c,dur:1};if(e.group){let t=this.groups.get(e.group);t||this.groups.set(e.group,t={parts:[],stage:0,stages:0,dir:1}),t.parts.push(l),t.stages=Math.max(t.stages,e.stages?.length??0)}return this.pose(l),this.leaves.push(l),l}clear(){for(let e of this.leaves)e.pivot.removeFromParent();this.leaves.length=0,this.groups.clear(),this.moving=!1}get meshes(){return this.leaves.flatMap(e=>e.meshes)}get(e){return this.leaves.find(t=>t.spec.id===e)}leafOf(e){let t=e?.userData?.openable;return t?this.get(t):void 0}toggle(e,t=!e?.open){if(!e)return;if(e.spec.id.startsWith(`auto-gate-`))for(let e of this.leaves)e.spec.id.startsWith(`auto-gate-`)&&(e.open=t);let n=e.spec.group?this.groups.get(e.spec.group):void 0;if(n){n.stage>=n.stages?n.dir=-1:n.stage<=0&&(n.dir=1),n.stage+=n.dir;for(let e of n.parts)e.open=n.stage>0,this.slideTo(e,n.stage>0?e.spec.stages?.[n.stage-1]??[0,0]:[0,0])}else e.open=t,e.spec.kind===`slide`&&this.slideTo(e,t?e.spec.offset??[0,0]:[0,0]);this.onToggle?.(e)}slideTo(e,t){let n=this.slidePos(e);e.from=n,e.goal=t,e.t=0,e.dur=Math.max(.35,Math.hypot(t[0]-n[0],t[1]-n[1])/.85)}slidePos(e){let t=bc(e.t);return[e.from[0]+(e.goal[0]-e.from[0])*t,e.from[1]+(e.goal[1]-e.from[1])*t]}update(e){let t=!1,n=Math.min(e,.1);for(let e of this.leaves){if(e.spec.kind===`slide`){if(e.t>=1)continue;e.t=Math.min(1,e.t+n/e.dur)}else{let t=+!!e.open;if(e.t===t)continue;let r=n/yc.hinge;e.t=t>e.t?Math.min(t,e.t+r):Math.max(t,e.t-r)}this.pose(e),t=!0}return this.moving&&!t&&this.onSettled?.(),this.moving=t,t}pose(e){if(e.spec.kind===`hinge`){let t=bc(e.t);e.pivot.rotation[e.spec.rotAxis??`y`]=(e.spec.angle??0)*t,e.foldPivot&&e.spec.fold&&(e.foldPivot.rotation.y=e.spec.fold.angle*t)}else{let t=this.slidePos(e);e.pivot.position.set(t[0],0,t[1])}e.pivot.updateMatrixWorld(!0)}};function Sc(e,t,n,r,i,a,o){let s=o<0?r:i,c=a+Ao.eaveRise,l=a+Ao.wallRise,u=o<0?c:l,d=o<0?l:c,f=Math.hypot(i-r,l-c)/(i-r),p=e.uvFn;e.uvFn=(e,t,n)=>n===`roofTile`?[o*e[0],Math.abs(e[2]-s)*f]:p?.(e,t,n)??null,e.prismZY([[r,a],[i,a],[i,d],[r,u]],t,n,`wallExt`,(e,t)=>t>.5?`roofTile`:t<-.5?`soffit`:`wallExt`),e.uvFn=p,e.box(t,n,a-.03,c,s-.02,s+.02,`fascia`)}function Cc(e,t,n,r,i){let a=Qa;e.group=t(`gf`);let o={a:.45,b:1.45,y0:1.75,y1:2.4};Zs(e,`x`,a,.05,U-.05,-.3,po,.2,`wallInt`,`wallExt`,[o,{...eo,y0:0,y1:2.55},to]),ac(e,`x`,a,o.a,o.b,o.y0,o.y1,{panes:2,glass:`glassFrosted`,hung:`top`,movable:n(`win-bath3`,`Relocated bathroom window`,`gf`)});let s=i.bathroomAccess===`ensuite`,c=ao;Zs(e,`x`,$a,.05,1.96,0,po,Ya,`wallInt`,`bathWall`,s?[{a:c.a,b:c.b,y0:0,y1:c.height}]:[]);let l={a:-2.4,b:-1.34};if(Zs(e,`z`,1.9,a+.1,$a-.06,0,po,Ya,`wallInt`,`bathWall`,s?[]:[{...l,y0:0,y1:2.1}]),e.box(.05,1.84,-.3,0,a+.1,$a-.06,`bathFloor`),s){let{angle:t,...n}=nc(e,`x`,$a,Ya,c.a,c.b,0,c.height,{hingeAtB:!1,openTo:1,angle:Math.PI/2,mat:`doorBath`,frameW:.035});r.push(vc({...n,id:`bath3`,label:`Guest ensuite door`,level:`gf`,maxAngle:t}))}else r.push({...ec(e,1.9,l.a,l.b,1,`doorBath`),id:`bath3`,label:`Shared bathroom sliding door`,level:`gf`});let u=no;pc(e,u.westX,0,u.showerZ,Math.PI/2,{waterTap:!1}),dc(e,u.westX,0,u.toiletZ,Math.PI/2),fc(e,u.basinX,.84,u.rearZ,0),mc(e,.55,0,u.showerZ-.1);let d=to;oc(e,`x`,a,d.a,d.b,d.y0,d.y1,{panels:2,glass:`glass`,movable:n(`win-kitchen`,`Kitchen sliding window`,`gf`),group:`win-kitchen`}),e.group=t(`slab1`),e.box(.05,U-.05,po,po+.15,a-.1,.1,{py:`concreteLight`,rest:`ceiling`}),e.group=t(`roof`),Sc(e,0,U,a-.22,.1,po+.15,-1),e.group=t(`gf`)}function wc(e,t,n,r,i){if(i.kitchen===`enclosed`){e.group=t(`gf`);let{z:r,a:i,b:a,height:o}=ro;Zs(e,`x`,r,3.1+Ya/2,U-.05,0,mo,Ya,`wallInt`,`wallInt`,[{a:i,b:a,y0:0,y1:o}]),oc(e,`x`,r,i,a,0,o,{panels:2,glass:`glass`,frame:`aluWhite`,movable:n(`kitchen-divider`,`Kitchen sliding partition`,`gf`)})}if(i.masterExtension&&i.masterZone!==`open`){e.group=t(`ff`);let{z:n,a,b:o,height:s}=io;Zs(e,`x`,n,.05,cs-Ya/2,G,ho,Ya,`wallInt`,`wallInt`,[{a,b:o,y0:G,y1:G+s}]);let{angle:c,...l}=nc(e,`x`,n,Ya,a,o,G,s,{hingeAtB:!0,openTo:1,angle:Math.PI/2,mat:`doorWood`,frameW:.035});r.push(vc({...l,id:`master-zone`,label:i.masterZone===`study`?`Study door`:`Dressing room door`,level:`ff`,maxAngle:c}))}}function Tc(e,t,n){let r=cs-.06,i=uo;e.group=t(`slab1`),e.box(.05,r,ko,G,W-.1,i+.1,`floorTile`),e.group=t(`ff`);let a={a:.4,b:r-.35,y0:G+1.375,y1:G+2.425};Zs(e,`x`,i,.05,r,G,ho,.2,`wallExtGrey`,`wallInt`,[a]),ac(e,`x`,i,a.a,a.b,a.y0,a.y1,{panes:1,hung:`top`,nOff:.07,openAngle:Math.PI/3,movable:n(`win-master`,`Master bedroom top-hinged window`,`ff`)});let o=12.55,s=i-.25;Zs(e,`z`,r-.1,12.29,i-.1,G,ho,.2,`wallExtGrey`,`wallInt`,[{a:o,b:s,y0:G,y1:G+2.3}]),oc(e,`z`,r-.1,o,s,G,G+2.3,{panels:2,nOff:.03,movable:n(`slide-master`,`East-facing master sliding door`,`ff`)}),e.group=t(`ceil2`),e.box(.05,r,ho,ho+.15,W-.1,i+.1,{py:`concreteLight`,rest:`ceiling`}),e.group=t(`roof`);let{back:c,front:l,ceiling:u,eastOverhang:d}=jo;Sc(e,0,r+d,c,l,u,1),e.group=t(`ff`)}function Ec(e,t){let n=18.6,r=-.1,i=1.8,a=.055,o=.04,s=.015,c=(e,t,s,c,l)=>{for(let n of[t,s-a])e.box(n,n+a,r,i,18.555,18.645000000000003,`railBlack`);for(let n of[r,1.745])e.box(t,s,n,n+a,18.555,18.645000000000003,`railBlack`);let u=c?t+a:s-a-l,d=u+l,f=c?d:u-o,p=c?d+o:t+a,m=c?s-a:f,h=.032,g=.055,_=Math.floor((m-p+g-h)/g),v=(p+m-((_-1)*g+h))/2;for(let t=0;t<_;t++){let n=v+t*g;e.box(n,n+h,-.045000000000000005,1.745,18.565,18.635,`railBlack`)}let y=.02,b=.003;for(let t=u;t+b<=d;t+=y)e.box(t,t+b,-.045000000000000005,1.745,n-b/2,18.6015,`railBlack`);for(let t=-.045000000000000005;t+b<=1.745;t+=y)e.box(u,d,t,t+b,n-b/2,18.6015,`railBlack`);e.box(f,f+o,r,i,18.560000000000002,18.64,`railBlack`)};e.box(-.1,.1,1.13,1.24,18.75,18.76,`plaque45`);for(let i of[0,1]){let o=i===0?.25:U/2+.015,l=i===0?U/2-.015:U-.25,u=(o+l)/2,d=i===0,f=d?o+a/2:l-a/2,p=d?-Math.PI/2:Math.PI/2;e.box(f-.06,f+.06,r,.13,18.41,18.540000000000003,`railBlack`),t.push({id:`auto-gate-${i}`,label:`Full-width folding automatic gate`,level:`site`,index:i,kind:`hinge`,pivot:[f,n],angle:p,build:e=>{c(e,d?o:u+s/2,d?u-s/2:l,d,.5);for(let t of[.1,1.7/2,1.6])e.rod(new z(u,t-.045,18.540000000000003),new z(u,t+.045,18.540000000000003),.018,`railBlack`,12)},fold:{pivot:[u,18.540000000000003],angle:-2*p,build:e=>c(e,d?u+s/2:o,d?l:u-s/2,!d,.4)}})}}function Dc(e){let t=to.a,n=to.b,r=(e,t,n)=>new z(e,t,n),i=Qa+.1,a=U-.05,o=eo.b+.1,s=.35,c=.6,l=.58,u=.56,d=.1,f=.9,p=.003,m=`cabinet`,h=`worktop`,g=e.uvFn;e.uvFn=(e,t,n)=>n===`kitchenTile`?Math.abs(t[0])>.5?[e[2]-i,e[1]-f]:[a-e[0],e[1]-f]:g?.(e,t,n)??null,Qs(e,`x`,Qa,.1,1,o,a,f,1.5,`kitchenTile`,[{a:t,b:n,y0:1.1,y1:2.55}]),Qs(e,`z`,U,.05,-1,i+.008,s,f,1.5,`kitchenTile`),e.uvFn=g,e.box(o,a,d,.87,i,i+u,m),e.box(a-u,a,d,.87,i+u,s,m),e.box(o+.02,a,0,d,i,i+u-.05,`black`),e.box(a-u+.05,a,0,d,i+u-.05,.32999999999999996,`black`);let _=(t,n,r,o=.16)=>t===`x`?e.box(n-o/2,n+o/2,r-.006,r+.006,i+l,i+l+.022,`stainless`):e.box(a-l-.022,a-l,r-.006,r+.006,n-o/2,n+o/2,`stainless`),v=(t,n,r,o,s)=>t===`x`?e.box(n+p,r-p,o+p,s-p,i+u,i+l,m):e.box(a-l,a-u,o+p,s-p,n+p,r-p,m),y=(t,n,r)=>{let o=d,s=.87,c=n;for(let[n,u]of r){let r=c+n,d=(c+r)/2;if(u===`k`){let e=[o,.4,.65,s];for(let n=0;n<3;n++)v(t,c,r,e[n],e[n+1]),_(t,d,e[n+1]-.05,.3)}else if(u===`dd`){v(t,c,d,o,s),v(t,d,r,o,s);for(let n of[-.03,.03])t===`x`?e.box(d+n-.006,d+n+.006,.65,.81,i+l,i+l+.022,`stainless`):e.box(a-l-.022,a-l,.65,.81,d+n-.006,d+n+.006,`stainless`)}else{v(t,c,r,o,s);let n=t===`x`?r-.04:c+.04;t===`x`?e.box(n-.006,n+.006,.65,.81,i+l,i+l+.022,`stainless`):e.box(a-l-.022,a-l,.65,.81,n-.006,n+.006,`stainless`)}c=r}},b=a-l-o,x=1.4;y(`x`,o,[[x,`dd`],[b-x,`k`]]);let S=s-(i+l);y(`z`,i+l,[[.6,`d`],[.6,`k`],[S-1.2,`dd`]]);let C=(t+n)/2,w=C-.48,T=C+.48,E=i+.12,D=i+.5;e.box(o,w,.87,f,i,i+c,h),e.box(T,a,.87,f,i,i+c,h),e.box(w,T,.87,f,i,E,h),e.box(w,T,.87,f,D,i+c,h),e.box(w,T,.6699999999999999,.6739999999999999,E,D,`stainless`),e.box(w-.004,w,.6699999999999999,.87,E,D,`stainless`),e.box(T,T+.004,.6699999999999999,.87,E,D,`stainless`),e.box(w,T,.6699999999999999,.87,E-.004,E,`stainless`),e.box(w,T,.6699999999999999,.87,D,D+.004,`stainless`),e.rod(r(C,.6699999999999999,(E+D)/2),r(C,.6749999999999999,(E+D)/2),.035,`chrome`);let O=i+.06;e.rod(r(C,f,O),r(C,1.22,O),.014,`chrome`),e.rod(r(C,1.22,O),r(C,1.22,i+.28),.011,`chrome`),e.rod(r(C,1.22,i+.28),r(C,1.15,i+.28),.011,`chrome`),e.box(C+.02,C+.03,1.08,1.1,O-.01,O+.08,`chrome`);let k=i+l+.9;e.box(a-.55,a-.05,f,.906,k-.3,k+.3,`glassDark`);for(let[t,n,i]of[[-.14,-.14,.09],[-.14,.14,.08],[.14,-.14,.08],[.14,.14,.1]]){let o=a-.3+t,s=k+n;e.rod(r(o,.906,s),r(o,.9068,s),i,`plasticGrey`,24),e.rod(r(o,.906,s),r(o,.9072,s),i-.004,`glassDark`,24)}e.box(a-.5,a,1.55,1.62,k-.3,k+.3,`stainless`),e.box(a-.3,a,1.62,1.72,k-.2,k+.2,`stainless`),e.box(a-.26,a,1.72,po,k-.13,k+.13,`stainless`);let A=.35,j=(t,n)=>{e.box(a-A+.018,a,1.5,2.4,t,n,m);let r=(t+n)/2;e.box(a-A,a-A+.018,1.503,2.397,t+p,r-p,m),e.box(a-A,a-A+.018,1.503,2.397,r+p,n-p,m);for(let t of[r-.03,r+.03])e.box(a-A-.022,a-A,1.55,1.7,t-.006,t+.006,`stainless`)};j(i,k-.4),j(k+.4,s)}function Oc(e,t,n){let{back:r,front:i,high:a,slope:o}=n,{frameWidth:s,frameDepth:c,panelWidth:l,panelThickness:u}=Po,d=e=>a-(e-r)*o,f=new Map;for(let{x0:n,x1:r,z0:a}of t){e.prismZY([[a,d(a)],[i,d(i)],[i,d(i)+u],[a,d(a)+u]],n,r,`awningDaylight`,`awningDaylight`);let t=Math.ceil((r-n)/l);for(let e=0;e<=t;e++){let i=e===t?r:n+(r-n)*e/t;f.set(i,Math.min(a,f.get(i)??a))}for(let t of[a,i-s/2])e.box(n,r,d(t)-c,d(t),t-s/2,t+s/2,`awningFrame`)}for(let[t,n]of f)e.bar(new z(t,d(n)-c/2,n),new z(t,d(i)-c/2,i),s,c,`awningFrame`);return d}function kc(e,t){let n=Ja/2,r=U-n,i=cs-Ya/2,a=uo+qa/2;e.group=t(`roof`);let o=Oc(e,[{x0:n,x1:fo,z0:a},{x0:fo,x1:r,z0:co}],Po.porch),s=i+jo.eastOverhang,c=Oc(e,[{x0:fo,x1:s,z0:jo.front},{x0:s,x1:r,z0:Po.balcony.back}],Po.balcony);e.group=t(`site`);let l=Po.porch.front-.08;for(let t of[.14,U-.14])e.box(t-.05,t+.05,vo,o(l),l-.05,l+.05,`awningFrame`);e.group=t(`ff`);let u=co-.1;for(let t of[fo+.11,3.7,r-.13])e.box(t-.04,t+.04,ko,c(u),u-.04,u+.04,`awningFrame`)}var q=qa/2,J=Ja/2,Y=Ya/2,X=(e,t,n)=>new z(e,t,n),Ac=e=>e*Math.PI/180,jc=.035,Mc=U-J-1.2,Nc=3.98,Pc=Mc,Fc=.4,Ic={a:1.51+Y+Fc,b:1.51+Y+Fc+1.1,y0:1.75,y1:2.4},Lc=Pc+.1,Rc=Lc+.7,zc={bath3:[.58,1.42],bed4:[3.4,4.32],bed3:[1.9,2.82],bed2:[3.12,4.04],master:[2.9,3.82],bath2:[4.1,4.94],bath1:[10.26,11.1]},Bc=Math.min(Go-.05,Ko+.05+.1),Vc=Ya,Hc=ls+Vc/2,Uc=G+2.1+1.5,Wc=Math.max(Uo+.1,cs+Y+.04),Gc=5.9,Kc=(Wc+Gc)/2,qc=[{a:Wc,b:Kc,y0:Uc-.6,y1:Uc},{a:Kc,b:Gc,y0:Uc-.6,y1:Uc}],Jc={x0:cs-Y,x1:4.4,z0:11.92,y0:G+1.85,y1:G+2.35};function Yc(e){return e?us:[{a:Jc.x0,b:Jc.x1,y0:Jc.y0,y1:Jc.y1},us[1]]}function Xc(e){let{x0:t,x1:n,z0:r,y0:i,y1:a}=Jc,o=12.29,s=t,c=.04,l=`aluWhite`,u=`glassFrosted`,d=s+.02;for(let[t,o]of[[a-c,a],[i,i+c]])e.box(s,n,t,o,12.18,12.239999999999998,l),e.box(d-.03,d+.03,t,o,r,12.209999999999999,l);e.box(n-c,n,i,a,12.18,12.239999999999998,l),e.box(d-.03,d+.03,i,a,r,r+c,l),e.box(s,s+.035,i,a,12.194999999999999,12.229999999999999,l),e.box(s+.035,n-c,i+c,a-c,12.206,12.213999999999999,u),e.box(d-.004,d+.004,i+c,a-c,r+c,12.194999999999999,u);let f=.08,p=.06;e.box(s-p,n+f,a,a+f,o,12.35,`wallExt`),e.box(n,n+f,i-f,a,o,12.35,`wallExt`),e.box(s-p,n,i-f,i,o,12.35,`wallExt`),e.box(s-p-.03,n+f+.03,i-f-.04,i-f,o,12.409999999999998,`wallExt`),e.box(s-p,s,a,a+f,r-f,o,`wallExt`),e.box(s-p,s,i-f,a,r-f,r,`wallExt`),e.box(s-p,s,i-f,i,r,o,`wallExt`),e.box(s-.12,s,i-f-.04,i-f,r-f-.03,o,`wallExt`)}var Zc=[];function Qc(e,t,n,r,i,a,o,s,c,l,u,d){let{angle:f,...p}=nc(e,i,a,o,s,c,l,u,d);Zc.push(vc({...p,id:t,label:n,level:r,maxAngle:d.angle,open:d.open??!1}))}function $c(e,t,n){return r=>Zc.push({...r,id:`${e}-${r.index}`,label:t,level:n})}var el=-.46;function tl(e,t,n,r,i=1,a=gs){let o=a.groundFloor,s=t-J,c=t+J,l=i>0?{px:`wallInt`,nx:`wallExt`,pz:`wallExt`,nz:`wallExt`,py:`wallExt`,ny:`wallExt`}:{px:`wallExt`,nx:`wallInt`,pz:`wallExt`,nz:`wallExt`,py:`wallExt`,ny:`wallExt`};e.group=r(`site`),o||e.box(s,c,el,2,Qa-.1,-q,`wallExt`),e.group=r(`gf`),e.box(s,c,el,G,o?Qa-.1:-q,W+q,l),e.group=r(`ff`);let u=W+q,d=W-Wo/Io;if(n===`west`)e.box(s,c,G,go,-q,u,l);else{let n=[[-q,G],[u,G],[u,qo(u)-Lo],[d,go],[-q,go]],r=i>0?c:s,a=i>0?s:c;e.prismZY(n,Math.min(r,t),Math.max(r,t),`wallInt`,`wallExt`),e.prismZY(n,Math.min(a,t),Math.max(a,t),`wallExt`,`wallExt`)}e.group=r(`site`);let f=i>0?{px:`wallPorch`,rest:`wallWhite`}:{nx:`wallPorch`,rest:`wallWhite`},p=lo;e.box(s,c,el,wo,W+q,p-.48,f),e.box(s,c,el,wo,p-.48,p,`wallWhite`),n===`east`&&e.box(s,c,3,wo,p,co,`wallWhite`),e.box(s,c,el,1.5,p,18.35,`wallWhite`),e.box(t-.22,t+.22,el,a.autoGate?1.95:1.5,18.35,18.75,`wallWhite`),e.group=r(`ff`),n===`west`?e.box(s,c,3.35,a.masterExtension?ho:6.1,W+q,a.masterExtension?uo+q:lo,a.masterExtension?l:`wallExt`):(e.box(s,c,3.35,Go,W+q,12.29,i>0?{px:`wallInt`,rest:`wallExt`}:{nx:`wallInt`,rest:`wallExt`}),e.box(s,c,3.35,ko+1.7,12.29,co,`wallExt`)),e.group=r(`roof`);let m=Bo-.02;if(n===`west`){let t=[[m,6.6],[zo+.02,6.6],[zo+.02,Vo(zo)+.3],[Ro,Ho+.3],[m,Vo(Bo)+.3]];e.prismZY(t,s,c,`wallExt`,`wallExt`)}else{let t=12.29,n=[[m,qo(m)+.3],[Jo,Yo+.3],[t,qo(t)+.3],[t,Go],[u,Go],[u,qo(u)-Lo],[d,go],[-q,go],[-q,6.6],[m,6.6]];e.prismZY(n,s,c,`wallExt`,`wallExt`)}}function nl(e,t){let{main:n,G:r}=t,i=n?t.renovation??gs:gs,a=i.groundFloor,o=a?Qa:0,s=a?eo.a:Nc,c=a?eo.b:Pc;n&&(Zc.length=0);let l=(e,t,r)=>n?$c(e,t,r):void 0;e.group=r(`gf`);let u=[{a:.25,b:1.3,y0:.9,y1:2.1},Ic,{a:Nc,b:Pc,y0:0,y1:2.55},{a:Lc,b:Rc,y0:1.1,y1:2.55}];a?(e.group=r(`slab1`),e.box(1.51,U-J,po-.3,G,-q,q,`wallInt`),Cc(e,r,l,Zc,i)):Zs(e,`x`,0,J,U-J,-.15,G,qa,`wallInt`,`wallExt`,u,`wallInt`);let d=[{a:Do,b:Oo,y0:0,y1:2.4},a?Xa:{a:3.1,b:5.3,y0:0,y1:2.4}];Zs(e,`x`,W,J,U-J,-.15,i.masterExtension?ko:G,qa,`wallPorch`,`wallInt`,d,`wallInt`);for(let t of d.filter(e=>e.y0===0))e.box(t.a,t.b,yo,.004,W-q,W+q+.012,`floorTile`);e.box(s,c,-.02,.004,o-q,o+q,`floorTile`),a||e.box(J,So,-.45,yo,W+q,bo,`concreteLight`),e.box(So,U-J,-.45,wo,W+q,Co,`wallPorch`,`nz`);for(let t of a?[]:[u[0],u[1],u[3]])K(e,`x`,0,t.a-.04,t.b+.04,t.y0-.05,t.y0,-q-.045,-q,`wallExt`);if(a||ac(e,`x`,0,.25,1.3,.9,2.1,{panes:2,nOff:-.03,movable:l(`win-bed4`,`Bedroom 4 window`,`gf`)}),a||ac(e,`x`,0,Ic.a,Ic.b,Ic.y0,Ic.y1,{panes:2,nOff:-.03,glass:`glassFrosted`,hung:`top`,movable:l(`win-bath3`,`Bathroom 3 window`,`gf`)}),a||ac(e,`x`,o,Lc,Rc,1.1,2.55,{panes:1,nOff:-.03,flip:!0,movable:l(`win-kitchen`,`Kitchen window`,`gf`)}),a){let{a:t,b:n,y0:r,y1:i,openingWidth:a,frameWidth:o}=Xa,s=n-a;e.box(t,t+o,r,i,W-.05,W+.05,`modernBronze`);for(let n of[r,i-o])e.box(t+o,s,n,n+o,W-.05,W+.05,`modernBronze`);e.box(t+o,s,r+o,i-o,W-.003,W+.003,`glassSolar`),ac(e,`x`,W,s,n,r,i,{panes:1,frame:`modernBronze`,glass:`glassSolar`,frameW:o,sashW:.025,flip:!0,openAngle:Ac(75),movable:l(`win-living`,`Living room slim casement window`,`gf`)}),e.box(t-.025,n+.025,r-.035,r,W-.14,W+.13,`modernStone`),e.box(t,n,i+.025,i+.11,W-.18,W-.105,`modernPlaster`)}else oc(e,`x`,W,3.1,5.3,0,2.4,{panels:3,nOff:.04,movable:l(`slide-living`,`Living room sliding door`,`gf`),group:`slide-living`});$s(e,`x`,W,qa,Do,Oo,0,2.4);let f={hingeAtB:!0,openTo:-1,angle:Ac(100),mat:`doorRear`,knob:`lever`,transom:2.55,frameW:jc};n?Qc(e,`rear`,`Kitchen back door`,`gf`,`x`,o,qa,s,c,0,2.1,f):rc(e,`x`,0,qa,s,c,0,2.1,{...f,angle:0}),K(e,`x`,o,s+jc,c-jc,2.1350000000000002,2.5149999999999997,-.004,.004,`glass`);let p=2.93,m=W+q+.02,h=So-.02,g=Co+.02;K(e,`x`,W,2.6,2.86,1.42,1.8,q,q+.11,`plasticGrey`),K(e,`x`,W,2.64,2.82,1.47,1.62,q+.11,q+.115,`glass`),e.rod(X(.3,p,m),X(h,p,m),.012,`black`),e.rod(X(2.73,1.8,m),X(2.73,p,m),.012,`black`),e.rod(X(h,p,m),X(h,p,g),.012,`black`),e.rod(X(h,p,g),X(U,p,g),.012,`black`);for(let t=.5;t<So-.1;t+=.6)K(e,`x`,W,t-.015,t+.015,2.9000000000000004,2.96,q,q+.04,`black`);e.box(So-.04,So,2.9000000000000004,2.96,(m+g)/2-.015,(m+g)/2+.015,`black`),e.box((So+U)/2-.015,(So+U)/2+.015,2.9000000000000004,2.96,Co,Co+.04,`black`),n&&sl(e,i),e.group=r(`slab1`);let _=(t,n,r,i,a,o=`ceiling`,s=po,c=G)=>e.box(t,n,s,c,r,i,{py:a,ny:o,rest:`ceiling`});if(a){let t=(t,n,r,i)=>e.box(t,n,mo,po,r,i,`ceiling`);t(J,U-J,Qa+q,Qo+Y),t(ts-Ya,U-J,Qo+Y,es-Y),t(J,U-J,es-Y,W-q)}n&&(_(J,U-J,q,Qo+Y,`floorTile`),_(rs,U-J,Qo+Y,$o+Y,`floorTile`),_(ss,U-J,$o+Y,es-Y,`floorTile`),_(J,cs+Y,es-Y,W-q,`floorTile`),_(cs+Y,U-J,es-Y,ls,`bathFloor`),_(cs+Y,U-J,ls,W+q,`bathFloor`)),_(cs-Y,U-J,W+q,12.29,`bathFloor`,`soffit`,3.35,G);let v=(t,n,r,i)=>e.box(t,n,3.35,ko,r,i,{py:`balconyTile`,ny:`soffit`,rest:`wallExt`});i.masterExtension?(v(J,fo,W+q,uo+q),v(fo,cs-Y,W+q,lo)):v(J,cs-Y,W+q,lo),v(fo,cs-Y,lo,co),v(cs-Y,U-J,12.29,co),e.box(fo,U-J,3,wo,co-.2,co,`wallExt`),e.box(fo,To,3,wo,W+q,co-.2,{ny:`soffit`,rest:`wallExt`},`py`),e.box(cs-Y,So,Eo,wo,W+q,Co,{ny:`soffit`,rest:`wallExt`},`py nz px`),e.group=r(`ff`);let y=[{a:.95,b:2.1,y0:G+.9,y1:G+2.1},{a:4,b:5.15,y0:G+.9,y1:G+2.1}];if(Zs(e,`x`,0,J,U-J,G,go,qa,`wallInt`,`wallExt`,y,`wallInt`),y.forEach((t,n)=>{ac(e,`x`,0,t.a,t.b,t.y0,t.y1,{panes:2,nOff:-.03,movable:l(`win-ff-rear${n}`,n===0?`Bedroom 3 window`:`Bedroom 2 window`,`ff`)}),K(e,`x`,0,t.a-.04,t.b+.04,t.y0-.05,t.y0,-q-.045,-q,`wallExt`)}),i.masterExtension)Tc(e,r,l);else{let t={a:.45,b:.95,y0:G+1.25,y1:G+2.3},n={a:1.4,b:3.2,y0:G,y1:G+2.3};Zs(e,`x`,W,J,cs-Y,G,go,qa,`wallExtGrey`,`wallInt`,[t,n],`wallExt`),ac(e,`x`,W,t.a,t.b,t.y0,t.y1,{panes:1,nOff:.03,movable:l(`win-master`,`Master bedroom window`,`ff`)}),oc(e,`x`,W,n.a,n.b,n.y0,n.y1,{panels:2,nOff:.03,movable:l(`slide-master`,`Master bedroom sliding door`,`ff`)}),cc(e,`x`,W,q,1,t.a,t.b,t.y0,t.y1,{w:.07}),cc(e,`x`,W,q,1,n.a,n.b,n.y0+.07,n.y1,{w:.07})}let b=i.masterExtension?`wallInt`:`wallExt`;Zs(e,`x`,12.19,cs-Y,U-J,3.35,Ko,qa,`wallExt`,`wallInt`,Yc(i.masterExtension),b),e.box(cs-Y,U-J,Ko,Go,12.09,12.29,{nx:b,rest:`wallExt`}),e.box(cs-Y,Uo,Go,Vo(12.29)-Lo,12.09,12.29,{nx:b,rest:`wallExt`});{let t=W+q,n=cs-Y,r=cs+Y;if(i.masterExtension)e.prismZY([[t,3.35],[12.29,3.35],[12.29,6.67],[t,6.9]],n,r,b,`wallExt`);else{let{z0:i,y0:a,y1:o}=Jc;e.prismZY([[t,3.35],[12.29,3.35],[12.29,a],[t,a]],n,r,`wallExt`,`wallExt`),e.prismZY([[t,a],[i,a],[i,o],[t,o]],n,r,`wallExt`,`wallExt`),e.prismZY([[t,o],[12.29,o],[12.29,6.67],[t,6.9]],n,r,`wallExt`,`wallExt`),Xc(e)}}{let t=Hc-Vc/2,r=qo(Hc)-Lo+.02,i=qc;Zs(e,`x`,t,cs-Y,U-J,Ko+.05,r,Vc,`wallExt`,`wallInt`,i,`wallExt`);for(let n of i)sc(e,`x`,t,n.a,n.b,n.y0,n.y1,{nOff:.02,out:1});n&&(e.box(cs+Y,U-J,ho,Uc,es-Y,es+Y,`wallInt`),e.box(cs-Y,cs+Y,ho,Uc,es-Y,ls+Y,`wallInt`))}for(let[t,n]of us.entries())(t!==0||i.masterExtension)&&(ac(e,`x`,12.19,n.a,n.b,n.y0,n.y1,{panes:1,nOff:.02,glass:`glassFrosted`,hung:`top`,movable:l(t===0?`win-bath1-west`:`win-bath1`,t===0?`Bathroom 1 relocated window`:`Bathroom 1 window`,`ff`)}),cc(e,`x`,12.19,q,1,n.a,n.b,n.y0,n.y1,{w:.08,depth:.06,sill:.12}));let x=co,S=fo,C=lo,w=.22,T=4.9,E=ko+.17,D=ko+1.08,O=ko+1.17,k=[S,2.28,3.59];e.box(S,T,ko,ko+.15,x-.18,x,`wallExt`);for(let t of k)e.box(t,t+w,ko,O,x-.2,x,`wallExt`);let A=[[k[0]+w,k[1]],[k[1]+w,k[2]],[k[2]+w,T]];for(let[t,n]of A){e.box(t+.01,n-.01,E,D,x-.096,x-.084,`glassRail`);for(let r of[t+.2,n-.2])e.box(r-.03,r+.03,ko+.15,ko+.23,x-.11,x-.07,`chrome`)}e.box(T,U-J,ko,ko+1.1,x-.18,x,`wallExt`);let j=i.masterExtension?uo+q:C;i.masterExtension||(e.box(S,S+w,ko,O,C-.2,C,`wallExt`),e.box(J,S,3,ko+1.1,C-.15,C,`wallExt`)),e.box(S,S+.15,ko,ko+.15,j,x-.2,`wallExt`),e.box(S+.069,S+.081,E,D,j+.01,x-.21,`glassRail`);for(let t of[j+.22,x-.42])e.box(S+.045,S+.105,ko+.15,ko+.23,t-.03,t+.03,`chrome`);if(i.masterExtension)for(let t of[E+.12,D-.12])e.box(S+.045,S+.105,t-.025,t+.025,j,j+.045,`chrome`);if(mc(e,5.6,ko,16.1),n&&(ll(e,r,i),wc(e,r,l,Zc,i)),n&&(e.group=r(`ceil2`),e.box(J,U-J,ho,ho+.05,q,es+Y,`ceiling`),e.box(J,cs+Y,ho,ho+.05,es+Y,ls,`ceiling`),e.box(cs+Y,U-J,Uc,Uc+.05,es+Y,ls-Y,`ceiling`),e.box(J,cs,ho,ho+.05,ls,W-q,`ceiling`),e.box(cs,U-J,Ko,Ko+.05,ls,12.09,`ceiling`)),e.group=r(`roof`),ul(e),a&&kc(e,r),e.group=r(`site`),a){let t=yo-xo.thickness;e.box(J,U-J,-.45,t,W+q,18.75,`concreteLight`),e.box(J,U-J,t,yo,W+q,18.75,`porchTile`)}else e.prismZY([[W+q,-.45],[18.75,-.45],[18.75,vo],[bo,_o],[W+q,_o]],J,U-J,`concreteLight`,(e,t)=>t>.5?`concretePorch`:`concreteLight`);if(i.autoGate)Ec(e,Zc);else{let t=18.6,r=1.28,i=1.1;e.box(.61,1.04,-.2,r,18.4,18.78,`wallWhite`),e.box(4.29,4.66,-.2,r,18.4,18.78,`wallWhite`),e.box(.22,.61,-.2,i,18.55,18.72,`wallWhite`),e.box(4.66,U-.22,-.2,i,18.55,18.72,`wallWhite`),_c(e,1.07,2.66,t,-.12,1.22),_c(e,2.67,4.26,t,-.12,1.22),e.box(2.6350000000000002,2.695,.5,.62,18.560000000000002,18.64,`galv`);for(let[t,n]of[[1.055,.05],[1.055,.95],[4.275,.05],[4.275,.95]])e.box(t-.02,t+.02,n,n+.1,18.57,18.630000000000003,`galv`);if(!a){e.box(J,U-J,-.45,-.1,Qa+.1,-q,`concrete`),e.box(J,4,el,.5,Qa-.1,Qa+.1,`wallExt`),e.box(4.9,U-J,el,.5,Qa-.1,Qa+.1,`wallExt`);for(let[t,n]of[[J,4],[4.9,U-J]]){e.box(t,n,.5,.54,Qa-.02,Qa+.02,`railBlack`),e.box(t,n,1.46,1.5,Qa-.02,Qa+.02,`railBlack`);let r=Math.round((n-t)/.12);for(let i=1;i<r;i++){let a=t+(n-t)*i/r;e.box(a-.01,a+.01,.54,1.46,Qa-.01,Qa+.01,`railBlack`)}}_c(e,4.02,4.88,Qa,-.08,1.55,`railBlack`),e.box(4,5,-.1,-.01,-.6,-q,`concreteLight`)}n&&(e.box(.725,.9249999999999999,1.13,1.24,18.78,18.786,`plaque45`),e.box(.695,.955,.94,1.07,18.78,18.792,`chrome`),e.box(.725,.9249999999999999,1,1.015,18.792,18.794,`black`),e.box(4.44,4.52,1.04,1.11,18.78,18.79,`plasticWhite`))}}function rl(){return[...il().map(vc),...Zc]}function il(){let e=.045,t=.004,n=Do+e+t,r=Oo-e-t,i=.9,a={height:2.345,y0:.006,mat:`doorMain`,thick:.045,swing:[0,-1],maxAngle:Ac(84),level:`gf`};return[{...a,id:`main`,label:`Front door`,hinge:[n,W],dir:[1,0],width:i,knob:`lever`},{...a,id:`side`,label:`Front door (narrow leaf)`,hinge:[r,W],dir:[-1,0],width:r-n-i-.007,knob:`none`}]}function al(e,t,n,r,i,a=!1){hc(e,t,n,r,i);let o=i===`px`||i===`nx`,s=i===`px`||i===`pz`?1:-1,c=s*.021,l=o?new _t(.012,.052,.06):new _t(.06,.052,.012),u=(o?new V().makeRotationZ(-.12*s):new V().makeRotationX(.12)).setPosition(t+(o?c:0),n,r+(o?0:c));if(e.geom(l,`plasticWhite`,u),l.dispose(),a){let t=s*.0065,n=o?new _t(.001,.003,.008):new _t(.008,.003,.001);e.geom(n,`switchIndicatorRed`,u.clone().multiply(new V().makeTranslation(o?t:0,-.016,o?0:t))),n.dispose()}}function ol(e,t,n,r,i,a=3){hc(e,t,n,r,i);let o={pz:0,px:Math.PI/2,nz:Math.PI,nx:-Math.PI/2}[i],s=new V().makeRotationY(o).setPosition(t,n,r);for(let t=0;t<a;t++){let n=new _t(.019,.052,.012);e.geom(n,`plasticWhite`,s.clone().multiply(new V().makeRotationX(.12).setPosition((t-(a-1)/2)*.022,0,.021))),n.dispose()}}function sl(e,t=gs){let n=t.groundFloor,r=po,i=`wallInt`,a=n?[3.26,4.32]:zc.bed4,o=3.88,s=(t,n,r,i,a,o=0)=>e.box(t,n,-.3,o,r,i,{py:a,rest:`concreteLight`});n?(s(J,U-J,$a-Y,W-q,`modernFloor`),s(1.84,U-J,Qa+q,$a-Y,`modernFloor`)):(s(1.51+Y,o-Y,q,1.53-Y,`bathFloor`,-.015),s(J,1.51+Y,q,1.53-Y,`floorTile`),s(o-Y,U-J,q,1.53-Y,`floorTile`),s(J,U-J,1.53-Y,W-q,`floorTile`));let c=t.kitchen===`enclosed`?{a:1.85,b:2.75,y0:1.2,y1:2.2}:{a:.3,b:2.5,y0:t.bathroomAccess===`ensuite`?1.65:1,y1:t.bathroomAccess===`ensuite`?2.35:2.2};n?(Zs(e,`x`,$a,1.96,3.1+Y,0,r,Ya,i,i),oc(e,`z`,3.1,c.a,c.b,c.y0,c.y1,{panels:2,glass:t.bathroomAccess===`ensuite`||t.kitchen===`enclosed`?`glassFrosted`:`glass`,nOff:.03,movable:$c(`win-bed4`,`Bedroom 4 sliding window`,`gf`),group:`win-bed4`}),K(e,`z`,3.1,c.a-.04,c.b+.04,c.y0-.05,c.y0,Y,Y+.045,`wallInt`)):(Zs(e,`z`,1.51,q,1.53+Y,0,r,Ya,i,i),Zs(e,`x`,1.53,1.51-Y,o+Y,0,r,Ya,i,i),Zs(e,`z`,o,q,1.53-Y,0,r,Ya,i,i,[{a:zc.bath3[0],b:zc.bath3[1],y0:0,y1:2.1}])),Zs(e,`z`,3.1,n?$a+Y:1.53+Y,Qo-Y,0,r,Ya,i,i,[...n?[c]:[],{a:a[0],b:a[1],y0:0,y1:2.1}]);let l=t.wideKitchenOpening?U-J-.2:os;Zs(e,`x`,Qo,J,as,0,r,Ya,i,i),Zs(e,`x`,Qo,l,U-J,0,r,Ya,i,i),Zs(e,`x`,es,J,ts-(n?.5:0),0,r,Ya,i,i),e.group=`slab1`;let u=.075;if(e.box(ts,cs-Y,r-.3-2*u,r,es-Y,es+Y,i),e.box(cs-Y,U-J,r-.5-u,r,es-Y,W-q,`ceiling`),e.box(as,l,r-.3,r,Qo-Y,Qo+Y,i),e.box(ts-Ya,ts,r-.3,r,Qo+Y,es+Y,i),e.group=`gf`,!n){let t=1.51+Y,n=o-Y,i=q,a=1.53-Y,s=(r,s,c)=>{Qs(e,`x`,0,q,1,t,n,r,s,c,[Ic]),Qs(e,`x`,1.53,Y,-1,t,n,r,s,c),Qs(e,`z`,1.51,Y,1,i,a,r,s,c),Qs(e,`z`,o,Y,-1,i,a,r,s,c,[{a:zc.bath3[0],b:zc.bath3[1],y0:0,y1:2.1}])};s(-.015,2.1,`bathWall`);let c=2.7;s(2.1,c,`bathWallDark`),e.box(t,n,c,r,i,a,`ceiling`)}if(n||e.box(J,3.1-Y,3,r,1.53+Y,Qo-Y,`ceiling`),n||e.box(J,1.51-Y,3,r,q,1.53+Y,`ceiling`),!n){let t=q,n=1.51+Y;dc(e,2.9,-.015,t+.008,0),fc(e,3.45,.84,t+.008,0),pc(e,n+Fc/2,-.015,t+.008,0),mc(e,1.95,-.015,.85)}if(n)Dc(e);else{let t=Mc,n=e.uvFn;e.uvFn=(e,r,i)=>i===`kitchenTile`?[e[0]-t,e[1]]:n?.(e,r,i)??null,Qs(e,`x`,0,q,1,t,U-J,0,1.5,`kitchenTile`,[{a:Lc,b:Rc,y0:1.1,y1:2.55}]),e.uvFn=n;let r=t,i=U-J-.03,a=q+.008,o=.66,s=.86,c=(Lc+Rc)/2,l=c+.05,u=l-.34,d=.2,f=.54;e.box(r,u,s,.866,a,o,`stainless`),e.box(l,i,s,.866,a,o,`stainless`),e.box(u,l,s,.866,a,d,`stainless`),e.box(u,l,s,.866,f,o,`stainless`),e.box(u,l,.6699999999999999,.6759999999999999,d,f,`stainless`),e.box(u-.004,u,.6699999999999999,.866,d,f,`stainless`),e.box(l,l+.004,.6699999999999999,.866,d,f,`stainless`),e.box(u,l,.6699999999999999,.866,.196,d,`stainless`),e.box(u,l,.6699999999999999,.866,f,.544,`stainless`),e.rod(X(c,s,.14),X(c,1.1400000000000001,.14),.013,`chrome`),e.rod(X(c,1.1400000000000001,.14),X(c,1.1400000000000001,.36),.011,`chrome`),e.rod(X(c,1.1400000000000001,.36),X(c,1.08,.36),.011,`chrome`),e.box(c-.03,c+.03,.9199999999999999,.9349999999999999,.1,.2,`chrome`)}n||Qc(e,`bath3`,`Bathroom 3 door`,`gf`,`z`,o,Ya,...zc.bath3,0,2.1,{hingeAtB:!0,openTo:-1,angle:Ac(80),mat:`doorBath`,frameW:jc}),n?Zc.push({...ec(e,3.1,...a,-1,`doorWood`),id:`bed4`,label:`Bedroom 4 sliding door`,level:`gf`}):Qc(e,`bed4`,`Bedroom 4 door`,`gf`,`z`,3.1,Ya,...a,0,2.1,{hingeAtB:!0,openTo:-1,angle:Ac(78),mat:`doorWood`,frameW:jc}),K(e,`x`,W,2.6,2.9,1.72,2.12,-q-.09,-q,`plasticWhite`);for(let t=0;t<5;t++){let n=2.75+(t-2)*.092;hc(e,n,1.6,W-q,`nz`);let r=t>=3,i=r?1:3;for(let t=0;t<i;t++){let a=n+(t-(i-1)/2)*.022,o=new _t(r?.06:.019,.052,.012),s=new V().makeRotationX(.12).setPosition(a,1.6,W-q-.021);if(e.geom(o,`plasticWhite`,s),o.dispose(),r){let t=new _t(.008,.003,.001);e.geom(t,`switchIndicatorRed`,s.clone().multiply(new V().makeTranslation(0,-.016,-.0065))),t.dispose()}}}gc(e,J+.45,.3,es+Y,`pz`),gc(e,U-J,.3,9.9,`nx`),gc(e,U-J,2.6,9.9,`nx`),gc(e,U-J,.3,(6.2+es+.45)/2,`nx`),gc(e,U-J-(t.wideKitchenOpening?.1:.45),.3,Qo+Y,`pz`),n||al(e,o+Y,1.35,.446,`px`),n||al(e,o+Y,1.35,.354,`px`,!0),n?(al(e,2.6,1.05,Qo-Y,`nz`),al(e,2.692,1.05,Qo-Y,`nz`)):(al(e,3.1-Y,1.35,3.204,`nx`),al(e,3.1-Y,1.35,3.296,`nx`)),gc(e,3.1-Y,2.4,2.75,`nx`),gc(e,3.1-Y,.3,2.2,`nx`);let d=as-.18;hc(e,d,1.35,Qo+Y,`pz`,.086);let f=new _t(.06,.052,.012);e.geom(f,`plasticWhite`,new V().makeRotationX(.12).setPosition(d,1.35,Qo+Y+.021)),f.dispose();for(let t=0;t<3;t++)gc(e,U-J,1.2,Qo-Y-.15-(2-t)*.092,`nx`);cl(e)}function cl(e){let t=Zo,n=`wallInt`,r=`stairTile`,i=(e,t,n)=>(i,a,o)=>o===r?a[1]>.5?[e(i),t(i)]:[e(i),n(i)]:null,a=.16,o=ns,s=Xo.lower,c=is,l=(c-o)/s,u=Qo+Y,d=5.52,f=[[c,0]];for(let e=1;e<=s;e++)f.push([c-(e-1)*l,e*t]),f.push([c-e*l,e*t]);let p=e=>t*(c-e)/l-a;f.push([o,p(o)]),f.push([c-a*l/t,0]);{let a=(u+d)/2;e.uvFn=i(e=>e[2]-a,e=>c-(Math.round(e[1]/t)-1)*l-e[0],e=>e[1]-Math.round((c-e[0])/l)*t),e.prismXY(f,u,d,n,(e,t)=>t>.5||e>.5?r:n)}let m=[o,d],h=5.75,g=[{poly:[m,[o,u],[J,u]],n:s+1},{poly:[m,[J,u],[J,h],[o,h]],n:s+2}];for(let c of g){let l=c.n*t;e.uvFn=i(e=>e[0]-(J+o)/2,e=>e[2]-u,e=>e[1]-(l-t));let f=p(o);if(c.n===s+1)e.prismXZ(c.poly,f,l-t,n,n,n),e.prismXZ(c.poly,l-t,l,r,n,r);else{let i=[m,[J,u],[J,d]];e.prismXZ(i,f,l-t,n,n,n),e.prismXZ(i,l-t,l,r,n,r),e.prismZY([[d,l],[h,l],[h,l-a],[d,f]],J,o,n,(e,t)=>t>.5?r:n)}}let _=es-Y,v=$o+Y,y=Xo.middle,b=(v-h)/y,x=s+3,S=x+y,C=a,w=e=>t*(x-1+(e-h)/b)-a,T=h+((S*t-C+a)/t-(x-1))*b,E=[];for(let e=0;e<y;e++)E.push([h+e*b,(x+e)*t]),E.push([h+(e+1)*b,(x+e)*t]);E.push([v,S*t],[_,S*t],[_,S*t-C],[T,S*t-C],[h,w(h)]);{let a=(J+o)/2;e.uvFn=i(e=>e[0]-a,e=>e[2]-(h+(Math.round(e[1]/t)-x)*b),e=>e[1]-(x-1+Math.round((e[2]-h)/b))*t),e.prismZY(E,J,o,n,(e,t)=>t>.5||e<-.5?r:n)}let D=ns,O=Xo.upper,k=ss,A=(k-D)/O,j=[[D,S*t]];for(let e=1;e<=O;e++)j.push([D+(e-1)*A,(S+e)*t]),j.push([D+e*A,(S+e)*t]);j.push([k,G]);let M=e=>S*t+t*(e-D)/A-a;j.push([k,M(k)]),j.push([D,M(D)]);{let a=(v+_)/2;e.uvFn=i(e=>e[2]-a,e=>e[0]-(D+(Math.round(e[1]/t)-S-1)*A),e=>e[1]-(S+Math.round((e[0]-D)/A))*t),e.prismXY(j,v,_,n,(e,t)=>t>.5||e<-.5?r:n)}e.uvFn=null;let ee=.9,te={height:ee,balFrom:.12,balTo:.78,rails:[.12,.78],posts:!1},ne=e=>t+(c-e)/l*t,N=e=>x*t+(e-h)/b*t,re=5.484999999999999,P=o-.035,F=.1,ie=(t,n,r,i)=>e.bar(X(t,r,n),X(t,i+.02,n),.05,.05,`steelRail`),ae=c-.03,oe=ne(ae)+ee;ie(ae,re,t-.02,oe),e.bar(X(ae,oe,re),X(c+.1,oe,re),.045,.04,`steelRail`),e.box(c+.1,c+.105,oe-.02,oe+.02,5.4624999999999995,5.507499999999999,`steelRail`);let se=c-4*l-.03;ie(se,re,5*t-.02,ne(se)+ee),lc(e,[X(ae,ne(ae),re),X(se,ne(se),re),X(P+F,ne(P+F),re)],te);let ce=(t,n,r,i,a)=>{for(let[o,s,c]of[[ee,.045,.04],[.78,.03,.022],[.12,.03,.022]]){let l=o===.12?Math.max(t.y+o,i+.08):t.y+o,u=o===.12?Math.max(l,a+.08):l;e.bar(X(t.x,t.y+o,t.z),X(n.x,l,n.z),s,c,`steelRail`),e.bar(X(n.x,l,n.z),X(r.x,u,r.z),s,c,`steelRail`)}ie(n.x,n.z,i-.02,t.y+ee),ie(r.x,r.z,a-.02,r.y+ee)};ce(X(P+F,ne(P+F),re),X(P,0,re),X(P,N(5.584999999999999),5.584999999999999),(s+2)*t,(s+2)*t);let le=`steelRail`,ue=.88,de=.1,fe=v-.04,pe=v+.06;lc(e,[X(P,N(5.584999999999999),5.584999999999999),X(P,N(pe-F),pe-F)],te);let me=e=>(S+1)*t+(e-D)/A*t;ce(X(P,N(pe-F),pe-F),X(P,0,pe),X(P+F,me(P+F),pe),S*t,(S+1)*t);let he=k+.04;lc(e,[X(P+F,me(P+F),pe),X(he,G+1-ee,pe)],te);let ge=(t,n,r,i=.06)=>{e.bar(X(t,r,n),X(t,G+1+.02,n),i,i,le),e.box(t-i/2-.015,t+i/2+.015,G+1+.02,G+1+.035,n-i/2-.015,n+i/2+.015,le)};ge(he,pe,G-.02);let _e=rs+.04,ve=Qo+Y+.02;lc(e,[X(_e,G,ve),X(_e,G,fe),X(he,G,fe),X(he,G,pe-.03)],{height:1,balFrom:de,balTo:ue,rails:[de,ue],spacing:.115,posts:!1});for(let t of[ve+.01,(ve+fe)/2])e.bar(X(_e,G-.02,t),X(_e,G+1+.02,t),.05,.05,le);ge(_e,fe,G-.02,.05),ge(he,fe,G-.02,.05)}function ll(e,t,n){e.group=t(`ff`);let r=G,i=ho,a=`wallInt`,o=G+2.1;Zs(e,`z`,3.04,q,Qo-Y,r,i,Ya,a,a),Zs(e,`x`,Qo,J,U-J,r,i,Ya,a,a,[{a:zc.bed3[0],b:zc.bed3[1],y0:r,y1:o},{a:zc.bed2[0],b:zc.bed2[1],y0:r,y1:o}]),Zs(e,`x`,es,J,U-J,r,i,Ya,a,a,[{a:zc.master[0],b:zc.master[1],y0:r,y1:o},{a:zc.bath2[0],b:zc.bath2[1],y0:r,y1:o}]),Zs(e,`z`,cs,es+Y,W+q,r,i,Ya,a,a,[{a:zc.bath1[0],b:zc.bath1[1],y0:r,y1:o}]),Zs(e,`x`,ls,cs+Y,U-J,r,i,Ya,a,a);let s=(t,n,r,a,o,s=i)=>{for(let[t,n,r]of[[G,G+2.1,`bathWall`],[G+2.1,s,`bathWallDark`]])for(let i of o)Qs(e,i.axis,i.c,i.face,i.side,i.a0,i.a1,t,n,r,i.open??[])},c={x0:cs+Y,x1:U-J,z0:es+Y,z1:ls-Y};s(c.x0,c.x1,c.z0,c.z1,[{axis:`x`,c:es,face:Y,side:1,a0:c.x0,a1:c.x1,open:[{a:zc.bath2[0],b:zc.bath2[1],y0:r,y1:o}]},{axis:`x`,c:ls,face:Y,side:-1,a0:c.x0,a1:c.x1,open:qc},{axis:`z`,c:cs,face:Y,side:1,a0:c.z0,a1:c.z1},{axis:`z`,c:U,face:J,side:-1,a0:c.z0,a1:c.z1}],Uc);let l={x0:cs+Y,x1:U-J,z0:ls+Y,z1:12.19-q};s(l.x0,l.x1,l.z0,l.z1,[{axis:`x`,c:ls,face:Y,side:1,a0:l.x0,a1:l.x1},{axis:`x`,c:12.19,face:q,side:-1,a0:l.x0,a1:l.x1,open:Yc(n.masterExtension)},{axis:`z`,c:cs,face:Y,side:1,a0:l.z0,a1:l.z1,open:[{a:zc.bath1[0],b:zc.bath1[1],y0:r,y1:o},...n.masterExtension?[]:[{a:Jc.z0,b:12.29,y0:Jc.y0,y1:Jc.y1}]]},{axis:`z`,c:U,face:J,side:-1,a0:l.z0,a1:l.z1}],Ko),dc(e,5.3,G,c.z1-.008,Math.PI),fc(e,c.x1-.008,G+.84,8.15,-Math.PI/2),pc(e,4.45,G,c.z1-.008,Math.PI),mc(e,4.5,G,9.2),dc(e,5.3,G,l.z0+.008,0),fc(e,4.5,G+.84,l.z0+.008,0),pc(e,l.x1-.008,G,11.45,-Math.PI/2),mc(e,5.55,G,11.4),Qc(e,`bed3`,`Bedroom 3 door`,`ff`,`x`,Qo,Ya,...zc.bed3,G,2.1,{hingeAtB:!0,openTo:-1,angle:Ac(82),mat:`doorWood`,frameW:jc}),Qc(e,`bed2`,`Bedroom 2 door`,`ff`,`x`,Qo,Ya,...zc.bed2,G,2.1,{hingeAtB:!1,openTo:-1,angle:Ac(82),mat:`doorWood`,frameW:jc}),Qc(e,`master`,`Master bedroom door`,`ff`,`x`,es,Ya,...zc.master,G,2.1,{hingeAtB:!0,openTo:1,angle:Ac(80),mat:`doorWood`,frameW:jc}),Qc(e,`bath2`,`Bathroom 2 door`,`ff`,`x`,es,Ya,...zc.bath2,G,2.1,{hingeAtB:!1,openTo:1,angle:Ac(70),mat:`doorBath`,frameW:jc}),Qc(e,`bath1`,`Bathroom 1 door`,`ff`,`z`,cs,Ya,...zc.bath1,G,2.1,{hingeAtB:!0,openTo:1,angle:Ac(72),mat:`doorBath`,frameW:jc});let u=1.35+G,d=.3+G;ol(e,1.636,G+1.5,Qo-Y,`nz`),al(e,1.544,G+1.5,Qo-Y,`nz`),gc(e,1.49,G+.5,Qo-Y,`nz`),ol(e,4.304,G+1.5,Qo-Y,`nz`),al(e,4.396,G+1.5,Qo-Y,`nz`),gc(e,4.45,G+.5,Qo-Y,`nz`),ol(e,zc.master[0]-.25,u,es+Y,`pz`),al(e,zc.master[0]-.158,u,es+Y,`pz`),gc(e,cs-Y,G+2.4,8.8,`nx`),ol(e,cs-Y,u,zc.bath1[0]-.3,`nx`),al(e,cs-Y,u,zc.bath1[0]-.208,`nx`),al(e,5.114,u,es-Y,`nz`),al(e,5.206,u,es-Y,`nz`),gc(e,3.04-Y,G+2.4,q+1.5,`nx`),gc(e,3.04+Y,G+2.4,q+1.5,`px`),gc(e,cs-Y,G+.5,9.35,`nx`),gc(e,5.45,d,Qo+Y,`pz`),K(e,`x`,Qo,4.8,5.15,G+1.7,G+2,Y,Y+.08,`plasticWhite`)}function ul(e){let t=Lo,n=Math.cos(Fo),r=Math.sin(Fo),i=J,a=Uo,o=U-J,s=go+t,c=e=>s+(e-0)*Io,l=e=>s+(W-e)*Io,u=e=>l(e)-Wo,d=(i,a,o,s,c,l,u)=>{let d=c(o),f=c(s),p=Math.abs(o-u)/n,m=Math.abs(s-u)/n,h=l>0?i:-i,g=l>0?a:-a;e.quad([i,d,o],[a,d,o],[a,f,s],[i,f,s],`roofTile`,[0,n,l*r],[[h,p],[g,p],[g,m],[h,m]]),e.quad([i,d-t,o],[a,d-t,o],[a,f-t,s],[i,f-t,s],`soffit`,[0,-n,-l*r])},f=(n,r,i,a)=>{let o=a>0?l(i):c(i);e.quad([n,o-t,i],[r,o-t,i],[r,o,i],[n,o,i],`fascia`,[0,0,a]);let s=i+a*.025;e.box(n,r,o-.28,o-.01,Math.min(i,s),Math.max(i,s),`fascia`),e.box(n,r,o-.02,o+.03,Math.min(i,i-a*.05),Math.max(i,i-a*.05),`roofRidge`)},p=(t,n,r,i)=>{let a=new N(.13,.13,n-t,20,1);a.rotateZ(Math.PI/2),a.scale(1,.72,1),e.geom(a,`roofRidge`,new V().makeTranslation((t+n)/2,r-.02,i)),a.dispose();for(let a=t+.42;a<n-.05;a+=.42){let t=new le(.131,.008,6,20,Math.PI);t.rotateY(Math.PI/2),t.scale(1,.72,1),e.geom(t,`roofRidge`,new V().makeTranslation(a,r-.02,i)),t.dispose()}};d(i,o,Bo,Jo,c,-1,Bo),d(i,a,Jo,Ro,c,-1,Bo),f(i,o,Bo,-1),d(i,a,Ro,zo,l,1,zo),f(i,a,zo,1),p(i,a,Ho,Ro);let m=Bc,h=Hc,g=h+.6,_=.08;d(a,o,Jo,h,u,1,g);{let i=u(h),s=u(g),c=(g-h)/n;e.quad([a,i,h],[o,i,h],[o,s,g],[a,s,g],`roofTile`,[0,n,r],[[a,c],[o,c],[o,0],[a,0]]),e.quad([a,i-_,h],[o,i-_,h],[o,s-_,g],[a,s-_,g],`soffit`,[0,-n,-r]),e.quad([a,i-t,h],[o,i-t,h],[o,i-_,h],[a,i-_,h],`wallExt`,[0,0,1]),e.quad([a,s-_,g],[o,s-_,g],[o,s,g],[a,s,g],`fascia`,[0,0,1]),e.box(a,o,s-.13,s-.01,g,g+.02,`fascia`),e.box(a,o,s-.02,s+.03,g-.05,g,`roofRidge`)}p(a,o,Yo,Jo),e.box(a,o,Ko+.05,m,h-Vc,12.09,{py:`concreteLight`,rest:`soffit`});let v=W/2+(t-Wo)/(2*Io);e.prismZY([[v,c(v)-t],[Ro,Ho-t],[12.29,l(12.29)-t],[12.29,m],[h,m],[h,u(h)]],a-.1,a,`wallExt`,`wallExt`);let y=t+.06;e.prismZY([[Jo,Yo],[Ro,Ho],[zo,l(zo)],[zo,l(zo)-y],[Ro,Ho-y],[Jo,Yo-y]],a,a+.03,`fascia`,`fascia`)}var dl=new z;function fl(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;dl.copy(t),dl[r]=0,dl.normalize();let l=.5*o/(o+s),u=1-dl.angleTo(e)/c;return Math.sign(dl[n])===1?u*l:s/(o+s)+l+l*(1-u)}var pl=class e extends _t{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new z,c=new z,l=new z(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new z,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=fl(m,c,`z`,`y`,i,n),f[a+1]=1-fl(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-fl(m,c,`z`,`y`,i,n),f[a+1]=1-fl(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-fl(m,c,`x`,`z`,i,e),f[a+1]=fl(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-fl(m,c,`x`,`z`,i,e),f[a+1]=1-fl(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-fl(m,c,`x`,`y`,i,e),f[a+1]=1-fl(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=fl(m,c,`x`,`y`,i,e),f[a+1]=1-fl(m,c,`y`,`x`,i,t)}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}},ml=[];function hl(){return[...ml]}var gl=`jpOak`,_l=`jpOakDark`,vl=`jpLinen`,yl=`jpLinenGrey`,bl=`jpCushion`,xl=`jpTatami`,Sl=`jpHeri`,Cl=`jpWashi`,wl=`jpRug`,Tl=`jpLED`,El=`plasticWhite`,Dl=`stainless`,Ol=`glassDark`,kl=`#ffd2a1`,Al=`#ffe6cc`,jl=Ja/2,Ml=Ya/2,Nl=U-jl,Pl=(e,t,n)=>new z(e,t,n),Fl={pz:0,px:Math.PI/2,nz:Math.PI,nx:-Math.PI/2},Il=.36,Ll=.018,Rl=[];function Z(e,t,n,r,i,a){let o=new V().makeRotationY(i).setPosition(t,n,r),s=Rl.length?Rl[Rl.length-1].clone().multiply(o):o;Rl.push(s),e.setTransform(s);try{a()}finally{Rl.pop(),e.setTransform(Rl[Rl.length-1]??null)}}function zl(e,t,n,r,i,a,o=1,s){let c=new V().makeScale(1,o,1);s&&c.premultiply(s),e.geom(t,n,c.setPosition(r,i,a)),t.dispose()}function Bl(e,t,n,r,i,a={}){let o=Pl(t,n,r);Rl.length&&o.applyMatrix4(Rl[Rl.length-1]),ml.push({level:e.group===`site`?`site`:e.group===`ff`?`ff`:`gf`,pos:[o.x,o.y,o.z],color:a.color??kl,intensity:i,distance:a.distance??6,always:a.always})}function Vl(e,t,n,r,i,a,o){e.quad([t,r,a],[n,r,a],[n,i,a],[t,i,a],o,[0,0,1],[[0,0],[1,0],[1,1],[0,1]])}function Hl(e,t,n,r,i,a,o){for(let o=1;o<a;o++){let s=-t/2+o*t/a;e.box(s-.003,s+.003,n,r,i,i+.002,_l)}for(let n=0;n<a;n++){let r=-t/2+n*t/a,s=r+t/a,c=n%2==0?s-.035:r+.035;e.box(c-.006,c+.006,o[0],o[1],i,i+.016,_l)}}function Ul(e,t,n,r=!0){let i=t/2,a=n/2;e.box(-i+.1,i-.1,0,.1,-a+.1,a-.1,_l),_u(e,t,.18,n,0,.19,0,gl,.012),_u(e,t-.1,.2,n-.13,0,.38,.015,vl,.055),_u(e,t-.06,.19,n-.83,0,.435,.385,yl,.07),_u(e,t-.04,.025,.3,0,.5325,a-.4,bl,.01);let o=t<1.2,s=o?.62:Math.min(.62,t/2-.1);for(let n of o?[0]:[-t/4,t/4])_u(e,s,.12,.38,n,.54,-a+.31,vl,.055);if(e.box(-i,i,.28,.95,-a,-a+.05,gl),e.box(-i+.05,i-.05,.93,.94,-a-.005,-a,Tl),r)for(let t of[-1,1])Z(e,t*(i+.25),0,-a+.2,0,()=>Wl(e));Bl(e,0,1.25,-a+.45,r?.6:.2,{distance:3.5})}function Wl(e){e.box(-.18,.18,0,.06,-.16,.16,_l),e.box(-.21,.21,.06,.42,-.2,.2,gl),e.box(-.19,.19,.3,.304,.2,.202,_l),e.box(-.05,.05,.42,.44,-.05,.05,_l),e.box(-.08,.08,.44,.68,-.08,.08,Cl)}function Gl(e,t,n=.6,r=2.4){e.box(-t/2+.02,t/2-.02,0,.08,-n/2,n/2-.05,_l),e.box(-t/2,t/2,.08,r,-n/2,n/2,gl);let i=Math.max(2,Math.round(t/.5));Hl(e,t,.09,r-.01,n/2,i,[.9,1.3]),e.box(-t/2+.01,t/2-.01,r-.453,r-.447,n/2,n/2+.002,_l)}function Kl(e,t,n=.9){for(let r of[-1,1])for(let i of[-1,1]){let a=r*(t/2-.1),o=i*(n/2-.1);e.box(a-.025,a+.025,0,.1,o-.025,o+.025,_l)}e.box(-t/2,t/2,.1,.22,-n/2,n/2,gl);for(let r of[-1,1])e.box(r*t/2,r*(t/2-.07),.22,.58,-n/2,n/2,gl);e.box(-t/2+.07,t/2-.07,.22,.5,-n/2,-n/2+.03,gl);let r=-t/2+.08,i=t/2-.08,a=t>2?3:2,o=(i-r)/a;for(let t=0;t<a;t++){let i=r+t*o+.005,a=i+o-.01;e.box(i,a,.22,.42,-n/2+.24,n/2-.02,yl),e.box(i,a,.22,.8,-n/2+.03,-n/2+.24,yl)}for(let r of[-1,1])e.box(r*(t/2-.55),r*(t/2-.13),.42,.82,-n/2+.24,-n/2+.38,bl)}function ql(e,t,n,r,i=.045,a=!1){e.box(-t/2,t/2,r-.035,r,-n/2,n/2,gl);for(let a of[-1,1])for(let o of[-1,1]){let s=a*(t/2-.06-i/2),c=o*(n/2-.06-i/2);e.box(s-i/2,s+i/2,0,r-.035,c-i/2,c+i/2,gl)}a&&e.box(-t/2+.08,t/2-.08,.1,.12,-n/2+.08,n/2-.08,_l)}function Jl(e){let t=.21,n=.028;for(let r of[-.21,t])for(let i of[-.21,t])e.box(r-n/2,r+n/2,0,.43,i-n/2,i+n/2,gl);e.box(-.22,.22,.43,.46,-.22,.22,gl),e.box(-.21+.01,.19999999999999998,.46,.48,-.19,t,yl);for(let r of[-.21,t])e.box(r-n/2,r+n/2,.46,.82,-.21-n/2,-.19599999999999998,gl);e.box(-.21,t,.64,.8,-.222,-.21+.012,gl)}function Yl(e,t,n=!0){let r=.42,i=.22,a=.5;for(let n of[-t/2+.12,0,t/2-.12])for(let t of[-.42/2+.07,r/2-.07])zl(e,new N(.025,.018,i,12),_l,n,i/2,t);e.box(-t/2,t/2,i,a,-.42/2,r/2,gl);for(let n=1;n<4;n++){let i=-t/2+n*t/4;e.box(i-.002,i+.002,.23,.49,r/2,.212,_l)}e.box(-t/2+.1,t/2-.1,.215,i,-.19,r/2-.1,Tl);let o=-.06;e.box(-.22,.22,a,.512,-.14,.04000000000000001,`black`),e.box(-.035,.035,a,.6,-.08,o,`black`),e.box(-1.66/2-.01,.84,.5700000000000001,1.5237500000000002,-.09,o,`black`),e.box(-1.66/2,1.66/2,.5800000000000001,1.5137500000000002,o,-.057999999999999996,Ol),n&&(e.box(-.45,.45,a,.565,.06,.15,`black`),e.box(-.44,.44,.508,.557,.15,.151,`plasticGrey`))}function Xl(e,t){let n=Il,r=.22,i=.98;e.box(-t/2,t/2,r,i,-.36/2,n/2,gl),Hl(e,t,.23,.97,n/2,2,[.3,.52]),e.box(-t/2+.1,t/2-.1,.215,r,-.15,n/2-.03,Tl),e.box(t/2-.4,t/2-.15,i,1,-.08,.08,_l)}function Zl(e,t=.62,n=.9){for(let n of[-.14,.14])for(let r of[-.14,.14])e.box(n-.012,n+.012,0,t,r-.012,r+.012,_l);e.box(-.13,.13,.1,t-.02,-.13,.13,Cl);for(let n of[.09,t-.02])e.box(-.15,.15,n,n+.02,-.15,.15,_l);Bl(e,0,t+.05,0,n,{distance:3.5})}function Ql(e,t,n,r=.2){e.box(-t/2+.04,t/2-.04,0,.06,-n/2+.04,n/2-.04,_l),e.box(-t/2,t/2,.06,r-.05,-n/2,n/2,gl),e.box(-t/2+.04,t/2-.04,.055,.06,n/2-.05,n/2-.04,Tl);let i=Math.max(1,Math.round(t/.9)),a=t/i;for(let o=0;o<i;o++){let i=-t/2+o*a,s=i+a;e.box(i+.003,s-.003,r-.05,r,-n/2+.003,n/2-.003,xl);for(let t of[i+.003,s-.033])e.box(t,t+.03,r-.049,r+.0015,-n/2+.003,n/2-.003,Sl)}}function $l(e){e.box(-.27,.27,0,.07,-.29,.29,bl)}function eu(e,t,n=.5){let r=.74;e.box(-t/2,t/2,.71,r,-n/2,n/2,gl);for(let r of[-1,1])e.box(r*(t/2-.03),r*t/2,0,.71,-n/2+.02,n/2-.02,gl);e.box(-t/2+.03,t/2-.03,.45,.71,-n/2+.02,-n/2+.04,gl),e.box(t/2-.3,t/2-.24,r,.76,-n/2+.08,-n/2+.14,_l),e.rod(Pl(t/2-.27,.76,-n/2+.11),Pl(t/2-.27,1.12,-n/2+.11),.006,_l,6),e.box(t/2-.36,t/2-.18,1.04,1.18,-n/2+.04,-n/2+.2,Cl),e.box(-.2,.12,r,.755,-.02,.2,`aluSilver`),e.box(-.2,.12,r,.96,-.03,-.02,`aluSilver`),e.box(-.19,.11,.755,.95,-.02,-.018,Ol)}function tu(e){e.box(-.44,.44,0,.29,0,.21,El),e.box(-.42,.42,.25,.28,.211,.212,`plasticGrey`),e.box(-.4,.4,.02,.075,.18,.212,`plasticGrey`),e.box(.28,.32,.1,.108,.211,.213,Tl)}function nu(e,t=.72,n=.68,r=1.82){for(let r of[-t/2+.06,t/2-.06])for(let t of[-n/2+.06,n/2-.1])e.box(r-.02,r+.02,0,.03,t-.02,t+.02,`black`);e.box(-t/2,t/2,.03,r,-n/2,n/2-.06,Dl);let i=n/2-.06;e.box(-t/2,-.002,.8,r,i,i+.05,Dl),e.box(.002,t/2,.8,r,i,i+.05,Dl),e.box(-t/2,t/2,.03,.795,i,i+.05,Dl);for(let t of[-.03,.03])e.box(t-.008,t+.008,1.05,1.6,i+.05,i+.075,`black`);e.box(-.25,.25,.68,.7,i+.05,i+.075,`black`),e.box(-.3,-.18,1.4,1.48,i+.05,i+.052,Ol)}function ru(e){e.box(-.25,.25,0,.29,-.19,.19,El),e.box(-.23,.1,.04,.25,.19,.192,Ol),e.box(.13,.23,.04,.25,.19,.192,`plasticGrey`),zl(e,new N(.02,.02,.012,16),`black`,.18,.11,.196,1,new V().makeRotationX(Math.PI/2))}function iu(e){zl(e,new N(.13,.12,.2,28),El,0,.1,0),zl(e,new S(.13,28,10,0,Math.PI*2,0,Math.PI/2),El,0,.2,0,.35),e.box(-.05,.05,.09,.14,.11,.128,Ol),e.box(-.06,.06,.24,.26,-.015,.015,`plasticGrey`)}function au(e){zl(e,new N(.1,.1,.02,24),`black`,0,.01,0),zl(e,new N(.07,.085,.2,24),Dl,0,.12,0),e.box(-.012,.012,.06,.2,-.13,-.08,`black`),e.box(-.01,.01,.17,.19,.07,.11,Dl)}function ou(e){e.box(-.3,.3,0,.85,-.3,.3,El),e.box(-.28,.28,.74,.82,.3,.302,`plasticGrey`);let t=new V().makeRotationX(Math.PI/2);zl(e,new N(.21,.21,.02,32),`chrome`,0,.42,.31,1,t),zl(e,new N(.17,.17,.024,32),Ol,0,.42,.312,1,t),zl(e,new N(.03,.03,.02,20),`chrome`,.18,.78,.31,1,t)}function su(e){e.box(-.11,.11,0,.34,0,.085,El),e.box(-.07,.07,.2,.26,.085,.087,Ol),e.box(.02,.05,.215,.23,.087,.088,`switchIndicatorRed`)}function cu(e){let t=1.4/2,n=-.55/2,r=.55/2,i=1.12;e.box(-.7+.03,.6699999999999999,0,.06,n,.23500000000000001,_l),e.box(-.7,-.27,.06,i,n,r,gl),e.box(.27,t,.06,i,n,r,gl),e.box(-.27,.27,.52,i,n,r,gl);for(let t of[-1,1])e.box(t*.485-.003,t*.485+.003,.07,1.11,r,.277,_l),e.box(t*.44-.006,t*.44+.006,.55,.75,r,.29100000000000004,_l);e.box(-.26,.26,.9,.904,r,.277,_l),e.box(-.27,.27,0,.06,n,r,`jpLacquer`),e.box(-.27,.27,.06,.52,n,-.195,`jpLacquer`),Vl(e,-.22,.22,.1,.49,-.194,`jpTudiPlaque`),zl(e,new N(.055,.045,.07,20),`jpBrass`,0,.095,.02);for(let t of[-.02,.01,.03])e.rod(Pl(t,.1,.02),Pl(t*1.5,.3,.02),.002,`jpIncense`,4);for(let t of[-1,1])e.rod(Pl(t*.19,.06,-.05),Pl(t*.19,.16,-.05),.006,`jpGold`,6),zl(e,new N(.03,.04,.08,16),`jpAltarRed`,t*.19,.2,-.05);e.box(-.75,.75,i,1.1700000000000002,n,.325,gl);let a=1.1700000000000002,o=2.62;e.box(-.7,t,a,o,n,-.255,_l);for(let t=-.7+.02;t+.035<=.6799999999999999;t+=.07)t+.035>-.38&&t<.38||e.box(t,t+.035,a,o,-.255,-.22500000000000003,gl);for(let r of[-1,1])e.box(r*t,r*.75,i,2.7,n,.1,gl);e.box(-.75,.75,o,2.7,n,.12,gl),e.box(-.7+.05,.6499999999999999,2.615,o,-.21500000000000002,.08,Tl),e.box(-.38,.38,1.4,2.4,-.255,-.22500000000000003,`jpLacquer`),Vl(e,-.35,.35,1.43,2.37,-.22400000000000003,`jpAltarPlaque`);let s=-.1;e.box(-.15,.15,a,1.2500000000000002,-.22,.01999999999999999,_l),zl(e,new N(.1,.11,.05,28),`jpGold`,0,1.2750000000000001,s);let c=[[0,0],[.085,0],[.08,.1],[.065,.22],[.05,.3],[.03,.33],[0,.335]].map(([e,t])=>new B(e,t));zl(e,new ft(c,28),`ceramic`,0,1.3000000000000003,s),zl(e,new S(.035,20,14),`ceramic`,0,1.6600000000000001,s,1.1),zl(e,new S(.02,14,10),`ceramic`,0,1.7100000000000002,-.11),zl(e,new le(.075,.006,8,40),`jpGold`,0,1.6600000000000001,-.15000000000000002);for(let t of[-1,1]){let n=t*.5;zl(e,new N(.05,.06,.03,20),`jpGold`,n,1.185,0),e.rod(Pl(n,1.2000000000000002,0),Pl(n,1.4700000000000002,0),.01,`jpGold`,8),zl(e,new N(.055,.07,.17,20),`jpAltarRed`,n,1.5550000000000002,0),zl(e,new N(.03,.058,.03,20),`jpGold`,n,1.6550000000000002,0)}Bl(e,0,1.62,.2,.35,{color:`#ff6a3d`,distance:3,always:!0}),zl(e,new N(.085,.075,.09,28),`jpBrass`,0,1.235,.2),zl(e,new le(.085,.008,8,28),`jpBrass`,0,1.2800000000000002,.2,1,new V().makeRotationX(Math.PI/2));for(let t=0;t<3;t++){let n=t/3*Math.PI*2;e.box(Math.cos(n)*.06-.008,Math.cos(n)*.06+.008,a,1.1900000000000002,.2+Math.sin(n)*.06-.008,.2+Math.sin(n)*.06+.008,`jpBrass`)}for(let t of[-.015,0,.015])e.rod(Pl(t,1.2700000000000002,.2),Pl(t*2,1.5300000000000002,.2),.0022,`jpIncense`,4),e.rod(Pl(t*2,1.5300000000000002,.2),Pl(t*2,1.54,.2),.0028,`jpAltarRed`,4);for(let t of[-.14,0,.14])zl(e,new N(.025,.018,.035,16),`ceramic`,t,1.1875000000000002,.07);for(let t of[-1,1]){let n=t*.3,r=.15;zl(e,new N(.1,.07,.02,24),`ceramic`,n,1.1800000000000002,r);for(let[t,i,a]of[[-.04,.035,-.03],[.04,.035,-.02],[0,.035,.04],[0,.095,0]])zl(e,new S(.035,16,12),`jpOrange`,n+t,1.1900000000000002+i,r+a,.9)}}function lu(e,t,n,r,i,a){e.box(t,n,a+.001,a+.012,r,i,wl),e.box(t+.08,n-.08,a+.012,a+.0125,r+.08,r+.1,yl),e.box(t+.08,n-.08,a+.012,a+.0125,i-.1,i-.08,yl)}function uu(e,t,n,r,i,a,o,s){let c=a===`lantern`?o*1.6:o*1.1;if(zl(e,new N(.06,.06,.02,16),El,t,r-.01,n),e.rod(Pl(t,r-.02,n),Pl(t,i+c,n),.003,`black`,5),a===`lantern`){zl(e,new S(o,28,16),Cl,t,i+c/2,n,.8);for(let r of[i,i+c-.01])zl(e,new N(.07,.07,.015,18),_l,t,r+.0075,n)}else zl(e,new N(o,o,c,28),Cl,t,i+c/2,n),zl(e,new N(o+.005,o+.005,.012,28),_l,t,i+c-.006,n);s>0&&Bl(e,t,i+c*.4,n,s)}function du(e,t,n,r,i,a=.26){zl(e,new N(a,a,.09,36),Cl,t,r-.045,n),zl(e,new le(a+.004,.008,8,36),_l,t,r-.09,n,1,new V().makeRotationX(Math.PI/2)),Bl(e,t,r-.3,n,i,{distance:5})}function fu(e,t,n,r,i,a=5){zl(e,new N(.075,.075,.008,24),Tl,t,r-.004,n),zl(e,new le(.08,.006,6,24),El,t,r-.004,n,1,new V().makeRotationX(Math.PI/2)),Bl(e,t,r-.25,n,i,{color:Al,distance:a})}function pu(e){e.group=`site`;for(let t of[2,U-1.5])for(let n of[Co+1,co-1])fu(e,t,n,wo,6,7)}function mu(e,t,n,r,i,a=.76){zl(e,new N(.08,.08,.05,24),_l,t,r-.025,n),e.rod(Pl(t,r-.05,n),Pl(t,r-.22,n),.012,`black`,8),zl(e,new N(.12,.13,.11,28),_l,t,r-.275,n);let o=r-.3;for(let r=0;r<5;r++){let i=r/5*Math.PI*2,s=new V().makeRotationY(i).multiply(new V().makeRotationX(.12)),c=new _t(a-.14,.012,.13).translate((a+.14)/2,0,0);e.geom(c,gl,s.setPosition(t,o,n)),c.dispose()}zl(e,new S(.16,28,12,0,Math.PI*2,Math.PI/2,Math.PI/2),Cl,t,r-.33,n,.55),Bl(e,t,r-.45,n,i)}function hu(e,t,n){if(ml.length=0,!n.groundFloor)return;let r=e.uvFn;e.uvFn=null,Rl.length=0,pu(e);let i=vs(t);i&&(Su(e,n),Cu(e,i,n)),e.setTransform(null),e.uvFn=r}function gu(e){let t=Xo.lower,n=(is-ns)/t,r=e=>Zo*(is-e)/n-.185,i=[ns,1.6,2.05,2.5,2.9,2.97];for(let t=0;t<i.length-1;t++){let n=i[t]+.003,a=i[t+1]-.003;e.prismXY([[n,0],[a,0],[a,r(a)],[n,r(n)]],4.92,5.5,gl,()=>gl);let o=Math.min(.8,r(a)-.06);o>.12&&e.box(n+.06,n+.18,o-.012,o,5.5,5.518,_l)}let a=5.75,o=5.52,s=($o+Ml-a)/Xo.middle,c=t+3+Xo.middle,l=a+(c-t-2)*s,u=e=>e<a?r(ns)+(e-o)/.23000000000000043*(2*Zo):Math.min(c*Zo-.185,(t+2+(e-a)/s)*Zo-.185),d=es-Ml-.02,f=ns-.62,p=ns-.02,m=u(a),h=.003;e.prismZY([[o,0],[d,0],[d,u(d)],[l,u(l)],[a,u(a)],[o,u(o)]],f,p-.025,_l,()=>_l),e.prismZY([[5.523,0],[5.747,0],[5.747,u(5.747)],[5.523,u(5.523)]],p-.025,p,gl,()=>gl);for(let[t,n,r]of[[5.753,6.547,6.4799999999999995],[6.553,d-h,6.62]])e.box(p-.025,p,0,m-h,t,n,gl),e.box(p,p+.018,.8,1.02,r-.006,r+.006,_l);let g=5.762,_=d-h;e.prismZY([[g,m+h],[_,m+h],[_,u(_)],[l,u(l)],[g,u(g)]],p-.025,p,gl,()=>gl),e.box(p,p+.018,m+.1,m+.112,6.75,6.95,_l)}function _u(e,t,n,r,i,a,o,s,c=.06){zl(e,new pl(t,n,r,3,c),s,i,a,o)}function vu(e){let{width:t,depth:n,chaiseDepth:r,legHeight:i}=Za,a=t/2,o=-n/2,s=o+r,c=i+.16,l=.16,u=(t-2*l)/3,d=u-.03,f=u+l,p=`modernLinen`;e.prismXZ([[-a,o],[a,o],[a,s],[a-f,s],[a-f,n/2],[-a,n/2]],i,c,p,p,p);for(let[t,r]of[[-a+.13,o+.13],[-a+.13,n/2-.13],[0,o+.13],[0,n/2-.13],[a-.13,o+.13],[a-.13,n/2-.13],[a-f+.13,s-.13],[a-.13,s-.13]])zl(e,new N(.025,.018,i,12),_l,t,i/2,r);_u(e,t,.53,.22,0,c+.265,o+.11,p),_u(e,l,.36,n-.04,-a+l/2,c+.18,0,p),_u(e,l,.36,r-.04,a-l/2,c+.18,(o+s)/2,p);for(let t of[-u,0,u]){let r=t>0,i=o+.22,a=(r?s:n/2)-.06;_u(e,d,.15,a-i,t,c+.075,(i+a)/2,p,.045),_u(e,d,.4,.2,t,c+.33,o+.29,p)}}function yu(e){let t=.8,n=.45,r=`coffeeTableOak`;_u(e,t,.035,n,0,.3625,0,r,.015),_u(e,.67,.018,.32,0,.15,0,r,.006);for(let i of[-1,1])for(let a of[-1,1]){let o=i*(t/2-.065),s=a*(n/2-.065);e.box(o-.0225,o+.0225,0,.345,s-.0225,s+.0225,r)}}function bu(e){let t=(Xa.a+Xa.b)/2,n=mo;mu(e,t,8.8,n,4);for(let r of[t-.8,t+.8])fu(e,r,10.85,n,1.5)}function xu(e){let t=mo-.12,n=Xa.y0-.12,r=Xa.a-.1,i=Xa.b+.1,a=W-.16;e.box(r,i,t,t+.025,a-.025,a+.025,`modernPlaster`);for(let o of[r,i-.38])for(let r=0;r<48;r++){let i=o+r/48*.38,s=o+(r+1)/48*.38,c=a+Math.sin(r/48*Math.PI*12)*.025,l=a+Math.sin((r+1)/48*Math.PI*12)*.025;e.prismXZ([[i,c],[s,l],[s,l+.003],[i,c+.003]],n,t,`modernLinen`,`modernLinen`,`modernLinen`)}}function Su(e,t){e.group=`gf`;let n=mo,r=es+Ml;gu(e);let i=(Do+Oo)/2-.25;Z(e,i,0,r+.275,Fl.pz,()=>cu(e)),fu(e,i,r+1.25,n,2.5);let a=(Xa.a+Xa.b)/2;Z(e,Nl-Ll-Za.width/2,0,Za.z,Fl.pz,()=>vu(e)),e.group=`coffee-table`,Z(e,a,0,9.85,Fl.pz,()=>yu(e)),e.group=`gf`,Z(e,a,0,W-.42,Fl.nz,()=>Yl(e,2.8)),bu(e),xu(e),e.box(Nl-Ll,Nl,0,n,Qo+Ml,W-.1,`modernPlaster`),e.box(Nl-Ll-.01,Nl-Ll,0,.055,Qo+Ml,W-.1,`modernPlaster`),Z(e,Nl-.02,2.47,9.9,Fl.nx,()=>tu(e)),e.group=`site`;let o=(jl+Do)/2,s=Do-jl-.15,c=W+qa/2;Z(e,o,yo,c+.01+Il/2,Fl.pz,()=>Xl(e,s)),e.group=`gf`;for(let t of[5.7,7])fu(e,4.6,t,n,2);let l=Nl-.425,u=2.85;Z(e,l,0,u,Fl.px,()=>{ql(e,1.5,.85,.72,.06);for(let t of[-.38,.38])Z(e,t,0,-.425-.12,Fl.pz,()=>Jl(e));Z(e,-.87,0,0,Fl.px,()=>Jl(e)),Z(e,.87,0,0,Fl.nx,()=>Jl(e))});let d=.55;mu(e,Nl-d-.3,u,n,2,d),du(e,l-1.4,u,n,3.5,.2),Z(e,Nl-.02-.34,0,.78,Fl.nx,()=>nu(e));let f=Qa+.1,p=.9;Z(e,5.2,p,f+.22,Fl.pz,()=>ru(e)),Z(e,Nl-.3,p,f+.3,Fl.nx,()=>iu(e)),Z(e,Nl-.3,p,-.15,Fl.nx,()=>au(e));let m=f+.58+.9;for(let[t,n]of[[f,m-.4],[m+.4,.35]])e.box(Nl-.33,Nl-.3,1.49,1.5,t+.03,n-.03,Tl);Bl(e,Nl-.4,1.3,-1,.8,{color:Al,distance:3}),fu(e,4.3,-1.3,n,3.5),fu(e,2.8,-1.4,n,2),Z(e,2.43,0,$a-Ml-.3,Fl.nz,()=>ou(e)),Z(e,no.westX,1.5,no.showerZ-.25,Fl.px,()=>su(e)),fu(e,.95,-1.35,n,2.5);let h=2.05,g=t.bathroomAccess===`ensuite`,_=g?2.2:1.75;Z(e,jl+.01+h/2,0,_,Fl.px,()=>Ul(e,g?1.52:1,h,!1)),Z(e,.525,0,Qo-Ml-.3,Fl.nz,()=>Gl(e,.95)),Z(e,3.1-Ml,2.46,2.75,Fl.nx,()=>tu(e)),du(e,1.55,2.2,n,4.5);for(let t of[-.35,-.23,-.11])gc(e,a+t,.28,W-.1,`nz`);gc(e,Nl,.95,6.15,`nx`),gc(e,Nl,1.05,1.3,`nx`),gc(e,5.25,1.25,f,`pz`),gc(e,Nl,1.25,f+.45,`nx`),gc(e,Nl,1.25,-.15,`nx`),hc(e,Nl,2.35,m,`nx`,.086),hc(e,Nl,.65,m+.45,`nx`,.086),hc(e,no.westX,1.55,no.showerZ-.45,`px`,.086),gc(e,2.75,1.05,$a-Ml,`nz`),gc(e,jl,.75,_,`px`),e.group=`site`,gc(e,o,1,c,`pz`),e.group=`gf`}function Cu(e,t,n){let{masterExtension:r,masterZone:i}=n;e.group=`ff`;let a=G,o=ho,s=Qo-Ml,c=2.05;Z(e,jl+.01+c/2,a,2,Fl.px,()=>Ul(e,1.52,c)),Z(e,1.55,a,.36,Fl.pz,()=>eu(e,1.2)),Z(e,1.55,a,.88,Fl.nz,()=>Jl(e)),Z(e,.7,a,s-.3,Fl.nz,()=>Gl(e,1.3)),Z(e,3.04-Ml,a+2.5,1.6,Fl.nx,()=>tu(e)),du(e,1.5,2.2,o,4.5),Z(e,Nl-.01-c/2,a,2,Fl.nx,()=>Ul(e,1.52,c)),Z(e,4.575,a,.36,Fl.pz,()=>eu(e,1.2)),Z(e,4.575,a,.88,Fl.nz,()=>Jl(e)),Z(e,5.4,a,s-.3,Fl.nz,()=>Gl(e,1.28)),Z(e,3.04+Ml,a+2.5,1.6,Fl.px,()=>tu(e)),du(e,4.57,2.2,o,4.5),lu(e,4,5.95,5,7,a),Z(e,Nl-.02-.4,a,6,Fl.nx,()=>Kl(e,1.9,.8)),Z(e,4.6,a,6,Fl.px,()=>ql(e,1,.6,.34,.045,!0)),t.id===`japanese`?uu(e,4.6,6,o,o-.75,`lantern`,.26,4.5):du(e,4.6,6,o,4.5),fu(e,2.3,7,o,1.5);let l=2.1;Z(e,jl+.01+l/2,a,r?10.3:10.2,Fl.px,()=>Ul(e,1.83,l)),Z(e,1.25,a,es+Ml+.3,Fl.pz,()=>Gl(e,2.4)),Z(e,cs-Ml,a+2.5,8.8,Fl.nx,()=>tu(e)),du(e,2,10.2,o,5.5,.3),r&&(i===`open`?Tu(e,t):(i===`study`?wu(e):(Z(e,jl+.3,a,13.4,Fl.px,()=>Gl(e,2.1)),Z(e,1.55,a,io.z+Ml+.3,Fl.pz,()=>Gl(e,1.7))),du(e,1.6,13.55,o,3)));let u=G+2.1+1.5;Z(e,4.9,a+1.5,ls-Ml-.008,Fl.nz,()=>su(e)),fu(e,5,8.6,u,4),Z(e,Nl-.008,a+1.5,11,Fl.nx,()=>su(e)),fu(e,5,10.85,Ko,3);for(let t of[.95,2,3.05,9.1,10.3,11.5])gc(e,jl,a+.75,t,`px`);r&&gc(e,jl,a+.75,13,`px`);for(let t of[.95,2,3.05])gc(e,Nl,a+.75,t,`nx`);for(let t of[1.3,1.4,4.75,4.85])gc(e,t,a+.85,.1,`pz`);hc(e,5.1,a+1.65,ls-Ml,`nz`,.086),hc(e,Nl,a+1.65,11.25,`nx`,.086)}function wu(e){Z(e,1.2,G,uo-.4,Fl.nz,()=>eu(e,1.2)),Z(e,1.2,G,uo-1.05,Fl.pz,()=>Jl(e))}function Tu(e,t){let n=G,r=ho;if(t.masterNook===`tatami`){let t=uo-.1,i=12.7,a=2.05;Z(e,(jl+a)/2,n,(i+t)/2,0,()=>{let n=a-jl,r=t-i;Ql(e,n,r),Z(e,0,.2,.05,0,()=>ql(e,.8,.6,.33,.04)),Z(e,-.72,.2,.05,Fl.px,()=>$l(e)),Z(e,.72,.2,.05,Fl.nx,()=>$l(e)),Z(e,-n/2+.25,.2,-r/2+.25,0,()=>Zl(e,.5,.6))}),uu(e,1.9,13.55,r,r-.6,`drum`,.2,2.5)}else t.masterNook===`reading`?(Z(e,.55,n,13.45,Fl.px,()=>Kl(e,.9,.8)),Z(e,1.4,n,13.45,0,()=>ql(e,.5,.5,.45))):wu(e),du(e,1.3,13.55,r,2.5)}function Eu(e,t=gs,n=`none`){let r=e=>e;e.setTransform(null);let i=t.groundFloor?n:`none`;e.remap=bs(i),nl(e,{main:!0,G:r,renovation:t}),tl(e,0,`west`,r,1,t),tl(e,U,`east`,r,-1,t),Du(e,t),hu(e,i,t),e.remap={}}function Du(e,t){e.group=`context`;let n=(Math.max(U,oo-Qa)+2*so.margin)/2,r=U/2,i=(oo+Qa)/2,a=r-n,o=r+n,s=i-n,c=i+n,l=Qa-so.rearDrainOffset,u=oo+so.frontDrainOffset,d=[{z0:l-so.drainWidth,z1:l,towardsHouse:1},{z0:u,z1:u+so.drainWidth,towardsHouse:-1}],f=[[s,-1.2],[c,-1.2],[c,-.46]];for(let e=d.length-1;e>=0;e--){let{z0:t,z1:n}=d[e];f.push([n,-.46],[n,-1],[t,-1],[t,-.46])}f.push([s,-.46]),e.prismZY(f,a,o,`ground`,`ground`);for(let{z0:t,z1:n,towardsHouse:r}of d)Ou(e,a,o,t,n,r);let[p,m]=d,h=m.z1+so.frontPavementWidth;e.box(a,o,-.4,-.25,m.z1,h,`concreteLight`),e.box(a,o,-.5,-.35,h,c,`asphalt`),e.box(a,o,-.5,-.3,s,p.z0,`asphalt`),e.box(t.autoGate?.22:.85,t.autoGate?U-.22:4.48,-.32,-.17,m.z0+.08,m.z1-.08,`concreteLight`);let g=t.groundFloor?eo:{a:4.02,b:4.88};e.box(g.a-.08,g.b+.08,-.32,-.1,p.z0+.08,Qa+.1,`concreteLight`)}function Ou(e,t,n,r,i,a){let o=so.drainWall;e.box(t,n,-1,-.92,r,i,`drainDark`),e.box(t,n,-.92,a<0?-.2:-.25,r,r+o,`concreteLight`),e.box(t,n,-.92,a>0?-.2:-.25,i-o,i,`concreteLight`)}var ku=class extends j{constructor(e){super(e),this.type=ce}parse(e){let t=function(e,t){switch(e){case 1:throw Error(`THREE.HDRLoader: Read Error: `+(t||``));case 2:throw Error(`THREE.HDRLoader: Write Error: `+(t||``));case 3:throw Error(`THREE.HDRLoader: Bad File Format: `+(t||``));default:case 4:throw Error(`THREE.HDRLoader: Memory Error: `+(t||``))}},n=function(e,t,n){t||=1024;let r=e.pos,i=-1,a=0,o=``,s=String.fromCharCode.apply(null,new Uint16Array(e.subarray(r,r+128)));for(;0>(i=s.indexOf(`
`))&&a<t&&r<e.byteLength;)o+=s,a+=s.length,r+=128,s=String.fromCharCode.apply(null,new Uint16Array(e.subarray(r,r+128)));return-1<i&&(!1!==n&&(e.pos+=a+i+1),o+s.slice(0,i))},r=function(e){let r=/^#\?(\S+)/,i=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,a=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,o=/^\s*FORMAT=(\S+)\s*$/,s=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,c={valid:0,string:``,comments:``,programtype:`RGBE`,format:``,gamma:1,exposure:1,width:0,height:0},l,u;for((e.pos>=e.byteLength||!(l=n(e)))&&t(1,`no header found`),(u=l.match(r))||t(3,`bad initial token`),c.valid|=1,c.programtype=u[1],c.string+=l+`
`;l=n(e),!1!==l;){if(c.string+=l+`
`,l.charAt(0)===`#`){c.comments+=l+`
`;continue}if((u=l.match(i))&&(c.gamma=parseFloat(u[1])),(u=l.match(a))&&(c.exposure=parseFloat(u[1])),(u=l.match(o))&&(c.valid|=2,c.format=u[1]),(u=l.match(s))&&(c.valid|=4,c.height=parseInt(u[1],10),c.width=parseInt(u[2],10)),c.valid&2&&c.valid&4)break}return c.valid&2||t(3,`missing format specifier`),c.valid&4||t(3,`missing image size specifier`),c},i=function(e,n,r){let i=n;if(i<8||i>32767||e[0]!==2||e[1]!==2||e[2]&128)return new Uint8Array(e);i!==(e[2]<<8|e[3])&&t(3,`wrong scanline width`);let a=new Uint8Array(4*n*r);a.length||t(4,`unable to allocate buffer space`);let o=0,s=0,c=4*i,l=new Uint8Array(4),u=new Uint8Array(c),d=r;for(;d>0&&s<e.byteLength;){s+4>e.byteLength&&t(1),l[0]=e[s++],l[1]=e[s++],l[2]=e[s++],l[3]=e[s++],(l[0]!=2||l[1]!=2||(l[2]<<8|l[3])!=i)&&t(3,`bad rgbe scanline format`);let n=0,r;for(;n<c&&s<e.byteLength;){r=e[s++];let i=r>128;if(i&&(r-=128),(r===0||n+r>c)&&t(3,`bad scanline data`),i){let t=e[s++];for(let e=0;e<r;e++)u[n++]=t}else u.set(e.subarray(s,s+r),n),n+=r,s+=r}let f=i;for(let e=0;e<f;e++){let t=0;a[o]=u[e+t],t+=i,a[o+1]=u[e+t],t+=i,a[o+2]=u[e+t],t+=i,a[o+3]=u[e+t],o+=4}d--}return a},a=function(e,t,n,r){let i=2**(e[t+3]-128)/255;n[r+0]=e[t+0]*i,n[r+1]=e[t+1]*i,n[r+2]=e[t+2]*i,n[r+3]=1},o=function(e,t,n,r){let i=2**(e[t+3]-128)/255;n[r+0]=ue.toHalfFloat(Math.min(e[t+0]*i,65504)),n[r+1]=ue.toHalfFloat(Math.min(e[t+1]*i,65504)),n[r+2]=ue.toHalfFloat(Math.min(e[t+2]*i,65504)),n[r+3]=ue.toHalfFloat(1)},s=new Uint8Array(e);s.pos=0;let c=r(s),l=c.width,u=c.height,d=i(s.subarray(s.pos),l,u),f,p,m;switch(this.type){case dt:m=d.length/4;let e=new Float32Array(m*4);for(let t=0;t<m;t++)a(d,t*4,e,t*4);f=e,p=dt;break;case ce:m=d.length/4;let t=new Uint16Array(m*4);for(let e=0;e<m;e++)o(d,e*4,t,e*4);f=t,p=ce;break;default:throw Error(`THREE.HDRLoader: Unsupported type: `+this.type)}return{width:l,height:u,data:f,header:c.string,gamma:c.gamma,exposure:c.exposure,type:p,colorSpace:ut,minFilter:nt,magFilter:nt,generateMipmaps:!1,flipY:!0}}setDataType(e){return this.type=e,this}};function Au(e){let t=new M,n=(e,t,n)=>new R({color:new d().setRGB(e,t,n,ut),side:1}),r=n(.8,.78,.74),i=[r,r,n(.9,.89,.87),n(.5,.46,.41),r,r],a=new Ot(new _t(8,3.4,12),i);a.position.y=.2,t.add(a);let o=(e,n,r,i,a,o,s)=>{let c=new Ot(new se(e,n),new R({color:new d().setRGB(4.2*s,4.5*s,5*s,ut),side:2}));c.position.set(r,i,a),c.rotation.y=o,t.add(c)};o(3.2,2.2,.8,-.1,5.95,Math.PI,1),o(1.4,1.3,-1.8,.2,-5.95,0,.8),o(1.2,1.5,3.95,.1,-1,-Math.PI/2,.5);let s=new nn(e),c=s.fromScene(t,.03);return s.dispose(),t.traverse(e=>{let t=e;t.isMesh&&t.geometry.dispose()}),c.texture}var ju=class{scene;sun=new C(16777215,4);target=new i;texture=null;envTexture=null;sunLocal=new z(0,1,0);sunIrradiance=4;sunColor0=new d(1,1,1);sunDir=new z(0,1,0);fogColor0=new d;hdriElevation=60;sunScale=1;azimuthDeg=215;elevationDeg=60;rotation=0;skyBase=1;skyLevel=1;onSkyLevel;center=new z(3.05,2,7);constructor(e){this.scene=e,this.sun.castShadow=!0;let t=this.sun.shadow;t.mapSize.set(4096,4096);let n=t.camera;n.left=-19,n.right=19,n.top=19,n.bottom=-19,n.near=1,n.far=140,t.bias=-2e-5,t.normalBias=.002,t.radius=2.5,this.target.position.copy(this.center),e.add(this.sun,this.target),this.sun.target=this.target}async load(e){let t=new ku;t.setDataType(dt);let n=await t.loadAsync(e),{data:r,width:i,height:a}=n.image,o=0,s=0;for(let e=0;e<i*a;e++){let t=.2126*r[e*4]+.7152*r[e*4+1]+.0722*r[e*4+2];t>o&&(o=t,s=e)}let c=s%i,l=Math.floor(s/i),u=(c+.5)/i,d=1-(l+.5)/a,f=(u-.5)*Math.PI*2,p=(d-.5)*Math.PI;this.sunLocal.set(Math.cos(p)*Math.cos(f),Math.sin(p),Math.cos(p)*Math.sin(f)).normalize();let m=[0,0,0],h=Math.cos(12*Math.PI/180),g=new z;for(let e=0;e<a;e++){let t=Math.PI/2-(e+.5)/a*Math.PI,n=2*Math.PI/i*(Math.PI/a)*Math.cos(t);for(let t=0;t<i;t++){let o=(e*i+t)*4,s=.2126*r[o]+.7152*r[o+1]+.0722*r[o+2];if(s<=18)continue;let c=(t+.5)/i,l=1-(e+.5)/a,u=(c-.5)*Math.PI*2,d=(l-.5)*Math.PI;if(g.set(Math.cos(d)*Math.cos(u),Math.sin(d),Math.cos(d)*Math.sin(u)),g.dot(this.sunLocal)<h)continue;let f=18/s;for(let e=0;e<3;e++)m[e]+=r[o+e]*(1-f)*n,r[o+e]*=f}}let _=.2126*m[0]+.7152*m[1]+.0722*m[2],v=Math.max(...m,1e-6);this.sun.color.setRGB(m[0]/v,m[1]/v,m[2]/v,ut);let y=.2126*this.sun.color.r+.7152*this.sun.color.g+.0722*this.sun.color.b;this.sunIrradiance=_>.1?_/y:4,this.sunColor0.copy(this.sun.color),this.hdriElevation=p/We.DEG2RAD,this.elevationDeg=this.hdriElevation,this.scene.fog&&this.fogColor0.copy(this.scene.fog.color),n.mapping=303,n.needsUpdate=!0,this.texture=n,this.scene.background=n;let b=[0,0,0];for(let e=0;e<a;e++){let t=Math.cos(Math.PI/2-(e+.5)/a*Math.PI);for(let n=0;n<i;n++){let a=(e*i+n)*4;for(let e=0;e<3;e++)b[e]+=r[a+e]*t}}let x=.2126*b[0]+.7152*b[1]+.0722*b[2],S=b.map(e=>(x/Math.max(e,1e-6))**.95),C=.2126*S[0]+.7152*S[1]+.0722*S[2],T=new Float32Array(r.length);for(let e=0;e<r.length;e+=4){for(let t=0;t<3;t++)T[e+t]=r[e+t]*S[t]/C;T[e+3]=1}let E=new w(T,i,a,ye,dt);E.mapping=303,E.colorSpace=n.colorSpace,E.flipY=n.flipY,E.magFilter=E.minFilter=nt,E.generateMipmaps=!1,E.needsUpdate=!0,this.envTexture=E,this.scene.environment=E,this.setAzimuth(this.azimuthDeg)}setAzimuth(e){this.setSun(e,this.elevationDeg)}setSun(e,t){this.azimuthDeg=e,this.elevationDeg=t;let n=e*We.DEG2RAD,r=t*We.DEG2RAD;this.sunDir.set(Math.cos(r)*Math.sin(n),Math.sin(r),-Math.cos(r)*Math.cos(n)).normalize();let i=Math.atan2(-Math.cos(n),Math.sin(n)),a=Math.atan2(this.sunLocal.z,this.sunLocal.x);this.rotation=a-i,this.scene.environmentRotation.set(0,this.rotation,0),this.scene.backgroundRotation.set(0,this.rotation,0),this.updateSun()}sunDirection(e=new z){return e.copy(this.sunDir)}setSkyBase(e){this.skyBase=e,this.applySky()}updateSun(){let e=this.elevationDeg,t=this.sunDirection().clone();t.y<.02&&t.setY(.02).normalize(),this.sun.position.copy(this.center).addScaledVector(t,70),this.target.position.copy(this.center);let n=e=>{let t=Math.max(e,0);return .7**(1/(Math.sin(t*We.DEG2RAD)+.50572*(t+6.07995)**-1.6364))**.678},r=We.smoothstep(e,-.8,1.5),i=n(e)/n(this.hdriElevation)*r;this.sun.intensity=this.sunIrradiance*this.sunScale*i,this.sun.visible=i>1e-4;let a=1-We.smoothstep(e,2,25);this.sun.color.copy(this.sunColor0).multiply(new d(1,1-.28*a,1-.55*a)),this.skyLevel=.015+.985*We.smoothstep(e,-7,10),this.applySky(),this.sun.updateMatrixWorld(),this.target.updateMatrixWorld()}applySky(){this.scene.environmentIntensity=this.skyBase*this.skyLevel,this.scene.backgroundIntensity=this.skyLevel;let e=this.scene.fog;e&&e.color.copy(this.fogColor0).multiplyScalar(this.skyLevel),this.onSkyLevel?.(this.skyLevel)}},Mu={name:`Kuala Lumpur`,lat:3.139,lon:101.687},Nu=Math.PI/180;function Pu(e,t=Mu.lat,n=Mu.lon){let r=e.getTime()/864e5+2440587.5-2451545,i=(280.46+.9856474*r)%360,a=(357.528+.9856003*r)%360*Nu,o=(i+1.915*Math.sin(a)+.02*Math.sin(2*a))*Nu,s=(23.439-4e-7*r)*Nu,c=Math.atan2(Math.cos(s)*Math.sin(o),Math.cos(o)),l=Math.asin(Math.sin(s)*Math.sin(o)),u=((280.46061837+360.98564736629*r)%360+n)*Nu-c,d=t*Nu,f=Math.sin(d)*Math.sin(l)+Math.cos(d)*Math.cos(l)*Math.cos(u),p=Math.asin(Math.max(-1,Math.min(1,f)))/Nu,m=Math.atan2(-Math.sin(u),Math.tan(l)*Math.cos(d)-Math.sin(d)*Math.cos(u))/Nu;return p>-1&&(p+=1.02/Math.tan((p+10.3/(p+5.11))*Nu)/60),{azimuth:(m+360)%360,elevation:p}}function Fu(e){let t=new Date(e.getTime()+288e5);return{y:t.getUTCFullYear(),m:t.getUTCMonth()+1,d:t.getUTCDate(),min:t.getUTCHours()*60+t.getUTCMinutes(),dow:t.getUTCDay()}}function Iu(e,t){let[n,r,i]=e.split(`-`).map(Number);return new Date(Date.UTC(n,r-1,i,0,0)-288e5+t*6e4)}function Lu(e){let t=Fu(e);return`${t.y}-${String(t.m).padStart(2,`0`)}-${String(t.d).padStart(2,`0`)}`}function Ru(e){let t=Math.floor(e/60)%24,n=Math.floor(e%60);return`${(t+11)%12+1}:${String(n).padStart(2,`0`)} ${t<12?`AM`:`PM`}`}var zu=[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],Bu=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];function Vu(e){let t=Fu(e);return`${zu[t.dow]}, ${t.d} ${Bu[t.m-1]} ${t.y}`}function Hu(e){return[`N`,`NNE`,`NE`,`ENE`,`E`,`ESE`,`SE`,`SSE`,`S`,`SSW`,`SW`,`WSW`,`W`,`WNW`,`NW`,`NNW`][Math.round(e/22.5)%16]}function Uu(e){let t=NaN,n=NaN,r=0,i=-99,a=Pu(Iu(e,0)).elevation;for(let o=1;o<=1440;o++){let s=Pu(Iu(e,o)).elevation;a<-.27&&s>=-.27&&(t=o-1+(-.27-a)/(s-a)),a>=-.27&&s<-.27&&(n=o-1+(a+.27)/(a-s)),s>i&&(i=s,r=o),a=s}return{rise:t,set:n,noon:r,maxEl:i}}var Wu={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Gu=class extends Da{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof de?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=gt.clone(e.uniforms),this.material=new de({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Aa(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Ku=class extends Da{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},qu=class extends Da{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Ju=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new B);this._width=n.width,this._height=n.height,t=new Ke(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ce}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Gu(Wu),this.copyPass.material.blending=0,this.timer=new ke}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Ku!==void 0&&(r instanceof Ku?n=!0:r instanceof qu&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new B);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Yu=class extends Da{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new d}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Xu={name:`GTAOShader`,defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:`x`,SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new B},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new V},cameraProjectionMatrixInverse:{value:new V},cameraWorldMatrix:{value:new V},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new z(-1,-1,-1)},sceneBoxMax:{value:new z(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);

			#ifdef USE_REVERSED_DEPTH_BUFFER
				if (depth <= 0.0) {
					discard;
					return;
				}
			#else
				if (depth >= 1.0) {
					discard;
					return;
				}
			#endif
			
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Zu={name:`GTAODepthShader`,defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Qu={name:`GTAOBlendShader`,uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function $u(e=5){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=ed(t),r=n.length,i=new Uint8Array(r*4);for(let e=0;e<r;++e){let t=n[e],a=2*Math.PI*t/r,o=new z(Math.cos(a),Math.sin(a),0).normalize();i[e*4]=(o.x*.5+.5)*255,i[e*4+1]=(o.y*.5+.5)*255,i[e*4+2]=127,i[e*4+3]=255}let a=new w(i,t,t);return a.wrapS=F,a.wrapT=F,a.needsUpdate=!0,a}function ed(e){let t=Math.floor(e)%2==0?Math.floor(e)+1:Math.floor(e),n=t*t,r=Array(n).fill(0),i=Math.floor(t/2),a=t-1;for(let e=1;e<=n;){if(i===-1&&a===t?(a=t-2,i=0):(a===t&&(a=0),i<0&&(i=t-1)),r[i*t+a]!==0){a-=2,i++;continue}r[i*t+a]=e++,a++,i--}return r}var td={name:`PoissonDenoiseShader`,defines:{SAMPLES:16,SAMPLE_VECTORS:nd(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new B},cameraProjectionMatrixInverse:{value:new V},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				vec4 clipSpacePosition = vec4( vec2( screenPosition ) * 2.0 - 1.0, depth, 1.0 );
			#else
				vec4 clipSpacePosition = vec4( vec3( screenPosition, depth ) * 2.0 - 1.0, 1.0 );
			#endif
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function nd(e,t,n){let r=rd(e,t,n),i=`vec3[SAMPLES](`;for(let t=0;t<e;t++){let n=r[t];i+=`vec3(${n.x}, ${n.y}, ${n.z})${t<e-1?`,`:`)`}`}return i}function rd(e,t,n){let r=[];for(let i=0;i<e;i++){let a=2*Math.PI*t*i/e,o=(i/(e-1))**n;r.push(new z(Math.cos(a),Math.sin(a),o))}return r}var id=class{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let n,r,i,a=.5*(Math.sqrt(3)-1),o=(e+t)*a,s=Math.floor(e+o),c=Math.floor(t+o),l=(3-Math.sqrt(3))/6,u=(s+c)*l,d=s-u,f=c-u,p=e-d,m=t-f,h,g;p>m?(h=1,g=0):(h=0,g=1);let _=p-h+l,v=m-g+l,y=p-1+2*l,b=m-1+2*l,x=s&255,S=c&255,C=this.perm[x+this.perm[S]]%12,w=this.perm[x+h+this.perm[S+g]]%12,T=this.perm[x+1+this.perm[S+1]]%12,E=.5-p*p-m*m;E<0?n=0:(E*=E,n=E*E*this._dot(this.grad3[C],p,m));let D=.5-_*_-v*v;D<0?r=0:(D*=D,r=D*D*this._dot(this.grad3[w],_,v));let O=.5-y*y-b*b;return O<0?i=0:(O*=O,i=O*O*this._dot(this.grad3[T],y,b)),70*(n+r+i)}noise3d(e,t,n){let r,i,a,o,s=(e+t+n)*(1/3),c=Math.floor(e+s),l=Math.floor(t+s),u=Math.floor(n+s),d=1/6,f=(c+l+u)*d,p=c-f,m=l-f,h=u-f,g=e-p,_=t-m,v=n-h,y,b,x,S,C,w;g>=_?_>=v?(y=1,b=0,x=0,S=1,C=1,w=0):g>=v?(y=1,b=0,x=0,S=1,C=0,w=1):(y=0,b=0,x=1,S=1,C=0,w=1):_<v?(y=0,b=0,x=1,S=0,C=1,w=1):g<v?(y=0,b=1,x=0,S=0,C=1,w=1):(y=0,b=1,x=0,S=1,C=1,w=0);let T=g-y+d,E=_-b+d,D=v-x+d,O=g-S+2*d,k=_-C+2*d,A=v-w+2*d,j=g-1+3*d,M=_-1+3*d,ee=v-1+3*d,te=c&255,ne=l&255,N=u&255,re=this.perm[te+this.perm[ne+this.perm[N]]]%12,P=this.perm[te+y+this.perm[ne+b+this.perm[N+x]]]%12,F=this.perm[te+S+this.perm[ne+C+this.perm[N+w]]]%12,ie=this.perm[te+1+this.perm[ne+1+this.perm[N+1]]]%12,ae=.6-g*g-_*_-v*v;ae<0?r=0:(ae*=ae,r=ae*ae*this._dot3(this.grad3[re],g,_,v));let oe=.6-T*T-E*E-D*D;oe<0?i=0:(oe*=oe,i=oe*oe*this._dot3(this.grad3[P],T,E,D));let se=.6-O*O-k*k-A*A;se<0?a=0:(se*=se,a=se*se*this._dot3(this.grad3[F],O,k,A));let ce=.6-j*j-M*M-ee*ee;return ce<0?o=0:(ce*=ce,o=ce*ce*this._dot3(this.grad3[ie],j,M,ee)),32*(r+i+a+o)}noise4d(e,t,n,r){let i=this.grad4,a=this.simplex,o=this.perm,s=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,l,u,d,f,p,m=(e+t+n+r)*s,h=Math.floor(e+m),g=Math.floor(t+m),_=Math.floor(n+m),v=Math.floor(r+m),y=(h+g+_+v)*c,b=h-y,x=g-y,S=_-y,C=v-y,w=e-b,T=t-x,E=n-S,D=r-C,O=w>T?32:0,k=w>E?16:0,A=T>E?8:0,j=w>D?4:0,M=T>D?2:0,ee=+(E>D),te=O+k+A+j+M+ee,ne=+(a[te][0]>=3),N=+(a[te][1]>=3),re=+(a[te][2]>=3),P=+(a[te][3]>=3),F=+(a[te][0]>=2),ie=+(a[te][1]>=2),ae=+(a[te][2]>=2),oe=+(a[te][3]>=2),se=+(a[te][0]>=1),ce=+(a[te][1]>=1),le=+(a[te][2]>=1),ue=+(a[te][3]>=1),de=w-ne+c,fe=T-N+c,pe=E-re+c,me=D-P+c,he=w-F+2*c,ge=T-ie+2*c,_e=E-ae+2*c,ve=D-oe+2*c,ye=w-se+3*c,be=T-ce+3*c,xe=E-le+3*c,Se=D-ue+3*c,Ce=w-1+4*c,we=T-1+4*c,Te=E-1+4*c,Ee=D-1+4*c,De=h&255,Oe=g&255,ke=_&255,Ae=v&255,I=o[De+o[Oe+o[ke+o[Ae]]]]%32,je=o[De+ne+o[Oe+N+o[ke+re+o[Ae+P]]]]%32,Me=o[De+F+o[Oe+ie+o[ke+ae+o[Ae+oe]]]]%32,Ne=o[De+se+o[Oe+ce+o[ke+le+o[Ae+ue]]]]%32,L=o[De+1+o[Oe+1+o[ke+1+o[Ae+1]]]]%32,Pe=.6-w*w-T*T-E*E-D*D;Pe<0?l=0:(Pe*=Pe,l=Pe*Pe*this._dot4(i[I],w,T,E,D));let R=.6-de*de-fe*fe-pe*pe-me*me;R<0?u=0:(R*=R,u=R*R*this._dot4(i[je],de,fe,pe,me));let Fe=.6-he*he-ge*ge-_e*_e-ve*ve;Fe<0?d=0:(Fe*=Fe,d=Fe*Fe*this._dot4(i[Me],he,ge,_e,ve));let Ie=.6-ye*ye-be*be-xe*xe-Se*Se;Ie<0?f=0:(Ie*=Ie,f=Ie*Ie*this._dot4(i[Ne],ye,be,xe,Se));let z=.6-Ce*Ce-we*we-Te*Te-Ee*Ee;return z<0?p=0:(z*=z,p=z*z*this._dot4(i[L],Ce,we,Te,Ee)),27*(l+u+d+f+p)}_dot(e,t,n){return e[0]*t+e[1]*n}_dot3(e,t,n,r){return e[0]*t+e[1]*n+e[2]*r}_dot4(e,t,n,r,i){return e[0]*t+e[1]*n+e[2]*r+e[3]*i}},ad=class e extends Da{constructor(e,t,n=512,r=512,i,a,o){super(),this.width=n,this.height=r,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=[],this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=$u(),this.pdNoiseTexture=this._generateNoise(),this.gtaoRenderTarget=new Ke(this.width,this.height,{type:ce,depthBuffer:!1}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new de({defines:Object.assign({},Xu.defines),uniforms:gt.clone(Xu.uniforms),vertexShader:Xu.vertexShader,fragmentShader:Xu.fragmentShader,blending:0,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=+!!this.camera.isPerspectiveCamera,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new u,this.normalMaterial.blending=0,this.pdMaterial=new de({defines:Object.assign({},td.defines),uniforms:gt.clone(td.uniforms),vertexShader:td.vertexShader,fragmentShader:td.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new de({defines:Object.assign({},Zu.defines),uniforms:gt.clone(Zu.uniforms),vertexShader:Zu.vertexShader,fragmentShader:Zu.fragmentShader,blending:0}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new de({uniforms:gt.clone(Wu.uniforms),vertexShader:Wu.vertexShader,fragmentShader:Wu.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this.blendMaterial=new de({uniforms:gt.clone(Qu.uniforms),vertexShader:Qu.vertexShader,fragmentShader:Qu.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:5,blendSrc:208,blendDst:200,blendEquation:100,blendSrcAlpha:206,blendDstAlpha:200,blendEquationAlpha:100}),this._fsQuad=new Aa(null),this._originalClearColor=new d,this.setGBuffer(i?i.depthTexture:void 0,i?i.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e===void 0?(this.depthTexture=new be,this.depthTexture.format=a,this.depthTexture.type=Je,this.normalRenderTarget=new Ke(this.width,this.height,{minFilter:m,magFilter:m,type:ce,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0):(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1);let n=+!!this.normalTexture,r=this.depthTexture===this.normalTexture?`w`:`x`;this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=r,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=r,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&+!!e.screenSpaceRadius!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=+!!e.screenSpaceRadius,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=nd(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,n,r){switch(this._renderGBuffer&&(this._overrideVisibility(),this._renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this._renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this._renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case e.OUTPUT.Off:break;case e.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this._renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n);break;case e.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=r.texture,this.copyMaterial.blending=0,this._renderPass(t,this.copyMaterial,this.renderToScreen?null:n),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this._renderPass(t,this.blendMaterial,this.renderToScreen?null:n);break;default:console.warn(`THREE.GTAOPass: Unknown output type.`)}}_renderPass(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,n,r,i){e.getClearColor(this._originalClearColor);let a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(n),e.autoClear=!1,r=t.clearColor||r,i=t.clearAlpha||i,r!=null&&(e.setClearColor(r),e.setClearAlpha(i||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_overrideVisibility(){let e=this.scene,t=this._visibilityCache;e.traverse(function(e){(e.isPoints||e.isLine||e.isLine2)&&e.visible&&(e.visible=!1,t.push(e))})}_restoreVisibility(){let e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}_generateNoise(e=64){let t=new id,n=e*e*4,r=new Uint8Array(n);for(let n=0;n<e;n++)for(let i=0;i<e;i++){let a=n,o=i;r[(n*e+i)*4]=(t.noise(a,o)*.5+.5)*255,r[(n*e+i)*4+1]=(t.noise(a+e,o)*.5+.5)*255,r[(n*e+i)*4+2]=(t.noise(a,o+e)*.5+.5)*255,r[(n*e+i)*4+3]=(t.noise(a+e,o+e)*.5+.5)*255}let i=new w(r,e,e,ye,ot);return i.wrapS=F,i.wrapT=F,i.needsUpdate=!0,i}};ad.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var od={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},sd=class extends Da{constructor(){super(),this.isOutputPass=!0,this.uniforms=gt.clone(od.uniforms),this.material=new fe({name:od.name,uniforms:this.uniforms,vertexShader:od.vertexShader,fragmentShader:od.fragmentShader}),this._fsQuad=new Aa(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},P.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},cd={name:`SMAAEdgesShader`,defines:{SMAA_THRESHOLD:`0.1`},uniforms:{tDiffuse:{value:null},resolution:{value:new B(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},ld={name:`SMAAWeightsShader`,defines:{SMAA_MAX_SEARCH_STEPS:`8`,SMAA_AREATEX_MAX_DISTANCE:`16`,SMAA_AREATEX_PIXEL_SIZE:`( 1.0 / vec2( 160.0, 560.0 ) )`,SMAA_AREATEX_SUBTEX_SIZE:`( 1.0 / 7.0 )`},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new B(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},ud={name:`SMAABlendShader`,uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new B(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`},dd=class extends Da{constructor(){super(),this._edgesRT=new Ke(1,1,{depthBuffer:!1,type:ce}),this._edgesRT.texture.name=`SMAAPass.edges`,this._weightsRT=new Ke(1,1,{depthBuffer:!1,type:ce}),this._weightsRT.texture.name=`SMAAPass.weights`;let e=this,t=new Image;t.src=this._getAreaTexture(),t.onload=function(){e._areaTexture.needsUpdate=!0},this._areaTexture=new De,this._areaTexture.name=`SMAAPass.area`,this._areaTexture.image=t,this._areaTexture.minFilter=nt,this._areaTexture.generateMipmaps=!1,this._areaTexture.flipY=!1;let n=new Image;n.src=this._getSearchTexture(),n.onload=function(){e._searchTexture.needsUpdate=!0},this._searchTexture=new De,this._searchTexture.name=`SMAAPass.search`,this._searchTexture.image=n,this._searchTexture.magFilter=m,this._searchTexture.minFilter=m,this._searchTexture.generateMipmaps=!1,this._searchTexture.flipY=!1,this._uniformsEdges=gt.clone(cd.uniforms),this._materialEdges=new de({defines:Object.assign({},cd.defines),uniforms:this._uniformsEdges,vertexShader:cd.vertexShader,fragmentShader:cd.fragmentShader}),this._uniformsWeights=gt.clone(ld.uniforms),this._uniformsWeights.tDiffuse.value=this._edgesRT.texture,this._uniformsWeights.tArea.value=this._areaTexture,this._uniformsWeights.tSearch.value=this._searchTexture,this._materialWeights=new de({defines:Object.assign({},ld.defines),uniforms:this._uniformsWeights,vertexShader:ld.vertexShader,fragmentShader:ld.fragmentShader}),this._uniformsBlend=gt.clone(ud.uniforms),this._uniformsBlend.tDiffuse.value=this._weightsRT.texture,this._materialBlend=new de({uniforms:this._uniformsBlend,vertexShader:ud.vertexShader,fragmentShader:ud.fragmentShader}),this._fsQuad=new Aa(null)}render(e,t,n){this._uniformsEdges.tDiffuse.value=n.texture,this._fsQuad.material=this._materialEdges,e.setRenderTarget(this._edgesRT),this.clear&&e.clear(),this._fsQuad.render(e),this._fsQuad.material=this._materialWeights,e.setRenderTarget(this._weightsRT),this.clear&&e.clear(),this._fsQuad.render(e),this._uniformsBlend.tColor.value=n.texture,this._fsQuad.material=this._materialBlend,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._fsQuad.render(e))}setSize(e,t){this._edgesRT.setSize(e,t),this._weightsRT.setSize(e,t),this._materialEdges.uniforms.resolution.value.set(1/e,1/t),this._materialWeights.uniforms.resolution.value.set(1/e,1/t),this._materialBlend.uniforms.resolution.value.set(1/e,1/t)}dispose(){this._edgesRT.dispose(),this._weightsRT.dispose(),this._areaTexture.dispose(),this._searchTexture.dispose(),this._materialEdges.dispose(),this._materialWeights.dispose(),this._materialBlend.dispose(),this._fsQuad.dispose()}_getAreaTexture(){return`data:image/png;base64,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`}_getSearchTexture(){return`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII=`}},fd=class{renderer;composer;gtao;renderPass;output;aoEnabled=!0;constructor(e,t,n){this.renderer=e;let r=e.getSize(new B),i=new Ke(r.x,r.y,{type:ce});this.composer=new Ju(e,i),this.renderPass=new Yu(t,n),this.composer.addPass(this.renderPass),this.gtao=new ad(t,n,r.x,r.y),this.gtao.output=ad.OUTPUT.Default,this.gtao.blendIntensity=.8,this.gtao.updateGtaoMaterial({radius:.4,distanceExponent:1.8,thickness:.8,scale:1,samples:32,distanceFallOff:1}),this.gtao.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:4,rings:3,samples:24});let a=this.gtao;a._overrideVisibility=function(){let e=this._visibilityCache;t.traverse(t=>{if(!t.visible)return;let n=t,r=n.material;(t.isLine||t.isPoints||t.userData.noAO||n.isMesh&&r&&(r.transparent||(r.transmission??0)>0))&&(t.visible=!1,e.push(t))})},this.composer.addPass(this.gtao),this.output=new sd,this.composer.addPass(this.output),this.composer.addPass(new dd)}setCamera(e){this.renderPass.camera=e,this.gtao.camera=e}setAO(e){this.aoEnabled=e,this.gtao.enabled=e}setSize(e,t){this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.composer.setSize(e,t);let n=this.renderer.getPixelRatio()/2;this.gtao.setSize(Math.max(1,Math.ceil(e*n)),Math.max(1,Math.ceil(t*n)))}render(e){this.composer.render(e)}};function pd(e){return{pixelRatio:Math.min(e,1.5),elapsed:0,frames:0,cooldown:2}}function md(e,t,n){if(e.cooldown>0)return{...e,cooldown:Math.max(0,e.cooldown-t)};let r=e.elapsed+t,i=e.frames+1;if(r<2)return{...e,elapsed:r,frames:i};let a=r/i,o=a>1/45?Math.max(.5,e.pixelRatio-.25):a<1/58?Math.min(Math.min(n,1.5),e.pixelRatio+.25):e.pixelRatio;return{pixelRatio:o,elapsed:0,frames:0,cooldown:o===e.pixelRatio?0:3}}var hd=new z(0,1,0),gd=class{camera;dom;colliders;enabled=!1;locked=!1;feet=new z;yaw=0;pitch=0;eye=1.6;radius=.24;vy=0;keys=new Set;moveInput=new B;ray=new bt;onLockChange;constructor(e,t,n){this.camera=e,this.dom=t,this.colliders=n,this.ray.firstHitOnly=!0,document.addEventListener(`pointerlockchange`,()=>{this.locked=document.pointerLockElement===this.dom,this.onLockChange?.(this.locked)}),document.addEventListener(`mousemove`,e=>{this.enabled&&this.locked&&this.look(e.movementX,e.movementY)}),window.addEventListener(`keydown`,e=>{if(!this.enabled)return;let t=e.target?.tagName;t!==`INPUT`&&t!==`SELECT`&&this.keys.add(e.code)}),window.addEventListener(`keyup`,e=>this.keys.delete(e.code)),window.addEventListener(`blur`,()=>{this.keys.clear(),this.setMoveInput(0,0)})}look(e,t){this.enabled&&(this.yaw-=e*.0021,this.pitch=Math.max(-1.45,Math.min(1.45,this.pitch-t*.0021)))}setMoveInput(e,t){this.moveInput.set(t,e).clampLength(0,1)}lock(){this.locked||this.dom.requestPointerLock()}unlock(){this.locked&&document.exitPointerLock()}place(e,t){let n=this.groundAt(e.x,e.y-.9,e.z);this.feet.set(e.x,n??e.y-this.eye,e.z);let r=t.clone().sub(e);this.yaw=Math.atan2(-r.x,-r.z),this.pitch=Math.atan2(r.y,Math.hypot(r.x,r.z))*.6,this.vy=0,this.apply()}enable(e=!0){if(this.enabled=!0,e){let e=new z;this.camera.getWorldDirection(e),this.place(this.camera.position.clone(),this.camera.position.clone().add(e))}}disable(){this.enabled=!1,this.keys.clear(),this.setMoveInput(0,0),this.unlock()}groundAt(e,t,n){this.ray.set(new z(e,t,n),new z(0,-1,0)),this.ray.far=8;let r=this.ray.intersectObjects(this.colliders(),!1)[0];return r?r.point.y:null}blocked(e,t){let n=this.colliders();for(let r of[.42,1,1.55])if(this.ray.set(this.feet.clone().addScaledVector(hd,r),e),this.ray.far=t+this.radius,this.ray.intersectObjects(n,!1).length)return!0;return!1}update(e){if(!this.enabled)return;e=Math.min(e,.05);let t=this.keys,n=this.moveInput.y+(t.has(`KeyW`)||t.has(`ArrowUp`)?1:0)-(t.has(`KeyS`)||t.has(`ArrowDown`)?1:0),r=this.moveInput.x+(t.has(`KeyD`)||t.has(`ArrowRight`)?1:0)-(t.has(`KeyA`)||t.has(`ArrowLeft`)?1:0),i=t.has(`ShiftLeft`)||t.has(`ShiftRight`)?3.4:1.45;if(n||r){let t=new z(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),a=new z(Math.cos(this.yaw),0,-Math.sin(this.yaw)),o=t.multiplyScalar(n).addScaledVector(a,r).clampLength(0,1).multiplyScalar(i*e);for(let e of[`x`,`z`]){let t=o[e];if(Math.abs(t)<1e-6)continue;let n=new z(e===`x`?Math.sign(t):0,0,e===`z`?Math.sign(t):0);this.blocked(n,Math.abs(t))||(this.feet[e]+=t)}}let a=this.groundAt(this.feet.x,this.feet.y+.5,this.feet.z),o=e*4.5+.02;if(a!==null&&a-this.feet.y>=-.45&&this.vy>-1){let e=a-this.feet.y;this.feet.y+=Math.max(-o,Math.min(o,e)),Math.abs(a-this.feet.y)<.004&&(this.feet.y=a),this.vy=0}else this.vy-=9.81*e,this.feet.y+=this.vy*e,a!==null&&this.feet.y<a&&(this.feet.y=a,this.vy=0),this.feet.y<-5&&(this.feet.y=0);this.apply()}apply(){this.camera.position.set(this.feet.x,this.feet.y+this.eye,this.feet.z),this.camera.quaternion.setFromEuler(new ve(this.pitch,this.yaw,0,`YXZ`)),this.camera.updateMatrixWorld()}},_d=`(max-width: 760px), (max-width: 960px) and (max-height: 500px), (pointer: coarse)`,vd=class{walk;canvas;root;enabled=!1;movePointer=null;lookPointer=null;joystick;knob;action;target;constructor(e,t,n,r){this.walk=e,this.canvas=t,this.root=n,this.joystick=n.querySelector(`#walk-joystick`),this.knob=n.querySelector(`.joystick-knob`),this.action=n.querySelector(`#walk-interact`),this.target=n.querySelector(`#walk-target`),this.action.onclick=r.interact,this.joystick.addEventListener(`pointerdown`,e=>{this.enabled&&e.button===0&&this.movePointer===null&&(this.movePointer=e.pointerId,this.joystick.setPointerCapture(e.pointerId),this.move(e),e.preventDefault())}),this.joystick.addEventListener(`pointermove`,e=>{e.pointerId===this.movePointer&&this.move(e)});let i=e=>{e.pointerId===this.movePointer&&(this.movePointer=null,this.walk.setMoveInput(0,0),this.knob.style.transform=``,this.release(this.joystick,e.pointerId))};for(let e of[`pointerup`,`pointercancel`,`lostpointercapture`])this.joystick.addEventListener(e,i);t.addEventListener(`pointerdown`,e=>{this.enabled&&e.button===0&&(this.consume(e),!this.lookPointer&&(this.lookPointer={id:e.pointerId,x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,dragged:!1},t.setPointerCapture(e.pointerId)))},{capture:!0}),t.addEventListener(`pointermove`,e=>{if(!this.enabled)return;this.consume(e);let t=this.lookPointer;e.pointerId===t?.id&&(Math.hypot(e.clientX-t.startX,e.clientY-t.startY)>6&&(t.dragged=!0),t.dragged&&(this.walk.look(e.clientX-t.x,e.clientY-t.y),t.x=e.clientX,t.y=e.clientY))},{capture:!0}),t.addEventListener(`pointerup`,e=>{if(!this.enabled)return;this.consume(e);let n=this.lookPointer;if(e.pointerId!==n?.id)return;let i=!n.dragged&&Math.hypot(e.clientX-n.startX,e.clientY-n.startY)<=6;this.lookPointer=null,this.release(t,e.pointerId),i&&r.tap(e)},{capture:!0});let a=e=>{e.pointerId===this.lookPointer?.id&&(this.lookPointer=null,this.release(t,e.pointerId))};for(let e of[`pointercancel`,`lostpointercapture`])t.addEventListener(e,a,{capture:!0});window.addEventListener(`blur`,()=>this.reset()),window.addEventListener(`resize`,()=>this.reset()),document.addEventListener(`visibilitychange`,()=>{document.hidden&&this.reset()})}setEnabled(e){this.enabled!==e&&(this.enabled=e,this.root.hidden=!e,this.reset(),e&&this.walk.unlock())}setAction(e,t,n){this.action.textContent!==e&&(this.action.textContent=e),this.action.disabled=!n,this.target.textContent!==t&&(this.target.textContent=t)}move(e){let t=this.joystick.getBoundingClientRect(),n=(t.width-this.knob.offsetWidth)/2;if(n<=0)return;let r=e.clientX-t.left-t.width/2,i=e.clientY-t.top-t.height/2,a=Math.hypot(r,i);a<n*.1?r=i=0:a>n&&(r*=n/a,i*=n/a),this.knob.style.transform=`translate(${r}px, ${i}px)`,this.walk.setMoveInput(-i/n,r/n)}reset(){let e=this.movePointer,t=this.lookPointer;this.movePointer=null,this.lookPointer=null,this.walk.setMoveInput(0,0),this.knob.style.transform=``,e!==null&&this.release(this.joystick,e),t&&this.release(this.canvas,t.id)}release(e,t){e.hasPointerCapture(t)&&e.releasePointerCapture(t)}consume(e){e.preventDefault(),e.stopImmediatePropagation()}},yd=class{camera;targets;object=null;limits=new He;offset=new z;ray=new bt;plane=new re;point=new z;anchor=new z;start=new z;pointerId=null;constructor(e,t){this.camera=e,this.targets=t}get active(){return this.pointerId!==null}setObject(e,t){if(this.end(),this.object=e,!e)return;let n=new Ae().setFromObject(e);n.translate(e.position.clone().negate()),this.limits.set(new B(t.min.x-n.min.x,t.min.y-n.min.z),new B(t.max.x-n.max.x,t.max.y-n.max.z)),this.place(this.offset.x,this.offset.z)}hit(e){if(!this.object)return null;this.ray.setFromCamera(e,this.camera);let t=this.ray.intersectObjects(this.targets(),!1)[0];for(let e=t?.object??null;e;e=e.parent)if(e===this.object)return t;return null}begin(e,t){if(this.active)return!1;let n=this.hit(e);return n?(this.plane.setFromNormalAndCoplanarPoint(new z(0,1,0),n.point),this.anchor.copy(n.point),this.start.copy(this.offset),this.pointerId=t,!0):!1}move(e){return!this.active||(this.ray.setFromCamera(e,this.camera),!this.ray.ray.intersectPlane(this.plane,this.point))?!1:this.place(this.start.x+this.point.x-this.anchor.x,this.start.z+this.point.z-this.anchor.z)}end(){let e=this.active;return this.pointerId=null,e}place(e,t){if(!this.object)return!1;e=We.clamp(e,this.limits.min.x,this.limits.max.x),t=We.clamp(t,this.limits.min.y,this.limits.max.y);let n=e!==this.offset.x||t!==this.offset.z;return this.offset.set(e,0,t),this.object.position.copy(this.offset),this.object.updateMatrixWorld(!0),n}},bd=new Ae,xd=new z,Sd=class extends e{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type=`LineSegmentsGeometry`,this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute(`position`,new k([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute(`uv`,new k([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new ze(t,6,1);return this.setAttribute(`instanceStart`,new st(n,3,0)),this.setAttribute(`instanceEnd`,new st(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new ze(t,6,1);return this.setAttribute(`instanceColorStart`,new st(n,3,0)),this.setAttribute(`instanceColorEnd`,new st(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new I(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ae);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),bd.setFromBufferAttribute(t),this.boundingBox.union(bd))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ce),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,a=e.count;i<a;i++)xd.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(xd)),xd.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(xd));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error(`THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.`,this)}}toJSON(){}};H.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new B},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}},Ft.line={uniforms:gt.merge([H.common,H.fog,H.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var Cd=class extends de{constructor(e){super({type:`LineMaterial`,uniforms:gt.clone(Ft.line.uniforms),vertexShader:Ft.line.vertexShader,fragmentShader:Ft.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return`WORLD_UNITS`in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS=``:delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return`USE_DASH`in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH=``:delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return`USE_ALPHA_TO_COVERAGE`in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE=``:delete this.defines.USE_ALPHA_TO_COVERAGE)}},wd=new Be,Td=new z,Ed=new z,Dd=new Be,Od=new Be,kd=new Be,Ad=new z,jd=new V,Md=new lt,Nd=new z,Pd=new Ae,Fd=new Ce,Id=new Be,Ld,Rd;function zd(e,t,n){return Id.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),Id.multiplyScalar(1/Id.w),Id.x=Rd/n.width,Id.y=Rd/n.height,Id.applyMatrix4(e.projectionMatrixInverse),Id.multiplyScalar(1/Id.w),Math.abs(Math.max(Id.x,Id.y))}function Bd(e,t){let n=e.matrixWorld,r=e.geometry,i=r.attributes.instanceStart,a=r.attributes.instanceEnd,o=Math.min(r.instanceCount,i.count);for(let r=0,s=o;r<s;r++){Md.start.fromBufferAttribute(i,r),Md.end.fromBufferAttribute(a,r),Md.applyMatrix4(n);let o=new z,s=new z;Ld.distanceSqToSegment(Md.start,Md.end,s,o),s.distanceTo(o)<Rd*.5&&t.push({point:s,pointOnLine:o,distance:Ld.origin.distanceTo(s),object:e,face:null,faceIndex:r,uv:null,uv1:null})}}function Vd(e,t,n){let r=t.projectionMatrix,i=e.material.resolution,a=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,c=o.attributes.instanceEnd,l=Math.min(o.instanceCount,s.count),u=-t.near;Ld.at(1,kd),kd.w=1,kd.applyMatrix4(t.matrixWorldInverse),kd.applyMatrix4(r),kd.multiplyScalar(1/kd.w),kd.x*=i.x/2,kd.y*=i.y/2,kd.z=0,Ad.copy(kd),jd.multiplyMatrices(t.matrixWorldInverse,a);for(let t=0,o=l;t<o;t++){if(Dd.fromBufferAttribute(s,t),Od.fromBufferAttribute(c,t),Dd.w=1,Od.w=1,Dd.applyMatrix4(jd),Od.applyMatrix4(jd),Dd.z>u&&Od.z>u)continue;if(Dd.z>u){let e=Dd.z-Od.z,t=(Dd.z-u)/e;Dd.lerp(Od,t)}else if(Od.z>u){let e=Od.z-Dd.z,t=(Od.z-u)/e;Od.lerp(Dd,t)}Dd.applyMatrix4(r),Od.applyMatrix4(r),Dd.multiplyScalar(1/Dd.w),Od.multiplyScalar(1/Od.w),Dd.x*=i.x/2,Dd.y*=i.y/2,Od.x*=i.x/2,Od.y*=i.y/2,Md.start.copy(Dd),Md.start.z=0,Md.end.copy(Od),Md.end.z=0;let o=Md.closestPointToPointParameter(Ad,!0);Md.at(o,Nd);let l=We.lerp(Dd.z,Od.z,o),d=l>=-1&&l<=1,f=Ad.distanceTo(Nd)<Rd*.5;if(d&&f){Md.start.fromBufferAttribute(s,t),Md.end.fromBufferAttribute(c,t),Md.start.applyMatrix4(a),Md.end.applyMatrix4(a);let r=new z,i=new z;Ld.distanceSqToSegment(Md.start,Md.end,i,r),n.push({point:i,pointOnLine:r,distance:Ld.origin.distanceTo(i),object:e,face:null,faceIndex:t,uv:null,uv1:null})}}}var Hd=class extends Ot{constructor(e=new Sd,t=new Cd({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type=`LineSegments2`}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,a=t.count;e<a;e++,i+=2)Td.fromBufferAttribute(t,e),Ed.fromBufferAttribute(n,e),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+Td.distanceTo(Ed);let i=new ze(r,2,1);return e.setAttribute(`instanceDistanceStart`,new st(i,1,0)),e.setAttribute(`instanceDistanceEnd`,new st(i,1,1)),this}raycast(e,t){let n=this.material.worldUnits,r=e.camera;if(r===null&&!n&&console.error(`LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.`),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let i=e.params.Line2===void 0?0:e.params.Line2.threshold||0;Ld=e.ray;let a=this.matrixWorld,o=this.geometry,s=this.material;Rd=s.linewidth+i,o.boundingSphere===null&&o.computeBoundingSphere(),Fd.copy(o.boundingSphere).applyMatrix4(a);let c;if(c=n?Rd*.5:zd(r,Math.max(r.near,Fd.distanceToPoint(Ld.origin)),s.resolution),Fd.radius+=c,Ld.intersectsSphere(Fd)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Pd.copy(o.boundingBox).applyMatrix4(a);let l;l=n?Rd*.5:zd(r,Math.max(r.near,Pd.distanceToPoint(Ld.origin)),s.resolution),Pd.expandByScalar(l),Ld.intersectsBox(Pd)!==!1&&(n?Bd(this,t):Vd(this,r,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(wd),this.material.uniforms.resolution.value.set(wd.z,wd.w))}},Ud=class extends Sd{constructor(){super(),this.isLineGeometry=!0,this.type=`LineGeometry`}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setPositions(n),this}setColors(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setColors(n),this}setFromPoints(e){let t=e.length-1,n=new Float32Array(6*t);for(let r=0;r<t;r++)n[6*r]=e[r].x,n[6*r+1]=e[r].y,n[6*r+2]=e[r].z||0,n[6*r+3]=e[r+1].x,n[6*r+4]=e[r+1].y,n[6*r+5]=e[r+1].z||0;return super.setPositions(n),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}},Wd=class extends Hd{constructor(e=new Ud,t=new Cd({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type=`Line2`}};function Gd(e,t){let n=e<1?`${(e*100).toFixed(1)} cm`:`${e.toFixed(3)} m`,r=e/.0254,i=Math.floor(r/12),a=Math.round((r-i*12)*8)/8;a>=12&&(i+=1,a-=12);let o=Math.floor(a),s=Math.round((a-o)*8),c=`${i}′ ${o}${[``,`⅛`,`¼`,`⅜`,`½`,`⅝`,`¾`,`⅞`][s]??``}″`;return t===`metric`?n:t===`imperial`?c:`${n}  ·  ${c}`}var Kd=class{camera;targets;active=!1;units=`both`;group=new Oe;ray=new bt;list=[];start=null;cursor;preview;previewLabel;lineMat;prevMat;endMat=new R({color:16757504,depthTest:!1,toneMapped:!1});cursorMats={surface:new R({color:16777215,depthTest:!1,toneMapped:!1}),edge:new R({color:4708351,depthTest:!1,toneMapped:!1}),vertex:new R({color:16739584,depthTest:!1,toneMapped:!1})};shift=!1;onChange;constructor(e,t){this.camera=e,this.targets=t,this.ray.firstHitOnly=!0,this.group.name=`measure`,this.group.userData.noAO=!0,this.lineMat=new Cd({color:16757504,linewidth:3,depthTest:!1,transparent:!0,toneMapped:!1}),this.prevMat=new Cd({color:16777215,linewidth:2,depthTest:!1,transparent:!0,dashed:!0,dashSize:.1,gapSize:.06,toneMapped:!1});let n=new S(1,16,12);this.cursor=new Ot(n,this.cursorMats.surface),this.cursor.renderOrder=1e3,this.cursor.visible=!1,this.group.add(this.cursor);let r=new Ud;r.setPositions([0,0,0,0,0,0]),this.preview=new Wd(r,this.prevMat),this.preview.renderOrder=999,this.preview.visible=!1,this.group.add(this.preview),this.previewLabel=this.makeLabel(``,!0),this.previewLabel.visible=!1,this.group.add(this.previewLabel),window.addEventListener(`keydown`,e=>{e.key===`Shift`&&(this.shift=!0),e.key===`Escape`&&this.cancel()}),window.addEventListener(`keyup`,e=>{e.key===`Shift`&&(this.shift=!1)})}setResolution(e,t){this.lineMat.resolution.set(e,t),this.prevMat.resolution.set(e,t)}setActive(e){this.active=e,e||this.cancel(),this.cursor.visible=!1}cancel(){this.start=null,this.preview.visible=!1,this.previewLabel.visible=!1}clear(){for(let e of this.list)this.group.remove(e.line,e.label,...e.ends),e.line.geometry.dispose(),e.label.element.remove();this.list=[],this.cancel(),this.onChange?.()}undo(){let e=this.list.pop();e&&(this.group.remove(e.line,e.label,...e.ends),e.label.element.remove(),this.onChange?.())}count(){return this.list.length}refreshUnits(){for(let e of this.list)e.label.element.querySelector(`.v`).textContent=Gd(e.a.distanceTo(e.b),this.units)}makeLabel(e,t=!1){let n=document.createElement(`div`);n.className=`measure-label`+(t?` preview`:``),n.innerHTML=`<span class="v">${e}</span>`;let r=new ba(n);return r.center.set(.5,1.3),r}pick(e){this.ray.setFromCamera(e,this.camera);let t=this.ray.intersectObjects(this.targets(),!1)[0];if(!t||!t.face)return null;let n=t.object,r=n.geometry.getAttribute(`position`),i=[t.face.a,t.face.b,t.face.c].map(e=>new z().fromBufferAttribute(r,e).applyMatrix4(n.matrixWorld)),a=t.distance,o=We.clamp(a*.018,.02,.3),s=null,c=1/0;for(let e of i){let n=e.distanceTo(t.point);n<c&&(c=n,s=e)}if(s&&c<o)return{p:s.clone(),kind:`vertex`};let l=new lt,u=null,d=1/0;for(let e=0;e<3;e++){let n=i[e],r=i[(e+1)%3],a=r.clone().sub(n).normalize();if(Math.max(Math.abs(a.x),Math.abs(a.y),Math.abs(a.z))<.985)continue;l.set(n,r);let o=l.closestPointToPoint(t.point,!0,new z),s=o.distanceTo(t.point);s<d&&(d=s,u=o)}return u&&d<o*.6?{p:u,kind:`edge`}:{p:t.point.clone(),kind:`surface`}}constrain(e){if(!this.start||!this.shift)return e;let t=e.clone().sub(this.start),n=Math.abs(t.x),r=Math.abs(t.y),i=Math.abs(t.z);return n>=r&&n>=i?new z(e.x,this.start.y,this.start.z):r>=i?new z(this.start.x,e.y,this.start.z):new z(this.start.x,this.start.y,e.z)}hover(e){if(!this.active)return;let t=this.pick(e);if(!t){this.cursor.visible=!1;return}let n=this.constrain(t.p);this.cursor.visible=!0,this.cursor.position.copy(n),this.cursor.material=this.cursorMats[this.start&&this.shift?`surface`:t.kind];let r=We.clamp(this.camera.position.distanceTo(n)*.006,.008,.12);this.cursor.scale.setScalar(r),this.start&&(this.preview.geometry.setPositions([this.start.x,this.start.y,this.start.z,n.x,n.y,n.z]),this.preview.computeLineDistances(),this.preview.visible=!0,this.previewLabel.position.copy(this.start).lerp(n,.5),this.previewLabel.element.querySelector(`.v`).textContent=Gd(this.start.distanceTo(n),this.units),this.previewLabel.visible=!0)}click(e){if(!this.active)return;let t=this.pick(e);if(!t)return;let n=this.constrain(t.p);if(!this.start){this.start=n;return}this.addMeasurement(this.start,n),this.cancel()}addMeasurement(e,t){let n=new Ud;n.setPositions([e.x,e.y,e.z,t.x,t.y,t.z]);let r=new Wd(n,this.lineMat);r.renderOrder=998;let i=[e,t].map(e=>{let t=new Ot(this.cursor.geometry,this.endMat);return t.position.copy(e),t.renderOrder=1e3,t.userData.dynamicScale=!0,t}),a=this.makeLabel(Gd(e.distanceTo(t),this.units));a.position.copy(e).lerp(t,.5);let o=t.clone().sub(e);a.element.title=`Δx ${Math.abs(o.x).toFixed(3)} m · Δy ${Math.abs(o.y).toFixed(3)} m · Δz ${Math.abs(o.z).toFixed(3)} m`,this.group.add(r,a,...i),this.list.push({a:e.clone(),b:t.clone(),line:r,ends:i,label:a}),this.onChange?.()}update(){for(let e of this.list)for(let t of e.ends)t.scale.setScalar(We.clamp(this.camera.position.distanceTo(t.position)*.005,.006,.1))}},qd=`#1d2a36`;function Jd(e){let t=Ya/2,n=ps.map(n=>{let r={...n};return e.groundFloor&&(r.id===`bed4`&&(r.z0=$a+.06),r.id===`bath3`&&Object.assign(r,{x0:.05,x1:1.84,z0:-2.56,z1:$a-.06,y:0}),r.id===`yard`&&Object.assign(r,{name:`Laundry & entry`,malay:`Dobi`,level:`gf`,x0:1.96,x1:3.1+t,z1:$a-t,y:0}),r.id===`kitchen`&&Object.assign(r,{name:e.kitchen===`enclosed`?`Enclosed kitchen`:`Open kitchen`,z0:Qa+.1,z1:ro.z-t,labelOffset:[0,0]}),r.id===`dining`&&Object.assign(r,{z0:ro.z+t,z1:Qo-t,labelOffset:[0,0]}),e.bathroomAccess===`ensuite`&&(r.id===`bed4`&&Object.assign(r,{name:`Guest bedroom`,malay:`Bilik Tetamu`}),r.id===`bath3`&&Object.assign(r,{name:`Guest ensuite`,malay:`Bilik Mandi Tetamu`}))),e.masterExtension&&(r.id===`master`&&(r.z1=e.masterZone===`open`?uo-.1:io.z-t),r.id===`balcony`&&Object.assign(r,{x0:3.88,z0:12.29,labelOffset:[0,0]})),r});return e.groundFloor&&n.push({id:`passage`,name:`Family passage`,malay:`Laluan`,level:`gf`,x0:ts,x1:U-.05,z0:Qo+t,z1:es-t,y:0}),e.masterExtension&&e.masterZone!==`open`&&n.push({id:e.masterZone,name:e.masterZone===`study`?`Study`:`Dressing room`,malay:e.masterZone===`study`?`Bilik Belajar`:`Bilik Persalinan`,level:`ff`,x0:.05,x1:cs-t,z0:io.z+t,z1:uo-.1,y:G}),n}function Yd(e,t){let n=e.x1-e.x0,r=e.z1-e.z0,i=n*r,a=document.createElement(`canvas`);a.width=640,a.height=300;let o=a.getContext(`2d`);o.fillStyle=`rgba(255,255,255,0.86)`,o.beginPath(),o.roundRect(6,6,a.width-12,a.height-12,26),o.fill(),o.strokeStyle=`rgba(29,42,54,0.35)`,o.lineWidth=3,o.stroke(),o.textAlign=`center`,o.fillStyle=qd,o.font=`700 58px "Segoe UI", Roboto, Arial, sans-serif`,o.fillText(e.name.toUpperCase(),a.width/2,78),o.font=`italic 500 32px "Segoe UI", Roboto, Arial, sans-serif`,o.fillStyle=`#5b6b78`,o.fillText(e.malay,a.width/2,122),o.fillStyle=qd,o.font=`600 50px "Segoe UI", Roboto, Arial, sans-serif`;let s=t===`imperial`?`${Gd(n,`imperial`)} × ${Gd(r,`imperial`)}`:`${n.toFixed(2)} m × ${r.toFixed(2)} m`;return o.fillText(s,a.width/2,192),o.font=`500 38px "Segoe UI", Roboto, Arial, sans-serif`,o.fillStyle=`#34495e`,o.fillText(`${i.toFixed(1)} m²  ·  ${(i*10.7639).toFixed(0)} sq ft`,a.width/2,250),Ls(a)}function Xd(e){let t=document.createElement(`canvas`);t.width=512,t.height=96;let n=t.getContext(`2d`);n.font=`700 54px "Segoe UI", Roboto, Arial, sans-serif`;let r=n.measureText(e).width+36;return n.fillStyle=`rgba(255,255,255,0.9)`,n.beginPath(),n.roundRect((t.width-r)/2,10,r,76,18),n.fill(),n.fillStyle=qd,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(e,t.width/2,50),Ls(t)}var Zd=class{groups={gf:new Oe,ff:new Oe,site:new Oe};root=new Oe;inkMat=new R({color:qd,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});units=`metric`;renovation=gs;arrowGeo=(()=>{let e=new At([new B(0,0),new B(-.15,.05),new B(-.15,-.05)]),t=new o(e);return t.rotateX(-Math.PI/2),t})();constructor(){this.root.name=`annotations`,this.root.userData.noAO=!0;for(let e of Object.values(this.groups))this.root.add(e);this.rebuild()}rebuild(){for(let e of Object.values(this.groups))for(let t of[...e.children]){e.remove(t);let n=t;n.geometry&&n.geometry!==this.arrowGeo&&n.geometry.dispose();let r=n.material;r&&r!==this.inkMat&&(r.map?.dispose(),r.dispose())}for(let e of Jd(this.renovation))this.addRoom(e)}flat(e,t,n,r,i,a,o=0){let s=new R({map:e,transparent:!0,depthWrite:!1,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}),c=new Ot(new se(t,n),s);return c.rotation.set(-Math.PI/2,0,o,`XYZ`),c.position.set(r,i,a),c.renderOrder=10,c}dimLine(e,t,n){let r=t.distanceTo(n),i=n.clone().sub(t).normalize(),a=t.clone().lerp(n,.5),o=Math.abs(i.x)>.5,s=.012,c=new Ot(new _t(o?r:s,.002,o?s:r),this.inkMat);c.position.copy(a),e.add(c);for(let r of[t,n]){let n=new Ot(new _t(o?s:.22,.002,o?.22:s),this.inkMat);n.position.copy(r),e.add(n);let a=r===t?i.clone().negate():i.clone(),c=new Ot(this.arrowGeo,this.inkMat);c.position.copy(r),c.rotation.y=Math.atan2(-a.z,a.x),e.add(c)}let l=Xd(Gd(r,this.units===`both`?`metric`:this.units)),u=this.flat(l,1.1,.206,a.x,a.y+.001,a.z,o?0:Math.PI/2);e.add(u)}addRoom(e){let t=this.groups[e.level],n=e.x1-e.x0,r=e.z1-e.z0,i=e.y+.012,a=(e.x0+e.x1)/2+(e.labelOffset?.[0]??0),o=(e.z0+e.z1)/2+(e.labelOffset?.[1]??0),s=Math.min(2.1,n*.8),c=Yd(e,this.units);t.add(this.flat(c,s,300/640*s,a,i,o));let l=Math.min(.32,r*.12);this.dimLine(t,new z(e.x0+.02,i,e.z0+l),new z(e.x1-.02,i,e.z0+l));let u=Math.min(.32,n*.12);this.dimLine(t,new z(e.x0+u,i,e.z0+.02),new z(e.x0+u,i,e.z1-.02))}},Qd=`modulepreload`,$d=function(e,t){return new URL(e,t).href},ef={},tf=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=$d(t,n),t=s(t),t in ef)return;ef[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Qd,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},nf=class{renderer;scene;camera;active=!1;ready=!1;building=!1;pt=null;worker=null;initialization=null;onStatus;constructor(e,t,n){this.renderer=e,this.scene=t,this.camera=n}get target(){return this.pt&&this.ready?this.pt.target:null}get samples(){return this.pt?Math.floor(this.pt.samples):0}async enable(){this.active=!0,this.initialization??=this.initialize(),await this.initialization,this.building||await this.rebuild()}async initialize(){if(!this.pt){this.onStatus?.(`Loading Photoreal renderer…`);let[{DenoiseMaterial:e,WebGLPathTracer:t},{ParallelMeshBVHWorker:n}]=await Promise.all([tf(()=>import(`./src-BgDMISwm.js`),__vite__mapDeps([0,1]),import.meta.url),tf(()=>import(`./workers-B_eBEtFL.js`),__vite__mapDeps([2,1]),import.meta.url)]),r=new e({sigma:2,kSigma:1.5,threshold:.1});this.pt=new t(this.renderer),this.pt.bounces=10,this.pt.transmissiveBounces=12,this.pt.filterGlossyFactor=.25,this.pt.minSamples=8,this.pt.renderDelay=120,this.pt.fadeDuration=300,this.pt.dynamicLowRes=!1,this.pt.tiles.set(2,2),this.pt.textureSize.set(1024,1024),this.pt.renderToCanvasCallback=(e,t,n)=>{let i=n.material,a=t.autoClear;r.map=e.texture,r.opacity=i.opacity,r.blending=i.blending,r.sigma=this.samples<64?2:1.2,r.threshold=.12/Math.sqrt(Math.max(1,this.samples/16))/Math.max(.25,t.toneMappingExposure),n.material=r,t.autoClear=!1;try{n.render(t)}finally{n.material=i,t.autoClear=a}};try{this.worker=new n,this.pt.setBVHWorker(this.worker)}catch{this.worker=null}}}async rebuild(){if(this.pt&&this.active){this.ready=!1,this.building=!0,this.onStatus?.(`Building ray-tracing acceleration structure…`);try{this.worker?await this.pt.setSceneAsync(this.scene,this.camera,{onProgress:e=>this.onStatus?.(`Preparing scene ${(e*100).toFixed(0)}%`)}):this.pt.setScene(this.scene,this.camera),this.ready=!0,this.onStatus?.(``)}catch(e){console.error(e),this.onStatus?.(`Path tracing is not supported on this GPU/browser.`),this.active=!1}this.building=!1}}disable(){this.active=!1,this.ready=!1}cameraMoved(){this.pt&&this.ready&&this.pt.updateCamera()}environmentChanged(){this.pt&&this.ready&&(this.pt.updateEnvironment(),this.pt.updateLights())}materialsChanged(){this.pt&&this.ready&&this.pt.updateMaterials()}render(){this.pt&&this.ready&&this.active&&this.pt.renderSample()}},rf=[{id:`street`,label:`Street view (front)`,group:`Exterior`,pos:[3.4,1.65,33],target:[3.05,3.6,10]},{id:`front-34`,label:`Front 3/4 view`,group:`Exterior`,pos:[-4.8,2.3,27.5],target:[3.3,4,13]},{id:`front-aerial`,label:`Front aerial`,group:`Exterior`,pos:[-11,15,34],target:[3.05,3.2,8]},{id:`rear-aerial`,label:`Rear aerial (back lane)`,group:`Exterior`,pos:[14,13,-17],target:[3.05,3.5,4]},{id:`porch`,label:`Car porch`,group:`Exterior`,pos:[5.2,1.6,17.6],target:[1.8,1.4,11.8]},{id:`gate`,label:`At the gate`,group:`Exterior`,pos:[3.05,1.6,19.6],target:[3.05,2.2,12]},{id:`balcony`,label:`Balcony`,group:`First floor`,pos:[1.6,5.2,12.4],target:[3.8,4.3,16.4]},{id:`balcony-back`,label:`Balcony → master façade`,group:`First floor`,pos:[2.2,5.1,16],target:[3.3,5.2,11.7]},{id:`yard`,label:`Rear yard`,group:`Exterior`,pos:[5.6,1.55,-2.35],target:[1.5,1.8,.2]},{id:`living`,label:`Living room`,group:`Ground floor`,pos:[3.5,1.6,7.1],target:[4.45,1.15,11.5]},{id:`entrance`,label:`Front door → 神台 (altar)`,group:`Ground floor`,pos:[1.65,1.6,11.3],target:[1.65,1.35,7.7]},{id:`living-front`,label:`Living → front doors`,group:`Ground floor`,pos:[3.9,1.6,7],target:[3.4,1.3,11.7]},{id:`dining`,label:`Dining & kitchen`,group:`Ground floor`,pos:[4.9,1.6,9],target:[4.5,1.2,1]},{id:`stair`,label:`Staircase`,group:`Ground floor`,pos:[4.6,1.6,6.3],target:[2.1,1.7,5]},{id:`kitchen`,label:`Kitchen`,group:`Ground floor`,pos:[4.7,1.6,4.1],target:[4.8,1.1,.1]},{id:`bath3`,label:`Bathroom 3`,group:`Ground floor`,pos:[4.4,1.6,1.2],target:[2.4,1,.6]},{id:`bed4`,label:`Bedroom 4`,group:`Ground floor`,pos:[2.8,1.6,4.1],target:[.6,1.2,.8]},{id:`family`,label:`Family hall`,group:`First floor`,pos:[5.6,5.2,7.2],target:[2,4.6,4.9]},{id:`master`,label:`Master bedroom`,group:`First floor`,pos:[.6,5.2,8.1],target:[2.9,4.6,11.7]},{id:`master-in`,label:`Master bedroom → doors`,group:`First floor`,pos:[1.1,5.2,11.2],target:[4,4.6,8.6]},{id:`bath1`,label:`Bathroom 1 (ensuite)`,group:`First floor`,pos:[3.5,5.2,10.7],target:[5.8,4.4,10.8]},{id:`bed2`,label:`Bedroom 2`,group:`First floor`,pos:[4.4,5.2,4.1],target:[4.6,4.6,.2]},{id:`bed3`,label:`Bedroom 3`,group:`First floor`,pos:[1.6,5.2,4.1],target:[1.5,4.6,.2]},{id:`stair-up`,label:`Top of the stairs`,group:`First floor`,pos:[4.2,5.2,7],target:[1.3,3.8,6.9]},{id:`plan-gf`,label:`Ground floor plan (top)`,group:`Plans & cutaways`,pos:[3.05,26,7.3],target:[3.05,0,7.29],level:`gf`},{id:`plan-ff`,label:`First floor plan (top)`,group:`Plans & cutaways`,pos:[3.05,28,8.3],target:[3.05,3.6,8.29],level:`noroof`},{id:`doll-gf`,label:`Ground floor cutaway (3D)`,group:`Plans & cutaways`,pos:[10.5,19,16.5],target:[3.05,.3,5.8],level:`gf`},{id:`doll-ff`,label:`First floor cutaway (3D)`,group:`Plans & cutaways`,pos:[12,16,20],target:[3.05,3.8,7],level:`noroof`}];Ne.prototype.computeBoundsTree=Ia,Ne.prototype.disposeBoundsTree=La,Ot.prototype.raycast=Pa;var Q=e=>document.getElementById(e),af=()=>new Promise(e=>requestAnimationFrame(()=>e())),of=12,sf=0;async function cf(e){sf++,Q(`loader-msg`).textContent=e,Q(`loader-fill`).style.width=`${Math.min(100,sf/of*100)}%`,await af()}var lf=Q(`app`),uf=new Xi({antialias:!1,powerPreference:`high-performance`}),df=Math.min(window.devicePixelRatio,2),ff=null,pf=pd(window.devicePixelRatio),mf=!0;uf.setPixelRatio(pf.pixelRatio),uf.setSize(window.innerWidth,window.innerHeight),uf.shadowMap.enabled=!0,uf.shadowMap.type=1,uf.shadowMap.autoUpdate=!1,uf.toneMapping=6,uf.toneMappingExposure=.7,uf.outputColorSpace=y,lf.appendChild(uf.domElement);var hf=new Ea;hf.setSize(window.innerWidth,window.innerHeight),hf.domElement.classList.add(`css2d`),document.body.appendChild(hf.domElement);var gf=new M,$=new ne(50,window.innerWidth/window.innerHeight,.05,650);$.zoom=1,$.updateProjectionMatrix(),gf.fog=new D(12897749,90,520),$.position.set(3.4,1.65,33);var _f=new Hs,vf=new ju(gf),yf={},bf=[],xf=new sa($,uf.domElement);xf.enableDamping=!0,xf.dampingFactor=.08,xf.zoomToCursor=!0,xf.screenSpacePanning=!0,xf.minDistance=.05,xf.maxDistance=260,xf.maxPolarAngle=Math.PI*.97,xf.target.set(3.05,3.6,10);var Sf=new gd($,uf.domElement,()=>bf),Cf=new Kd($,()=>bf);Cf.onChange=em;var wf=new yd($,()=>bf),Tf=new He(new B(Xa.a-.3,Za.z-Za.depth/2+Za.chaiseDepth+.15),new B(U-Ja/2-.12,W-.85));gf.add(Cf.group);var Ef=new Zd;Ef.root.visible=!1,gf.add(Ef.root);var Df,Of=new nf(uf,gf,$),kf=new xc(e=>_f.get(e),e=>_f.casts(e));kf.onSettled=()=>{tm(),Of.active&&Of.rebuild()};function Af(e,t=1/0){let n=new bt;n.firstHitOnly=!0,n.setFromCamera(e,$),n.far=t;let r=n.intersectObjects(bf,!1)[0];return r?kf.leafOf(r.object):void 0}function jf(e){Cf.active?Cf.click(e):kf.toggle(Af(e,3))}var Mf=window.matchMedia(_d),Nf=!1,Pf=new vd(Sf,uf.domElement,Q(`mobile-walk`),{interact:()=>jf(new B(0,0)),tap:e=>jf(Yp(e))});function Ff(){Pf.setEnabled(Lf===`walk`&&Mf.matches&&!Nf&&!Q(`ui`).classList.contains(`hidden`)&&!document.hidden)}function If(e){Nf=e,Q(`ui`).classList.toggle(`tools-open`,e),Q(`btn-tools`).setAttribute(`aria-expanded`,String(e)),Q(`tools-label`).textContent=e?`Hide tools`:`Tools`,Ff()}Mf.addEventListener(`change`,()=>If(!1)),document.addEventListener(`visibilitychange`,Ff);var Lf=`orbit`,Rf=hs[1],zf=Rf,Bf=`japanese`,Vf=`auto`,Hf=[],Uf=-1,Wf=0,Gf=`full`,Kf=0,qf=!0,Jf=24,Yf=.7,Xf=null,Zf=!1,Qf=new z(1e9,0,0),$f=new ee,ep=0;function tp(){bf=[];let e=t=>{if(t.visible&&t!==Cf.group&&t!==Ef.root){t.isMesh&&t.geometry.boundsTree&&bf.push(t);for(let n of t.children)e(n)}};e(gf)}function np(e){Xp(!1),Gf=e,yf.roof&&(yf.roof.visible=e===`full`),yf.ceil2&&(yf.ceil2.visible=e===`full`),yf.ff&&(yf.ff.visible=e!==`gf`),yf.slab1&&(yf.slab1.visible=e!==`gf`),Ef.groups.ff.visible=e!==`gf`,Q(`levels`).value=e,tp(),tm(),Wf=0,Of.active&&Of.rebuild()}function rp(){Xp(!1);let e=new Ka;Eu(e,zf,Bf);let t=e.build(e=>_f.get(e),e=>_f.casts(e));for(let e of Object.values(yf))e.removeFromParent(),e.traverse(e=>{e instanceof Ot&&(e.geometry.disposeBoundsTree(),e.geometry.dispose()),e instanceof b&&e.dispose()});kf.clear();for(let e of[`gf`,`slab1`,`ff`,`ceil2`,`roof`,`site`,`context`]){let n=t.get(e)??new Oe;n.name=e,yf[e]=n,gf.add(n)}for(let e of rl())yf[e.level??`gf`].add(kf.add(e).pivot);let n=t.get(`coffee-table`)??null;n&&(n.name=`coffee-table`,yf.gf.add(n)),wf.setObject(n,Tf),Hf=hl().map(e=>{let t=new b(e.color,0,e.distance,2);return t.position.set(...e.pos),t.castShadow=!1,t.shadow.mapSize.set(1024,1024),t.shadow.camera.near=.05,t.shadow.camera.far=e.distance,t.shadow.bias=-1e-4,t.shadow.normalBias=.012,t.shadow.radius=2,yf[e.level].add(t),{light:t,base:e.intensity,always:!!e.always}}),sp(!0);for(let e of Object.values(yf))e.traverse(e=>{e instanceof Ot&&e.geometry.computeBoundsTree()});Ef.renovation=zf,Ef.rebuild(),Cf.clear(),np(Gf)}function ip(e){e.id!==zf.id&&(zf=e,Bf=e.groundFloor?`japanese`:`none`,rp(),up())}function ap(e){let t=zf.groundFloor?e:`none`;t!==Bf&&(Bf=t,rp()),up()}function op(){return Vf===`auto`?1-We.smoothstep(vf.elevationDeg,-2,6):+(Vf===`on`)}function sp(e=!1){let t=op();if(!(!e&&Math.abs(t-Uf)<.004)){Uf=t;for(let e of Hf)e.light.intensity=e.base*(e.always?1:t);_f.setLampLevel(t),Wf=0,em(),Of.environmentChanged(),Of.materialsChanged()}}function cp(){if(Of.active||performance.now()<Wf)return;Wf=performance.now()+500;let e=Hf.filter(({light:e,always:t})=>!t&&e.intensity>.01&&e.parent?.visible).map(({light:e})=>({light:e,weight:e.intensity/(1+e.position.distanceToSquared($.position))})).sort((e,t)=>t.weight-e.weight),t=new Set(e.slice(0,2).map(({light:e})=>e));for(let{light:e}of Hf){let n=t.has(e);e.castShadow!==n&&(e.castShadow=n,!n&&e.shadow.map&&(e.shadow.map.dispose(),e.shadow.map=null),tm())}}function lp(e){Vf=e,sp(!0),up()}function up(){let e=Q(`interior`);if(!e)return;e.disabled=!zf.groundFloor,e.value=Bf;let t=Q(`chip-interior`);t.classList.toggle(`on`,Bf!==`none`),t.classList.toggle(`disabled`,!zf.groundFloor),t.title=zf.groundFloor?`Furnish the renovated house with an interior design style`:`Turn on Reno to add an interior design`;let n=Q(`btn-lights`);n.hidden=!zf.groundFloor,n.classList.toggle(`on`,Vf!==`off`),n.textContent=`💡 Lights: ${Vf===`auto`?`Auto`:Vf===`on`?`On`:`Off`}`;let r=Q(`renovation`);r.setAttribute(`aria-pressed`,String(zf.groundFloor)),r.classList.toggle(`on`,zf.groundFloor),Q(`renovation-description`).textContent=zf.description;let i=vs(Bf);Q(`interior-description`).textContent=i?.description??(zf.groundFloor?`Choose a minimal interior to add furniture, lighting and coordinated finishes.`:`Turn on Reno to explore the three minimal interior styles.`),Q(`design-swatches`).replaceChildren(...(i?.swatches??[]).map(({color:e,label:t})=>{let n=document.createElement(`span`),r=document.createElement(`i`);return r.style.backgroundColor=e,r.setAttribute(`aria-hidden`,`true`),n.append(r,t),n}))}function dp(e){if(Xp(),Lf=e,Q(`btn-pegman`).classList.toggle(`active`,e===`walk`),Q(`btn-pegman`).setAttribute(`aria-pressed`,String(e===`walk`)),Q(`btn-pegman`).setAttribute(`aria-label`,e===`walk`?`Return to Orbit`:`Walk through the house`),Q(`walk-mode-label`).textContent=e===`walk`?`Orbit`:`Walk`,e===`walk`){Xf=null,xf.enabled=!1;let e=$.position;e.x>0&&e.x<6.096&&e.z>-2.6&&e.z<18.6&&e.y<7.5?Sf.enable(!0):(Sf.enable(!1),Sf.place(new z(1.65,1.45,16),new z(1.65,1.35,11.7))),document.body.classList.add(`walking`)}else{Sf.disable(),xf.enabled=!0;let e=new z;$.getWorldDirection(e),xf.target.copy($.position).addScaledVector(e,2.5),xf.update(),document.body.classList.remove(`walking`)}e===`walk`&&Mf.matches?If(!1):Ff()}function fp(e){Xp(),e.level?np(e.level):Gf!==`full`&&!e.id.startsWith(`plan`)&&!e.id.startsWith(`doll`)&&np(`full`);let t=new z(...e.pos),n=new z(...e.target);if(Lf===`walk`){Sf.place(t,n);return}Xf={p0:$.position.clone(),p1:t,t0:xf.target.clone(),t1:n,start:performance.now(),dur:1300}}function pp(e){let t=e===`gf`&&zf.groundFloor?Qa:0,n=e===`gf`?W:co,r=e===`gf`?0:G,i=(t+n)/2,a=2*(Math.max((n-t)/2,U/(2*$.aspect))*1.25)*26*$.zoom/$.getFilmHeight();Lf===`walk`&&dp(`orbit`),fp({...rf.find(t=>t.id===`plan-${e}`),pos:[U/2,r+a,i+.01],target:[U/2,r,i]})}var mp=64,hp=40,gp=new Ke(mp,hp,{type:dt}),_p=new Float32Array(10240),vp=0,yp=1,bp=0,xp=0,Sp=new Aa(new de({uniforms:{tSrc:{value:null}},vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`uniform sampler2D tSrc; varying vec2 vUv; void main() { gl_FragColor = vec4(texture2D(tSrc, vUv).rgb, 1.0); }`,depthTest:!1,depthWrite:!1})),Cp=0,wp=!1,Tp=!0;async function Ep(e){let t=uf.getRenderTarget();uf.setRenderTarget(gp),e?(Sp.material.uniforms.tSrc.value=e,Sp.render(uf)):uf.render(gf,$),uf.setRenderTarget(t),await uf.readRenderTargetPixelsAsync(gp,0,0,mp,hp,_p);let n=0,r=0;for(let e=0;e<hp;e++)for(let t=0;t<mp;t++){let i=(e*mp+t)*4,a=.2126*_p[i]+.7152*_p[i+1]+.0722*_p[i+2],o=(t+.5)/mp-.5,s=(e+.5)/hp-.5,c=1-1.4*(o*o+s*s);n+=c,r+=c*Math.log(Math.max(Number.isFinite(a)?a:0,.001))}return Math.exp(r/n)}async function Dp(e){wp=!0;try{let t=await Ep(e);e?xp=We.clamp((vp/t)**.9,.5,45):yp=We.clamp((vp/t)**.8,.5,4),mf=!0}finally{wp=!1}}var Op=1.35;function kp(e){return e.x>.1&&e.x<5.996&&e.z>.1&&e.z<12.19&&e.y<6.65&&e.y>-.1}function Ap(){if(Of.active){let e=Of.target,t=performance.now();return e&&Of.samples>=3&&vp>0&&(!wp&&t>Cp&&(Cp=t+700,Dp(e.texture)),xp>0)||xp>0?xp:yp*(kp($.position)&&Gf===`full`?10:1.1)}xp=0;let e=performance.now();return!wp&&Tp&&vp>0&&e>bp&&(bp=e+300,Tp=!1,Dp(null)),yp}function jp(e){return e.x>.1&&e.x<5.996&&e.z>.1&&e.z<12.19&&e.y<6.65&&e.y>-.1&&Gf===`full`?15:e.x>-.3&&e.x<6.396&&e.z>-2.8&&e.z<19&&e.y<7?18:26}function Mp(e,t=!1){let n=jp($.position),r=t?n:Jf+(n-Jf)*(1-Math.exp(-e*3.5));(Math.abs(r-Jf)>.005||t)&&(Jf=r,$.setFocalLength(Jf))}var Np=!0,Pp=Lu(new Date),Fp=Fu(new Date).min,Ip=null;function Lp(e){return e<-8?`#1f2d4d`:e<-2?`#4a4f7a`:e<3?`#f08c55`:e<12?`#ffc46b`:`#8ec5ff`}function Rp(){let e=[];for(let t=0;t<=1440;t+=30)e.push(`${Lp(Pu(Iu(Pp,t)).elevation)} ${(t/1440*100).toFixed(1)}%`);Q(`sun-tod`).style.setProperty(`--day-grad`,`linear-gradient(90deg, ${e.join(`, `)})`)}function zp(e=!1){let t=Iu(Pp,Fp),n=Pu(t),r=Math.abs((n.azimuth-vf.azimuthDeg+540)%360-180);(e||r>.2||Math.abs(n.elevation-vf.elevationDeg)>.2)&&(vf.setSun(n.azimuth,n.elevation),tm(),Of.environmentChanged()),sp();let i=Ru(Fp);Q(`sun-time`).textContent=i,Q(`sun-date-label`).textContent=`${Vu(t)} · ${Np?`now`:`custom time`}`,Q(`live-dot`).classList.toggle(`on`,Np),Q(`sun-tod`).value=String(Fp),Q(`sun-date`).value=Pp,Q(`btn-live`).classList.toggle(`on`,Np);let a=n.elevation>-.27;Q(`sun-pos-short`).textContent=a?`Sun ${n.azimuth.toFixed(0)}° ${Hu(n.azimuth)} · ${n.elevation.toFixed(0)}° high · ${Vu(t)}`:`Sun below horizon · ${Vu(t)}`,Q(`sun-pos`).innerHTML=a?`☀️ <b>${n.azimuth.toFixed(0)}° ${Hu(n.azimuth)}</b> · <b>${n.elevation.toFixed(1)}°</b> above the horizon`:`🌙 Sun is below the horizon (${n.elevation.toFixed(0)}°)`;let o=Math.cos((n.azimuth-180)*We.DEG2RAD);Q(`sun-face`).innerHTML=a?n.elevation>75?`Sun almost overhead – short shadows all round`:o>.05?`Sun on the <b>front (south)</b> façade – car porch side`:o<-.05?`Sun on the <b>back (north)</b> façade – kitchen / yard side`:`Sun from the ${n.azimuth<180?`east`:`west`}, grazing the front and back`:`No direct sunlight`,Ip?.ymd!==Pp&&(Ip={ymd:Pp,t:Uu(Pp)});let s=Ip.t;Q(`sun-times`).innerHTML=`🌅 Sunrise <b>${Ru(s.rise)}</b> · Solar noon <b>${Ru(s.noon)}</b> · 🌇 Sunset <b>${Ru(s.set)}</b>`}function Bp(){if(!Np)return;let e=new Date,t=Lu(e);t!==Pp&&(Pp=t,Rp()),Fp=Fu(e).min,zp()}function Vp(){let e=new z;return $.getWorldDirection(e),Math.atan2(e.x,-e.z)*180/Math.PI}var Hp=999;function Up(){let e=Vp();Math.abs(e-Hp)<.1||(Hp=e,Q(`compass-needle`).setAttribute(`transform`,`rotate(${-e} 20 20)`))}function Wp(){if(Lf!==`orbit`)return;let e=$.position.clone().sub(xf.target),t=Math.hypot(e.x,e.z),n=xf.target.clone().add(new z(0,e.y,Math.max(t,.01)));Xf={p0:$.position.clone(),p1:n,t0:xf.target.clone(),t1:xf.target.clone(),start:performance.now(),dur:700}}function Gp(e){if(Lf!==`orbit`)return;let t=$.position.clone().sub(xf.target),n=We.clamp(t.length()*e,xf.minDistance+.2,xf.maxDistance),r=xf.target.clone().add(t.setLength(n));Xf={p0:$.position.clone(),p1:r,t0:xf.target.clone(),t1:xf.target.clone(),start:performance.now(),dur:350}}function Kp(){let e=Q(`ui`);e.classList.remove(`hidden`),Q(`btn-tools`).onclick=()=>If(!Nf),If(!1);let t=Q(`info-card`),n=Q(`sun-card`),r=Q(`details-card`),i=e=>{t.classList.toggle(`open`,e),Q(`btn-menu`).classList.toggle(`on`,e),e&&n.classList.remove(`open`)},a=e=>{n.classList.toggle(`open`,e),e&&i(!1),e&&Mf.matches&&If(!1)},o=e=>{r.classList.toggle(`open`,e),Q(`tile-more`).classList.toggle(`on`,e)};Q(`btn-menu`).onclick=()=>i(!t.classList.contains(`open`)),Q(`sun-summary`).onclick=()=>a(!n.classList.contains(`open`)),Q(`tile-more`).onclick=()=>o(!r.classList.contains(`open`)),document.querySelectorAll(`[data-close]`).forEach(e=>e.onclick=()=>e.dataset.close===`info-card`?i(!1):o(!1)),uf.domElement.addEventListener(`pointerdown`,()=>{i(!1),o(!1)}),Q(`renovation`).onclick=()=>{ip(zf.groundFloor?gs:Rf)};for(let e of[`gf`,`ff`])Q(`design-plan-${e}`).onclick=()=>pp(e);let s=Q(`interior`);s.replaceChildren(new Option(`No furniture`,`none`),..._s.map(e=>new Option(e.label,e.id))),s.onchange=()=>ap(s.value),Q(`btn-lights`).onclick=()=>lp(Vf===`auto`?`on`:Vf===`on`?`off`:`auto`),up();let c=Q(`levels`);c.onchange=()=>np(c.value),Q(`btn-pegman`).onclick=()=>dp(Lf===`orbit`?`walk`:`orbit`),Q(`btn-compass`).onclick=Wp,Q(`btn-zoomin`).onclick=()=>Gp(.7),Q(`btn-zoomout`).onclick=()=>Gp(1/.7);let l=Q(`views`);l.innerHTML=`<option value="">Go to…</option>`;let u=new Map;for(let e of rf)u.set(e.group,[...u.get(e.group)??[],e]);for(let[e,t]of u){let n=document.createElement(`optgroup`);n.label=e;for(let e of t){let t=document.createElement(`option`);t.value=e.id,t.textContent=e.label,n.appendChild(t)}l.appendChild(n)}l.onchange=()=>{let e=rf.find(e=>e.id===l.value);e&&fp(e),l.value=``,l.blur()},document.querySelectorAll(`select`).forEach(e=>e.addEventListener(`change`,()=>e.blur()));let d=Q(`chk-dims`),f=Q(`btn-dims`);d.onchange=()=>{Ef.root.visible=d.checked&&!Of.active,f.classList.toggle(`active`,d.checked),f.setAttribute(`aria-pressed`,String(d.checked))},f.onclick=()=>{d.checked=!d.checked,d.dispatchEvent(new Event(`change`))};let p=Q(`btn-measure`),m=e=>{Cf.setActive(e),em(),p.classList.toggle(`active`,e),p.setAttribute(`aria-pressed`,String(e)),document.body.classList.toggle(`measuring`,e),e&&Mf.matches&&If(!0)};p.onclick=()=>m(!Cf.active),Q(`btn-measure-close`).onclick=()=>m(!1),Q(`btn-undo`).onclick=()=>Cf.undo(),Q(`btn-clear`).onclick=()=>Cf.clear(),document.querySelectorAll(`#units button`).forEach(e=>e.onclick=()=>{Cf.units=e.dataset.v,Cf.refreshUnits(),Ef.units=Cf.units===`imperial`?`imperial`:`metric`,Ef.rebuild(),Ef.groups.ff.visible=Gf!==`gf`,document.querySelectorAll(`#units button`).forEach(t=>t.classList.toggle(`on`,t===e))});let h=Q(`sun-tod`);h.oninput=()=>{Np=!1,Fp=Number(h.value),zp()};let g=Q(`sun-date`);g.onchange=()=>{g.value&&(Np=!1,Pp=g.value,Rp(),zp())},Q(`btn-live`).onclick=()=>{Np=!0,Bp(),zp()},setInterval(Bp,15e3),Q(`sunk`).oninput=e=>{vf.sunScale=Number(e.target.value),vf.updateSun(),Of.environmentChanged()},Q(`exposure`).oninput=e=>Kf=Number(e.target.value),Q(`chk-autoexp`).onchange=e=>qf=e.target.checked;let _=Q(`chk-ao`);_.onchange=()=>{Df.setAO(_.checked),Q(`tile-ao`).classList.toggle(`on`,_.checked)},Q(`tile-ao`).classList.toggle(`on`,_.checked),Q(`tile-ao`).onclick=()=>{_.checked=!_.checked,_.dispatchEvent(new Event(`change`))},Q(`tone`).onchange=e=>{let t=e.target.value;uf.toneMapping=t===`agx`?6:t===`neutral`?7:4};let v=Q(`view-scale`),y=()=>{let e=$.zoom===2;v.textContent=`${$.zoom}×`,v.title=`View scale: ${$.zoom}× (click for ${e?1:2}×)`,v.classList.toggle(`active`,e),v.setAttribute(`aria-pressed`,String(e))};y(),v.onclick=()=>{$.zoom=$.zoom===1?2:1,$.updateProjectionMatrix(),y(),bp=0,Cp=0,Of.cameraMoved()},Q(`scale`).onchange=e=>{let t=e.target.value;ff=t===`auto`?null:Number(t),pf=pd(window.devicePixelRatio),$p()};let b=Q(`btn-pt`),x=async()=>{em(),Of.active?(Of.disable(),b.classList.remove(`active`),_f.setEnvScaled(!0),vf.setSkyBase(Op),Cf.group.visible=!0,Ef.root.visible=d.checked,Q(`pt-status`).textContent=``):(b.classList.add(`active`),Cf.group.visible=!1,Ef.root.visible=!1,_f.setEnvScaled(!1),vf.setSkyBase(1),await Of.enable())};b.onclick=x,Of.onStatus=e=>{Q(`pt-status`).textContent=e},Q(`btn-shot`).onclick=()=>Zf=!0;let S=Q(`specs`);S.innerHTML=ms.map(([e,t])=>`<tr><td>${e}</td><td>${t}</td></tr>`).join(``),window.addEventListener(`keydown`,t=>{if(t.target?.tagName!==`INPUT`&&t.target?.tagName!==`SELECT`)switch(t.code){case`KeyV`:dp(Lf===`orbit`?`walk`:`orbit`);break;case`KeyM`:m(!Cf.active);break;case`KeyL`:f.click();break;case`KeyN`:Wp();break;case`KeyT`:a(!n.classList.contains(`open`));break;case`Escape`:i(!1),o(!1),If(!1);break;case`Digit1`:np(`full`);break;case`Digit2`:np(`noroof`);break;case`Digit3`:np(`gf`);break;case`KeyP`:x();break;case`KeyH`:e.classList.toggle(`hidden`),Ff();break;case`KeyZ`:t.ctrlKey&&Cf.undo()}})}var qp=new B,Jp=null;function Yp(e){let t=uf.domElement.getBoundingClientRect();return qp.set((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1),qp}function Xp(e=!0){let t=wf.pointerId;return wf.end()?(t!==null&&uf.domElement.hasPointerCapture(t)&&uf.domElement.releasePointerCapture(t),xf.enabled=Lf===`orbit`,uf.domElement.style.cursor=``,Jp=null,tm(),e&&Of.active&&Of.rebuild(),!0):!1}uf.domElement.addEventListener(`pointerdown`,e=>{if(wf.active){e.stopImmediatePropagation();return}if(e.button===0&&e.isPrimary&&Lf===`orbit`&&!Cf.active&&wf.begin(Yp(e),e.pointerId)){Xf=null,xf.enabled=!1,uf.domElement.setPointerCapture(e.pointerId),uf.domElement.style.cursor=`grabbing`,e.preventDefault(),e.stopImmediatePropagation();return}Jp=[e.clientX,e.clientY]},{capture:!0}),uf.domElement.addEventListener(`pointermove`,e=>{if(wf.active){e.pointerId===wf.pointerId&&wf.move(Yp(e))&&tm();return}Lf===`orbit`&&Cf.active&&Cf.hover(Yp(e));let t=Lf===`orbit`&&!Cf.active&&e.buttons===0;uf.domElement.style.cursor=t&&wf.hit(Yp(e))?`grab`:t&&Af(Yp(e))?`pointer`:``}),uf.domElement.addEventListener(`pointerup`,e=>{if(e.pointerId===wf.pointerId&&Xp())return;let t=Jp?Math.hypot(e.clientX-Jp[0],e.clientY-Jp[1]):99;if(Jp=null,!(t>5||e.button!==0)){if(Lf===`walk`){if(Mf.matches)return;Sf.locked?jf(new B(0,0)):Sf.lock();return}Cf.active?Cf.click(Yp(e)):e.detail<=1&&kf.toggle(Af(Yp(e)))}}),uf.domElement.addEventListener(`pointercancel`,e=>{e.pointerId===wf.pointerId&&Xp()}),uf.domElement.addEventListener(`lostpointercapture`,e=>{e.pointerId===wf.pointerId&&Xp()}),window.addEventListener(`blur`,()=>Xp()),uf.domElement.addEventListener(`dblclick`,e=>{if(Lf!==`orbit`||Cf.active)return;let t=new bt;t.firstHitOnly=!0,t.setFromCamera(Yp(e),$);let n=t.intersectObjects(bf,!1)[0];if(!n)return;let r=$.position.clone().sub(xf.target),i=n.point.clone(),a=Math.min(r.length(),Math.max(1.5,n.distance*.6)),o=i.clone().add(r.normalize().multiplyScalar(a));Xf={p0:$.position.clone(),p1:o,t0:xf.target.clone(),t1:i,start:performance.now(),dur:800}});var Zp=new Set;window.addEventListener(`keydown`,e=>{let t=e.target?.tagName;t!==`INPUT`&&t!==`SELECT`&&Zp.add(e.code)}),window.addEventListener(`keyup`,e=>Zp.delete(e.code)),window.addEventListener(`blur`,()=>Zp.clear());function Qp(e){if(Lf!==`orbit`||wf.active)return;let t=+!!Zp.has(`KeyW`)-!!Zp.has(`KeyS`),n=+!!Zp.has(`KeyD`)-!!Zp.has(`KeyA`),r=+!!Zp.has(`KeyE`)-!!Zp.has(`KeyQ`);if(!t&&!n&&!r)return;Xf=null;let i=$.position.distanceTo(xf.target),a=We.clamp(i*.9,1.2,25)*(Zp.has(`ShiftLeft`)?2.5:1),o=new z;$.getWorldDirection(o),o.y=0,o.normalize();let s=new z().crossVectors(o,$.up).normalize(),c=o.multiplyScalar(t).addScaledVector(s,n).addScaledVector($.up,r).multiplyScalar(a*e);$.position.add(c),xf.target.add(c)}function $p(){let e=window.innerWidth,t=window.innerHeight;uf.setPixelRatio(ff===null?pf.pixelRatio:df*ff),uf.setSize(e,t),$.aspect=e/t,$.setFocalLength(Jf),Df?.setSize(e,t),hf.setSize(e,t),Cf.setResolution(e,t),Of.cameraMoved(),em()}window.addEventListener(`resize`,$p);function em(){mf=!0,Tp=!0}function tm(){uf.shadowMap.needsUpdate=!0,em()}for(let e of[`input`,`change`,`click`])document.addEventListener(e,em);document.addEventListener(`visibilitychange`,()=>{nm.getDelta(),pf={...pf,elapsed:0,frames:0,cooldown:2},em()});var nm=new h,rm=0,im=!1;function am(){requestAnimationFrame(am);let e=nm.getDelta();if(document.hidden){im=!1;return}let t=Math.min(e,.1);if(Xf){let e=Math.min(1,(performance.now()-Xf.start)/Xf.dur),t=e<.5?4*e*e*e:1-(-2*e+2)**3/2;$.position.lerpVectors(Xf.p0,Xf.p1,t),xf.target.lerpVectors(Xf.t0,Xf.t1,t),e>=1&&(Xf=null)}if(Lf===`orbit`?(Qp(t),xf.enabled&&xf.update()):(Sf.update(t),Cf.active&&Cf.hover(new B(0,0))),Cf.update(),Mp(t),cp(),Up(),kf.update(t)&&tm(),Pf.enabled&&performance.now()>=rm){rm=performance.now()+100;let e=Cf.active?void 0:Af(new B(0,0),3);Pf.setAction(Cf.active?`Place point`:e&&!e.spec.group?e.open?`Close`:`Open`:`Open / Close`,Cf.active?`Aim at a surface`:e?.spec.label??`Aim at a door or window`,Cf.active||!!e)}$.updateMatrixWorld();let n=$.position.distanceToSquared(Qf)>1e-8||$.quaternion.angleTo($f)>1e-5||Math.abs(Jf-ep)>.02;n&&(Qf.copy($.position),$f.copy($.quaternion),ep=Jf,Of.cameraMoved()),n&&(Tp=!0);let r=uf.toneMapping,i=r===6?1:r===7?.85:.62,a=qf?Ap():1,o=i*2**Kf*a,s=Math.abs(o-Yf)>1e-4;if(Yf+=(o-Yf)*(1-Math.exp(-t*2.2)),uf.toneMappingExposure=Yf,!Of.active&&!mf&&!n&&!s&&!Cf.active&&!wf.active&&!Zf){im=!1,pf={...pf,elapsed:0,frames:0};return}if(ff===null&&!Of.active&&im){let t=md(pf,e,window.devicePixelRatio),n=t.pixelRatio!==pf.pixelRatio;pf=t,n&&$p()}if(im=!0,Of.active&&Of.ready&&!wf.active?(Of.render(),Q(`pt-status`).textContent=`${Of.samples} samples`):Df.render(t),hf.render(gf,$),mf=!1,Zf){Zf=!1;let e=document.createElement(`a`);e.href=uf.domElement.toDataURL(`image/png`),e.download=`house45-${Date.now()}.png`,e.click()}}async function om(){try{Es(uf.capabilities.getMaxAnisotropy()),await _f.init(cf);let e=document.createElement(`canvas`);e.width=256,e.height=154;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,256,154);n.addColorStop(0,`#d9dcde`),n.addColorStop(1,`#a9aeb2`),t.fillStyle=n,t.fillRect(0,0,256,154),t.fillStyle=`#222`,t.font=`700 110px "Segoe UI", Arial, sans-serif`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(`45`,128,82);let r=Ls(e);r.repeat.set(5,1/.12),r.offset.set(.5,-10),r.updateMatrix(),_f.setInteriorEnv(Au(uf)),_f.register(`plaque45`,new _e({map:r,metalness:.5,roughness:.35})),await cf(`Building walls, stairs & roof…`),rp(),await cf(`Loading sky (HDRI)…`),await vf.load(`./hdri/sky_2k.hdr`),vf.onSkyLevel=e=>_f.setSkyLevel(e),vf.setSkyBase(Op),vf.setSun(215,vf.hdriElevation),Df=new fd(uf,gf,$),$p(),tp(),Kp(),np(`full`),tm(),await cf(`Ready`),Q(`loader`).classList.add(`done`);let i=rf.find(e=>e.id===`front-34`),a=$.position.clone(),o=xf.target.clone();$.position.set(...i.pos),$.lookAt(...i.target),$.updateMatrixWorld(),vp=await Ep(null),Rp(),Bp(),zp(!0),$.position.copy(a),xf.target.copy(o),xf.update(),fp(i),nm.getDelta(),am()}catch(e){console.error(e),Q(`loader-msg`).textContent=`Failed to start: ${e.message}`}}om();export{nn as n,Aa as t};