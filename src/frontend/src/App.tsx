import { Layout } from "@/components/Layout";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useAuth } from "@/hooks/useAuth";
import { Suspense, lazy } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const Marketplace = lazy(() => import("@/pages/Marketplace"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const Chat = lazy(() => import("@/pages/Chat"));
const Membership = lazy(() => import("@/pages/Membership"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const About = lazy(() => import("@/pages/About"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function OwnerRoute({ children }: { children: React.ReactNode }) {
  const { profile, isLoading } = useAuth();
  if (isLoading) return <LoadingScreen />;
  if (!profile?.isOwner) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route path="/membership" element={<Membership />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route
              path="/dashboard"
              element={
                <OwnerRoute>
                  <Dashboard />
                </OwnerRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
