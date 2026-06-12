import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Switch, Route } from "wouter";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";

const Home = lazy(() => import("@/pages/Home"));
const Protocolo = lazy(() => import("@/pages/Protocolo"));
const MetodoDetalle = lazy(() => import("@/pages/MetodoDetalle"));
const LibroDetalle = lazy(() => import("@/pages/LibroDetalle"));
const ProblemaDetalle = lazy(() => import("@/pages/ProblemaDetalle"));
const Modulos = lazy(() => import("@/pages/Modulos"));
const Quiz = lazy(() => import("@/pages/Quiz"));
const ObservadorDetalle = lazy(() => import("@/pages/ObservadorDetalle"));
const QuienesSomos = lazy(() => import("@/pages/QuienesSomos"));
const Contacto = lazy(() => import("@/pages/Contacto"));
const ComoFuncionaDetalle = lazy(() => import("@/pages/ComoFuncionaDetalle"));
const Glosario = lazy(() => import("@/pages/Glosario"));
const GlosarioDetalle = lazy(() => import("@/pages/GlosarioDetalle"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogDetalle = lazy(() => import("@/pages/BlogDetalle"));
const Acceso = lazy(() => import("@/pages/Acceso"));
const Confirmacion = lazy(() => import("@/pages/Confirmacion"));
const LandingAds = lazy(() => import("@/pages/LandingAds"));
const Links = lazy(() => import("@/pages/Links"));
const Admin = lazy(() => import("@/pages/Admin"));
const VideoTemplate = lazy(() => import("@/components/video/VideoTemplate"));
const VideoTemplateReel = lazy(() => import("@/components/video/VideoTemplateReel"));
const FaseDetalle = lazy(() => import("@/pages/FaseDetalle"));
const Diagnostico = lazy(() => import("@/pages/Diagnostico"));
const DiagnosticoResultado = lazy(() => import("@/pages/DiagnosticoResultado"));
const Privacidad = lazy(() => import("@/pages/Privacidad"));
const Terminos = lazy(() => import("@/pages/Terminos"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Portal = lazy(() => import("@/pages/Portal"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Suspense fallback={null}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/protocolo" component={Protocolo} />
            <Route path="/metodo/:slug" component={MetodoDetalle} />
            <Route path="/libro/:slug" component={LibroDetalle} />
            <Route path="/problema/:slug" component={ProblemaDetalle} />
            <Route path="/modulos" component={Modulos} />
            <Route path="/quiz" component={Quiz} />
            <Route path="/observador/:slug" component={ObservadorDetalle} />
            <Route path="/quienes-somos" component={QuienesSomos} />
            <Route path="/contacto" component={Contacto} />
            <Route path="/como-funciona/:slug" component={ComoFuncionaDetalle} />
            <Route path="/fase/:slug" component={FaseDetalle} />
            <Route path="/glosario" component={Glosario} />
            <Route path="/glosario/:slug" component={GlosarioDetalle} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:slug" component={BlogDetalle} />
            <Route path="/acceso" component={Acceso} />
            <Route path="/confirmacion" component={Confirmacion} />
            <Route path="/lp" component={LandingAds} />
            <Route path="/links" component={Links} />
            <Route path="/admin" component={Admin} />
            <Route path="/portal" component={Portal} />
            <Route path="/portal/:section" component={Portal} />
            <Route path="/video" component={VideoTemplate} />
            <Route path="/video-reel" component={VideoTemplateReel} />
            <Route path="/diagnostico" component={Diagnostico} />
            <Route path="/diagnostico/:slug" component={DiagnosticoResultado} />
            <Route path="/privacidad" component={Privacidad} />
            <Route path="/terminos" component={Terminos} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
        <WhatsAppButton />
        <CookieBanner />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
