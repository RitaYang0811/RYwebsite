import{d as v,g as a,r as b,o as y,c as s,b as h,a as e,F as l,f as c,i as n,t as i}from"./index-BMulo-v8.js";import{S as f}from"./ScrollTrigger-CpFktyOr.js";import{_ as k}from"./_plugin-vue_export-helper-DlAUqK2U.js";const S={class:"about"},w={class:"skills-grid"},D={class:"skill-card__header"},x={class:"skill-card__title"},A={class:"skill-card__icon"},T={class:"skill-card__list"},C={class:"experience"},j={class:"timeline"},V={class:"timeline-item__content"},E={class:"timeline-item__date"},F={class:"timeline-item__title"},I={class:"timeline-item__company"},B={class:"timeline-item__description"},M=v({__name:"AboutView",setup(R){a.registerPlugin(f);const d=b(null),p=[{category:"Frontend Development",icon:"💻",items:["Vue.js","React","TypeScript","SCSS/CSS3","Responsive Design"]},{category:"Backend Development",icon:"⚙️",items:["Node.js","Express","RESTful APIs","Database Design"]},{category:"Tools & Methods",icon:"🛠️",items:["Git","Webpack","Agile/Scrum","CI/CD"]},{category:"Design",icon:"🎨",items:["UI/UX Design","Figma","Adobe XD","Responsive Layouts"]}],m=[{period:"2022 - Present",role:"Senior Frontend Developer",company:"Tech Company",description:"Leading frontend development team, implementing modern web solutions using Vue.js and TypeScript."},{period:"2020 - 2022",role:"Web Developer",company:"Digital Agency",description:"Developed responsive websites and web applications for various clients using modern technologies."},{period:"2018 - 2020",role:"Junior Developer",company:"Startup",description:"Started my journey in web development, working on various frontend projects and learning modern frameworks."}];return y(()=>{a.timeline({defaults:{ease:"power4.out"}}).from(".about-hero__title",{y:100,opacity:0,duration:1}).from(".about-hero__text",{x:-50,opacity:0,duration:.8}).from(".image-container",{x:50,opacity:0,duration:.8},"-=0.8"),a.from(".skill-card",{scrollTrigger:{trigger:".skills",start:"top center",end:"bottom center",toggleActions:"play none none reverse"},y:50,opacity:0,duration:.8,stagger:.2}),a.from(".timeline-item",{scrollTrigger:{trigger:".timeline",start:"top center",end:"bottom center",toggleActions:"play none none reverse"},x:-50,opacity:0,duration:.8,stagger:.3})}),(_,o)=>(n(),s("div",S,[o[2]||(o[2]=h('<section class="about-hero" data-v-31a33b55><h1 class="about-hero__title" data-v-31a33b55>About Me</h1><div class="about-hero__content" data-v-31a33b55><div class="about-hero__text" data-v-31a33b55><p class="about-hero__description" data-v-31a33b55> I&#39;m a passionate web developer with a keen eye for design and a love for creating seamless user experiences. My journey in web development started with a curiosity for how things work on the internet, and it has evolved into a professional pursuit of crafting beautiful, functional websites. </p></div><div class="about-hero__image" data-v-31a33b55><div class="image-container" data-v-31a33b55><div class="placeholder-image" data-v-31a33b55></div></div></div></div></section>',1)),e("section",{class:"skills",ref_key:"skillsSection",ref:d},[o[0]||(o[0]=e("h2",{class:"section-title"},"Skills & Expertise",-1)),e("div",w,[(n(),s(l,null,c(p,(t,r)=>e("div",{key:r,class:"skill-card"},[e("div",D,[e("h3",x,i(t.category),1),e("div",A,i(t.icon),1)]),e("ul",T,[(n(!0),s(l,null,c(t.items,(u,g)=>(n(),s("li",{key:g},i(u),1))),128))])])),64))])],512),e("section",C,[o[1]||(o[1]=e("h2",{class:"section-title"},"Experience",-1)),e("div",j,[(n(),s(l,null,c(m,(t,r)=>e("div",{key:r,class:"timeline-item"},[e("div",V,[e("div",E,i(t.period),1),e("h3",F,i(t.role),1),e("div",I,i(t.company),1),e("p",B,i(t.description),1)])])),64))])])]))}}),W=k(M,[["__scopeId","data-v-31a33b55"]]);export{W as default};
