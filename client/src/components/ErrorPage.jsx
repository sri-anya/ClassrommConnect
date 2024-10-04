import { useRouteError } from "react-router-dom";
import Background from "./Background";
function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <Background/>
      
      <main> 
        <h1 className="text-5xl text-red-600 h-[8vh] w-[80vw] text-center mx-auto p-[20vh] ">Whoops! Something went wrong! {error}</h1>
        
      </main>
    </>
  );
}

export default ErrorPage;