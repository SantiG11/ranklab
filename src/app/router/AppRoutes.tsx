import { Route, Routes } from "react-router";

import { Header } from "../../components/layout/Header";
import { HomePage } from "../../pages/HomePage";
import { NotFoundPage } from "../../pages/NotFoundPage";
import { TemplateRankingPage } from "../../pages/TemplateRankingPage";

export function AppRoutes() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/templates/:id" element={<TemplateRankingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
