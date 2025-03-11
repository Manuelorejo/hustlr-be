    import { Router } from "express";
    import authRoutes from "./features/auth/auth.routes";
    import profileRoutes from "./features/profile/profile.routes";
    import searchRoutes from "./features/search/search.routes";

    const router = Router();
    router.use("/auth", authRoutes);
    router.use("/profile", profileRoutes)
    router.use("/jobs", searchRoutes)
    export default router;
