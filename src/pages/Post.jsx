import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import service from "../appwrite/config";
import { deletePost } from "../store/postSlice";

export default function Post() {

    const dispatch = useDispatch()
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const { posts, loading } = useSelector((state) => state.posts);
    const post = posts.find((post) => post.$id === slug);

    const isAuthor = post && userData ? post.user_id === userData.$id : false;


    useEffect(() => {
        if(!loading && !post){
            navigate('/')
        }
    }, [post, loading, navigate])


    const handleDeletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featured_image);
                dispatch(deletePost(post.slug))
                navigate("/");
            }
        });
    };

    if (loading) {
        return (
            <div className="w-full py-20 text-center">
                <p className="text-xl text-gray-800">
                    Loading...
                </p>
            </div>
        );
    }

    if (!post) {
        return null;
    }

    return(
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative p-2 h-100">
                    <img
                        src={service.getFileView(post.featured_image)}
                        alt={post.title}
                        className="rounded-xl"
                        
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={handleDeletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 text-center">
                    <h1 className="text-2xl underline font-bold text-gray-950">{post.title}</h1>
                </div>
                <div className="text-xl text-center text-gray-900">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    );
}