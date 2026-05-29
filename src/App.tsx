import { Route, Routes } from "react-router";
import { Suspense, lazy } from "react";
import FloatAIChat from "./components/FloatAIChat";
import Loading from "./pages/Loading";
import EasterEgg from "./components/EasterEgg/EasterEgg";
import { QuizLoading, Part3Loading } from "./components/Loading/SpecializedLoading";
import { QuizWrapper, Part3DetailWrapper } from "./components/Loading/RouteWrappers";
import { useAlertOnMobile } from "./hooks/useMobileCheck";

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./pages/Home"));
const Source = lazy(() => import("./pages/Source"));
const Member = lazy(() => import("./pages/Member"));
const QandA = lazy(() => import("./pages/QandA"));
const Overview = lazy(() => import("./pages/Overview"));
const FlashCardStudy = lazy(() => import("./pages/FlashCardStudy"));
const FlashCardStudySimple = lazy(() => import("./pages/FlashCardStudySimple"));


function App() {
  useAlertOnMobile();

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          } />
          <Route path="/quiz" element={
            <Suspense fallback={<QuizLoading />}>
              <QuizWrapper />
            </Suspense>
          } />
          <Route path="/flashcard-study" element={
            <Suspense fallback={<Loading />}>
              <FlashCardStudy />
            </Suspense>
          } />
          <Route path="/flashcard-test" element={
            <Suspense fallback={<Loading />}>
              <FlashCardStudySimple />
            </Suspense>
          } />
          <Route path="/members" element={
            <Suspense fallback={<Loading />}>
              <Member />
            </Suspense>
          } />
          <Route path="/q&a" element={
            <Suspense fallback={<Loading />}>
              <QandA />
            </Suspense>
          } />
          <Route path="/sources" element={
            <Suspense fallback={<Loading />}>
              <Source />
            </Suspense>
          } />
          <Route path="/part3" element={
            <Suspense fallback={<Part3Loading />}>
              <Part3DetailWrapper />
            </Suspense>
          } />
          <Route path="/part3/:id" element={
            <Suspense fallback={<Part3Loading />}>
              <Part3DetailWrapper />
            </Suspense>
          } />
          <Route path="/overview" element={
            <Suspense fallback={<Loading />}>
              <Overview />
            </Suspense>
          } />
        </Route>
      </Routes>
      <FloatAIChat />
      <EasterEgg />
    </>
  );
}

export default App;
