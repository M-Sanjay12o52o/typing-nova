import { SignupForm } from '@/components/SignupForm'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    return <div>
        <SignupForm />
    </div>
}

export default page