import { ReactNode, createContext, useEffect, useState } from "react";
import { Blog } from "../interfaces/blog.interface";
import axios from "axios";

interface BlogsContextProps {
    blogs: Blog[];
    addBlogs: (blogs: Blog[]) => void;
    addBlog: (blog: Blog) =>  void;
}

export const BlogsContext = createContext<BlogsContextProps | null>(null);

export const BlogsProvider: React.FC<{children: ReactNode}> = ({children}) => {

    const [blogs, setBlogs] = useState<Blog[]>([]);

    const addBlogs = (blogs: Blog[]) => setBlogs(blogs) 
    const addBlog = (blog: Blog) => setBlogs([...blogs, blog]); 

    useEffect(() => {
        const fetchBlogs = async() => {
            try {
                const { data } = await axios.get<Blog[]>('http://localhost:3000/api/blogs');
                setBlogs(data);
            } catch ( error ) {
                console.log(error);
            }   
        };
        fetchBlogs();
    }, []);

    const contextValue: BlogsContextProps = {
        blogs,
        addBlogs,
        addBlog
    };

    return (
        <BlogsContext.Provider value={contextValue}>
            {children}
        </BlogsContext.Provider>
    );

};