import { AuthRoutes } from "@modules/auth/auth.route";
import { EventRoutes } from "@modules/event/event.route";
import { EventTypeRoutes } from "@modules/EventType/event.route";
import { PaymentRoutes } from "@modules/payment/payment.route";
import { RatingRoutes } from "@modules/rating/rating.route";
import { SavedEventRoutes } from "@modules/savedEvents/saved.route";
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
    {
      path: "/saved-events",
      route: SavedEventRoutes
    },
    {
      path: "/payments",
      route: PaymentRoutes,
    }
  ];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
