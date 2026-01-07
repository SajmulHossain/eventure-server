import { AuthRoutes } from "@modules/auth/auth.route";
import { EventRoutes } from "@modules/event/event.route";
import { EventTypeRoutes } from "@modules/EventType/event.route";
import { RatingRoutes } from "@modules/rating/rating.route";
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
    {
      path: "/ratings",
      route: RatingRoutes,
    },
  ];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
