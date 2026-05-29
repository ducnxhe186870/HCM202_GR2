import { useSearchParams } from 'react-router';
import QuizComponent from '../components/Quiz/Quiz';
import QuizSelection from '../components/Quiz/QuizSelection';

export default function QuizPage() {
  const [searchParams] = useSearchParams();
  const chapter = searchParams.get('chapter');

  // If no chapter is selected, show the selection page
  if (!chapter) {
    return <QuizSelection />;
  }

  // If a chapter is selected, show the quiz
  return <QuizComponent />;
}
