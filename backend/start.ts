import "./api-env";
import api from "./api";
import config from "./config";

api.listen(config.port || 8080, () => {
  console.log(`🚀 Server ready at http://localhost:${config.port || 8080}`);
});
