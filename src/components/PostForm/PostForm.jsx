import React, {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, RTE, Select} from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, updatePost } from '../../store/postSlice'


function PostForm({post}) {

  const dispatch = useDispatch()

    const {register, handleSubmit, watch, setValue, getValues, control} = useForm({
        defaultValues:{
            title : post?.title || "",
            slug : post?.slug || "",
            content : post?.content || "",
            status : post?.status || "active"
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    

    const submit = async (data) => {
      if(post){
        const file = data.image[0] ? await service.uploadFile(data.image[0]) : null

        const dbPost = await service.updatePost(
          post.$id, 
          {...data, 
            featured_image : file ? file.$id : post.featured_image
          }
        )
        if(dbPost){
          if(file){
            service.deleteFile(post.featured_image)
          }
          dispatch(updatePost(dbPost)) //slice
          navigate(`/post/${dbPost.$id}`)
        }

      }else{
        const file = data.image[0] ? await service.uploadFile(data.image[0]) : null
        if(file){
          const dbPost = await service.createPost({
            ...data, 
            featured_image: file.$id,
            user_id: userData.$id

          })

          if(dbPost){
            dispatch(addPost({...data, featured_image: file.$id, user_id: userData.$id}))
            navigate(`/post/${dbPost.$id}`)
          }
        }
        
      }
    }

    const slugTransform = useCallback((value) => {
      if (value && typeof value === 'string'){
        return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
      }
      return ''
      
    }, []);

    useEffect(() => {
      const subscription = watch((value, {name}) => {
        if(name === "title"){
          setValue(
            "slug", 
            slugTransform(value.title), 
            {shouldValidate: true}
          )
        }
      })

      return () => subscription.unsubscribe()
      
    }, [watch, setValue, slugTransform])

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
      <div className='w-2/3 px-2'>
        <Input 
          label="Title: "
          placeholder="Enter the title"
          className="mb-4"
          {...register("title", {required: true})}
          disabled = {post}
        />

        <Input 
          label="Slug: "
          placeholder="Slug"
          className="mb-4"
          readOnly
          {...register("slug", {required: true})}
          defaultValue={post?.slug}
        />

        <RTE 
          label="Content: "
          name="content"
          control={control}
          defaultValues={getValues("content")}
          defaultValue={post?.content}
        />
      </div>

      <div className='w-1/3 px-2'>
        <Input
          label="Featured Image: "
          type="file"
          className="mb-4 file:bg-gray-200 hover:file:bg-gray-300 file:text-gray-700 hover:file:text-gray-800 file:rounded-lg file:border file:border-gray-700 file:px-4 file:py-2 "
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", {required: !post})}
        />

        {post && (
          <div className='w-full mb-4'>
            <img 
              src={service.getFileView(post.featured_image)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select 
          options={["active", "inactive"]}
          label="Status"
          className="mb-13 mt-5"
          {...register("status", {required: true})}
        />

        <Button
          type='submit'
          className='w-full'
          bgColor={post ? "bg-green-500" : undefined}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>

    </form>
  )
}

export default PostForm