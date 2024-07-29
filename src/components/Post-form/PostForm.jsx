import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from "../index";
import { useDispatch, useSelector } from 'react-redux';
import { services } from '../../appwrite/config.js';
import { useNavigate } from 'react-router-dom';
import '../../index.css'


function PostForm({ post }) {
    const { control, handleSubmit, register, watch, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "Active",
        },
    })

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? services.uploadFile(data.image[0]) : null;

            if (file) {
                services.deleteFile(post.featuredImage)
            }

            const dbPost = await services.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await services.uploadFile(data.image[0])
            if (file) {
                const fileID = file.$id
                data.featuredImage = fileID
                const dbPost = await services.createPost({
                    ...data,
                    userId: userData.$id,
                    name: userData.name,
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }

    }


    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title, { shouldvalidate: true }))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap form page">
            <div className="w-full px-2 md:w-full lg:w-2/3">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className=" w-2/3 mx-auto lg:w-1/3 p-4">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={services.getFilePreV(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
                <p className='mx-auto w-full block text-center text-gray-600'> Note: Please wait after clicking button once.</p>

            </div>
        </form>
    )
}

export default PostForm