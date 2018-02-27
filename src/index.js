import dva from "dva";
import createLoading from "dva-loading";
import { createLogger } from "redux-logger";
import { message } from "antd";
import "./index.css";

// 1. Initialize
const app = dva({
  onAction: createLogger(),
  onError: e => {
    message.error(e.message, 3);
  }
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// 把路由信息抽成一个单独的文件，好处是可以结合babel-plugin-dva-hmr 可实现路由和组件的热加载
app.model(require("./models/users"));

app.model(require("./models/counter"));

// 4. Router
app.router(require("./router"));

// 5. Start
app.start("#root");
