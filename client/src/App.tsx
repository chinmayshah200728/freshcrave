import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import StubPage from "./pages/StubPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/menu" component={StubPage} />
      <Route path="/our-story" component={StubPage} />
      <Route path="/weekend-cravings" component={StubPage} />
      <Route path="/coffee-desserts" component={StubPage} />
      <Route path="/catering-gifting" component={StubPage} />
      <Route path="/contact" component={StubPage} />
      <Route path="/cart" component={StubPage} />
      <Route path="/checkout" component={StubPage} />
      <Route path="/order-confirmation" component={StubPage} />
      <Route path="/privacy" component={StubPage} />
      <Route path="/terms" component={StubPage} />
      <Route path="/refunds" component={StubPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
