import { SearchIcon } from '@heroicons/react/outline';
import React from 'react';
import { TwitterShareButton, TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed';


function Widgets() {
    return (
        <div className='col-span-2 hidden mt-2 px-2 lg:inline'>
            {/* Search */}
            <div className='mt-2 flex items-center space-x-2 rounded-full bg-gray-100 p-3'>
                <SearchIcon className='w-5 h-5 text-gray-400' />
                <input
                    type="text"
                    placeholder='Search Twitter'
                    className='flex-1 bg-transparent outline-none'
                />
            </div>

            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="elonmusk"
                options={{ height: 1000 }}
            />


        </div>
    )
}

export default Widgets