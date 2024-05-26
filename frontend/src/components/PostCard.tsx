import { Avatar, IconButton, Skeleton, Tooltip } from "@mui/material";
import av1 from "../assets/avatars/av1.jpg";
import av2 from "../assets/avatars/av2.jpg";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IoBookmarkOutline } from "react-icons/io5";
import { IPost } from "./routes/Home";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserStatus } from "./context/UserContext";
type Props = {
    isLoading?: boolean;
    post: IPost;
    editable: boolean;
    refetch: () => void
};

const Icon = ({ name, icon }: { name: string; icon: any }) => {
    return (
        <Tooltip title={name} arrow placement="bottom">
            <IconButton color="secondary">{icon}</IconButton>
        </Tooltip>
    );
};

const PostCard = ({ post, isLoading }: Props) => {
    if (isLoading)
        return (
            <div className="w-full flex flex-col gap-3">
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={800} height={90} />
                <Skeleton variant="rounded" width={800} height={60} />
            </div>
        );
    else
        return (
            <div className="w-full flex flex-col gap-4 rounded-xl justify-between px-10 py-3 shadow-lg">
                <div className="flex justify-between w-full">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <Avatar alt="Remy Sharp" src={randomAvatar()} />
                        <div className="flex flex-col">
                            <h1 className="font-bold">{post.author}</h1>
                            <p className="text-sm font-light text-gray-400">{post.date}</p>
                        </div>
                    </div>
                    <Icon name="More" icon={<MoreVertIcon />} />
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <h1 className="text-xl font-bold">{post.title}</h1>
                    <p className="text-sm leading-6">{post.content}</p>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <Icon name="Like" icon={<AiOutlineLike size={20} />} />
                        <p>{post.likes}</p>
                    </div>
                    <div className="flex items-center">
                        <Icon name="Comment" icon={<GoComment size={20} />} />
                        <p>{post.noOfcomments}</p>
                    </div>
                    <div>
                        <Icon name="Share" icon={<IoBookmarkOutline size={20} />} />
                    </div>
                </div>
            </div>
        );
};

export default PostCard;
