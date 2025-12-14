import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./hooks/use-cart";
import { ThemeProvider } from "./hooks/use-theme";
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import Index from "./pages/Index";
import Footer from "./components/Footer";

// Lazy load all pages except Index for better initial bundle size
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Inspiration = lazy(() => import("./pages/Inspiration"));
const Upload = lazy(() => import("./pages/Upload"));
const UploadGallery = lazy(() => import("./pages/UploadGallery"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Programs = lazy(() => import("./pages/Programs"));
const ProgramDetail = lazy(() => import("./pages/ProgramDetail"));
const ProgramForm = lazy(() => import("./pages/ProgramForm"));
const Search = lazy(() => import("./pages/Search"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Account = lazy(() => import("./pages/Account"));
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const FreeWorkout = lazy(() => import("./pages/FreeWorkout"));
const AdminModeration = lazy(() => import("./pages/AdminModeration"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/inspiration" element={<Inspiration />} />
                    <Route path="/programs" element={<Programs />} />
                    <Route path="/programs/new" element={<ProgramForm />} />
                    <Route path="/programs/:slug" element={<ProgramDetail />} />
                    <Route path="/programs/:slug/edit" element={<ProgramForm />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/upload/gallery" element={<UploadGallery />} />
                    <Route path="/admin/moderation" element={<AdminModeration />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/free-workout" element={<FreeWorkout />} />
                    <Route path="/terms" element={<TermsOfService />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/refund-policy" element={<RefundPolicy />} />
                    <Route path="/shipping" element={<ShippingPolicy />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <MobileNav />
            </div>
          </BrowserRouter>
        </CartProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
