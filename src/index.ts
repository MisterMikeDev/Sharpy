console.clear();
import { config } from "dotenv";
config();
import { Sharpy } from "./Client";
// import { Api } from "./Api";

(async () => {
    const Echo = new Sharpy();

    await Echo.start();

    // new Api(Echo, process.env.PORT || 3000).listen();
})();
