import { useState, useEffect, lazy } from "react";
import { useParams } from "react-router";
import { QuizLoading, Part3Loading } from "./SpecializedLoading";

// Lazy import the actual components
const Quiz = lazy(() => import("../../pages/Quiz"));
const Part3Detail = lazy(() => import("../Part3/Part3Detail"));

// Part3Detail wrapper with loading state for route transitions
export const Part3DetailWrapper = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [prevId, setPrevId] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Show loading when navigating between different ids
    if (prevId !== undefined && prevId !== params.id) {
      setIsLoading(true);
      
      // Simulate data loading time for smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    } else {
      // First load or same id
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [params.id, prevId]);

  useEffect(() => {
    setPrevId(params.id);
  }, [params.id]);

  if (isLoading) {
    return <Part3Loading />;
  }

  return <Part3Detail />;
};

// Quiz wrapper with loading state for route transitions  
export const QuizWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [prevChapter, setPrevChapter] = useState<string | null>(null);

  useEffect(() => {
    const currentChapter = new URLSearchParams(window.location.search).get('chapter');
    
    // Show loading when navigating between different chapters
    if (prevChapter !== null && prevChapter !== currentChapter) {
      setIsLoading(true);
      
      // Simulate data loading time for smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      // First load or same chapter
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [prevChapter]);

  useEffect(() => {
    const currentChapter = new URLSearchParams(window.location.search).get('chapter');
    setPrevChapter(currentChapter);
  }, []);

  if (isLoading) {
    return <QuizLoading />;
  }

  return <Quiz />;
};
