import { useRef } from 'react';
import Layout from '../../components/Layout';

export default function write() {
    const idRef = useRef(undefined)
    const titleRef = useRef(undefined)
    const contentRef = useRef(undefined)

    const handleSubmit = (event) => {
        event.preventDefault()

        const id = idRef.current.value
        const title = titleRef.current.value
        const content = contentRef.current.value

        if (id && title && content) {
            fetch('/api/post/write', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    title,
                    content,
                })
            })
            .then((response) => {
                if(response.ok) {
                    return response.json()
                }
                throw new Error('Fetch Error')
            })
            .then((data) => alert(data.message))
            .catch((error) => alert(`request error: ${error}`))
        }
    }
    return (
        <Layout>
            <h1>Write a post</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' name='id' placeholder='id' required ref={idRef} />
                <br />
                <input type='text' name='title' placeholder='title' required ref={titleRef} />
                <br />
                <input type='text' name='content' placeholder='content' required ref={contentRef} />
                <br />
                <input type='submit' value="create" />
            </form>
        </Layout>
    )
}