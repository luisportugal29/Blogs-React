import { Blog } from "../interfaces/blog.interface";


interface Props {
    blog: Blog;
}

const BlogCard: React.FC<Props> = ({ blog }) => {
    return (
        <div className="rounded bg-gray-700 cursor-pointer my-1 mx-2 text-white w-[30rem]">
            <div className="rounded mx-2 mt-2">
                <p className="text-sm font-medium">Titulo: <span className="text-xs font-light">{blog.titulo}</span></p>
                <p className="text-sm font-medium">Autor: <span className="text-xs font-light">{blog.autor}</span></p>
            </div>
            <div className="mx-2">
                <p className="text-xs font-normal text-center font-montserrat">"{blog.contenido}"</p>
            </div>
        </div>
    );
}

export default BlogCard;