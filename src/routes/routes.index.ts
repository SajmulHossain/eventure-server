import { Router } from "express";
import { UserRoutes } from "src/modules/user/user.route";

const router = Router();

const routes: Array<{
  path: string;
  route: Router;
}> = [{
    path: "/users",
    route: UserRoutes
}];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;