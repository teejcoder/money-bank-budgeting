import { useRouteError } from "react-router-dom";

// ErrorPage component to display error information
export default function ErrorPage() {
  // Get the error object from the route using useRouteError
  const error = useRouteError();

  // Log the error to the console for debugging purposes
  console.error(error);

  // Render the error page with error details
  return (
    <div id="error-page" className="h-screen flex items-center justify-center flex-col">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {/* Display the error statusText or message in italics */}
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
