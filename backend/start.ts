import "./api-env";
import api from "./api";

api.listen(process.env.PORT || 8080, () => {
  console.clear();
  console.log(`
================================================

  🚀 Server ready at http://localhost:${process.env.PORT || 8080}
  🚀 API ready at http://localhost:${process.env.PORT || 8080}/api
  
================================================
`);
});
