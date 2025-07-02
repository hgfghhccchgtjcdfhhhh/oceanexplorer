import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import AllSpecies from "@/pages/all-species";
import AllResearch from "@/pages/all-research";
import ApiDocs from "@/pages/api-docs";
import EducatorTools from "@/pages/educator-tools";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/species" component={AllSpecies} />
      <Route path="/research" component={AllResearch} />
      <Route path="/api-docs" component={ApiDocs} />
      <Route path="/educator-tools" component={EducatorTools} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
