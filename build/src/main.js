"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_fetch_1 = require("./data_fetch");
(async function example() {
    const result = new data_fetch_1.DataFetch().fetch();
    console.log(await result);
})();
//# sourceMappingURL=main.js.map