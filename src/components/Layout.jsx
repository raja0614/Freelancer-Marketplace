import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return <><Navbar /><main className="page-shell">{children}</main><Footer /></>;
}
