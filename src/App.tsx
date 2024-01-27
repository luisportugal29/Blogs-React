import { BlogsProvider } from "./context/BlogsContext";
import Blogs from "./pages/Blogs";


const App: React.FC = () => {

  return (
    <BlogsProvider>
      <div className="h-screen">
        <Blogs />
      </div>
    </BlogsProvider>
  );
  
};


export default App
