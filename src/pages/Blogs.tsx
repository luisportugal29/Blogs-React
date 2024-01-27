import { useState } from "react";
import BlogForm from "../components/BlogForm";
import BlogsContainer from "../components/BlogsContainer";
import SearchBar from "../components/SearchBar";


const Blogs: React.FC = () => {

    const [showBlogForm, setShowBlogForm] = useState<boolean>(false);
   
    return (
        <div className="h-full flex flex-col  items-center border">
            <SearchBar setShowBlogForm={setShowBlogForm}/>
            <BlogsContainer />
            { showBlogForm && <BlogForm  setShowBlogForm={setShowBlogForm}/>}
        </div>
    );
};

export default Blogs;