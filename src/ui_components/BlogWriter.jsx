import { Link } from "react-router-dom"
import pic from "../images/pic.jpg"
import FormatDate from "../services/FormatDate"
import {BASE_URL} from '../api';


const BlogWriter = ({blog}) => {
  return (
    <Link to={`/profile/${blog.author.username}/`}>
    <div className="flex items-center gap=4 ">

      
      <span className="flex items-center gap-2">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <img
            src={`${BASE_URL}${blog.author.profilepic}`}
            className="c rounded-full w-full h-full object-cover"
          />
        </div>

        <small className="text-[#696A75] text-[14px]">
          {blog.author.first_name} {blog.author.last_name}
        </small>
      </span>

      <small className="text-[#696A75] text-[14px] ml-3">
        {FormatDate(blog.published_date)}
      </small>


    </div>
    </Link>
  )
}

export default BlogWriter
