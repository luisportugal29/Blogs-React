import { useContext } from "react";
import { BlogsContext } from "../context/BlogsContext";
import BlogCard from "./BlogCard";



const BlogsContainer: React.FC = () => {

    const context = useContext(BlogsContext);
    
    return (
        <div className="flex flex-col items-center shadow-lg rounded bg-slate-100 overflow-hidden">
            {context?.blogs.map(blog => (
                <BlogCard blog={blog} key={blog.id} />
            )) }
        </div>
    );
};

export default BlogsContainer;