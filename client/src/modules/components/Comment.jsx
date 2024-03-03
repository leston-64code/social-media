
import React, { useRef, useEffect } from 'react';
import { formatDate } from '../../utils/timeFunctions';

const Comment = ({comment}) => {
    const commentRef = useRef(null);

    useEffect(() => {
        if (commentRef.current) {
            const commentHeight = commentRef.current.offsetHeight;
            const minHeight = 14; // Minimum height
            const newHeight = Math.max(minHeight, commentHeight);
            commentRef.current.style.height = `${newHeight}px`;
        }
    }, []);

    return (
        <div ref={commentRef} className="w-[100%] py-2 border-b-[0.1px] border-gray-300 flex flex-row items-center">
            <div className="w-[15%] h-auto flex justify-center">
                <img src={comment?.compressed_full_pic} className='rounded-full w-[36px] h-[36px]'/>
            </div>
            <div className="flex flex-col w-[85%]">
                <p className="text-xs font-semibold">{comment?.username} <span className='font-mono ml-3'>{comment?.comment}</span></p>
                <p className="text-[10px] font-semibold text-gray-400"> Commented on :- {formatDate(comment?.created_at)} </p>
            </div>
        </div>
    );
}

export default Comment;

// import React, { useRef, useEffect } from 'react';

// const Comment = () => {
//     const commentRef = useRef(null);
//     const blackCircleRef = useRef(null);

//     useEffect(() => {
//         if (commentRef.current) {
//             const commentHeight = commentRef.current.offsetHeight;
//             const minHeight = 14; // Minimum height
//             const newHeight = Math.max(minHeight, commentHeight);
//             commentRef.current.style.height = `${newHeight}px`;
//         }
//     }, []);


//     return (
//         <div ref={commentRef} className="w-[100%] py-2 border-[0.1px] border-gray-300 flex flex-row items-center">
//             <div ref={blackCircleRef} className="rounded-full mx-9 w-9 h-9 bg-black"></div>
//             <div className="flex flex-col">
//                 <p className="text-xs font-semibold">@Leston <span className='font-mono ml-3'>this is very nice 💘💘💖🌹💋 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ipsum exercitationem sit soluta voluptatem nobis possimus, iure magni harum corrupti.</span></p>
//                 <p className="text-[10px] font-semibold text-gray-400"> Commented on :- 23/3/2023 </p>
//             </div>
//         </div>
//     );
// }

// export default Comment;
