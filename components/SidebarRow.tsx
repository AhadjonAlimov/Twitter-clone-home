import React, { SVGProps } from 'react'

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    title: string;
    onClick?: () => {};
}

function SidebarRow({ Icon, title, onClick }: Props) {
    return (
        <div onClick={() => onClick?.()} className='group flex max-w-fit items-center space-x-2 rounded-full px-4 py-3 transition-all 
        cursor-pointer duration-200 hover:bg-gray-100'>
            <Icon className='h-6 w-6' />
            <p className='hidden md:inline-flex text-base lg:text-xl group-hover:text-twitter'>{title}</p>
        </div>
    )
}

export default SidebarRow   