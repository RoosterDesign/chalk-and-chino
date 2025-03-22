import Container from '@/components/container/container';
import Link from 'next/link';
export default function NotFound() {
    return (
        <Container className="content">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link className="btn" href="/" title="Return to our homepage">Return to our homepage</Link>
        </Container>
    );
}
