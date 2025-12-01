import { UserRoutes } from "@modules/user/user.route";
import { Router } from "express";

const router = Router();

const routes: {
  path: string;
  route: Router;
}[] = [{
    path: "/users",
    route: UserRoutes
}];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;