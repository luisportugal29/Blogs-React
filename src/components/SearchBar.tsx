import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Blog } from "../interfaces/blog.interface";
import { BlogsContext } from "../context/BlogsContext";

interface Props {
    setShowBlogForm: (value: boolean) => void;
};


const SearchBar: React.FC<Props> = ({setShowBlogForm}) => {

    const context = useContext(BlogsContext);

    const [queryType, setQueryType] = useState<string>('');
    const [querySearch, setQuerySearch] = useState<string>('');
    const [timeOutId, setTimeOutId] = useState<number>(0);
   
    useEffect(() => {
        if ( timeOutId ) clearTimeout(timeOutId);
        setTimeOutId(setTimeout(() => getSearchedBlogs() ,1000));
        return () => clearTimeout(timeOutId)
    }, [querySearch]);

    const getSearchedBlogs = async() => {
        try {
            if ( !querySearch ) {
                getBlogs();
                return;
            }
            const params = {
                [queryType]: querySearch
            };
            const { data: blogs } = await axios.get<Blog[]>('http://localhost:3000/api/blogs/searchBy',{ params });
            console.log(blogs);
            context?.addBlogs(blogs);

        } catch (error ) {
            console.log(error);
        }
    }

    const getBlogs = async() => {
        try {
            const { data: blogs} = await axios.get<Blog[]>('http://localhost:3000/api/blogs');
            context?.addBlogs(blogs);
        } catch( error ) {
            console.log(error);
        }
    }

    return (
        <div className="flex gap-x-1 border p-2 bg-slate-100 rounded-md my-2 shadow-lg">
            <select
             className="appearance-none border border-1 w-[5rem] outline-0 rounded cursor-pointer text-xs font-montserrat text-center"
             value={queryType}
             onChange={event => setQueryType(event.target.value)}
            >
                <option value="titulo">Titulo</option>
                <option value="autor">Autor</option>
                <option value="contenido">Contenido</option>
            </select>
            <input 
             className="w-[18rem] h-[2rem] outline-0  border-gray-700 rounded pl-3 font-montserrat text-xs"
             placeholder="Busqueda..."
             type="text" 
             value={querySearch}
             onChange={event => setQuerySearch(event.target.value)}
            />
            <button 
            onClick={() => setShowBlogForm(true)}
             className="w-20 font-montserrat bg-white text-gray-700"
            >Agregar
            </button>
        </div>
    );
};

export default SearchBar;