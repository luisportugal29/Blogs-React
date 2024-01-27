import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { Blog } from "../interfaces/blog.interface";
import { BlogsContext } from "../context/BlogsContext";

interface Props {
    setShowBlogForm: (value: boolean) => void;
}

const BlogForm: React.FC<Props> = ({ setShowBlogForm}) => {

    const context = useContext(BlogsContext);

    const [titulo, setTitulo] = useState<string>('');
    const [autor, setAutor] = useState<string>('');
    const [contenido, setContenido] = useState<string>('');

    const handleSubmit = async (event: FormEvent) => {
        try {
            event.preventDefault();
            const blog: Blog = {titulo, autor, contenido};
            const { data: createdBlog } = await axios.post<Blog>('http://localhost:3000/api/blogs', blog);
            setShowBlogForm(false);
            context?.addBlog(createdBlog);

        } catch ( error ) {
            console.log(error);
        }
    };

    const handleClick = (event: any) => {
        if ( event.target ===  event.currentTarget)
            setShowBlogForm(false); 
    }

    return (
        <div 
        onClick={handleClick}
        className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50"
        >
        <form onSubmit={handleSubmit} 
         className="border w-[20rem] h-[22rem] p-2 shadow-lg bg-gray-200 rounded"
        >

          <div className="mb-4">
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-600">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="autor" className="block text-sm font-medium text-gray-600">Autor</label>
            <input
              type="text"
              id="autor"
              name="autor"
              value={autor}
              onChange={(event) => setAutor(event.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="contenido" className="block text-sm font-medium text-gray-600">Contenido</label>
            <textarea
              id="contenido"
              name="contenido"
              value={contenido}
              onChange={(event) => setContenido(event.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="px-2 py-1 bg-gray-700 text-white rounded">
              Guardar
            </button>
          </div>
        </form>
        </div>
    );
}

export default BlogForm;