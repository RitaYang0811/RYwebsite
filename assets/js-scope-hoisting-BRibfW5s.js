const n=`從上一集的[執行堆疊篇](/RYwebsite/#/blog/js-execution-context-stack)，我們知道 JavaScript 在建立執行環境時會先經歷一個**創造階段**，還沒看過奴性小 J 的故事可以先點過去看喔！

這一集要來聊聊小 J 在開始工作之前，他到底先做了什麼事前工作，讓他可以每天都如此順利完成每項交辦任務呢？

---

上一集提到，在 JavaScript 建立執行環境時，會分為 2 階段：

1. **Creation Phase 創造階段**（小Ｊ先看好需要的工作清單，今天要講的重點）
2. **Execution Phase 執行階段**（開始工作！這是上一集的內容）

創造階段到底是創造什麼呢？小 J 會先記錄很多東西，而這其中最重要的就是會先記錄下：

- 變數物件（Variable Object）
- 全域底下 \`window\` 有什麼
- 作用域鏈（Scope Chain）
- \`this\` 變數（"This" Variable）

今天我們只會說明前三項，因為 \`this\` 太龐大了，需要擇期好好說明。

## 變數物件 Variable Object

小Ｊ在工作前會先看好工作任務及準備需要接待的貴賓，這個「研讀好工作任務」就是小 J 最一開始要做的工作了，他沒有把工作任務看清楚，要怎麼在同事隨時叫他執行時可以順利完成任務呢？

而**把任務拿到最前面這個動作就叫做「提升」**，這些「變數物件 Variable Object」正確來說有 3 種：

1. **參數（Argument）**：準備放到函式內的參數
2. **函式宣告（Function Declaration）**
3. **變數宣告（Variable Declaration）**

後面 2 個「函式宣告及變數宣告」就擁有大名鼎鼎的 Hoisting 特性。

## 什麼是提升 Hoisting？

> 提升（Hoisting）並非 ECMAScript® 2015 Language Specification 中的一個正式定義，它用來形容 JavaScript **編譯階段**將變數和函式的宣告存入記憶體的概念。

### 函式宣告（Function Declaration）

函式在提升時會被記錄成一個新屬性，而值就是指向該函式在記憶體的位址。
因為提升時被**完整定義**，所以可以在宣告之前呼叫。

### 變數宣告（Variable Declaration）

**\`var\` 提升：**

在提升時會被記錄成一個新屬性，而值為 \`undefined\`，因為「賦值」這件事是在執行階段完成的。如果提前呼叫，他會出現 \`undefined\` 而非實際的值。

\`\`\`js
console.log(name); // undefined
var name = "Tom";
\`\`\`

**\`let\`、\`const\` 提升：**

許多人會誤以為 \`let\` 不會提升，如果在 \`let\` 賦值前就使用，這個狀態可以稱之為 **uninitialized**，也有另一個常見的說法是，\`let\` 和 \`const\` 定義的變數目前存在於**暫時死區（TDZ, Temporal Dead Zone）**，會出現紅字錯誤並中斷執行。

\`\`\`js
console.log(greeting); // Uncaught ReferenceError: greeting is not defined
let greeting = "hi there";
\`\`\`

## 什麼是作用域 Scope？

> 套用小 J 的故事：老陳在哪裡？

還記得我們在創造階段登記了許多變數嗎？他們各自成為了新的屬性，不過都還沒有被賦值（要記得賦值是在執行階段才會進行）。

**作用域就是這些變數被登記在哪裡**，白話文可以說成：我可以在哪裡找到這些變數。

JS 的作用域簡單可以分為「全域 Global」作用域及「區域 Local」作用域，而放在不同作用域的變數也就可以稱為「全域變數」和「區域變數」，而這條界線就是**函式**，函式外的就是全域，函式內的就是區域。

- **全域變數**：放在公開的地方，在瀏覽器底下指的就是 \`window\`，每個人在任何地方都可以取得，相對的，每個人也都能改變這個變數。
- **區域變數**：被不同的區域所劃分，放在你區域的變數我存取不到，放在我區域的變數你也別想取用。

ES6 出現之後，作用域可細分為 3 種：

### 全域作用域 Global Scope

在函式之外的範圍都是全域，最公開、人人都可以取用的地方，所以 \`window\` 底下有什麼，就是指在全域底下有什麼。

### 函式作用域 Function Scope

以函式做為分界，不同函式的變數互不污染。ES6 出現之前使用 \`var\` 的變數就是在函式作用域裡，而這也造成許多不可預期的錯誤（經典案例就是 \`for\` 迴圈的問題，放在本頁末的參考連結中）。

### 塊級作用域 Block Scope

ES6 之後出現了 \`let\`、\`const\`，以 \`{}\` 大括號做為分界，可以把變數鎖在 \`{}\` 中。所以當使用 \`if\`、\`for\` 時就不會因為作用域的關係造成程式碼錯誤。

## 作用域鏈 Scope Chain

> 就是沿線找老陳 XD，找不到就得報失蹤人口了

當 JavaScript 使用每一個變數的時候，會先嘗試在**當前作用域**中尋找該變數，若找不到，會一直往**父層作用域**尋找，直到全域作用域還是沒找到，就會直接報錯。這一層一層的關係串起來，就是**作用域鏈**。

## 上下兩集綜合總結

| 概念                          | 說明                                         |
| ----------------------------- | -------------------------------------------- |
| 執行環境（Execution Context） | JavaScript 執行時建立的運作環境              |
| 創造階段（Creation Phase）    | 先記錄：\`window\`、變數物件、作用域鏈、\`this\` |
| 提升（Hoisting）              | 函式宣告與變數宣告在創造階段被提前記錄       |
| 函式宣告提升                  | 完整定義，可提前呼叫                         |
| \`var\` 提升                    | 先宣告為 \`undefined\`，執行時才賦值           |
| \`let\`/\`const\` 提升            | 進入 TDZ，提前使用會拋出 ReferenceError      |
| 作用域（Scope）               | 變數可被存取的範圍                           |
| 全域作用域                    | \`window\` 層級，任何地方都能取用              |
| 函式作用域                    | 以函式為邊界（\`var\`）                        |
| 塊級作用域                    | 以 \`{}\` 為邊界（\`let\`、\`const\`）             |
| 作用域鏈（Scope Chain）       | 找不到變數時一層層往父層查找，直到全域       |
| 執行堆疊（Execution Stack）   | 函式呼叫時依序堆疊執行環境，後進先出         |
| 單線程（Single-threaded）     | 一次只能執行一件事                           |

## 額外筆記

- 函式內的變數都會放在 Local 區塊，即使與全域變數同名也不會衝突。
- 全域中，\`var\` 宣告的變數放在 Global 區塊；\`let\`、\`const\` 宣告的變數放在 Script 區塊。
- 沒有宣告的變數（例：\`a = 1\`）會變成全域屬性，不管在全域還是函式裡都一樣，且可以被輕易刪除。
- 函式裡的全域屬性可以覆寫函式外的全域屬性。

### 參考文章

- [秒懂！JavaSript 執行環境與堆疊](https://medium.com/魔鬼藏在程式細節裡/淺談-javascript-執行環境-2976b3eaf248)
- [五分鐘輕鬆暸解「提升(Hoisting)」!](https://medium.com/魔鬼藏在程式細節裡/五分鐘輕鬆暸解-提升-hoisting-82e960964b3e)
- [JavaScript: 圖解JavaScript規則 — 作用域(鏈)](https://codingbycolors.me/graphical_js_rules_scope/)
- [我知道你懂 hoisting，可是你了解到多深？](https://github.com/aszx87410/blog/issues/34#top)
- [let 和 var 在 for 迴圈中的結果差異（經典考題）](https://medium.com/randy-chen/let-和-var-在-for迴圈中的結果差異-54f61cdb5f48)
`;export{n as default};
