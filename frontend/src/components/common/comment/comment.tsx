import { useState, useRef } from "react"
import Button from "../button"
import { Comments, User } from "../../../typescript/interfaces"
import profile from "../../../assets/profile.png"
import threeDot from "../../../assets/threeDots.svg"
import formatDate from "../../../helper/dateConverter"
import { useSelector } from "react-redux"
import { Store } from "../../../typescript/interfaces"
import axiosBlogInstance from "../../../api/AxiosBlogInstance"
export default function Comment({ comment, handleComponentUpdate }: { comment: Comments, handleComponentUpdate: () => void }) {
    const [optionClicked, setOptionClicked] = useState(false)
    const [editClicked, setEditClicked] = useState(false)
    const [editText, setEditText] = useState("")
    const editReff = useRef<HTMLInputElement>(null)
    const userDetails = useSelector<Store>(state => state.auth.userData) as User

    function handleUpdate() {
        axiosBlogInstance.put(`/edit_comment/${comment.post_id}/${comment.id}`, { text: editText }, { withCredentials: true }).then(res => {
            console.log(res)
            handleComponentUpdate()
            setEditClicked(prev => !prev)
        })
    }


    function handleDelete() {
        axiosBlogInstance.delete(`/delete_comment/${comment.post_id}/${comment.id}`, { withCredentials: true }).then(res => {
            setOptionClicked(prev => !prev)
            handleComponentUpdate()
        })

    }
    return <div key={comment.id} className="p-5 gap-3 flex flex-col border-b-2">
        <div className="flex justify-between w-full relative">
            <div id="user" className="flex gap-3" >
                <img className="rounded-full  border=-black border h-8 w-8 md:h-12 md:w-12" src={comment.user.image ? comment.user.image : profile} alt={comment.user.first_name} />
                <div className="">
                    <p className=" text-sm px-2 md:text-lg md:font-semibold">{comment.user.first_name} {comment.user.last_name}</p>
                    <p className="text-gray-500 text-sm  px-2 md:tex-lg">{formatDate(comment.timestamp).timeAgo}</p>
                </div>

            </div>
            {userDetails.id === comment.user_id ?<div>
                { optionClicked &&
                    <div>
                        <div className="fixed  w-full h-full top-0 left-0 z-10" onClick={() => {
                            setOptionClicked(prev => !prev)
                            if (editClicked) {
                                setEditClicked(prev => !prev)
                            }
                        }

                        }></div>
                        <div className="bg-white z-20  absolute flex flex-col right-2 bottom-12 border-2 gap-4  shadow-md rounded-lg">
                            <button onClick={() => {
                                setEditText(comment.text)
                                setEditClicked(prev => !prev)
                                setOptionClicked(prev => !prev)
                                if (editReff.current !== null) {
                                    editReff.current.focus()
                                }
                            }} className="font-sans text-xl  hover:text-black text-gray-800 opacity-80 hover:bg-gray-400 px-4 py-1  rounded-lg my-2">Edit</button>
                            <button className="font-sans  text-xl text-red-500 hover:opacity-100 opacity-80 hover:bg-gray-400 px-4 py-1  rounded-lg my-2 hover:font-semibold" onClick={handleDelete} >Delete</button>

                        </div>
                    </div>}
                <button title="more Options" onClick={() => {
                    setOptionClicked(prev => !prev)
                }}><img src={threeDot} className="h-6 w-6" alt="More options" /></button>
            </div>:null}
        </div>
        <div id="comment" className="">

            {editClicked ? <div>
                <div className="fixed  w-full h-full top-0 left-0 -z-10 " onClick={() => {
                    setEditClicked(prev => !prev)
                }

                }></div>
                <div className="flex gap-3 z-20 justify-between flex-row" >
                    <input value={editText} onChange={(e) => { setEditText(e.target.value) }} name="comment" placeholder="Edit comment..." className="  basis-72 p-2 rounded-lg  " ref={editReff} />
                    <Button name="update" onClick={handleUpdate} className="basis-1/4 " />
                </div>
            </div> : <p className="text-sm p-2 md:text-xl">{comment.text} </p>}

        </div>
    </div>
}