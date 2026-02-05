#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;uniform float u_time;uniform sampler2D u_tex0,u_tex1;
#define S smoothstep
#define V vec2
#define F float
F B(V u,F s){V d=abs(u);return step(max(d.x,d.y),s);}
F t,s2,s5,s10;
F A(int i,V u){F v=0.,x;if(i==1){v=step(s2*1.2,length(1.-abs(u*.5)))*B(mod(u,1.),abs(sin(t*.5-abs(s10)*.1))-.05)*B(u,1.);}else if(i==2){F T=t-mod(t,.2),s=min(1.,1.+sin(T*10.)*.1),k=B(u,s);v=k*(1.-B(u,s*(.5+sin(T*5.)*.5)*.9))*B(u,1.);}else if(i==3){F r=step(length((mod(u*10.,2.)-1.)/sin(t)),.3);if(mod(floor(length(u)*2.),2.)==0.)r=1.-r;v=r*B(u,1.);}else if(i==4)v=step(length(mod(u*10.,2.)-1.),.2)*step(abs(u.x),2.);else if(i==5)v=step(abs(u.x),.01);else if(i==6){F T=t-mod(t,.196),c=cos(T),s=sin(T);V w=(mod(u*2.,2.)-1.)*mat2(c,s,-s,c);v=B(w,.5)*B(u,2.)*(1.-step(length(u),abs(s)*2.));}return v;}
#define O(X,Y,Z,W,I,M,R,G,b) {F d=Y-z;if(d>0.&&d<10.){V p=(m+u*d)-X;if(W)p=V(p.y,-p.x);p/=Z;if(A(I,p)>.5){F f=texture2D(u_tex0,p).r;if(f>=S(1.5,0.,d)&&f>=S(5.,10.,d)){vec3 c=vec3(R,G,b);if(M==0)o=c;else o*=c;}}}}
void main(){V u=(gl_FragCoord.xy*2.-u_resolution.xy)/u_resolution.y;t=u_time;s2=sin(t*2.);s5=sin(t*5.);s10=sin(t*10.);F T=t-mod(t,.3),c=cos(T*3.14),s=sin(T*3.14);V gv=u*.5*V(sign(sin(T*100.)),sign(sin(T*7.)))*mat2(c,s,-s,c);F g=1.-S(.6,1.,texture2D(u_tex0,gv).r)*.16;g*=1.-S(.7,1.,texture2D(u_tex1,gv*2.).r)*.5;u+=.015*g-.015;V m=V(0);F z=-2.+mod(t,10.);vec3 o=vec3(0);for(F k=-1.;k<=1.;k++){F z=z+k*10.;O(V(0,-10),12.,2.,true,4,0,.8,.8,.8)O(V(-2,-.5),7.,1.,true,6,0,0,.5,.5)O(V(0,-4),6.,2.,true,5,0,.8,0,.5)O(V(8,0),5.,2.,false,4,0,.8,.8,.8)O(V(-4,-3),3.,1.,false,2,0,0,.5,0)O(V(3,0),2.,1.,false,1,0,.8,0,.5)O(V(-5,0),1.,10.,false,5,0,1,.3,.3)O(V(0),0.,1.,false,3,0,0,0,1)}o*=1.-(1.-g)*.3;o*=S(0.,2.,length(u))*.9+.1;if(length(o)<.9)o+=S(1.,.8,g)*.07;gl_FragColor=vec4(o,1);}