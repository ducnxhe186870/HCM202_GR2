export default function FlashCardStudySimple() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          FlashCard Study Page
        </h1>
        <p className="text-gray-300 text-lg">
          This is a simple test page to verify routing works.
        </p>
        <div className="mt-8 p-4 bg-blue-500 text-white rounded-lg">
          If you can see this, the route is working correctly!
        </div>
      </div>
    </div>
  );
}
