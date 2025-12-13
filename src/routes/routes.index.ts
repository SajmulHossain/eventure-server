import { AuthRoutes } from "@modules/auth/auth.route";
import { EventRoutes } from "@modules/event/event.route";
import { EventTypeRoutes } from "@modules/EventType/event.route";
import { UserRoutes } from "@modules/user/user.route";
import { Router } from "express";

const router = Router();

const routes: {
  path: string;
  route: Router;
}[] = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/events",
    route: EventRoutes,
  },
  {
    path: "/event-types",
    route: EventTypeRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
