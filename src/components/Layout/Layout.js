import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { Helmet } from "react-helmet";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "75vh" }}>
        <NotificationContainer />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecom Hub - Shop Now",
  description: "mern stack shopping application",
  keywords: "mern, react, bootstrap, node, mongodb, vscode, jsx, js, express,",
  author: "Mirul Ansari",
};

export default Layout;
