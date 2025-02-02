"use client"

import KeyboardComponent from '@/components/Keyboard'
import { Input } from '@/components/ui/input'
import { FC, useState } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    const [activeKey, setActiveKey] = useState<string>('')

    const handlekeyUp = () => {
        setActiveKey('')
    }

    return <div>
        <Input
            onChange={(e) => setActiveKey(e.target.value)}
            onKeyUp={handlekeyUp}
            value={activeKey}
            placeholder='Type here...'
        />
        <br />
        <KeyboardComponent activeKey={activeKey} />
    </div>
}

export default page