// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  MutationCache,
} from "@tanstack/react-query";  
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import App from './App.jsx'
import PageNotFound from "./pages/NotFound";
// import Home from './pages/Home/Home.jsx';
import Chat from './pages/Chat/Chat.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        element: <Chat />,
        index: true,
      },
      
    ],
  },
]);

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      queryClient.invalidateQueries({
        queryKey: mutation.options.mutationKey,
      });
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  </React.StrictMode>
);