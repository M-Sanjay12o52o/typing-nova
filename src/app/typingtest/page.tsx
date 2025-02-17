"use client"

import KeyboardComponent from '@/components/Keyboard'
import { Input } from '@/components/ui/input'
import { FC, useState } from 'react'

interface pageProps { }

const page: FC<pageProps> = ({ }) => {
    const [activeKey, setActiveKey] = useState<string>('')

    const handlekeyUp = () => {
        setActiveKey('')
    }

    return (
        <div className="mt-16 px-4 max-w-7xl mx-auto">
            <Input
                onChange={(e) => setActiveKey(e.target.value)}
                onKeyUp={handlekeyUp}
                value={activeKey}
                placeholder='Type here...'
                className="mb-4"
            />
            <div className="w-full overflow-x-auto">
                <KeyboardComponent activeKey={activeKey} />
            </div>
        </div>
    )
}

export default page