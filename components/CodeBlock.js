import { rainbow } from "react-syntax-highlighter/dist/cjs/styles/hljs"
import SyntaxHighlighter from "react-syntax-highlighter"

const CopyButton = ({ target }) => {
    const handleCopy = async () => {
        if (target) {
            try {
                await navigator.clipboard.writeText(target)
            } catch(error) {
                alert(`copy failed ${error}`)
            }
        }
        alert('copied!')
    }
    return <button onClick={handleCopy} className='absolute right-0.5'>copy</button>
}

export default function CodeBlock({children}) {
    return (
        <div className='relative'>
            <CopyButton target={children}/>
            <SyntaxHighlighter showLineNumbers style={rainbow}>{children}</SyntaxHighlighter>
        </div>
    )
}