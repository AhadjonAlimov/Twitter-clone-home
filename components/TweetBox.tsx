import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import {
    CalendarIcon,
    EmojiHappyIcon,
    LocationMarkerIcon,
    PhotographIcon,
    SearchCircleIcon,
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import handler from '../pages/api/hello';
import { Tweet, TweetBody } from '../typings';
import { fetchTweets } from '../utils/fetchTweets';
import toast from 'react-hot-toast';


interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox({ setTweets }: Props) {
    const [input, setInput] = useState<string>('');
    const [image, setImage] = useState<string>('');

    const imageInputRef = useRef<HTMLInputElement>(null);

    const { data: session } = useSession();
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!imageInputRef.current?.value) return;

        setImage(imageInputRef.current.value);
        imageInputRef.current.value = '';
        setImageUrlBoxIsOpen(false);
    }

    const postTweet = async () => {
        const tweetInfo: TweetBody = {
            text: input,
            username: session?.user?.name || 'Unknown User',
            profileImg: session?.user?.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGQaKosQkKcQ4xtCcRMqmnSEyqQusVTC262w&usqp=CAU',
            image: image,
        }

        const result = await fetch(`/api/addTweet`, {
            body: JSON.stringify(tweetInfo),
            method: 'POST',
        })

        const json = await result.json();

        const newTweets = await fetchTweets();
        setTweets(newTweets);

        toast('Tweet posted!', {
            icon: '🚀'
        })

        return json;
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        if (session) {
            postTweet();
            setInput('');
            setImage('');
            setImageUrlBoxIsOpen(false);
        } else {
            toast.error('You must be logged in to post a tweet!', {
                icon: '❌'
            })
        }

    }


    return (
        <div className='flex space-x-2 p-5'>
            <img
                className='mt-4 w-14 h-14 rounded-full object-cover'
                src={session?.user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGQaKosQkKcQ4xtCcRMqmnSEyqQusVTC262w&usqp=CAU"}
                alt="prof"
            />

            <div className='flex flex-1 items-center pl-2'>
                <form className='flex flex-1 flex-col'>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="What's Happening?"
                        className='h-24 w-full text-xl outline-none placeholder:text-xl'
                    />
                    <div className='flex items-center'>
                        <div className='flex flex-1 space-x-2 text-twitter'>
                            <PhotographIcon onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)} className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                            <SearchCircleIcon className='h-5 w-5' />
                            <EmojiHappyIcon className='h-5 w-5' />
                            <CalendarIcon className='h-5 w-5' />
                            <LocationMarkerIcon className='h-5 w-5' />
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={!input}
                            className='rounded-full bg-twitter px-5 py-2 font-bold text-white disabled:opacity-40'>
                            Tweet
                        </button>
                    </div>

                    {imageUrlBoxIsOpen && (
                        <form className='mt-5 flex rounded-lg bg-twitter/80 py-2 px-4'>
                            <input
                                ref={imageInputRef}
                                type="text"
                                placeholder="Image URL"
                                className='flex-1 bg-transparent outline-none p-2 text-white placeholder:text-white'
                            />
                            <button
                                onClick={addImageToTweet}
                                type="submit"
                                className='font-bold text-white'
                            >
                                Add
                            </button>
                        </form>
                    )}

                    {
                        image && (
                            <img
                                className="mt-10 h-40 w-full object-cover rounded-xl shadow-lg"
                                src={image}
                                alt="adding Image"
                            />
                        )
                    }
                </form>
            </div>
        </div>
    )
}

export default TweetBox