import blog1 from "@/assets/images/blog-01.jpg";
import blog2 from "@/assets/images/blog-02.jpg";
import blog3 from "@/assets/images/blog-03.jpg";
import blog4 from "@/assets/images/blog-04.jpg";
import jsExecutionContextStack from "@/assets/images/js-execution-context-stack.jpg";
import jsScopeHoisting from "@/assets/images/js-scope-hoisting.jpg";
import vue3ComponentArchitecture from "@/assets/images/vue3-component-architecture.jpg";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: number;
}

export const posts: BlogPost[] = [
  {
    slug: "vue3-component-architecture",
    title: "Vue 3 元件化架構全攻略",
    excerpt:
      "從核心觀念到註冊策略，掌握全域、區域與非同步元件的使用時機，打造高可維護的前端專案。",
    image: vue3ComponentArchitecture,
    category: "Vue.js",
    date: "September 9, 2024",
    readTime: 7,
  },
  {
    slug: "js-scope-hoisting",
    title: "用小 J 的故事了解 JavaScript 的底層運作規則：作用域和提升篇",
    excerpt:
      "深入了解 JavaScript 創造階段的核心概念：變數物件、Hoisting 提升、作用域（Global / Function / Block）與作用域鏈。",
    image: jsScopeHoisting,
    category: "JavaScript",
    date: "March 23, 2024",
    readTime: 8,
  },
  {
    slug: "js-execution-context-stack",
    title: "用小 J 的故事了解 JavaScript 的底層運作規則：執行堆疊篇",
    excerpt:
      "用一個辦公室故事，輕鬆了解 JavaScript 執行環境的創造階段與執行階段，以及執行堆疊（Call Stack）的運作原理。",
    image: jsExecutionContextStack,
    category: "JavaScript",
    date: "March 22, 2024",
    readTime: 6,
  },
];

export const categories = [
  "All",
  "JavaScript",
  "Vue.js",
  "TypeScript",
  "Web Performance",
  "UI/UX",
  "DevOps",
];
