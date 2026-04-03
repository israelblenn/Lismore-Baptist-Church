import { useEffect } from 'react'

const NotFound = () => {
    useEffect(() => {
        const prevTitle = document.title

        let meta = document.querySelector('meta[name="robots"][data-app-not-found="true"]')
        if (!meta) {
            meta = document.createElement('meta')
            meta.name = 'robots'
            meta.content = 'noindex, nofollow'
            meta.setAttribute('data-app-not-found', 'true')
            document.head.appendChild(meta)
        }

        document.title = 'Page not found · Lismore Baptist Church'

        return () => {
            document.title = prevTitle
            if (meta && meta.parentNode) {
                meta.parentNode.removeChild(meta)
            }
        }
    }, [])

    return (
        <section className="page-loading">
            <h1>Page not found</h1>
            <p>The page you are looking for does not exist.</p>
        </section>
    )
}

export default NotFound
