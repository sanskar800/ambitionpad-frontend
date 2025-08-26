import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/ui/Layout';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import BlogDetails from './pages/BlogDetails';
import About from './pages/About';
import Blogs from './pages/Blogs';

// ScrollToTop component that handles automatic scrolling
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;