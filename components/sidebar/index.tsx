"use client"
import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/store/sidebar-store'
import React from 'react'
import Logo from '../logo'
import SidebarToggle from './sidebar-toggle'
import { UserButton } from '@clerk/nextjs/app-beta'
import { useUser } from '@clerk/nextjs/app-beta/client'
import { MAX_FREE_COUNTS } from '@/constants'
import { Progress } from '../ui/progress'
import ThemeToggle from './theme-toggle'
import SubscriptionButton from '../subscription-button'
import NavBar from './navbar'

import { useEffect } from 'react';



interface SidebarProps {
    className?: string,
    isProPlan?: boolean,
    userLimitCount: number
}
const Sidebar: React.FC<SidebarProps> = ({ className, isProPlan, userLimitCount }) => {
    const { isMinimal } = useSidebarStore()

    const { user } = useUser()
    useEffect(() => {

        console.log(user);



        return () => {

        }
    }, [user])

    return (
        <div className={cn(
            "text-white",
            className
        )}>
            <div className='h-20 pl-7 pr-6'>
                <div className='flex items-center justify-between w-full'>

                    {
                        // nếu sidebar đang thu nhỏ lại thì ko hiện logo ra
                        !isMinimal &&
                        <Logo></Logo>
                    }

                    <SidebarToggle />
                </div>

            </div>
            <div className="grow overflow-auto scroll-smooth scrollbar-none">
                <NavBar />
            </div>

            <div className={cn(
                'fixed bottom-8 left-4 right-4',
                'lg:left-7 lg:right-auto',
                isMinimal && "lg:left-3"

            )}>
                <div className='mb-4 p-4 rounded-lg bg-gray-900'>
                    <div className='mb-4 flex items-center'>
                        <UserButton afterSignOutUrl='/' />
                        {
                            !isMinimal &&
                            <span className='text-sm ml-4'>
                                {
                                    user?.emailAddresses?.[0]?.emailAddress ? user.emailAddresses[0].emailAddress :  user?.web3Wallets?.[0]?.web3Wallet
                                    ? `${user.web3Wallets[0].web3Wallet.slice(0, 4)}...${user.web3Wallets[0].web3Wallet.slice(-4)}`
                                    : ''
                                }


                            </span>
                        }
                    </div>
                    {
                        !isMinimal &&
                        <div className=' border-t border-t-gray-950 pt-2 '>
                            {
                                !isProPlan &&
                                <div className='mb-4 '>
                                    <div className='text-center mb-2 text-muted-foreground font-semibold'>
                                        {/* {userLimitCount}/{MAX_FREE_COUNTS} */}
                                         Free generations
                                    </div>
                                    <Progress
                                        // value={(userLimitCount / MAX_FREE_COUNTS) * 100}
                                        value={(userLimitCount / MAX_FREE_COUNTS) * 100}
                                        className="bg-gray-950 h-3"
                                        indicatorClassName='gradient-btn'
                                    />
                                </div>
                            }

                            <SubscriptionButton isPro={isProPlan} />
                        </div>
                    }
                </div>
                <ThemeToggle />
            </div>
        </div>
    )
}

export default Sidebar