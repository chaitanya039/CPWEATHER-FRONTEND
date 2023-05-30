import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const NotFound = (props) =>
{
    return (
        <Layout>
        <Helmet>
            <title>404 - Page Not Found</title>
            <meta name="description" content="404 Page Not Found" />
        </Helmet>
            <div className="notFound">
                <div className="notFound__container">
                    <div className="notFound__container__image_box">
                        <img src={require("../images/notFound.png")} alt="404" />
                    </div>
                    <div className="notFound__container__content">
                        <h1>ERROR !</h1>
                        <p>Oops! That page could not found | Back to <Link to = {'/'}>HOME</Link> again...</p>
                        <Link className="primary-btn" to = {'/'}><i class="fa fa-chevron-circle-left me-2"></i>Back</Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default NotFound;